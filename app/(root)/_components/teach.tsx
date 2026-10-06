import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const points = [
  "Create courses and order chapters with drag and drop",
  "Upload video once — streaming is handled for you",
  "Add descriptions, attachments, and free previews",
  "Set a price — or offer the course for free — and accept payments with Stripe",
  "Publish when ready and track revenue and sales",
];

const bars = [
  { label: "Jan", value: "38%" },
  { label: "Feb", value: "55%" },
  { label: "Mar", value: "44%" },
  { label: "Apr", value: "72%" },
  { label: "May", value: "64%" },
  { label: "Jun", value: "88%" },
];

const Teach = () => {
  return (
    <section id="teach" className="bg-sky-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-medium text-sky-300">For teachers</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Teach on LearnGo without setting up infrastructure.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
            Use teacher mode to draft a course, add chapters, upload video,
            attach resources, and set a price. Publish when the outline is
            complete and follow sales from the analytics page.
          </p>
          <ul className="mt-5 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <span className="text-slate-200">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-sky-500 text-white hover:bg-sky-400"
            >
              <Link href="/teacher/courses">Start teaching</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-sky-800 bg-transparent text-white hover:bg-sky-900 hover:text-white"
            >
              <Link href="/dashboard">View student dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-sky-900 bg-sky-900/50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-sky-100">
              Teacher analytics
            </p>
            <span className="rounded-full border border-sky-800 bg-sky-950 px-2.5 py-0.5 text-xs text-sky-300">
              Last 6 months
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-sky-900 bg-sky-950 p-3">
              <p className="text-xs text-sky-300">Total revenue</p>
              <p className="mt-1 text-xl font-semibold text-white">$4,280</p>
            </div>
            <div className="rounded-md border border-sky-900 bg-sky-950 p-3">
              <p className="text-xs text-sky-300">Total sales</p>
              <p className="mt-1 text-xl font-semibold text-white">156</p>
            </div>
          </div>
          <div className="mt-4 flex h-32 items-end gap-2">
            {bars.map((bar) => (
              <div key={bar.label} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex w-full flex-1 items-end rounded-sm bg-sky-900">
                  <div
                    className="w-full rounded-sm bg-sky-400"
                    style={{ height: bar.value }}
                  />
                </div>
                <span className="text-[11px] text-sky-300">{bar.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 border-t border-sky-900 pt-3 text-xs text-sky-300/80">
            Example data. Your dashboard shows revenue and sales per course
            from Stripe purchases.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Teach;
