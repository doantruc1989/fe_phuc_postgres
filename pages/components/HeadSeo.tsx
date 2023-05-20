import React, { useEffect, useState } from "react";
import Head from "next/head";

function HeadSeo({ prop }: any) {
  const [seo, setSeo] = useState([] as any);
  useEffect(() => {
    setSeo(prop);
  }, []);

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta
        name="keywords"
        content={seo.keywords || "tiki clone practice"}
      ></meta>
      <meta
        name="description"
        content={seo.description || "tiki clone practice"}
      ></meta>
      <meta
        property="og:title"
        content={seo.ogTitle || "tiki clone practice"}
      />
      <meta
        property="og:type"
        content={seo.ogType || "book, phone, iphone, samsung, 13, 14"}
      />
      <meta
        property="og:url"
        content={
          seo.ogUlr || "https://fetiki2-bt1m-8g05lbo1s-doantruc1989.vercel.app/"
        }
      />
      <meta
        property="og:image"
        content={
          seo.ogImage ||
          "https://fetiki2-bt1m-8g05lbo1s-doantruc1989.vercel.app/image/logotiki.png"
        }
      />
      <meta charSet="utf-8"></meta>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <title>{seo.title || "tiki"}</title>
    </Head>
  );
}

export default HeadSeo;
