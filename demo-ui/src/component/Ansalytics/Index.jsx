import "./analytics.scss";
import apiClient from "../../utils/apiClient";
// import { apiBegin, apiSuccess, apiFailure } from "../../logic";
import { useEffect, useState } from "react";
import { Index2 } from "./index2";

const API_CONFIG = {
  GET_GRAPH_DATA: {
    method: "GET",
    url: "/cars/analytics",
  },
};

const Analytics = () => {
  const [allGraphDataArrFromApi, setAllGraphDataArrFromApi] = useState("");

  const [loading, setLoading] = useState(false);

  /**
   * @Description This function is use to make API call
   * and stores data into state called allGraphDataArrFromApi
   * @return {void}
   */
  const apiCallForAllGraphData = () => {
    const apiPayload = { ...API_CONFIG.GET_GRAPH_DATA };
    setLoading(true);
    apiClient(apiPayload)
      .then((res) => {
        console.log(res.data.result, "Data from Api");
        setAllGraphDataArrFromApi(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    apiCallForAllGraphData();
  }, []);
  return (
    <div className="container">
      {allGraphDataArrFromApi ? (
        <>
          <Index2 DataArrFromApi={allGraphDataArrFromApi} />
        </>
      ) : null}
    </div>
  );
};

export default Analytics;
