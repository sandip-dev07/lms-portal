const faqs = [
  {
    q: "Do I need an account to browse?",
    a: "You can open the landing page without an account, but you need to sign in to search courses, enroll, and track progress. Teacher tools also require sign-in.",
  },
  {
    q: "How do payments work?",
    a: "Each course is either free or has a one-time price set by the teacher. Paid checkout is handled by Stripe. Once you enroll — by paying or with one click for a free course — all published chapters in that course unlock immediately.",
  },
  {
    q: "Can I watch part of a course before paying?",
    a: "Yes, if the teacher marked chapters as free. Free chapters play without purchase; paid chapters show a notice asking you to enroll first.",
  },
  {
    q: "How is progress tracked?",
    a: "Each chapter can be marked complete. The chapter page, course sidebar, and your dashboard all reflect the same progress, so you can resume on any device.",
  },
  {
    q: "What do teachers get?",
    a: "Teacher mode includes course setup, chapter ordering, video uploads, attachments, pricing, publishing controls, and an analytics page with total revenue, total sales, and a sales chart.",
  },
];

const Faq = () => {
  return (
    <section
      id="faq"
      className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Common questions
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Short answers based on how LearnGo actually works.
        </p>
        <div className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-white px-5 py-4 dark:bg-slate-950">
              <summary className="cursor-pointer list-none text-sm font-medium text-slate-900 dark:text-white">
                {faq.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
