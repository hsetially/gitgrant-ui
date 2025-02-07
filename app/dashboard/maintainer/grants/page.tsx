import { useMaintainer } from "@/contexts/MaintainerContext";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
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
  PlusCircleIcon,
  CalendarIcon,
  UsersIcon,
  ClockIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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

const formatStatus = (status: Grant['status']): string => {
  return status.split('_').map((word: string) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export default function GrantsPage() {
  const { grants, repositories, isLoading, error, createGrant } = useMaintainer();
  const [searchQuery, setSearchQuery] = useState("");
  const [repoFilter, setRepoFilter] = useState("all");

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  const activeGrants = grants.filter(grant => grant.status === 'active');
  const completedGrants = grants.filter(grant => grant.status === 'completed');

  const filterGrants = (grantsList: typeof grants) => {
    return grantsList.filter(grant => {
      const matchesSearch = grant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           grant.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRepo = repoFilter === "all" || grant.repository === repoFilter;
      return matchesSearch && matchesRepo;
    });
  };

  const filteredActiveGrants = filterGrants(activeGrants);
  const filteredCompletedGrants = filterGrants(completedGrants);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Grants</h1>
        <Button onClick={() => createGrant({})}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Create New Grant
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <DollarSignIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Active Funding</p>
              <h3 className="text-2xl font-bold">
                ${activeGrants.reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()}
              </h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <UsersIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Contributors</p>
              <h3 className="text-2xl font-bold">
                {activeGrants.reduce((sum, grant) => sum + grant.contributorCount, 0)}
              </h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <ClockIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Open Issues</p>
              <h3 className="text-2xl font-bold">
                {activeGrants.reduce((sum, grant) => sum + grant.issueCount, 0)}
              </h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Grants</p>
              <h3 className="text-2xl font-bold">
                {completedGrants.length}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Grants</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search grants..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={repoFilter}
            onValueChange={setRepoFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by repository" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Repositories</SelectItem>
              {repositories.map((repo) => (
                <SelectItem key={repo.id} value={repo.name}>
                  {repo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredActiveGrants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredCompletedGrants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface GrantCardProps {
  grant: Grant;
}

function GrantCard({ grant }: GrantCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{grant.title}</h3>
            <p className="text-sm text-muted-foreground">{grant.repository}</p>
          </div>
          <Badge 
            variant={
              grant.status === 'active' 
                ? 'default' 
                : grant.status === 'completed' 
                  ? 'secondary' 
                  : 'outline'
            }
          >
            {formatStatus(grant.status)}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">{grant.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <DollarSignIcon className="mr-2 h-4 w-4" />
              ${grant.amount.toLocaleString()}
            </div>
            <div className="flex items-center text-sm">
              <UsersIcon className="mr-2 h-4 w-4" />
              {grant.contributorCount} contributors
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(grant.deadline).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm">
              <ClockIcon className="mr-2 h-4 w-4" />
              {grant.issueCount} issues
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{grant.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${grant.progress}%` }}
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            View Details
          </Button>
          {grant.status === 'active' && (
            <Button className="flex-1">
              Manage Grant
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}