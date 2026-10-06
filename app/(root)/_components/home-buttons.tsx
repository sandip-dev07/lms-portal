import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HomeButtons = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button size="lg" asChild className="bg-sky-600 hover:bg-sky-700">
        <Link href="/search">
          Browse courses
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button
        size="lg"
        variant="outline"
        asChild
        className="border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-900 dark:text-sky-300 dark:hover:bg-sky-950"
      >
        <Link href="#teach">Teach on LearnGo</Link>
      </Button>
    </div>
  );
};

export default HomeButtons;
