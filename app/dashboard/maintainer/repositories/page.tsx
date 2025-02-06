import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GitForkIcon,
  SearchIcon,
  StarIcon,
  CircleIcon,
  DollarSignIcon
} from "lucide-react";

export default function RepositoriesPage() {
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Repositories</h1>
        <Button>
          <GitForkIcon className="mr-2 h-4 w-4" />
          Import Repository
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            className="pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Repositories</SelectItem>
            <SelectItem value="active">Active Grants</SelectItem>
            <SelectItem value="no-grants">No Grants</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">View Details</Button>
                <Button className="flex-1">Create Grant</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}