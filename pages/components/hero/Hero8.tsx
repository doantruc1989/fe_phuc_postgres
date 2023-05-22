import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Link from "next/link";
import HeroProps from "../HeroProps";
import { useTranslation } from "react-i18next";

function Hero8() {
  const { t } = useTranslation('');
  const dalat = {
    condition2: "Đà Lạt",
    search: "bybrand",
    filter: "1",
  };
  const binhan = {
    condition2: "Bình An Farm",
    search: "bybrand",
    filter: "1",
  };
  const egarden = {
    condition2: "E-garden",
    search: "bybrand",
    filter: "1",
  };
  const vietgap = {
    condition2: "Vietgap",
    search: "bybrand",
    filter: "1",
  };

  return (
    <div className="mt-12">
      <Link href={"/vnfruit"}>
        <h1 className="text-3xl uppercase font-medium mt-3">
          {t("TRÁI CÂY VIỆT NAM")}
        </h1>
      </Link>
      <div>
        <TabView>
        <TabPanel header={t("Bình An Farm")}>
          <div className="text-center">
              <HeroProps props={binhan} />
            </div>
          </TabPanel>
          <TabPanel header={t("Đà lạt")}>
          <div className="text-center">
              <HeroProps props={dalat} />
            </div>
          </TabPanel>
        
          <TabPanel header="E-garden">
          <div className="text-center">
              <HeroProps props={egarden} />
            </div>
          </TabPanel>
          <TabPanel header="Vietgap">
          <div className="text-center">
              <HeroProps props={vietgap} />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default Hero8;
