import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Link from "next/link";
import HeroProps from "../HeroProps";
import { useTranslation } from "react-i18next";

function Hero6() {
  const { t } = useTranslation('');
  const nho = {
    condition2: "Nam Phi",
    search: "bybrand",
    filter: "2",
  };
  const tao = {
    condition2: "Hàn Quốc",
    search: "bybrand",
    filter: "2",
  };
  const cherry = {
    condition2: "Úc",
    search: "bybrand",
    filter: "2",
  };
  const cam = {
    condition2: "Mỹ",
    search: "bybrand",
    filter: "2",
  };
  const le = {
    condition2: "New Zealand",
    search: "bybrand",
    filter: "2",
  };
  return (
    <div className="mt-12 ">
      <Link href={"/importfruit"}>
        <h1 className="text-3xl uppercase font-medium mt-3">
        {t("TRÁI CÂY NHẬP KHẨU")}
        </h1>
      </Link>
      <div>
        <TabView>
          <TabPanel header={t("Hàn Quốc")}>
            <div className="text-center">
              <HeroProps props={tao} />
            </div>
          </TabPanel>
          <TabPanel header={t("Úc")}>
            <div className="text-center">
              <HeroProps props={cherry} />
            </div>
          </TabPanel>
          <TabPanel header={t("Nam Phi")}>
            <div className="text-center">
              <HeroProps props={nho} />
            </div>
          </TabPanel>
          <TabPanel header={t("Mỹ")}>
            <div className="text-center">
              <HeroProps props={cam} />
            </div>
          </TabPanel>
          <TabPanel header="New Zealand">
            <div className="text-center">
              <HeroProps props={le} />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default Hero6;
