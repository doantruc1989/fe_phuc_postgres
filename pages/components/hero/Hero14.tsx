import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Link from "next/link";
import HeroProps from "../HeroProps";
import { useTranslation } from "react-i18next";

function Hero14() {
  const { t } = useTranslation("");
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
        <h1 className="text-3xl uppercase font-medium mt-3">
          {t("Thực phẩm khô")}
        </h1>
      </Link>
      <p className="w-full md:w-1/2 text-gray-400 text-sm mt-3">
        {t("Thức ăn bổ dưỡng, nhanh, tiện cho gia đình")}
      </p>
      <div>
        <TabView>
          <TabPanel header={t("Bánh")}>
            <div className="text-center">
              <HeroProps props={banh} />
            </div>
          </TabPanel>
          <TabPanel header={t("Ngũ cốc")}>
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
