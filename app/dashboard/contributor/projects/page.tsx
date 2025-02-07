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
import {
  DollarSignIcon,
  SearchIcon,
  GitForkIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  name: string;
  description: string;
  repository: string;
  stars: number;
  activeGrants: number;
  totalFunding: number;
  contributorsCount: number;
  technologies: string[];
}

export default function ProjectsPage() {
  // Mock data
  const projects: Project[] = [
    {
      id: 1,
      name: "Project A",
      description: "A developer tools project with focus on productivity",
      repository: "org/project-a",
      stars: 1200,
      activeGrants: 3,
      totalFunding: 15000,
      contributorsCount: 45,
      technologies: ["React", "TypeScript", "Node.js"],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Available Projects</h1>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Technology" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Technologies</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="nodejs">Node.js</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Most Recent</SelectItem>
            <SelectItem value="funding">Highest Funding</SelectItem>
            <SelectItem value="stars">Most Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{project.name}</h3>
                <GitForkIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <StarIcon className="mr-2 h-4 w-4" />
                    {project.stars} stars
                  </div>
                  <div className="flex items-center text-sm">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    {project.contributorsCount} contributors
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <DollarSignIcon className="mr-2 h-4 w-4" />
                    ${project.totalFunding} funding
                  </div>
                  <div className="flex items-center text-sm">
                    <GitForkIcon className="mr-2 h-4 w-4" />
                    {project.activeGrants} active grants
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button className="flex-1">
                  View Grants
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}