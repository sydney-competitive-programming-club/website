import apiService, { ApiError } from './api';

// Interface definitions (matching existing frontend interfaces)
export interface ChallengeData {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints?: string[];
  starterCode: Record<string, string>;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
  solution?: Record<string, string>;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints?: string[];
  starterCode: Record<string, string>;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
  solution?: Record<string, string>;
  isCompleted?: boolean;
  isAttempted?: boolean;
}

export interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
  executionTime?: number;
  memoryUsage?: number;
}

export interface SubmissionRequest {
  problemId: string;
  code: string;
  language: string;
}

export interface SubmissionResponse {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  results?: TestResult[];
  score?: number;
  totalTests?: number;
  passedTests?: number;
  executionTime?: number;
  memoryUsage?: number;
  error?: string;
}

export interface ChallengeFilters {
  difficulty?: string;
  tags?: string[];
  search?: string;
  limit?: number;
  offset?: number;
}

class ChallengeService {
  // Get all challenges with optional filters
  async getChallenges(filters?: ChallengeFilters): Promise<Challenge[]> {
    try {
      const response = await apiService.get<Challenge[]>('/api/problems', filters);
      return response;
    } catch (error) {
      console.error('Error fetching challenges:', error);
      throw error;
    }
  }

  // Get a specific challenge by ID
  async getChallenge(id: string): Promise<ChallengeData | null> {
    try {
      const response = await apiService.get<ChallengeData>(`/api/problems/${id}`);
      return response;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      console.error('Error fetching challenge:', error);
      throw error;
    }
  }

  // Submit code for execution
  async submitCode(submission: SubmissionRequest): Promise<SubmissionResponse> {
    try {
      const response = await apiService.post<SubmissionResponse>('/api/submissions', submission);
      return response;
    } catch (error) {
      console.error('Error submitting code:', error);
      throw error;
    }
  }

  // Test code against test cases (without saving submission)
  async testCode(submission: SubmissionRequest): Promise<TestResult[]> {
    try {
      const response = await apiService.post<TestResult[]>(`/api/problems/${submission.problemId}/test`, {
        code: submission.code,
        language: submission.language
      });
      return response;
    } catch (error) {
      console.error('Error testing code:', error);
      throw error;
    }
  }

  // Get submission status (for long-running submissions)
  async getSubmissionStatus(submissionId: string): Promise<SubmissionResponse> {
    try {
      const response = await apiService.get<SubmissionResponse>(`/api/submissions/${submissionId}`);
      return response;
    } catch (error) {
      console.error('Error fetching submission status:', error);
      throw error;
    }
  }

  // Get user's submission history for a problem
  async getSubmissionHistory(problemId: string, limit: number = 10): Promise<SubmissionResponse[]> {
    try {
      const response = await apiService.get<SubmissionResponse[]>(`/api/problems/${problemId}/submissions`, {
        limit
      });
      return response;
    } catch (error) {
      console.error('Error fetching submission history:', error);
      throw error;
    }
  }
}

const challengeService = new ChallengeService();
export default challengeService;