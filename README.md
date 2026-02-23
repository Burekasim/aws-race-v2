# AWS Service Race

A Wikipedia Race-style web game where you navigate between AWS services through their integration relationships. Learn how AWS services connect while racing to find the shortest path!

## Architecture

```
                    CloudFront
                   /          \
              S3 (SPA)     API Gateway
                              |
                           Lambda
                           /    \
                  DynamoDB       DynamoDB
                (Challenges)    (Scores)
```

- **Frontend**: React SPA (Vite) hosted on S3 + CloudFront
- **Backend**: AWS Lambda behind API Gateway
- **Database**: Two DynamoDB tables (Challenges, Scores)
- **IaC**: AWS SAM template

## Project Structure

```
aws-service-race/
├── frontend/              # React SPA
│   ├── src/
│   │   ├── App.jsx        # Main game component
│   │   ├── components/    # UI components
│   │   ├── data/          # Service graph re-export
│   │   ├── hooks/         # API client
│   │   └── styles/        # CSS
│   └── package.json
├── backend/               # Lambda functions
│   ├── src/
│   │   ├── handlers/      # API handler (api.js)
│   │   ├── lib/           # DynamoDB, rate limiting, response helpers
│   │   └── local-server.js # Local dev server (in-memory)
│   └── package.json
├── shared/                # Shared code
│   └── serviceGraph.js    # Service definitions + relationship graph
└── template.yaml          # AWS SAM template
```

## Local Development

### Prerequisites
- Node.js 20+
- npm

### Quick Start

```bash
# 1. Install dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 2. Start the backend (in-memory, no AWS needed)
cd backend && npm run dev &

# 3. Start the frontend
cd frontend && npm run dev
```

Open http://localhost:3000 to play. The frontend proxies `/api` requests to the local backend on port 3001.

## Deployment to AWS

### Prerequisites
- AWS CLI configured
- AWS SAM CLI installed (`brew install aws-sam-cli` or see [docs](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))

### Deploy

```bash
# 1. Build and deploy the SAM stack
sam build
sam deploy --guided

# Follow the prompts. Note the outputs:
#   - ApiUrl
#   - FrontendBucketName
#   - CloudFrontUrl

# 2. Build the frontend with the API URL
cd frontend
VITE_API_URL=https://<your-cloudfront-domain>/api npm run build

# 3. Upload frontend to S3
aws s3 sync dist/ s3://<FrontendBucketName> --delete

# 4. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

Your app is now live at the CloudFront URL!

## DynamoDB Schema

### Challenges Table
| Attribute     | Type   | Description          |
|---------------|--------|----------------------|
| challengeId   | String | Partition key        |
| startService  | String | Starting service ID  |
| targetService | String | Target service ID    |
| createdAt     | String | ISO timestamp        |

### Scores Table
| Attribute     | Type   | Description                    |
|---------------|--------|--------------------------------|
| scoreId       | String | Partition key (UUID)           |
| challengeId   | String | Associated challenge           |
| globalPK      | String | Always "GLOBAL" (for GSI)      |
| nickname      | String | Player display name (1-20 chr) |
| steps         | Number | Number of moves taken          |
| timeMs        | Number | Completion time in ms          |
| startService  | String | Start service ID               |
| targetService | String | Target service ID              |
| createdAt     | String | ISO timestamp                  |

**GSIs:**
- `challengeId-steps-index` — Query scores by challenge, sorted by steps
- `global-steps-index` — Query all scores sorted by steps (PK: globalPK="GLOBAL")

## API Endpoints

| Method | Path                         | Description                    |
|--------|------------------------------|--------------------------------|
| GET    | /api/challenge/random        | Get current random challenge   |
| POST   | /api/challenge/create        | Create a custom challenge      |
| GET    | /api/challenge/:id           | Get a specific challenge       |
| POST   | /api/validate-move           | Validate a move (from → to)    |
| POST   | /api/score/submit            | Submit a completion score      |
| GET    | /api/leaderboard/global      | Get global top 20 scores       |
| GET    | /api/leaderboard/:challengeId| Get challenge-specific scores  |
| GET    | /api/services                | Get all services + adjacency   |

## Adding New Services and Relationships

All service data lives in `shared/serviceGraph.js`.

### Add a New Service

Add an entry to the `services` object:

```javascript
myservice: {
  id: "myservice",
  name: "AWS MyService",
  description: "Short beginner-friendly description of what it does.",
  category: "COMPUTE", // One of: COMPUTE, STORAGE, DATABASE, NETWORKING,
                       // SECURITY, ANALYTICS, INTEGRATION, OBSERVABILITY,
                       // DEVOPS, ML, MANAGEMENT
},
```

### Add a New Relationship

Add entries to the `edges` array:

```javascript
// MyService can reach Lambda
{ source: "myservice", target: "lambda" },

// Lambda can reach MyService (if bidirectional)
{ source: "lambda", target: "myservice" },
```

Edges are **directional**. If Service A integrates with Service B, add `{ source: "a", target: "b" }`. Add both directions if the relationship is bidirectional.

After changes, redeploy the backend Lambda and rebuild the frontend.

## Game Modes

1. **Random Challenge** — Start and target are chosen deterministically and rotate every 45 minutes. All players in the same 45-minute window get the same challenge.

2. **Custom Challenge** — Pick your own start and target services. Generates a shareable link with a unique challenge ID. Anyone with the link competes on the same challenge-specific leaderboard.

## Data Storage

### Lambda In-Memory (per instance)

The following data lives in the Lambda function's memory and is **not shared** across instances. It resets whenever the instance is recycled.

| Data | Purpose |
|------|---------|
| **Service graph** (`adjacencyMap`) | Precomputed adjacency map built from the service definitions at cold start. Used for move validation and path checking. |
| **Used game tokens** (`usedTokens` Set) | Tracks HMAC-signed tokens that have already been used to submit a score. Prevents replay attacks on a best-effort basis (per instance only). |
| **Rate limit counters** (`requests` Map) | Per-IP request timestamps for the sliding 1-minute window (max 30 req/min). Resets on instance recycle. |
| **Random challenge** (deterministic) | Computed on the fly from the current 45-minute epoch using a seeded PRNG — no storage needed. All instances produce the same result for the same time window. |

### DynamoDB (persistent)

All persistent data is stored in two DynamoDB tables:

| Table | Data Stored | Key |
|-------|-------------|-----|
| **Challenges** | Custom challenges created by users (challengeId, startService, targetService, createdAt). Random challenges are computed deterministically and never stored. | `challengeId` (partition key) |
| **Scores** | Player submissions (scoreId, challengeId, nickname, steps, timeMs, startService, targetService, createdAt, globalPK). Each score is server-validated before being persisted. | `scoreId` (partition key) |

**Scores GSIs:**
- `challengeId-steps-index` — Fetch per-challenge leaderboard sorted by fewest steps
- `global-steps-index` — Fetch global leaderboard sorted by fewest steps (PK: `globalPK="GLOBAL"`)

> **Note:** Since rate limiting and token replay tracking are per-instance, they provide best-effort protection. For stricter enforcement at scale, consider using DynamoDB or ElastiCache for shared state.

## Anti-Abuse Measures

- **Rate limiting**: 30 requests per minute per IP (in-memory per Lambda instance)
- **Server-side path validation**: Every move in the submitted path is verified against the relationship graph
- **Input validation**: Nickname length, path consistency, step count verification
