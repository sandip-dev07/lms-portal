const steps = [
  {
    n: "01",
    title: "Find a course",
    text: "Go to Browse courses, filter by category like Development or Photography, and open a course to see its chapter list and price.",
  },
  {
    n: "02",
    title: "Preview, then enroll",
    text: "Watch any chapter marked free. If it fits, check out once with Stripe to unlock the remaining chapters and attachments.",
  },
  {
    n: "03",
    title: "Learn and track progress",
    text: "Watch chapters in order and mark them complete. Your dashboard keeps in-progress and completed courses separate.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          How it works
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          From browsing to completed in three steps.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="rounded-lg border border-slate-200 border-t-2 border-t-sky-600 bg-white p-5 dark:border-slate-800 dark:border-t-sky-500 dark:bg-slate-950"
            >
              <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                {step.n}
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
