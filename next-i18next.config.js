const path = require("path");
module.exports = {
  i18n: {
    defaultLocale: "default",
    locales: ["default", "en", "ja"],
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
};
