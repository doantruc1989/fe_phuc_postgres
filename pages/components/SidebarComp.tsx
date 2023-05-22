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
                          : category.path
                      }
                    >
                      {router.locale === "en"
                        ? category.enName
                        : category.category}
                    </Link>
                  </Sidebar.Item>
                );
              })
            : null}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarComp;
