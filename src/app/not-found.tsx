import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-6xl text-maroon mb-4">404</h1>
      <p className="text-maroon/70 text-lg mb-8">Page not found</p>
      <Button variant="gold" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
