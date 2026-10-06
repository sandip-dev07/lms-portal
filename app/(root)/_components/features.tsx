import {
  CreditCard,
  FileText,
  ListVideo,
  PlayCircle,
} from "lucide-react";

const benefits = [
  {
    icon: ListVideo,
    title: "Chapter-based courses",
    text: "Every course is an ordered chapter list — start at chapter 1 and move forward.",
  },
  {
    icon: PlayCircle,
    title: "Free previews",
    text: "Teachers mark intro chapters as free, so you can check quality first.",
  },
  {
    icon: FileText,
    title: "Resources included",
    text: "Readings, templates, and files attached right next to each video.",
  },
  {
    icon: CreditCard,
    title: "One-time payment",
    text: "Pay once per course with Stripe, or enroll free. No subscription.",
  },
];

const Features = () => {
  return (
    <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-3">
              <span className="inline-flex h-fit shrink-0 rounded-md bg-sky-50 p-2 dark:bg-sky-950">
                <benefit.icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
