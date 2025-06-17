import React from "react";
import Logo from "../Logo";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 flex justify-between w-full">
      <div className="flex items-center gap-2 ">
        <Logo /> <span className="font-semibold text-lg">CoachAI</span>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href={"/signup"}>Get Started</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href={"/signin"}>Sign in</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
