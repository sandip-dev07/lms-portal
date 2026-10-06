"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="flex shrink-0 items-center gap-2" href="/">
      <Image src="/logo.png" alt="LearnGo logo" width={28} height={28} />
      <span className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
        Learn<span className="text-sky-600 dark:text-sky-400">Go.</span>
      </span>
    </Link>
  );
};

export default Logo;
