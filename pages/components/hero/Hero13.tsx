import Link from "next/link";
import React from "react";

function Hero13({ hero13 }: any) {
  return (
    <div className="mt-12 flex flex-col md:flex-row gap-3">
      {hero13
        ? hero13.map((item: any) => {
            return (
              <Link className="w-full" key={item.id} href={item.path}>
                <img
                  className="w-full h-80 object-cover hover:scale-110 transition-all duration-500"
                  src={item.url}
                  alt={item.name}
                />
              </Link>
            );
          })
        : null}
    </div>
  );
}

export default Hero13;
