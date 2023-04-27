import Accordion from "../accordion";
import { useState } from "react";
/* import Accordion1 from "../acoordion1";
import Button from "../Button";
import Table from "../table"; */
import DriverEventTable from "./driverEventTable";

const DriverRaceEvent = ({ data = [] }) => {
  const events = data;
  // const [showRaceResult, setShowRaceResult] = useState(false);
  const [activeEventRace, setActiveEventRace] = useState(null);
  const onButtonClick = () => {
    setActiveEventRace(null);
  };
  console.log(events);
  let fivekeyHolder = [];
  const renderData = () => {
    return events?.map((ele, index) => {
      return (
        <>
          <Accordion title={ele[0].year} key={ele[0].year + index}>
            <DriverEventTable
              data={ele}
              fivekeyHolder={fivekeyHolder}
              setActiveEventRace={setActiveEventRace}
              activeEventRace={activeEventRace}
            />
          </Accordion>
        </>
      );
    });
  };

  return <div className="race-history-container">{renderData()}</div>;
};
export default DriverRaceEvent;
