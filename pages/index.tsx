import Layout from "./components/Layout";
import type { NextPageWithLayout } from "./_app";
import Homepage from "./components/Homepage";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { CartProvider } from "react-use-cart";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPageWithLayout = () => {
  return (
    <CartProvider>
      <Layout>
        <Homepage />
      </Layout>
    </CartProvider>
  );
};

export default Home;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}