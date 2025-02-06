import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSignIcon,
  SearchIcon,
  GitPullRequestIcon,
  CheckCircleIcon,
} from "lucide-react";
import { ContributionCard, type Contribution } from "@/components/contributions/ContributionCard";
import { EmptyContributionState as EmptyState } from "@/components/contributions/EmptyContributionState";

export default function EarningsPage() {
  // Mock data
  const contributions: Contribution[] = [
    {
      id: 1,
      title: "Fix authentication bug in login flow",
      description: "Resolved issue with OAuth token refresh mechanism",
      repository: "project-a/main",
      type: "bug",
      status: "completed",
      reward: 500,
      submittedDate: "2024-02-15",
      completedDate: "2024-02-18",
      prLink: "https://github.com/org/repo/pull/123",
    },
    {
      id: 2,
      title: "Implement new API endpoints for user management",
      description: "Added CRUD operations for user profiles",
      repository: "project-b/api",
      type: "feature",
      status: "under_review",
      reward: 750,
      submittedDate: "2024-02-20",
      prLink: "https://github.com/org/repo/pull/124",
    },
    {
      id: 3,
      title: "Update API documentation",
      description: "Comprehensive update of API endpoints documentation",
      repository: "project-a/docs",
      type: "documentation",
      status: "completed",
      reward: 300,
      submittedDate: "2024-02-10",
      completedDate: "2024-02-12",
      prLink: "https://github.com/org/repo/pull/125",
    },
  ];

  const completedContributions = contributions.filter(
    (contribution) => contribution.status === 'completed'
  );

  const inProgressContributions = contributions.filter(
    (contribution) => contribution.status === 'in_progress'
  );

  const underReviewContributions = contributions.filter(
    (contribution) => contribution.status === 'under_review'
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Earnings & Contributions</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <DollarSignIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <h3 className="text-2xl font-bold">$3,250</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <CheckCircleIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <h3 className="text-2xl font-bold">18</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <GitPullRequestIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Review</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <DollarSignIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Rewards</p>
              <h3 className="text-2xl font-bold">$750</h3>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Contributions ({contributions.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedContributions.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({inProgressContributions.length})
          </TabsTrigger>
          <TabsTrigger value="under-review">
            Under Review ({underReviewContributions.length})
          </TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contributions..."
              className="pl-9"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Repository" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Repositories</SelectItem>
              <SelectItem value="project-a">Project A</SelectItem>
              <SelectItem value="project-b">Project B</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest-reward">Highest Reward</SelectItem>
              <SelectItem value="lowest-reward">Lowest Reward</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="all" className="space-y-4">
          {contributions.length > 0 ? (
            contributions.map((contribution) => (
              <ContributionCard 
                key={contribution.id} 
                contribution={contribution} 
              />
            ))
          ) : (
            <EmptyState message="No contributions found" />
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedContributions.length > 0 ? (
            completedContributions.map((contribution) => (
              <ContributionCard 
                key={contribution.id} 
                contribution={contribution} 
              />
            ))
          ) : (
            <EmptyState message="No completed contributions yet" />
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {inProgressContributions.length > 0 ? (
            inProgressContributions.map((contribution) => (
              <ContributionCard 
                key={contribution.id} 
                contribution={contribution} 
              />
            ))
          ) : (
            <EmptyState message="No contributions in progress" />
          )}
        </TabsContent>

        <TabsContent value="under-review" className="space-y-4">
          {underReviewContributions.length > 0 ? (
            underReviewContributions.map((contribution) => (
              <ContributionCard 
                key={contribution.id} 
                contribution={contribution} 
              />
            ))
          ) : (
            <EmptyState message="No contributions under review" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}