import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth";
import ToasterProvider from "@/components/provider/toaster-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ConfettiProvider } from "@/components/provider/confetti-provider";
import TopLoader from "@/components/top-loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnGo | Empower Your Learning with Engaging Online Courses",
  description: "LearnGo offers a powerful Learning Management System (LMS) designed to help individuals and organizations access engaging and effective online courses. Unlock your learning potential with our cutting-edge platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkConfigured = isClerkConfigured();

  // No (or placeholder) Clerk keys: render without ClerkProvider so the
  // public landing page doesn't crash. Auth routes show a setup hint
  // until real keys are added.
  if (!clerkConfigured) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConfettiProvider />
            <ToasterProvider />
            <TopLoader />
            {children}
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConfettiProvider />
            <ToasterProvider />
            <TopLoader />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
