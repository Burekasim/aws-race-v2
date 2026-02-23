/**
 * AWS Service Relationship Graph
 *
 * To add a new service:
 *   1. Add an entry to the `services` object with id, name, description, and category.
 *   2. Add its relationships in the `edges` array (source → target).
 *      Edges are directional. Add both directions if the integration is bidirectional.
 *
 * To add a new relationship:
 *   Add a new object { source: "service-id", target: "service-id" } to the `edges` array.
 */

export const CATEGORIES = {
  COMPUTE: { label: "Compute", color: "#FF9900" },
  STORAGE: { label: "Storage", color: "#3F8624" },
  DATABASE: { label: "Database", color: "#2E73B8" },
  NETWORKING: { label: "Networking", color: "#8C4FFF" },
  SECURITY: { label: "Security", color: "#DD344C" },
  ANALYTICS: { label: "Analytics", color: "#E7157B" },
  INTEGRATION: { label: "Integration", color: "#E07941" },
  OBSERVABILITY: { label: "Observability", color: "#57A89A" },
  DEVOPS: { label: "DevOps", color: "#CD2264" },
  ML: { label: "ML / AI", color: "#01A88D" },
  MANAGEMENT: { label: "Management", color: "#759C3E" },
};

export const services = {
  // ── Compute ──
  ec2: {
    id: "ec2",
    name: "Amazon EC2",
    description: "Elastic Compute Cloud provides resizable virtual servers. Choose instance types optimized for compute, memory, storage, or GPU workloads with full OS control.",
    category: "COMPUTE",
  },
  lambda: {
    id: "lambda",
    name: "AWS Lambda",
    description: "Serverless compute that runs your code in response to events like HTTP requests, S3 uploads, or DynamoDB changes. Scales automatically from zero to thousands.",
    category: "COMPUTE",
  },
  ecs: {
    id: "ecs",
    name: "Amazon ECS",
    description: "Elastic Container Service runs and manages Docker containers at scale. Integrates with Fargate for serverless or EC2 for self-managed container hosting.",
    category: "COMPUTE",
  },
  eks: {
    id: "eks",
    name: "Amazon EKS",
    description: "Elastic Kubernetes Service runs Kubernetes clusters with a managed control plane. Supports Fargate and EC2 worker nodes for container orchestration.",
    category: "COMPUTE",
  },
  fargate: {
    id: "fargate",
    name: "AWS Fargate",
    description: "Serverless compute engine for ECS and EKS containers. Eliminates the need to provision or manage servers while you pay only for resources used.",
    category: "COMPUTE",
  },
  lightsail: {
    id: "lightsail",
    name: "Amazon Lightsail",
    description: "Simplified virtual private servers with bundled compute, storage, and networking. Ideal for small websites, blogs, and dev environments at predictable pricing.",
    category: "COMPUTE",
  },
  batch: {
    id: "batch",
    name: "AWS Batch",
    description: "Fully managed batch processing service. Dynamically provisions EC2 or Fargate compute resources based on job queue volume and requirements.",
    category: "COMPUTE",
  },
  apprunner: {
    id: "apprunner",
    name: "AWS App Runner",
    description: "Fully managed service to deploy containerized web apps and APIs. Automatically builds, deploys, scales, and load balances without infrastructure management.",
    category: "COMPUTE",
  },
  outposts: {
    id: "outposts",
    name: "AWS Outposts",
    description: "Run AWS infrastructure on-premises. Fully managed racks that extend AWS services to your data center for low-latency needs.",
    category: "COMPUTE",
  },
  wavelength: {
    id: "wavelength",
    name: "AWS Wavelength",
    description: "Deploy apps at the edge of 5G networks. Ultra-low latency compute for mobile and connected device applications.",
    category: "COMPUTE",
  },
  localzones: {
    id: "localzones",
    name: "AWS Local Zones",
    description: "Run latency-sensitive workloads closer to end users. Extend AWS Regions to metro areas for single-digit ms latency.",
    category: "COMPUTE",
  },
  autoscaling: {
    id: "autoscaling",
    name: "AWS Auto Scaling",
    description: "Automatically adjust compute capacity. Scale EC2 instances, ECS tasks, DynamoDB tables, and Aurora replicas to match demand.",
    category: "COMPUTE",
  },
  elasticbeanstalk: {
    id: "elasticbeanstalk",
    name: "AWS Elastic Beanstalk",
    description: "Deploy and manage web apps easily. Upload your code and it handles provisioning, load balancing, and auto-scaling.",
    category: "COMPUTE",
  },
  // ── Storage ──
  s3: {
    id: "s3",
    name: "Amazon S3",
    description: "Simple Storage Service offers 99.999999999% durability for object storage. Store unlimited data with lifecycle policies, versioning, and multiple storage classes.",
    category: "STORAGE",
  },
  ebs: {
    id: "ebs",
    name: "Amazon EBS",
    description: "Elastic Block Store provides persistent block-level storage volumes for EC2 instances. Offers SSD and HDD types with snapshot backup capabilities.",
    category: "STORAGE",
  },
  efs: {
    id: "efs",
    name: "Amazon EFS",
    description: "Elastic File System delivers fully managed NFS file storage. Automatically scales capacity and supports concurrent access from thousands of EC2 instances.",
    category: "STORAGE",
  },
  glacier: {
    id: "glacier",
    name: "S3 Glacier",
    description: "Low-cost cloud archive storage with three retrieval tiers: Expedited (1-5 min), Standard (3-5 hrs), and Bulk (5-12 hrs) for long-term data retention.",
    category: "STORAGE",
  },
  ecr: {
    id: "ecr",
    name: "Amazon ECR",
    description: "Elastic Container Registry stores, manages, and deploys Docker container images. Integrates with ECS, EKS, and Lambda for seamless container workflows.",
    category: "STORAGE",
  },
  fsx: {
    id: "fsx",
    name: "Amazon FSx",
    description: "Fully managed file systems. Choose from Windows File Server, Lustre, NetApp ONTAP, and OpenZFS for high-performance workloads.",
    category: "STORAGE",
  },
  s3glacier_deep: {
    id: "s3glacier_deep",
    name: "S3 Glacier Deep Archive",
    description: "Lowest-cost storage class for long-term data archival. Ideal for compliance archives with 12-hour retrieval.",
    category: "STORAGE",
  },
  datasync: {
    id: "datasync",
    name: "AWS DataSync",
    description: "Automated data transfer service. Move data between on-premises storage, S3, EFS, and FSx up to 10x faster than open-source tools.",
    category: "STORAGE",
  },
  storagegateway: {
    id: "storagegateway",
    name: "AWS Storage Gateway",
    description: "Hybrid cloud storage. Connects on-premises environments to AWS cloud storage with local caching for low-latency access.",
    category: "STORAGE",
  },
  backup: {
    id: "backup",
    name: "AWS Backup",
    description: "Centralized backup service. Automate and manage backups across AWS services including EC2, RDS, EFS, DynamoDB, and S3.",
    category: "STORAGE",
  },
  // ── Database ──
  dynamodb: {
    id: "dynamodb",
    name: "Amazon DynamoDB",
    description: "Fully managed NoSQL key-value and document database. Delivers single-digit millisecond performance with built-in security, backup, and in-memory caching.",
    category: "DATABASE",
  },
  rds: {
    id: "rds",
    name: "Amazon RDS",
    description: "Relational Database Service automates provisioning, patching, and backups. Supports MySQL, PostgreSQL, Oracle, SQL Server, and MariaDB engines.",
    category: "DATABASE",
  },
  aurora: {
    id: "aurora",
    name: "Amazon Aurora",
    description: "High-performance managed relational database. MySQL and PostgreSQL compatible with up to 5x throughput improvement and automatic storage scaling to 128 TB.",
    category: "DATABASE",
  },
  elasticache: {
    id: "elasticache",
    name: "Amazon ElastiCache",
    description: "Managed in-memory data store supporting Redis and Memcached. Delivers microsecond read latency for caching, session stores, and real-time analytics.",
    category: "DATABASE",
  },
  redshift: {
    id: "redshift",
    name: "Amazon Redshift",
    description: "Petabyte-scale cloud data warehouse using columnar storage and massively parallel processing. Run complex analytical SQL queries across structured data.",
    category: "DATABASE",
  },
  neptune: {
    id: "neptune",
    name: "Amazon Neptune",
    description: "Managed graph database supporting Property Graph and RDF models. Optimized for storing billions of relationships and querying graphs with millisecond latency.",
    category: "DATABASE",
  },
  documentdb: {
    id: "documentdb",
    name: "Amazon DocumentDB",
    description: "Managed document database service with MongoDB compatibility. Scales storage automatically and supports JSON workloads with fast, predictable performance.",
    category: "DATABASE",
  },
  keyspaces: {
    id: "keyspaces",
    name: "Amazon Keyspaces",
    description: "Managed Apache Cassandra-compatible database. Serverless, scalable wide-column store for high-throughput applications.",
    category: "DATABASE",
  },
  timestream: {
    id: "timestream",
    name: "Amazon Timestream",
    description: "Serverless time-series database. Store and analyze trillions of time-series events per day for IoT and operational apps.",
    category: "DATABASE",
  },
  memorydb: {
    id: "memorydb",
    name: "Amazon MemoryDB",
    description: "Redis-compatible in-memory database with Multi-AZ durability. Microsecond reads, single-digit ms writes, and data persistence.",
    category: "DATABASE",
  },
  // ── Networking ──
  vpc: {
    id: "vpc",
    name: "Amazon VPC",
    description: "Virtual Private Cloud lets you launch resources in a logically isolated network. Define IP ranges, subnets, route tables, and network gateways with full control.",
    category: "NETWORKING",
  },
  cloudfront: {
    id: "cloudfront",
    name: "Amazon CloudFront",
    description: "Global CDN with 450+ edge locations. Delivers web content, APIs, and video streams with low latency using TLS encryption and DDoS protection built in.",
    category: "NETWORKING",
  },
  route53: {
    id: "route53",
    name: "Amazon Route 53",
    description: "Highly available DNS web service with domain registration. Supports routing policies including latency-based, geolocation, weighted, and failover routing.",
    category: "NETWORKING",
  },
  apigateway: {
    id: "apigateway",
    name: "API Gateway",
    description: "Create, publish, and manage REST, HTTP, and WebSocket APIs at any scale. Handles traffic management, authorization, throttling, and API versioning.",
    category: "NETWORKING",
  },
  alb: {
    id: "alb",
    name: "Elastic Load Balancing",
    description: "Distribute incoming traffic across EC2, containers, and IPs. Supports Application (L7), Network (L4), and Gateway load balancers for high availability.",
    category: "NETWORKING",
  },
  directconnect: {
    id: "directconnect",
    name: "AWS Direct Connect",
    description: "Establish a dedicated private network connection from your data center to AWS. Reduces bandwidth costs, increases throughput, and provides consistent latency.",
    category: "NETWORKING",
  },
  transitgateway: {
    id: "transitgateway",
    name: "Transit Gateway",
    description: "Central hub to connect VPCs, VPNs, and on-premises networks. Simplifies network topology by replacing complex peering relationships with a single gateway.",
    category: "NETWORKING",
  },
  globalaccelerator: {
    id: "globalaccelerator",
    name: "Global Accelerator",
    description: "Improve global application availability and performance using AWS global network. Provides static anycast IP addresses as a fixed entry point for traffic.",
    category: "NETWORKING",
  },
  privatelink: {
    id: "privatelink",
    name: "AWS PrivateLink",
    description: "Access services privately via VPC endpoints. Keep traffic on the AWS network without exposure to the public internet.",
    category: "NETWORKING",
  },
  networkfirewall: {
    id: "networkfirewall",
    name: "AWS Network Firewall",
    description: "Managed network firewall for VPC. Stateful inspection, intrusion prevention, and web filtering at scale.",
    category: "NETWORKING",
  },
  cloudmap: {
    id: "cloudmap",
    name: "AWS Cloud Map",
    description: "Service discovery for cloud resources. Automatically register app resources and look them up via DNS or API calls.",
    category: "NETWORKING",
  },
  vpn: {
    id: "vpn",
    name: "AWS VPN",
    description: "Secure connections between on-premises networks and AWS VPCs. Supports both site-to-site IPsec tunnels and client VPN access.",
    category: "NETWORKING",
  },
  appmesh: {
    id: "appmesh",
    name: "AWS App Mesh",
    description: "Service mesh for microservices. Standardize communication, implement traffic control, and gain observability across services.",
    category: "NETWORKING",
  },
  // ── Security ──
  iam: {
    id: "iam",
    name: "AWS IAM",
    description: "Identity and Access Management controls who can access AWS resources. Define users, groups, roles, and fine-grained policies for least-privilege security.",
    category: "SECURITY",
  },
  cognito: {
    id: "cognito",
    name: "Amazon Cognito",
    description: "User identity and access management for web and mobile apps. Supports sign-up, sign-in, MFA, social federation, and OAuth 2.0 token-based authorization.",
    category: "SECURITY",
  },
  kms: {
    id: "kms",
    name: "AWS KMS",
    description: "Key Management Service creates and controls cryptographic keys used to encrypt data. Integrates with 100+ AWS services and supports automatic key rotation.",
    category: "SECURITY",
  },
  waf: {
    id: "waf",
    name: "AWS WAF",
    description: "Web Application Firewall protects against common web exploits like SQL injection, XSS, and bot traffic. Create custom rules or use managed rule groups.",
    category: "SECURITY",
  },
  shield: {
    id: "shield",
    name: "AWS Shield",
    description: "Managed DDoS protection service with Standard (free) and Advanced tiers. Safeguards applications on CloudFront, ALB, Route 53, and EC2 from attacks.",
    category: "SECURITY",
  },
  secretsmanager: {
    id: "secretsmanager",
    name: "Secrets Manager",
    description: "Securely store, rotate, and manage secrets like database credentials, API keys, and OAuth tokens. Supports automatic rotation with built-in Lambda functions.",
    category: "SECURITY",
  },
  guardduty: {
    id: "guardduty",
    name: "Amazon GuardDuty",
    description: "Intelligent threat detection using ML to monitor for malicious activity. Analyzes CloudTrail logs, VPC Flow Logs, and DNS logs for security threats.",
    category: "SECURITY",
  },
  acm: {
    id: "acm",
    name: "AWS Certificate Manager",
    description: "Provision, manage, and deploy free public SSL/TLS certificates for AWS services. Handles automatic renewal and integrates with CloudFront, ALB, and API Gateway.",
    category: "SECURITY",
  },
  // ── Analytics ──
  athena: {
    id: "athena",
    name: "Amazon Athena",
    description: "Interactive serverless query service that analyzes data in S3 using standard SQL. Pay only per query with no infrastructure to manage. Uses Presto engine.",
    category: "ANALYTICS",
  },
  kinesis: {
    id: "kinesis",
    name: "Amazon Kinesis",
    description: "Real-time streaming data platform with Data Streams, Firehose, Analytics, and Video Streams. Ingest and process millions of events per second at low latency.",
    category: "ANALYTICS",
  },
  emr: {
    id: "emr",
    name: "Amazon EMR",
    description: "Managed big data platform running Apache Spark, Hive, Presto, HBase, and Flink. Process vast amounts of data across dynamically scalable EC2 clusters.",
    category: "ANALYTICS",
  },
  glue: {
    id: "glue",
    name: "AWS Glue",
    description: "Serverless ETL and data integration service. Discover data with crawlers, transform with Spark-based jobs, and maintain a centralized data catalog.",
    category: "ANALYTICS",
  },
  quicksight: {
    id: "quicksight",
    name: "Amazon QuickSight",
    description: "Serverless BI dashboarding service powered by ML. Create interactive visualizations, perform ad-hoc analysis, and embed analytics into applications.",
    category: "ANALYTICS",
  },
  opensearch: {
    id: "opensearch",
    name: "Amazon OpenSearch",
    description: "Managed search and analytics engine based on OpenSearch. Provides full-text search, log analytics, real-time application monitoring, and clickstream analysis.",
    category: "ANALYTICS",
  },
  lakeformation: {
    id: "lakeformation",
    name: "AWS Lake Formation",
    description: "Build secure data lakes in days. Centrally govern, secure, and share data for analytics and machine learning.",
    category: "ANALYTICS",
  },
  msk: {
    id: "msk",
    name: "Amazon MSK",
    description: "Managed Apache Kafka service. Build and run real-time streaming data pipelines and applications without managing infrastructure.",
    category: "ANALYTICS",
  },
  datazone: {
    id: "datazone",
    name: "Amazon DataZone",
    description: "Data management service. Catalog, discover, share, and govern data across organizational boundaries with built-in access control.",
    category: "ANALYTICS",
  },
  // ── Integration ──
  sqs: {
    id: "sqs",
    name: "Amazon SQS",
    description: "Simple Queue Service offers fully managed message queues. Decouple microservices with standard and FIFO queues supporting unlimited throughput and messages.",
    category: "INTEGRATION",
  },
  sns: {
    id: "sns",
    name: "Amazon SNS",
    description: "Simple Notification Service provides pub/sub messaging for event-driven architectures. Fan out to SQS, Lambda, HTTP, email, SMS, and mobile push endpoints.",
    category: "INTEGRATION",
  },
  eventbridge: {
    id: "eventbridge",
    name: "Amazon EventBridge",
    description: "Serverless event bus connecting AWS services, SaaS apps, and custom applications. Route events using rules with content-based filtering and transformation.",
    category: "INTEGRATION",
  },
  stepfunctions: {
    id: "stepfunctions",
    name: "AWS Step Functions",
    description: "Visual workflow service that orchestrates distributed applications using state machines. Coordinate Lambda, ECS, Batch, and 200+ AWS services with error handling.",
    category: "INTEGRATION",
  },
  ses: {
    id: "ses",
    name: "Amazon SES",
    description: "Simple Email Service handles transactional, marketing, and bulk emails. Send and receive email with DKIM authentication, deliverability dashboards, and reputation metrics.",
    category: "INTEGRATION",
  },
  // ── Observability ──
  cloudwatch: {
    id: "cloudwatch",
    name: "Amazon CloudWatch",
    description: "Monitoring and observability platform. Collect metrics, aggregate logs, set alarms, create dashboards, and trigger automated actions for all AWS resources.",
    category: "OBSERVABILITY",
  },
  xray: {
    id: "xray",
    name: "AWS X-Ray",
    description: "Distributed tracing service that analyzes requests as they travel through your application. Identify performance bottlenecks and errors across microservices.",
    category: "OBSERVABILITY",
  },
  cloudtrail: {
    id: "cloudtrail",
    name: "AWS CloudTrail",
    description: "Records all AWS API calls and account activity for governance and compliance auditing. Tracks who did what, when, and from where across your AWS account.",
    category: "OBSERVABILITY",
  },
  // ── DevOps ──
  codepipeline: {
    id: "codepipeline",
    name: "AWS CodePipeline",
    description: "Fully managed CI/CD service that automates build, test, and deploy pipelines. Orchestrates CodeBuild, CodeDeploy, and third-party tools for fast releases.",
    category: "DEVOPS",
  },
  codebuild: {
    id: "codebuild",
    name: "AWS CodeBuild",
    description: "Fully managed build service that compiles source code, runs unit tests, and produces deployable artifacts. Scales automatically with pay-per-minute pricing.",
    category: "DEVOPS",
  },
  codedeploy: {
    id: "codedeploy",
    name: "AWS CodeDeploy",
    description: "Automate application deployments to EC2, Fargate, Lambda, and on-premises servers. Supports rolling, blue/green, and canary deployment strategies.",
    category: "DEVOPS",
  },
  cloudformation: {
    id: "cloudformation",
    name: "AWS CloudFormation",
    description: "Infrastructure as Code service that models and provisions AWS resources using JSON or YAML templates. Supports drift detection and stack change sets.",
    category: "DEVOPS",
  },
  // ── ML / AI ──
  sagemaker: {
    id: "sagemaker",
    name: "Amazon SageMaker",
    description: "End-to-end ML platform to build, train, and deploy models. Includes notebooks, built-in algorithms, automated tuning, and one-click deployment to production.",
    category: "ML",
  },
  bedrock: {
    id: "bedrock",
    name: "Amazon Bedrock",
    description: "Access foundation models from AI21, Anthropic, Meta, and Amazon via API. Build generative AI apps with RAG, fine-tuning, and knowledge base integration.",
    category: "ML",
  },
  rekognition: {
    id: "rekognition",
    name: "Amazon Rekognition",
    description: "Image and video analysis powered by deep learning. Detect objects, faces, text, scenes, and activities. Supports content moderation and facial comparison.",
    category: "ML",
  },
  // ── Management ──
  systemsmanager: {
    id: "systemsmanager",
    name: "Systems Manager",
    description: "Operational hub for managing AWS resources at scale. Patch OS, run commands remotely, manage parameters, and automate maintenance windows across fleets.",
    category: "MANAGEMENT",
  },
  config: {
    id: "config",
    name: "AWS Config",
    description: "Continuously tracks resource configurations and evaluates compliance against desired settings. Records change history and triggers automated remediation rules.",
    category: "MANAGEMENT",
  },
};

