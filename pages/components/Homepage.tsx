import React from "react";
import Hero from "./hero/Hero";
import { ScrollTop } from "primereact/scrolltop";
import Hero2 from "./hero/Hero2";
import Hero3 from "./hero/Hero3";
import Hero4 from "./hero/Hero4";
import Hero5 from "./hero/Hero5";
import Hero6 from "./hero/Hero6";
import Hero7 from "./hero/Hero7";
import Hero8 from "./hero/Hero8";
import Hero9 from "./hero/Hero9";
import Hero10 from "./hero/Hero10";
import Hero11 from "./hero/Hero11";
import Hero12 from "./hero/Hero12";
import Hero13 from "./hero/Hero13";
import Hero14 from "./hero/Hero14";
import Hero15 from "./hero/Hero15";
import Hero16 from "./hero/Hero16";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Homepage = () => {
  return (
    <>
      <Hero />
      <div className="w-full md:w-11/12 lg:w-9/12 mx-auto gap-6">
        <ScrollTop />

        <Hero2 />
        <Hero3 />
        <Hero4 />
        <Hero5 />
        <Hero6 />
        <Hero7 />
        <Hero8 />
        <Hero9 />
        <Hero10 />
        <Hero11 />
        <Hero12 />
        <Hero13 />
        <Hero14 />
        <Hero16 />
        <Hero15 />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Homepage;
