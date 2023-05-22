import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Link from "next/link";
import HeroProps from "../HeroProps";
import { useTranslation } from "react-i18next";

function Hero4() {
  const { t } = useTranslation('');
  const hopqua = {
    condition2: "Gói quà",
    search: "bybrand",
    filter: "3",
  };
  const gioqua = {
    condition2: "Giỏ quà",
    search: "bybrand",
    filter: "3",
  };
  const qua8thang3 = {
    condition2: "",
    search: "bybrand",
    filter: "3",
  };

  return (
    <div className="mt-12">
      <Link href={"/fruitgift"}>
        <h1 className="text-3xl uppercase font-medium mt-3">
          {t("QUÀ TẶNG TRÁI CÂY")}
        </h1>
      </Link>
      <div>
        <TabView>
          <TabPanel header={t("Hộp Quà")}>
            <div className="text-center">
              <HeroProps props={hopqua} />
            </div>
          </TabPanel>
          <TabPanel header={t("Giỏ Quà")}>
          <div className="text-center">
              <HeroProps props={gioqua} />
            </div>
          </TabPanel>
          <TabPanel header={t("Quà quốc tế phụ nữ 8-3")}>
          <div className="text-center">
              <HeroProps props={qua8thang3} />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default Hero4;