/**
 * Edges represent directed relationships (source can lead to target).
 * Many relationships are bidirectional, so both directions are listed.
 */
export const edges = [
  // ── CloudFront connections ──
  { source: "cloudfront", target: "s3" },
  { source: "cloudfront", target: "alb" },
  { source: "cloudfront", target: "apigateway" },
  { source: "cloudfront", target: "lambda" },
  { source: "cloudfront", target: "waf" },
  { source: "cloudfront", target: "acm" },
  { source: "cloudfront", target: "route53" },
  // ── S3 connections ──
  { source: "s3", target: "lambda" },
  { source: "s3", target: "athena" },
  { source: "s3", target: "glue" },
  { source: "s3", target: "cloudfront" },
  { source: "s3", target: "glacier" },
  { source: "s3", target: "kms" },
  { source: "s3", target: "eventbridge" },
  { source: "s3", target: "sns" },
  { source: "s3", target: "sqs" },
  { source: "s3", target: "emr" },
  { source: "s3", target: "redshift" },
  { source: "s3", target: "sagemaker" },
  { source: "s3", target: "cloudtrail" },
  { source: "s3", target: "s3glacier_deep" },
  // ── API Gateway connections ──
  { source: "apigateway", target: "lambda" },
  { source: "apigateway", target: "stepfunctions" },
  { source: "apigateway", target: "dynamodb" },
  { source: "apigateway", target: "sqs" },
  { source: "apigateway", target: "sns" },
  { source: "apigateway", target: "cognito" },
  { source: "apigateway", target: "cloudwatch" },
  { source: "apigateway", target: "waf" },
  { source: "apigateway", target: "xray" },
  { source: "apigateway", target: "cloudfront" },
  { source: "apigateway", target: "acm" },
  // ── Lambda connections ──
  { source: "lambda", target: "dynamodb" },
  { source: "lambda", target: "s3" },
  { source: "lambda", target: "sqs" },
  { source: "lambda", target: "sns" },
  { source: "lambda", target: "eventbridge" },
  { source: "lambda", target: "stepfunctions" },
  { source: "lambda", target: "rds" },
  { source: "lambda", target: "aurora" },
  { source: "lambda", target: "elasticache" },
  { source: "lambda", target: "kinesis" },
  { source: "lambda", target: "ses" },
  { source: "lambda", target: "cloudwatch" },
  { source: "lambda", target: "xray" },
  { source: "lambda", target: "kms" },
  { source: "lambda", target: "secretsmanager" },
  { source: "lambda", target: "apigateway" },
  { source: "lambda", target: "bedrock" },
  { source: "lambda", target: "iam" },
  // ── EC2 connections ──
  { source: "ec2", target: "ebs" },
  { source: "ec2", target: "efs" },
  { source: "ec2", target: "s3" },
  { source: "ec2", target: "rds" },
  { source: "ec2", target: "elasticache" },
  { source: "ec2", target: "cloudwatch" },
  { source: "ec2", target: "alb" },
  { source: "ec2", target: "vpc" },
  { source: "ec2", target: "iam" },
  { source: "ec2", target: "systemsmanager" },
  { source: "ec2", target: "kms" },
  { source: "ec2", target: "autoscaling" },
  // ── ECS connections ──
  { source: "ecs", target: "ecr" },
  { source: "ecs", target: "alb" },
  { source: "ecs", target: "cloudwatch" },
  { source: "ecs", target: "efs" },
  { source: "ecs", target: "secretsmanager" },
  { source: "ecs", target: "fargate" },
  { source: "ecs", target: "vpc" },
  { source: "ecs", target: "xray" },
  { source: "ecs", target: "iam" },
  { source: "ecs", target: "s3" },
  { source: "ecs", target: "cloudmap" },
  // ── EKS connections ──
  { source: "eks", target: "ecr" },
  { source: "eks", target: "alb" },
  { source: "eks", target: "efs" },
  { source: "eks", target: "cloudwatch" },
  { source: "eks", target: "fargate" },
  { source: "eks", target: "vpc" },
  { source: "eks", target: "iam" },
  // ── Fargate connections ──
  { source: "fargate", target: "ecs" },
  { source: "fargate", target: "eks" },
  { source: "fargate", target: "ecr" },
  { source: "fargate", target: "cloudwatch" },
  { source: "fargate", target: "vpc" },
  // ── DynamoDB connections ──
  { source: "dynamodb", target: "lambda" },
  { source: "dynamodb", target: "kinesis" },
  { source: "dynamodb", target: "s3" },
  { source: "dynamodb", target: "cloudwatch" },
  { source: "dynamodb", target: "kms" },
  { source: "dynamodb", target: "iam" },
  { source: "dynamodb", target: "glue" },
  // ── RDS connections ──
  { source: "rds", target: "lambda" },
  { source: "rds", target: "ec2" },
  { source: "rds", target: "secretsmanager" },
  { source: "rds", target: "cloudwatch" },
  { source: "rds", target: "kms" },
  { source: "rds", target: "vpc" },
  { source: "rds", target: "aurora" },
  { source: "rds", target: "glue" },
  // ── Aurora connections ──
  { source: "aurora", target: "lambda" },
  { source: "aurora", target: "secretsmanager" },
  { source: "aurora", target: "cloudwatch" },
  { source: "aurora", target: "rds" },
  { source: "aurora", target: "vpc" },
  { source: "aurora", target: "kms" },
  // ── SQS connections ──
  { source: "sqs", target: "lambda" },
  { source: "sqs", target: "sns" },
  { source: "sqs", target: "eventbridge" },
  { source: "sqs", target: "kms" },
  { source: "sqs", target: "cloudwatch" },
  // ── SNS connections ──
  { source: "sns", target: "lambda" },
  { source: "sns", target: "sqs" },
  { source: "sns", target: "ses" },
  { source: "sns", target: "eventbridge" },
  { source: "sns", target: "cloudwatch" },
  // ── EventBridge connections ──
  { source: "eventbridge", target: "lambda" },
  { source: "eventbridge", target: "sqs" },
  { source: "eventbridge", target: "sns" },
  { source: "eventbridge", target: "stepfunctions" },
  { source: "eventbridge", target: "apigateway" },
  { source: "eventbridge", target: "cloudwatch" },
  { source: "eventbridge", target: "kinesis" },
  // ── Step Functions connections ──
  { source: "stepfunctions", target: "lambda" },
  { source: "stepfunctions", target: "dynamodb" },
  { source: "stepfunctions", target: "sqs" },
  { source: "stepfunctions", target: "sns" },
  { source: "stepfunctions", target: "ecs" },
  { source: "stepfunctions", target: "fargate" },
  { source: "stepfunctions", target: "batch" },
  { source: "stepfunctions", target: "glue" },
  { source: "stepfunctions", target: "sagemaker" },
  { source: "stepfunctions", target: "bedrock" },
  { source: "stepfunctions", target: "cloudwatch" },
  // ── Kinesis connections ──
  { source: "kinesis", target: "lambda" },
  { source: "kinesis", target: "s3" },
  { source: "kinesis", target: "redshift" },
  { source: "kinesis", target: "opensearch" },
  { source: "kinesis", target: "cloudwatch" },
  { source: "kinesis", target: "glue" },
  { source: "kinesis", target: "timestream" },
  { source: "kinesis", target: "msk" },
  // ── CloudWatch connections ──
  { source: "cloudwatch", target: "lambda" },
  { source: "cloudwatch", target: "sns" },
  { source: "cloudwatch", target: "eventbridge" },
  { source: "cloudwatch", target: "ec2" },
  // ── Route 53 connections ──
  { source: "route53", target: "cloudfront" },
  { source: "route53", target: "alb" },
  { source: "route53", target: "apigateway" },
  { source: "route53", target: "s3" },
  { source: "route53", target: "ec2" },
  { source: "route53", target: "lightsail" },
  { source: "route53", target: "globalaccelerator" },
  // ── ALB connections ──
  { source: "alb", target: "ec2" },
  { source: "alb", target: "ecs" },
  { source: "alb", target: "eks" },
  { source: "alb", target: "lambda" },
  { source: "alb", target: "fargate" },
  { source: "alb", target: "waf" },
  { source: "alb", target: "cognito" },
  { source: "alb", target: "acm" },
  { source: "alb", target: "cloudwatch" },
  { source: "alb", target: "vpc" },
  // ── VPC connections ──
  { source: "vpc", target: "ec2" },
  { source: "vpc", target: "rds" },
  { source: "vpc", target: "elasticache" },
  { source: "vpc", target: "ecs" },
  { source: "vpc", target: "eks" },
  { source: "vpc", target: "lambda" },
  { source: "vpc", target: "directconnect" },
  { source: "vpc", target: "transitgateway" },
  { source: "vpc", target: "alb" },
  { source: "vpc", target: "privatelink" },
  { source: "vpc", target: "networkfirewall" },
  { source: "vpc", target: "vpn" },
  // ── Cognito connections ──
  { source: "cognito", target: "apigateway" },
  { source: "cognito", target: "alb" },
  { source: "cognito", target: "lambda" },
  { source: "cognito", target: "dynamodb" },
  { source: "cognito", target: "sns" },
  // ── IAM connections ──
  { source: "iam", target: "lambda" },
  { source: "iam", target: "ec2" },
  { source: "iam", target: "s3" },
  { source: "iam", target: "dynamodb" },
  { source: "iam", target: "ecs" },
  { source: "iam", target: "cognito" },
  { source: "iam", target: "kms" },
  // ── KMS connections ──
  { source: "kms", target: "s3" },
  { source: "kms", target: "dynamodb" },
  { source: "kms", target: "rds" },
  { source: "kms", target: "ebs" },
  { source: "kms", target: "lambda" },
  { source: "kms", target: "sqs" },
  { source: "kms", target: "sns" },
  { source: "kms", target: "secretsmanager" },
  // ── WAF connections ──
  { source: "waf", target: "cloudfront" },
  { source: "waf", target: "alb" },
  { source: "waf", target: "apigateway" },
  { source: "waf", target: "cloudwatch" },
  // ── Shield connections ──
  { source: "shield", target: "cloudfront" },
  { source: "shield", target: "alb" },
  { source: "shield", target: "route53" },
  { source: "shield", target: "ec2" },
  // ── Secrets Manager connections ──
  { source: "secretsmanager", target: "rds" },
  { source: "secretsmanager", target: "aurora" },
  { source: "secretsmanager", target: "lambda" },
  { source: "secretsmanager", target: "ecs" },
  { source: "secretsmanager", target: "kms" },
  // ── GuardDuty connections ──
  { source: "guardduty", target: "cloudwatch" },
  { source: "guardduty", target: "eventbridge" },
  { source: "guardduty", target: "sns" },
  { source: "guardduty", target: "s3" },
  // ── ACM connections ──
  { source: "acm", target: "cloudfront" },
  { source: "acm", target: "alb" },
  { source: "acm", target: "apigateway" },
  // ── Glue connections ──
  { source: "glue", target: "s3" },
  { source: "glue", target: "rds" },
  { source: "glue", target: "redshift" },
  { source: "glue", target: "athena" },
  { source: "glue", target: "dynamodb" },
  { source: "glue", target: "kinesis" },
  { source: "glue", target: "cloudwatch" },
  { source: "glue", target: "lakeformation" },
  // ── Athena connections ──
  { source: "athena", target: "s3" },
  { source: "athena", target: "glue" },
  { source: "athena", target: "quicksight" },
  { source: "athena", target: "cloudwatch" },
  // ── Redshift connections ──
  { source: "redshift", target: "s3" },
  { source: "redshift", target: "glue" },
  { source: "redshift", target: "quicksight" },
  { source: "redshift", target: "kinesis" },
  { source: "redshift", target: "kms" },
  { source: "redshift", target: "vpc" },
  // ── QuickSight connections ──
  { source: "quicksight", target: "athena" },
  { source: "quicksight", target: "redshift" },
  { source: "quicksight", target: "rds" },
  { source: "quicksight", target: "s3" },
  // ── OpenSearch connections ──
  { source: "opensearch", target: "kinesis" },
  { source: "opensearch", target: "lambda" },
  { source: "opensearch", target: "cloudwatch" },
  { source: "opensearch", target: "s3" },
  { source: "opensearch", target: "vpc" },
  // ── CloudTrail connections ──
  { source: "cloudtrail", target: "s3" },
  { source: "cloudtrail", target: "cloudwatch" },
  { source: "cloudtrail", target: "eventbridge" },
  { source: "cloudtrail", target: "kms" },
  // ── X-Ray connections ──
  { source: "xray", target: "lambda" },
  { source: "xray", target: "apigateway" },
  { source: "xray", target: "ecs" },
  { source: "xray", target: "ec2" },
  { source: "xray", target: "cloudwatch" },
  // ── CodePipeline connections ──
  { source: "codepipeline", target: "codebuild" },
  { source: "codepipeline", target: "codedeploy" },
  { source: "codepipeline", target: "s3" },
  { source: "codepipeline", target: "cloudformation" },
  { source: "codepipeline", target: "lambda" },
  { source: "codepipeline", target: "ecs" },
  { source: "codepipeline", target: "sns" },
  // ── CodeBuild connections ──
  { source: "codebuild", target: "s3" },
  { source: "codebuild", target: "ecr" },
  { source: "codebuild", target: "codepipeline" },
  { source: "codebuild", target: "cloudwatch" },
  { source: "codebuild", target: "secretsmanager" },
  // ── CodeDeploy connections ──
  { source: "codedeploy", target: "ec2" },
  { source: "codedeploy", target: "ecs" },
  { source: "codedeploy", target: "lambda" },
  { source: "codedeploy", target: "s3" },
  { source: "codedeploy", target: "cloudwatch" },
  // ── CloudFormation connections ──
  { source: "cloudformation", target: "lambda" },
  { source: "cloudformation", target: "ec2" },
  { source: "cloudformation", target: "s3" },
  { source: "cloudformation", target: "dynamodb" },
  { source: "cloudformation", target: "apigateway" },
  { source: "cloudformation", target: "sns" },
  { source: "cloudformation", target: "iam" },
  // ── SageMaker connections ──
  { source: "sagemaker", target: "s3" },
  { source: "sagemaker", target: "ecr" },
  { source: "sagemaker", target: "lambda" },
  { source: "sagemaker", target: "vpc" },
  { source: "sagemaker", target: "cloudwatch" },
  { source: "sagemaker", target: "kms" },
  // ── Bedrock connections ──
  { source: "bedrock", target: "lambda" },
  { source: "bedrock", target: "s3" },
  { source: "bedrock", target: "apigateway" },
  { source: "bedrock", target: "cloudwatch" },
  // ── Rekognition connections ──
  { source: "rekognition", target: "s3" },
  { source: "rekognition", target: "lambda" },
  { source: "rekognition", target: "kinesis" },
  // ── EMR connections ──
  { source: "emr", target: "s3" },
  { source: "emr", target: "ec2" },
  { source: "emr", target: "vpc" },
  { source: "emr", target: "cloudwatch" },
  { source: "emr", target: "glue" },
  // ── Batch connections ──
  { source: "batch", target: "ec2" },
  { source: "batch", target: "fargate" },
  { source: "batch", target: "s3" },
  { source: "batch", target: "cloudwatch" },
  { source: "batch", target: "efs" },
  // ── EBS connections ──
  { source: "ebs", target: "ec2" },
  { source: "ebs", target: "kms" },
  // ── EFS connections ──
  { source: "efs", target: "ec2" },
  { source: "efs", target: "ecs" },
  { source: "efs", target: "eks" },
  { source: "efs", target: "lambda" },
  { source: "efs", target: "fsx" },
  { source: "efs", target: "datasync" },
  { source: "efs", target: "backup" },
  // ── Glacier connections ──
  { source: "glacier", target: "s3" },
  { source: "glacier", target: "s3glacier_deep" },
  // ── ECR connections ──
  { source: "ecr", target: "ecs" },
  { source: "ecr", target: "eks" },
  { source: "ecr", target: "codebuild" },
  { source: "ecr", target: "lambda" },
  // ── ElastiCache connections ──
  { source: "elasticache", target: "ec2" },
  { source: "elasticache", target: "lambda" },
  { source: "elasticache", target: "vpc" },
  { source: "elasticache", target: "cloudwatch" },
  { source: "elasticache", target: "memorydb" },
  // ── Neptune connections ──
  { source: "neptune", target: "vpc" },
  { source: "neptune", target: "cloudwatch" },
  { source: "neptune", target: "s3" },
  { source: "neptune", target: "lambda" },
  // ── DocumentDB connections ──
  { source: "documentdb", target: "vpc" },
  { source: "documentdb", target: "cloudwatch" },
  { source: "documentdb", target: "kms" },
  { source: "documentdb", target: "lambda" },
  // ── Lightsail connections ──
  { source: "lightsail", target: "route53" },
  { source: "lightsail", target: "cloudfront" },
  { source: "lightsail", target: "s3" },
  // ── App Runner connections ──
  { source: "apprunner", target: "ecr" },
  { source: "apprunner", target: "vpc" },
  { source: "apprunner", target: "cloudwatch" },
  { source: "apprunner", target: "route53" },
  // ── Direct Connect connections ──
  { source: "directconnect", target: "vpc" },
  { source: "directconnect", target: "transitgateway" },
  // ── Transit Gateway connections ──
  { source: "transitgateway", target: "vpc" },
  { source: "transitgateway", target: "directconnect" },
  // ── Global Accelerator connections ──
  { source: "globalaccelerator", target: "alb" },
  { source: "globalaccelerator", target: "ec2" },
  { source: "globalaccelerator", target: "cloudwatch" },
  // ── Systems Manager connections ──
  { source: "systemsmanager", target: "ec2" },
  { source: "systemsmanager", target: "cloudwatch" },
  { source: "systemsmanager", target: "s3" },
  { source: "systemsmanager", target: "iam" },
  { source: "systemsmanager", target: "kms" },
  // ── Config connections ──
  { source: "config", target: "s3" },
  { source: "config", target: "sns" },
  { source: "config", target: "lambda" },
  { source: "config", target: "cloudwatch" },
  // ── SES connections ──
  { source: "ses", target: "sns" },
  { source: "ses", target: "lambda" },
  { source: "ses", target: "s3" },
  { source: "ses", target: "cloudwatch" },
  // ── FSx connections ──
  { source: "fsx", target: "vpc" },
  { source: "fsx", target: "ec2" },
  { source: "fsx", target: "eks" },
  { source: "fsx", target: "ecs" },
  { source: "fsx", target: "kms" },
  { source: "fsx", target: "cloudwatch" },
  { source: "fsx", target: "datasync" },
  { source: "fsx", target: "backup" },
  // ── S3 Glacier Deep Archive connections ──
  { source: "s3glacier_deep", target: "s3" },
  // ── DataSync connections ──
  { source: "datasync", target: "s3" },
  { source: "datasync", target: "efs" },
  { source: "datasync", target: "fsx" },
  { source: "datasync", target: "storagegateway" },
  { source: "datasync", target: "cloudwatch" },
  // ── Storage Gateway connections ──
  { source: "storagegateway", target: "s3" },
  { source: "storagegateway", target: "ebs" },
  { source: "storagegateway", target: "glacier" },
  { source: "storagegateway", target: "cloudwatch" },
  { source: "storagegateway", target: "vpc" },
  // ── Backup connections ──
  { source: "backup", target: "ec2" },
  { source: "backup", target: "rds" },
  { source: "backup", target: "aurora" },
  { source: "backup", target: "dynamodb" },
  { source: "backup", target: "efs" },
  { source: "backup", target: "fsx" },
  { source: "backup", target: "s3" },
  { source: "backup", target: "ebs" },
  { source: "backup", target: "kms" },
  // ── Keyspaces connections ──
  { source: "keyspaces", target: "kms" },
  { source: "keyspaces", target: "cloudwatch" },
  { source: "keyspaces", target: "vpc" },
  { source: "keyspaces", target: "lambda" },
  // ── Timestream connections ──
  { source: "timestream", target: "lambda" },
  { source: "timestream", target: "kms" },
  { source: "timestream", target: "cloudwatch" },
  { source: "timestream", target: "quicksight" },
  { source: "timestream", target: "vpc" },
  // ── MemoryDB connections ──
  { source: "memorydb", target: "vpc" },
  { source: "memorydb", target: "kms" },
  { source: "memorydb", target: "cloudwatch" },
  { source: "memorydb", target: "sns" },
  // ── Lake Formation connections ──
  { source: "lakeformation", target: "s3" },
  { source: "lakeformation", target: "glue" },
  { source: "lakeformation", target: "athena" },
  { source: "lakeformation", target: "redshift" },
  { source: "lakeformation", target: "iam" },
  { source: "lakeformation", target: "cloudwatch" },
  // ── MSK connections ──
  { source: "msk", target: "lambda" },
  { source: "msk", target: "s3" },
  { source: "msk", target: "kinesis" },
  { source: "msk", target: "glue" },
  { source: "msk", target: "vpc" },
  { source: "msk", target: "cloudwatch" },
  { source: "msk", target: "kms" },
  // ── DataZone connections ──
  { source: "datazone", target: "s3" },
  { source: "datazone", target: "glue" },
  { source: "datazone", target: "athena" },
  { source: "datazone", target: "redshift" },
  { source: "datazone", target: "lakeformation" },
  // ── PrivateLink connections ──
  { source: "privatelink", target: "vpc" },
  { source: "privatelink", target: "alb" },
  { source: "privatelink", target: "apigateway" },
  // ── Network Firewall connections ──
  { source: "networkfirewall", target: "vpc" },
  { source: "networkfirewall", target: "cloudwatch" },
  { source: "networkfirewall", target: "s3" },
  // ── Cloud Map connections ──
  { source: "cloudmap", target: "ecs" },
  { source: "cloudmap", target: "eks" },
  { source: "cloudmap", target: "route53" },
  { source: "cloudmap", target: "appmesh" },
  // ── VPN connections ──
  { source: "vpn", target: "vpc" },
  { source: "vpn", target: "transitgateway" },
  { source: "vpn", target: "directconnect" },
  { source: "vpn", target: "cloudwatch" },
  // ── App Mesh connections ──
  { source: "appmesh", target: "ecs" },
  { source: "appmesh", target: "eks" },
  { source: "appmesh", target: "fargate" },
  { source: "appmesh", target: "cloudwatch" },
  { source: "appmesh", target: "xray" },
  { source: "appmesh", target: "cloudmap" },
  // ── Outposts connections ──
  { source: "outposts", target: "ec2" },
  { source: "outposts", target: "ebs" },
  { source: "outposts", target: "s3" },
  { source: "outposts", target: "rds" },
  { source: "outposts", target: "ecs" },
  { source: "outposts", target: "vpc" },
  // ── Wavelength connections ──
  { source: "wavelength", target: "ec2" },
  { source: "wavelength", target: "vpc" },
  { source: "wavelength", target: "alb" },
  // ── Local Zones connections ──
  { source: "localzones", target: "ec2" },
  { source: "localzones", target: "ebs" },
  { source: "localzones", target: "vpc" },
  { source: "localzones", target: "alb" },
  // ── Auto Scaling connections ──
  { source: "autoscaling", target: "ec2" },
  { source: "autoscaling", target: "ecs" },
  { source: "autoscaling", target: "dynamodb" },
  { source: "autoscaling", target: "aurora" },
  { source: "autoscaling", target: "cloudwatch" },
  // ── Elastic Beanstalk connections ──
  { source: "elasticbeanstalk", target: "ec2" },
  { source: "elasticbeanstalk", target: "alb" },
  { source: "elasticbeanstalk", target: "rds" },
  { source: "elasticbeanstalk", target: "s3" },
  { source: "elasticbeanstalk", target: "cloudwatch" },
  { source: "elasticbeanstalk", target: "vpc" },
  { source: "elasticbeanstalk", target: "cloudformation" },
];

