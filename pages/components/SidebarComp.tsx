
import { Sidebar } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../other/axios";

function SidebarComp() {
  const router = useRouter();
  const [categories, setCategories] = useState([] as any);
  useEffect(() => {
    let language = router.locale;
    try {
      axios.get(`/product/category?lang=${
        language === "default" ? "en" : language === "ja" ? "ja" : "en"
      }`).then((res: any) => {
        setCategories(res?.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {categories
            ? categories.map((item: any) => {
                return (
                  <Sidebar.Item key={item.id}>
                    <Link
                      href={
                        router.locale === "en"
                          ? `/en/${item.category.path}`
                          : router.locale === "ja" ? `/ja/${item.category.path}` : item.category.path
                      }
                    >
                      {router.locale === "default"
                        ? item.category.category
                        : router.locale === "en" ? item.name : item.name}
                    </Link>
                  </Sidebar.Item>
                );
              })
            : null}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <div className="flex items-center justify-center gap-3 ml-3 mt-3 bg-gray-100 p-2 w-fit">
              <button
                onClick={() => {
                  router.push(router.asPath, router.asPath, {
                    locale: "default",
                  });
                }}
              >
                <img
                  className="w-6 h-4"
                  src="/image/vietnam.png"
                  alt="language"
                />
              </button>
              <button
                onClick={() => {
                  router.push(router.asPath, router.asPath, { locale: "en" });
                }}
              >
                <img
                  className="w-6 h-4"
                  src="/image/england.png"
                  alt="language"
                />
              </button>
              <button
                onClick={() => {
                  router.push(router.asPath, router.asPath, { locale: "ja" });
                }}
              >
                <img
                  className="w-6 h-4"
                  src="/image/japan.png"
                  alt="language"
                />
              </button>
            </div>
    </Sidebar>
  );
}

export default SidebarComp;
