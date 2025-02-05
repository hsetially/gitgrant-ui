import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GitForkIcon, 
  PlusCircleIcon, 
  UsersIcon,
  DollarSignIcon,
  WalletIcon,
  StarIcon,
  CircleIcon
} from "lucide-react";

export default function MaintainerPage() {
  // temp data for now
  const repos = [
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
      description: "Another awesome project",
      stars: 80,
      forks: 20,
      openIssues: 8,
      activeGrants: 1,
      totalFunding: 3000,
    },
  ];

  const pendingGrants = [
    {
      id: 1,
      title: "Bug Fixes Sprint",
      amount: 3000,
      issueCount: 5,
      deadline: "2024-03-01",
      status: "pending_allocation",
      repo: "project-a",
    },
    {
      id: 2,
      title: "Feature Development",
      amount: 5000,
      issueCount: 3,
      deadline: "2024-03-15",
      status: "pending_allocation",
      repo: "project-b",
    },
  ];

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Maintainer Dashboard</h1>
        <div className="space-x-4">
          <Button variant="outline">
            <GitForkIcon className="mr-2 h-4 w-4" />
            Import Repository
          </Button>
          <Button>
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Create Grant
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Repositories"
          value={repos.length}
          icon={<GitForkIcon className="h-4 w-4" />}
          description="Active repositories"
        />
        <StatCard
          title="Active Grants"
          value={pendingGrants.length}
          icon={<DollarSignIcon className="h-4 w-4" />}
          description="Pending allocation"
        />
        <StatCard
          title="Total Contributors"
          value={45}
          icon={<UsersIcon className="h-4 w-4" />}
          description="Across all repos"
        />
        <StatCard
          title="Total Funding"
          value="$12,500"
          icon={<WalletIcon className="h-4 w-4" />}
          description="Available funds"
        />
      </div>
      <Tabs defaultValue="repositories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="pending-grants">Pending Grants</TabsTrigger>
        </TabsList>

        <TabsContent value="repositories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
            {repos.map((repo) => (
              <Card key={repo.id} className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{repo.name}</h3>
                    <GitForkIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{repo.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <StarIcon className="mr-2 h-4 w-4" />
                        {repo.stars} stars
                      </div>
                      <div className="flex items-center text-sm">
                        <GitForkIcon className="mr-2 h-4 w-4" />
                        {repo.forks} forks
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CircleIcon className="mr-2 h-4 w-4" />
                        {repo.openIssues} issues
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSignIcon className="mr-2 h-4 w-4" />
                        ${repo.totalFunding}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending-grants" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 w-full">
            {pendingGrants.map((grant) => (
              <Card key={grant.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{grant.title}</h3>
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                      Pending
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Repository: {grant.repo}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">${grant.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Issues:</span>
                      <span className="font-medium">{grant.issueCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium">
                        {new Date(grant.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">View Issues</Button>
                    <Button className="flex-1">Allocate Funds</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}