/**
 * Build an adjacency map for fast lookups.
 * Returns { [serviceId]: Set<serviceId> }
 */
export function buildAdjacencyMap() {
  const map = {};
  for (const id of Object.keys(services)) {
    map[id] = new Set();
  }
  for (const { source, target } of edges) {
    if (map[source]) {
      map[source].add(target);
    }
  }
  return map;
}

/**
 * Check if moving from `from` to `to` is a valid move.
 */
export function isValidMove(from, to, adjacencyMap) {
  return adjacencyMap[from]?.has(to) ?? false;
}

/**
 * Get all neighbors (reachable services) from a given service.
 */
export function getNeighbors(serviceId, adjacencyMap) {
  return Array.from(adjacencyMap[serviceId] || []);
}

/**
 * BFS to check if a path exists from start to target.
 */
export function pathExists(start, target, adjacencyMap) {
  if (start === target) return true;
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length > 0) {
    const current = queue.shift();
    for (const neighbor of adjacencyMap[current] || []) {
      if (neighbor === target) return true;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}

/**
 * BFS to find the shortest path length from start to target.
 * Returns -1 if no path exists.
 */
export function shortestPathLength(start, target, adjacencyMap) {
  if (start === target) return 0;
  const visited = new Set([start]);
  const queue = [[start, 0]];
  while (queue.length > 0) {
    const [current, dist] = queue.shift();
    for (const neighbor of adjacencyMap[current] || []) {
      if (neighbor === target) return dist + 1;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;
}

/**
 * Get a random challenge (start/target pair) that has a valid path.
 */
export function getRandomChallenge(adjacencyMap) {
  const ids = Object.keys(services);
  let attempts = 0;
  while (attempts < 100) {
    const start = ids[Math.floor(Math.random() * ids.length)];
    const target = ids[Math.floor(Math.random() * ids.length)];
    if (start !== target && shortestPathLength(start, target, adjacencyMap) >= 2) {
      return { startService: start, targetService: target };
    }
    attempts++;
  }
  // Fallback
  return { startService: "cloudfront", targetService: "lambda" };
}
