import Link from 'next/link'
import React from 'react'

function Hero7({hero7}:any) {
  return (
    <div className="mt-12 flex flex-col md:flex-row gap-3">
      {hero7
        ? hero7.map((item: any) => {
            return (
              <Link 
              className="w-full"
              key={item.id}
              href={item.path}>
                <img
                  className="w-full object-cover hover:scale-110 transition-all duration-500"
                  src={item.url}
                  alt={item.name}
                />
              </Link>
            );
          })
        : null}
    </div>
  )
}

export default Hero7