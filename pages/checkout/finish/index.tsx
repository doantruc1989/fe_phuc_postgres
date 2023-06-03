import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Index() {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    localStorage.removeItem("react-use-cart");
    setIsSuccess(!isSuccess);
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  redirect === true &&
    router.push("/", undefined, { locale: router.locale });

  return (
    <>
      {isSuccess && (
        <section className="text-base text-center capitalize font-medium my-20">
          <h1>
            {t(
              "Bạn đã đặt hàng thành công, hệ thống sẽ chuyển bạn tới trang chủ sau 5 giây nữa. Hoặc "
            )}
          </h1>
          <p className="mt-6">
            {t("Bấm vào")}
            <Link className="text-green-600 underline" href="/">
              {t(" đây ")}
            </Link>
            {t("để tới trang chủ ngay lập tức")}
          </p>
        </section>
      )}
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Index;
