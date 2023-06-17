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
        content={seo.keywords || "trai cay tuoi xanh sach ho chi minh sai gon"}
      ></meta>
      <meta
        name="description"
        content={seo.description || "trai cay tuoi xanh sach ho chi minh sai gon"}
      ></meta>
      <meta
        property="og:title"
        content={seo.ogTitle || "trai cay tuoi xanh sach ho chi minh sai gon"}
      />
      <meta
        property="og:type"
        content={seo.ogType || "trai cay tuoi xanh sach ho chi minh sai gon"}
      />
      <meta
        property="og:url"
        content={
          seo.ogUlr || "https://phucpsql.quocson.site/"
        }
      />
      <meta
        property="og:image"
        content={
          seo.ogImage ||
          "https://phucpsql.quocson.site/"
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
