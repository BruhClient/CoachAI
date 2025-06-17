import { Volleyball } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Volleyball className="size-4" />
      </div>
    </Link>
  );
};

export default Logo;
