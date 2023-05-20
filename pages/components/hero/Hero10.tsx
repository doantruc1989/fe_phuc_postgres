import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Link from "next/link";
import HeroProps from "../HeroProps";

function Hero10() {
  const thit = {
    condition2: "Thịt",
    search: "bybrand",
    filter: "5",
  };
  const rongbien = {
    condition2: "Rong biển",
    search: "bybrand",
    filter: "5",
  };
  const cha = {
    condition2: "Chả",
    search: "bybrand",
    filter: "5",
  };
  return (
    <div className="mt-12">
      <Link href={"/frozenfood"}>
        <h1 className="text-3xl uppercase font-medium mt-3">THỰC PHẨM SẠCH</h1>
      </Link>
      <div>
        <TabView>
          <TabPanel header="Thịt">
          <div className="text-center">
              <HeroProps props={thit} />
            </div>
          </TabPanel>
          <TabPanel header="Rong biển">
          <div className="text-center">
              <HeroProps props={rongbien} />
            </div>
          </TabPanel>
          <TabPanel header="Chả">
          <div className="text-center">
              <HeroProps props={cha} />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default Hero10;
