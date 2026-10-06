import Logo from "@/app/(dashboard)/_components/logo";
import NavbarRoutes from "@/components/navbar-routes";
import MobileMenu from "./mobile-menu";
import { landingLinks } from "./links";
import Link from "next/link";
import { isClerkConfigured } from "@/lib/auth";

const HomeNavbar = () => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Logo />

        {/* Desktop links */}
        <nav className="ml-6 hidden items-center gap-5 md:flex">
          {landingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <MobileMenu />

        <div className="ml-auto flex items-center">
          <NavbarRoutes clerkConfigured={isClerkConfigured()} />
        </div>
      </div>
    </header>
  );
};

export default HomeNavbar;
