// Re-export shared service graph for frontend use
export {
  CATEGORIES,
  services,
  edges,
  buildAdjacencyMap,
  isValidMove,
  getNeighbors,
  pathExists,
  shortestPathLength,
  getRandomChallenge,
} from "../../../shared/serviceGraph.js";
