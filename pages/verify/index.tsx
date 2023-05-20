import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";
import axios from "../../other/axios";
import Layout from "../components/Layout";

const Index = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const token = router.query?.token;

  useEffect(() => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get("/auth/verify").then((res: any) => {
        localStorage.removeItem("user");
        setIsSuccess(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  return (
    <div className="text-center w-full my-20">
      {isSuccess ? (
        <div>
            <p className="my-2">Verify email thành công</p>
            <div>
                click
            <Link href={"/login"} className="text-blue-500 underline"> here</Link> to Login
            </div>
        </div>
      ) : (
        <div>Verify email fail</div>
      )}
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <CartProvider>
      <Layout>
        <>{page}</>
      </Layout>
    </CartProvider>
  );
};

export default Index;
