import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DollarSignIcon,
  GitPullRequestIcon,
  StarIcon,
  TrendingUpIcon,
} from "lucide-react";

interface Contribution {
  id: number;
  title: string;
  repository: string;
  type: 'bug' | 'feature' | 'documentation';
  status: 'in_progress' | 'under_review' | 'completed';
  reward: number;
  date: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  totalEarned: number;
  contributionsCount: number;
  activeGrants: number;
}

export default function ContributorOverviewPage() {
  // temp data
  const recentContributions: Contribution[] = [
    {
      id: 1,
      title: "Fix authentication bug",
      repository: "project-a",
      type: "bug",
      status: "completed",
      reward: 500,
      date: "2024-02-15",
    },
    {
      id: 2,
      title: "Implement new API endpoint",
      repository: "project-b",
      type: "feature",
      status: "under_review",
      reward: 750,
      date: "2024-02-18",
    },
  ];

  const activeProjects: Project[] = [
    {
      id: 1,
      name: "Project A",
      description: "Open source project focused on developer tools",
      totalEarned: 2500,
      contributionsCount: 8,
      activeGrants: 3,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contributor Dashboard</h1>
        <Button>
          <GitPullRequestIcon className="mr-2 h-4 w-4" />
          Find Projects
        </Button>
      </div>

      {/* Stats Overview */}
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
              <GitPullRequestIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contributions</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <StarIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <TrendingUpIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <h3 className="text-2xl font-bold">92%</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity and Projects */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Contributions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Contributions</h2>
          <div className="space-y-4">
            {recentContributions.map((contribution) => (
              <div
                key={contribution.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{contribution.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {contribution.repository}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${contribution.reward}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(contribution.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Contributions
          </Button>
        </Card>

        {/* Active Projects */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {project.contributionsCount} contributions
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${project.totalEarned} earned
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Projects
          </Button>
        </Card>
      </div>
    </div>
  );
}