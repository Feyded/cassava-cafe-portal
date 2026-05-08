import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductCardSkeleton() {
  return (
    <Card size="sm">
      <Skeleton className="h-52 w-full" />
      <CardHeader>
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-5 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </CardContent>
      <CardFooter className="border-t border-border">
        <Skeleton className="h-5 w-12" />
      </CardFooter>
    </Card>
  )
}
