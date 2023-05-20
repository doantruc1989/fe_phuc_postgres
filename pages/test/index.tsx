import React, { ReactElement, useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";
import useAxiosPrivate from "../../other/useAxiosPrivate";
import Layout from "../components/Layout";

const Index = () => {
  const [test, setTest] = useState([]);
  const [city, setCity] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
console.log(test)
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        setTest(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get("/homepage/provinces/all");
        setCity(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <div>
        {test.length ? (
          test.map((user: any) => {
            return <div key={user.id}>{user.email}</div>;
          })
        ) : (
          <div>data loading</div>
        )}
      </div>
      <div className="mt-6">
        {city.length ? (
          city.map((item: any) => {
            return <div key={item.id}>{item.cities}</div>;
          })
        ) : (
          <div>data loading</div>
        )}
      </div>
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
