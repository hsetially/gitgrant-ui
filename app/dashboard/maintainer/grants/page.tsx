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

interface Grant {
  id: number;
  title: string;
  description: string;
  amount: number;
  repository: string;
  issueCount: number;
  contributorCount: number;
  deadline: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
}

export default function GrantsPage() {
  const grants: Grant[] = [
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
      title: "Feature Development",
      description: "New features implementation for v2.0",
      amount: 7500,
      repository: "project-b",
      issueCount: 12,
      contributorCount: 5,
      deadline: "2024-04-01",
      status: "active",
      progress: 30,
    },
    {
      id: 3,
      title: "Documentation Update",
      description: "Complete documentation overhaul",
      amount: 3000,
      repository: "project-a",
      issueCount: 5,
      contributorCount: 2,
      deadline: "2024-02-28",
      status: "completed",
      progress: 100,
    },
  ];

  const activeGrants = grants.filter(grant => grant.status === 'active');
  const completedGrants = grants.filter(grant => grant.status === 'completed');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Grants</h1>
        <Button>
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
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by repository" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Repositories</SelectItem>
              <SelectItem value="project-a">Project A</SelectItem>
              <SelectItem value="project-b">Project B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {activeGrants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {completedGrants.map((grant) => (
              <GrantCard key={grant.id} grant={grant} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GrantCard({ grant }: { grant: Grant }) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{grant.title}</h3>
            <p className="text-sm text-muted-foreground">{grant.repository}</p>
          </div>
          <Badge variant={grant.status === 'active' ? 'default' : 'secondary'}>
            {grant.status.charAt(0).toUpperCase() + grant.status.slice(1)}
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