import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GrantCardProps {
  grant: {
    id: number;
    title: string;
    amount: number;
    issueCount: number;
    deadline: string;
    status: string;
    repo: string;
  };
}

export function GrantCard({ grant }: GrantCardProps) {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending_allocation':
        return 'warning';
      case 'completed':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{grant.title}</span>
          <Badge variant={getBadgeVariant(grant.status)}>
            {grant.status.replace('_', ' ')}
          </Badge>
        </CardTitle>
        <CardDescription>Repository: {grant.repo}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <span className="font-medium">${grant.amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Issues:</span>
            <span className="font-medium">{grant.issueCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Deadline:</span>
            <span className="font-medium">
              {new Date(grant.deadline).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">View Issues</Button>
        <Button>Allocate Funds</Button>
      </CardFooter>
    </Card>
  );
}