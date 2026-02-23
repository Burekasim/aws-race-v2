import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  GetCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const CHALLENGES_TABLE = process.env.CHALLENGES_TABLE || "AWSServiceRace-Challenges";
const SCORES_TABLE = process.env.SCORES_TABLE || "AWSServiceRace-Scores";

// ── Challenges ──

export async function putChallenge(challenge) {
  await docClient.send(
    new PutCommand({
      TableName: CHALLENGES_TABLE,
      Item: challenge,
    })
  );
}

export async function getChallenge(challengeId) {
  const result = await docClient.send(
    new GetCommand({
      TableName: CHALLENGES_TABLE,
      Key: { challengeId },
    })
  );
  return result.Item || null;
}

// ── Scores ──

export async function putScore(score) {
  await docClient.send(
    new PutCommand({
      TableName: SCORES_TABLE,
      Item: score,
    })
  );
}

/**
 * Get top scores for a specific challenge.
 * GSI: challengeId-steps-index (PK: challengeId, SK: steps)
 */
export async function getChallengeScores(challengeId, limit = 20) {
  const result = await docClient.send(
    new QueryCommand({
      TableName: SCORES_TABLE,
      IndexName: "challengeId-steps-index",
      KeyConditionExpression: "challengeId = :cid",
      ExpressionAttributeValues: { ":cid": challengeId },
      ScanIndexForward: true, // ascending by steps
      Limit: limit,
    })
  );
  return result.Items || [];
}

/**
 * Get global top scores.
 * GSI: global-steps-index (PK: globalPK = "GLOBAL", SK: steps)
 */
export async function getGlobalScores(limit = 20) {
  const result = await docClient.send(
    new QueryCommand({
      TableName: SCORES_TABLE,
      IndexName: "global-steps-index",
      KeyConditionExpression: "globalPK = :g",
      ExpressionAttributeValues: { ":g": "GLOBAL" },
      ScanIndexForward: true, // ascending by steps
      Limit: limit,
    })
  );
  return result.Items || [];
}
