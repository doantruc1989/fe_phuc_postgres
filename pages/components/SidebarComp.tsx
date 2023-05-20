import axios from "axios";
import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";

function SidebarComp() {
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
                  <Sidebar.Item key={category.id} href={category.path}>
                    {category.category}
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
