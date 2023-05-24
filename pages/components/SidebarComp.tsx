import axios from "axios";
import { Sidebar } from "flowbite-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function SidebarComp() {
  const router = useRouter();
  const [categories, setCategories] = useState([] as any);
  useEffect(() => {
    try {
      axios.get("http://localhost:3007/product/category").then((res: any) => {
        setCategories(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {categories
            ? categories.map((category: any) => {
                return (
                  <Sidebar.Item key={category.id}>
                    <Link
                      href={
                        router.locale === "en"
                          ? `/en/${category.path}`
                          : router.locale === "ja" ? `/ja/${category.path}` : category.path
                      }
                    >
                      {router.locale === "default"
                        ? category.category
                        : router.locale === "en" ? category.enName : category.jaName}
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
                  className="w-fit h-4"
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
                  className="w-fit h-4"
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
                  className="w-fit h-4"
                  src="/image/japan.png"
                  alt="language"
                />
              </button>
            </div>
    </Sidebar>
  );
}

export default SidebarComp;
