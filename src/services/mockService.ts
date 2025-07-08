import { ChallengeData, Challenge, TestResult, SubmissionRequest, SubmissionResponse, ChallengeFilters } from './challengeService';

// Mock data - same as in the original Challenge component
const mockChallenges: Challenge[] = [
  {
    id: 'two-sum-debug',
    title: 'Two Sum (Debug Version)',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    description: 'Given an array of integers and a target value, find two indices such that the numbers at those indices add up to the target. Print the indices in ascending order.',
    examples: [
      {
        input: '4 9\n2 7 11 15',
        output: '0 1',
        explanation: 'The first line contains n=4 (array size) and target=9. The second line contains the array [2,7,11,15]. Since 2+7=9, we output indices 0 and 1.'
      },
      {
        input: '3 6\n3 2 4',
        output: '1 2',
        explanation: 'Array size n=3, target=6. Array is [3,2,4]. Since 2+4=6, we output indices 1 and 2.'
      },
      {
        input: '2 6\n3 3',
        output: '0 1',
        explanation: 'Array size n=2, target=6. Array is [3,3]. Since 3+3=6, we output indices 0 and 1.'
      }
    ],
    constraints: [
      '2 ≤ n ≤ 10^4',
      '-10^9 ≤ array elements ≤ 10^9',
      '-10^9 ≤ target ≤ 10^9',
      'Exactly one solution exists.',
      'Input format: First line contains n and target, second line contains n integers.'
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it\'s best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.',
      'So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?',
      'The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?'
    ],
    starterCode: {
      'python': `# Read input
n, target = map(int, input().split())
nums = list(map(int, input().split()))

# Bug: This solution has an off-by-one error
for i in range(n):
    for j in range(i, n):  # Bug: should be i+1
        if nums[i] + nums[j] == target:
            print(i, j)
            break`,
      'javascript': `// Read input
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
    lines.push(line);
    if (lines.length === 2) {
        const [n, target] = lines[0].split(' ').map(Number);
        const nums = lines[1].split(' ').map(Number);
        
        // Bug: This solution has an off-by-one error
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {  // Bug: should be i+1
                if (nums[i] + nums[j] === target) {
                    console.log(i, j);
                    process.exit();
                }
            }
        }
        rl.close();
    }
});`,
      'java': `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] nums = new int[n];
        
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        
        // Bug: This solution has an off-by-one error
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {  // Bug: should be i+1
                if (nums[i] + nums[j] == target) {
                    System.out.println(i + " " + j);
                    return;
                }
            }
        }
    }
}`,
      'cpp': `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    // Bug: This solution has an off-by-one error
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {  // Bug: should be i+1
            if (nums[i] + nums[j] == target) {
                cout << i << " " << j << endl;
                return 0;
            }
        }
    }
    return 0;
}`
    },
    testCases: [
      { input: '4 9\n2 7 11 15', expectedOutput: '0 1' },
      { input: '3 6\n3 2 4', expectedOutput: '1 2' },
      { input: '2 6\n3 3', expectedOutput: '0 1' }
    ],
    solution: {
      'python': `# Read input
n, target = map(int, input().split())
nums = list(map(int, input().split()))

# Optimal solution using hash map
hashmap = {}
for i, num in enumerate(nums):
    complement = target - num
    if complement in hashmap:
        print(hashmap[complement], i)
        break
    hashmap[num] = i`,
      'javascript': `// Read input
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
    lines.push(line);
    if (lines.length === 2) {
        const [n, target] = lines[0].split(' ').map(Number);
        const nums = lines[1].split(' ').map(Number);
        
        // Optimal solution using hash map
        const hashmap = {};
        for (let i = 0; i < n; i++) {
            const complement = target - nums[i];
            if (complement in hashmap) {
                console.log(hashmap[complement], i);
                process.exit();
            }
            hashmap[nums[i]] = i;
        }
        rl.close();
    }
});`
    },
    isAttempted: true,
    isCompleted: false
  },
  {
    id: 'reverse-string-debug',
    title: 'Reverse String (Debug Version)',
    difficulty: 'Easy',
    tags: ['String', 'Two Pointers'],
    description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is a printable ascii character.'
    ],
    starterCode: {
      'python': `def reverseString(s):
    # Bug: This doesn't modify the array in-place
    left, right = 0, len(s) - 1
    while left < right:
        temp = s[left]
        s[left] = s[right]
        s[right] = temp
        left += 1
        # Bug: forgot to decrement right
    return s`,
      'javascript': `function reverseString(s) {
    // Bug: This doesn't modify the array in-place
    let left = 0, right = s.length - 1;
    while (left < right) {
        let temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        // Bug: forgot to decrement right
    }
    return s;
}`
    },
    testCases: [
      { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' }
    ],
    isAttempted: false,
    isCompleted: false
  },
  {
    id: 'valid-parentheses-debug',
    title: 'Valid Parentheses (Debug Version)',
    difficulty: 'Medium',
    tags: ['String', 'Stack'],
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}".'
    ],
    starterCode: {
      'python': `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    
    for char in s:
        if char in mapping:
            # Bug: should check if stack is empty first
            top_element = stack.pop()
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    
    return not stack`,
      'javascript': `function isValid(s) {
    const stack = [];
    const mapping = {")" : "(", "}" : "{", "]" : "["};
    
    for (let char of s) {
        if (char in mapping) {
            // Bug: should check if stack is empty first
            const topElement = stack.pop();
            if (mapping[char] !== topElement) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`
    },
    testCases: [
      { input: '"()"', expectedOutput: 'true' },
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' },
      { input: '"([)]"', expectedOutput: 'false' }
    ],
    isAttempted: false,
    isCompleted: false
  },
  {
    id: 'binary-search-debug',
    title: 'Binary Search (Debug Version)',
    difficulty: 'Medium',
    tags: ['Array', 'Binary Search'],
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    starterCode: {
      'python': `def search(nums, target):
    left, right = 0, len(nums)  # Bug: should be len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
      'javascript': `function search(nums, target) {
    let left = 0, right = nums.length;  // Bug: should be nums.length - 1
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`
    },
    testCases: [
      { input: '[-1,0,3,5,9,12], 9', expectedOutput: '4' },
      { input: '[-1,0,3,5,9,12], 2', expectedOutput: '-1' }
    ],
    isAttempted: true,
    isCompleted: true
  }
];

class MockService {
  private delay(ms: number = 800): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getChallenges(filters?: ChallengeFilters): Promise<Challenge[]> {
    await this.delay();
    
    let filtered = [...mockChallenges];
    
    if (filters?.difficulty && filters.difficulty !== 'all') {
      filtered = filtered.filter(c => c.difficulty === filters.difficulty);
    }
    
    if (filters?.tags && filters.tags.length > 0) {
      filtered = filtered.filter(c => 
        filters.tags!.some(tag => c.tags.includes(tag))
      );
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    return filtered;
  }

  async getChallenge(id: string): Promise<ChallengeData | null> {
    await this.delay();
    
    const challenge = mockChallenges.find(c => c.id === id);
    return challenge ? { ...challenge } : null;
  }

  async testCode(submission: SubmissionRequest): Promise<TestResult[]> {
    await this.delay(1500);
    
    const challenge = mockChallenges.find(c => c.id === submission.problemId);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    // Mock test results - simulate that buggy code fails some tests
    const results: TestResult[] = challenge.testCases.map((testCase, index) => {
      const shouldPass = Math.random() > 0.6; // 40% chance to pass (since code has bugs)
      
      return {
        passed: shouldPass,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: shouldPass ? testCase.expectedOutput : (index === 0 ? '0 0' : 'undefined'),
        error: shouldPass ? undefined : 'Index out of bounds or logic error',
        executionTime: Math.random() * 100 + 50, // 50-150ms
        memoryUsage: Math.random() * 1024 + 512 // 512-1536 KB
      };
    });
    
    return results;
  }

  async submitCode(submission: SubmissionRequest): Promise<SubmissionResponse> {
    const results = await this.testCode(submission);
    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;
    
    return {
      id: `submission_${Date.now()}`,
      status: 'completed',
      results,
      score: Math.round((passedTests / totalTests) * 100),
      totalTests,
      passedTests,
      executionTime: Math.max(...results.map(r => r.executionTime || 0)),
      memoryUsage: Math.max(...results.map(r => r.memoryUsage || 0))
    };
  }

  async getSubmissionStatus(submissionId: string): Promise<SubmissionResponse> {
    await this.delay(500);
    
    return {
      id: submissionId,
      status: 'completed',
      results: [],
      score: 0,
      totalTests: 0,
      passedTests: 0
    };
  }

  async getSubmissionHistory(problemId: string, limit: number = 10): Promise<SubmissionResponse[]> {
    await this.delay();
    
    return [];
  }
}

export default new MockService();