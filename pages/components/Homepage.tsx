import React, { useEffect, useState } from "react";
import Hero from "./hero/Hero";
import { ScrollTop } from "primereact/scrolltop";
import "react-toastify/dist/ReactToastify.css";
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
import axios from "../../other/axios";

const Homepage = () => {
  const [slides, setSlides] = useState([] as any);
  const [hero3, setHero3] = useState([] as any);
  const [hero5, setHero5] = useState([] as any);
  const [hero7, setHero7] = useState([] as any);
  const [hero9, setHero9] = useState([] as any);
  const [hero11, setHero11] = useState([] as any);
  const [hero13, setHero13] = useState([] as any);
  useEffect(() => {
    try {
      axios.get(`/homepage/bannerUI`).then((res: any) => {
        setSlides(res?.data?.slides);
        setHero3(res?.data?.hero3);
        setHero5(res?.data?.hero5);
        setHero7(res?.data?.hero7);
        setHero9(res?.data?.hero9);
        setHero11(res?.data?.hero11);
        setHero13(res?.data?.hero13);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Hero slides={slides} />
      <div className="w-full md:w-11/12 lg:w-9/12 mx-auto gap-6">
        <ScrollTop />
        <Hero2 />
        <Hero3 hero3={hero3} />
        <Hero4 />
        <Hero5 hero5={hero5} />
        <Hero6 />
        <Hero7 hero7={hero7} />
        <Hero8 />
        <Hero9 hero9={hero9} />
        <Hero10 />
        <Hero11 hero11={hero11} />
        <Hero12 />
        <Hero13 hero13={hero13} />
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
