"use client";
import { UserButton, useSession } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";

const NavbarRoutes = ({ clerkConfigured }: { clerkConfigured: boolean }) => {
  const pathname = usePathname();

  // Clerk not configured (no .env, placeholder, or mismatched keys) —
  // render a degraded, crash-free nav. useSession()/UserButton would
  // throw without a working ClerkProvider. The flag comes from a server
  // component so client and layout always agree.
  if (!clerkConfigured) {
    return (
      <div className="ml-auto flex items-center gap-2">
        <Link href="/search" className="hidden sm:block">
          <Button
            size="sm"
            variant="outline"
            className="border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-900 dark:text-sky-300 dark:hover:bg-sky-950"
          >
            Browse courses
          </Button>
        </Link>
        <Link href="/sign-in" title="Add Clerk keys in .env to enable auth">
          <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
            Sign in
          </Button>
        </Link>
      </div>
    );
  }

  return <AuthenticatedRoutes pathname={pathname} />;
};

const AuthenticatedRoutes = ({
  pathname,
}: {
  pathname: string | null;
}) => {
  const { session } = useSession();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname?.includes("/search");
  const isHomePage = pathname === "/";

  return (
    <>
      {isSearchPage && (
        <div className="mr-2 hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="ml-auto flex min-w-0 items-center gap-2">
        {!isHomePage && session && (
          <>
            {isTeacherPage || isCoursePage ? (
              <Link href="/search" className="shrink-0">
                <Button size="sm" variant="ghost">
                  <LogOut className="mr-2 h-4 w-4" />
                  Exit
                </Button>
              </Link>
            ) : (
              <Link href="/teacher/courses" className="shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-900 dark:text-sky-300 dark:hover:bg-sky-950"
                >
                  <span className="hidden min-[400px]:inline">Teacher mode</span>
                  <span className="min-[400px]:hidden">Teach</span>
                </Button>
              </Link>
            )}
          </>
        )}

        {isHomePage && (
          <Link href="/search" className="hidden sm:block">
            <Button
              size="sm"
              variant="outline"
              className="border-sky-200 text-sky-700 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-900 dark:text-sky-300 dark:hover:bg-sky-950"
            >
              Browse courses
            </Button>
          </Link>
        )}

        {isHomePage ? (
          <>
            {session ? (
              <UserButton />
            ) : (
              <Link href="/sign-in">
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                  Sign in
                </Button>
              </Link>
            )}
          </>
        ) : session ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default NavbarRoutes;
