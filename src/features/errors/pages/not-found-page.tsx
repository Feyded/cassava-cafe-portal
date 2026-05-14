import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-6 rounded-full bg-primary/10 p-6 flex items-center justify-center">
        <Coffee className="w-16 h-16 text-primary" />
      </div>
      <h1 className="text-7xl font-black text-foreground mb-4 font-mono">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
        We couldn't brew this page.
      </h2>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="w-full sm:w-auto">
          <Link to="/">Back to Home</Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          <Link to="/menu">View Menu</Link>
        </Button>
      </div>
    </div>
  );
}
