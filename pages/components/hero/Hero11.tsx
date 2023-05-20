import Link from "next/link";
import React from "react";

function Hero11() {
  return (
    <Link href="/drink">
      <div className="mt-12 flex flex-col md:flex-row gap-3">
        <div className="relative w-full overflow-hidden">
          <img
            className="w-full h-80 hover:scale-110 transition-all duration-500"
            src="/image/hero11_1.png"
            alt="hero11_1"
          />
        </div>

        <div className="relative w-full overflow-hidden">
          <img
            className="w-full h-80 hover:scale-110 transition-all duration-500"
            src="/image/hero11_2.png"
            alt="hero11_1"
          />
        </div>
      </div>
    </Link>
  );
}

export default Hero11;
