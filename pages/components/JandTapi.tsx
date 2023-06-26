import axios from "axios";
import React, { useEffect } from "react";

const JandTapi = ({ setFee, district, city }: any) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: null,
    // withCredentials: true,
  };
  axios.defaults.headers.common[
    "Token"
  ] = `97ff7e60c3558ab1d9c950fac2ba77c96c107945`;

  useEffect(() => {
    try {
      axios
        .get(
          `https://services-staging.ghtklab.com/services/shipment/fee?pick_province=hồ chí minh&pick_district=quận bình thạnh&province=hồ chí minh&district=${district}&weight=1000&deliver_option=none`,
          config
        )
        .then((res: any) => {
          setFee(res?.data?.fee?.ship_fee_only)
        });
    } catch (error) {
      console.log(error);
    }
  }, [district]);

  return <></>;
};

export default JandTapi;
