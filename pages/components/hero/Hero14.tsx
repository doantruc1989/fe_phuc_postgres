import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Link from "next/link";
import HeroProps from "../HeroProps";

function Hero14() {
  const banh = {
    condition2: "Bánh",
    search: "bybrand",
    filter: "4",
  };
  const ngucoc = {
    condition2: "Ngũ cốc",
    search: "bybrand",
    filter: "4",
  };

  return (
    <div className="mt-12">
      <Link href={"/drink"}>
        <h1 className="text-3xl uppercase font-medium mt-3">Thực phẩm khô</h1>
      </Link>
      <p className="w-full md:w-1/2 text-gray-400 text-sm mt-3">
        Thức ăn bổ dưỡng, nhanh, tiện cho gia đình
      </p>
      <div>
        <TabView>
          <TabPanel header="Bánh">
          <div className="text-center">
              <HeroProps props={banh} />
            </div>
          </TabPanel>
          <TabPanel header="Ngũ cốc">
          <div className="text-center">
              <HeroProps props={ngucoc} />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default Hero14;
