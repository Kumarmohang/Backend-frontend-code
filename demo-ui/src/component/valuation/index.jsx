import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "../../utils";
import startValuation, { resetFlag as resetValuationData } from "./logic";

const PredictedPrice = ({ carData }) => {
  const dispatch = useDispatch();
  const {
    isError,
    data: valuationData,
    flag,
  } = useSelector((state) => state.valuationData);
  useEffect(() => {
    const carPrice = carData.overview.find(
      (ele) => ele.name === "Price"
    )?.value;
    if (!carPrice || carPrice === "-") {
      const auctionYear = carData.overview.find(
        (ele) => ele.name === "Auction listing Date"
      )?.value;
      const payloadData = {
        key: carData.modelKey,
        car_name: carData.name,
        highlights: carData.section3.filter(
          (ele) => ele.name === "Highlights"
        )?.[0]?.value || [""],
        info: carData.section2.value?.join(", ") || "",
        auction_year: auctionYear ? new Date(auctionYear).getFullYear() : "",
        auction_house:
          carData.overview.find((ele) => ele.name === "Auction House")?.value ||
          "",
      };
      dispatch(startValuation(payloadData));
    }

    return () => {
      dispatch(resetValuationData());
    };
  }, []);

  return !isError && flag ? (
    <div className="info-section">
      <span className="label">Predicted Price</span>
      <span className="value" style={{ textTransform: "uppercase" }}>
        {`USD ${numberWithCommas(
          valuationData.price?.min_price?.toFixed(2).toString()
        )} - USD ${numberWithCommas(
          valuationData.price?.max_price?.toFixed(2).toString()
        )}`}
      </span>
    </div>
  ) : (
    <></>
  );
};

export default PredictedPrice;
