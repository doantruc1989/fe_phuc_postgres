import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Link from "next/link";
import HeroProps from "../HeroProps";

function Hero12() {
  const hanquoc = {
    condition2: "Hàn Quốc",
    search: "bybrand",
    filter: "6",
  };
  const binhan = {
    condition2: "Bình An Farm",
    search: "bybrand",
    filter: "6",
  };
  const dongtrung = {
    condition2: "Hector",
    search: "bybrand",
    filter: "6",
  };
  return (
    <div className="mt-12">
      <Link href={"/friedfood"}>
        <h1 className="text-3xl uppercase font-medium mt-3">Nước giải khát</h1>
      </Link>
      <div>
        <TabView>
          <TabPanel header="Hàn Quốc">
          <div className="text-center">
              <HeroProps props={hanquoc} />
            </div>
          </TabPanel>
          <TabPanel header="Bình An Farm">
          <div className="text-center">
              <HeroProps props={binhan} />
            </div>
          </TabPanel>
          <TabPanel header="Đông trùng hạ thảo">
          <div className="text-center">
              <HeroProps props={dongtrung} />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default Hero12;
