import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbAsyncInit: any;
    FB: any;
  }
}

const MessengerFbChat = () => {
  const messengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messengerRef.current) {
      messengerRef.current.setAttribute("attribution", "biz_inbox");

      //   messengerRef.current.setAttribute("attribution", "install_email");

      messengerRef.current.setAttribute("page_id", "109721398444205");

      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: "v17.0",
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) return;

        js = d.createElement(s);

        js.id = id;

        (js as any).src =
          "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";

        (fjs as any).parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
  }, []);

  return (
    <>
      <div id="fb-root" />

      <div className="fb-customerchat" ref={messengerRef} />
    </>
  );
};

export default MessengerFbChat;
