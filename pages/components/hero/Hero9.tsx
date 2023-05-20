import Link from "next/link";
import React from "react";

function Hero9() {
  return (
    <Link href="/frozenfood">
      <div className="mt-12 flex flex-col md:flex-row gap-3">
        <div className="relative w-full overflow-hidden">
          <img className="w-full hover:scale-110 transition-all duration-500" src="/image/hero9_1.png" alt="hero9_1" />
        </div>

        <div className="relative w-full overflow-hidden">
          <img className="w-full hover:scale-110 transition-all duration-500" src="/image/hero9_2.png" alt="hero9_1" />
        </div>
      </div>
    </Link>
  );
}

export default Hero9;
