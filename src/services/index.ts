import challengeService from './challengeService';
import mockService from './mockService';

// Check if we should use mock service
const USE_MOCK_SERVICE = 
  process.env.REACT_APP_USE_MOCK === 'true' || 
  process.env.NODE_ENV === 'development';

// Export the appropriate service based on environment
export const apiService = USE_MOCK_SERVICE ? mockService : challengeService;

// Re-export types for convenience
export type {
  ChallengeData,
  Challenge,
  TestResult,
  SubmissionRequest,
  SubmissionResponse,
  ChallengeFilters
} from './challengeService';

export { ApiError } from './api';