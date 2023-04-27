import { useState } from "react";
import { useLocation } from "react-router-dom";
import CarModelDetails from "./carDetails";
import SpecificCarDetails from "./specificCar";
import CircuitDetails from "./circuitDetails";
import ClubDetails from "./clubDetails";
import DriverDetails from "./driverDetails";
import EventDetails from "./eventDetails";
import DealerDetails from "./dealerDetails";
import CollectorDetails from "./collectorDetails";
import { MessageOutlined } from "@ant-design/icons";
import ModalForm from "./suggestionModal";
// import { Modal } from "antd";

const SUGGESTION_ENABLED_PAGE = ["model", "specific-car"];
const Details = () => {
  const location = useLocation();
  const [visible, setVisibility] = useState(false);
  const searchParm = new URLSearchParams(location.search);
  /**
   * @type {("specific-car" | "model" | "circuits")}
   */
  const pageType = searchParm.get("type") || "model";
  const group = searchParm.get("group");

  return (
    <>
      {pageType === "model" && group !== "Specific Cars" && <CarModelDetails />}
      {(pageType === "specific-car" || group === "Specific Cars") && (
        <SpecificCarDetails />
      )}
      {pageType === "circuits" && <CircuitDetails />}
      {pageType === "clubs" && <ClubDetails />}
      {pageType === "drivers" && <DriverDetails />}
      {pageType === "events" && <EventDetails />}
      {pageType === "dealers" && <DealerDetails />}
      {pageType === "influencers" && <CollectorDetails />}
      {SUGGESTION_ENABLED_PAGE.includes(pageType) && (
        <>
          <div
            className="floating-btn"
            role="presentation"
            onClick={() => setVisibility((pre) => !pre)}
          >
            <MessageOutlined />
          </div>
          <ModalForm
            visible={visible}
            setVisibility={setVisibility}
            pageType={pageType}
          />
        </>
      )}
    </>
  );
};

export default Details;
