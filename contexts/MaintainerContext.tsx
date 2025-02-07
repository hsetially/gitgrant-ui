import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  activeGrants: number;
  totalFunding: number;
}

interface Grant {
  id: number;
  title: string;
  description: string;
  amount: number;
  repository: string;
  issueCount: number;
  contributorCount: number;
  deadline: string;
  status: 'active' | 'completed' | 'pending_allocation';
  progress: number;
}

interface MaintainerContextType {
  repositories: Repository[];
  grants: Grant[];
  stats: {
    totalRepositories: number;
    activeGrants: number;
    totalContributors: number;
    totalFunding: number;
  };
  isLoading: boolean;
  error: Error | null;
  importRepository: (repo: Partial<Repository>) => Promise<void>;
  createGrant: (grant: Partial<Grant>) => Promise<void>;
}

const MaintainerContext = createContext<MaintainerContextType | undefined>(undefined);

// Mock API calls - replace with actual API calls later
const fetchRepositories = async (): Promise<Repository[]> => {
  // Simulate API call
  const githubAuth = localStorage.getItem('github_auth_state');
  if (!githubAuth) throw new Error('Not authenticated');
  
  // Add actual GitHub API call here
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "project-a",
          description: "A cool project with lots of features",
          stars: 120,
          forks: 35,
          openIssues: 12,
          activeGrants: 2,
          totalFunding: 5000,
        },
        {
            id: 2,
            name: "project-b",
            description: "A simple project with a few features",
            stars: 50,
            forks: 10,
            openIssues: 3,
            activeGrants: 1,
            totalFunding: 2000,
        },
        {
            id: 3,
            name: "project-c",
            description: "A complex project with many features",
            stars: 200,
            forks: 45,
            openIssues: 20,
            activeGrants: 3,
            totalFunding: 8000,
        },
        {
            id: 4,
            name: "project-d",
            description: "A small project with a few features",
            stars: 30,
            forks: 5,
            openIssues: 2,
            activeGrants: 0,
            totalFunding: 0,
        },
        {
            id: 5,
            name: "project-e",
            description: "A large project with many features",
            stars: 500,
            forks: 100,
            openIssues: 50,
            activeGrants: 5,
            totalFunding: 20000,
        }
      ]);
    }, 1000);
  });
};

const fetchGrants = async (): Promise<Grant[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Bug Fixes Sprint Q1",
          description: "Critical bug fixes for core functionality",
          amount: 5000,
          repository: "project-a",
          issueCount: 8,
          contributorCount: 3,
          deadline: "2024-03-15",
          status: "active",
          progress: 65,
        },
        {
            id: 2,
            title: "Feature Development Q2",
            description: "New features and enhancements for project",
            amount: 3000,
            repository: "project-b",
            issueCount: 5,
            contributorCount: 2,
            deadline: "2024-06-30",
            status: "active",
            progress: 40,
        },
        {
            id: 3,
            title: "Security Audit",
            description: "Security audit and code review for project",
            amount: 8000,
            repository: "project-c",
            issueCount: 15,
            contributorCount: 5,
            deadline: "2024-04-30",
            status: "active",
            progress: 80,
        },
        {
            id: 4,
            title: "Documentation Update",
            description: "Update project documentation and guides",
            amount: 0,
            repository: "project-d",
            issueCount: 2,
            contributorCount: 1,
            deadline: "2024-05-15",
            status: "pending_allocation",
            progress: 0,
        },
        {
            id: 5,
            title: "Performance Optimization",
            description: "Optimize project performance and speed",
            amount: 20000,
            repository: "project-e",
            issueCount: 30,
            contributorCount: 10,
            deadline: "2024-07-30",
            status: "completed",
            progress: 100,
        }
      ]);
    }, 1000);
  });
};

export function MaintainerProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: repositories = [], isLoading: isLoadingRepos, error: reposError } = 
    useQuery({
      queryKey: ['repositories'],
      queryFn: fetchRepositories,
    });

  const { data: grants = [], isLoading: isLoadingGrants, error: grantsError } = 
    useQuery({
      queryKey: ['grants'],
      queryFn: fetchGrants,
    });

  const importRepositoryMutation = useMutation({
    mutationFn: async (repo: Partial<Repository>) => {
      // Add actual API call here
      console.log(repo);
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repositories'] });
    },
  });

  const createGrantMutation = useMutation({
    mutationFn: async (grant: Partial<Grant>) => {
      // Add actual API call here
      console.log(grant);
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grants'] });
    },
  });

  const stats = {
    totalRepositories: repositories.length,
    activeGrants: grants.filter(g => g.status === 'active').length,
    totalContributors: grants.reduce((sum, g) => sum + g.contributorCount, 0),
    totalFunding: grants.reduce((sum, g) => sum + g.amount, 0),
  };

  const value = {
    repositories,
    grants,
    stats,
    isLoading: isLoadingRepos || isLoadingGrants,
    error: reposError || grantsError,
    importRepository: importRepositoryMutation.mutateAsync,
    createGrant: createGrantMutation.mutateAsync,
  };

  return (
    <MaintainerContext.Provider value={value}>
      {children}
    </MaintainerContext.Provider>
  );
}

export function useMaintainer() {
  const context = useContext(MaintainerContext);
  if (context === undefined) {
    throw new Error('useMaintainer must be used within a MaintainerProvider');
  }
  return context;
}