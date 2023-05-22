import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react'
import { CartProvider } from 'react-use-cart';
import Layout from '../components/Layout';

function Index() {
  return (
    <div className="w-full lg:w-11/12 mx-auto flex justify-center my-10">
      <img src="https://bizweb.dktcdn.net/100/402/383/files/img-20201002-115608.jpg?v=1601614786047" alt="about" />
    </div>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
    return (
      <CartProvider>
        <Layout>
          <>{page}</>
        </Layout>
      </CartProvider>
    );
  };
  export async function getStaticProps({ locale }: any) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
  
export default Index