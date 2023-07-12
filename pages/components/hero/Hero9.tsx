import Link from "next/link";
import React from "react";

function Hero9({ hero9 }: any) {
  return (
    <div className="mt-12 flex flex-col md:flex-row gap-3">
      {hero9
        ? hero9.map((item: any) => {
            return (
              <Link className="w-full" key={item.id} href={item.path}>
                <div className="overflow-hidden">
                  <img
                    className="w-full object-cover hover:scale-110 transition-all duration-500"
                    src={item.url}
                    alt={item.name}
                  />
                </div>
              </Link>
            );
          })
        : null}
    </div>
  );
}

export default Hero9;
