import exp from "constants";
import React from "react";
import Button from "../Button";
import { Fragment } from "react";
import Table from "../table";

const tableHeader = [
  {
    key: "date",
    display: "Date",
    customEle: (props) => (
      <span className="date" title={props.date}>
        {new Date(props.date).toLocaleDateString()}
      </span>
    ),
  },
  { key: "circuit", display: "Circuit" },
  { key: "position", display: "Position" },
  {
    key: "pole_position",
    display: "Pole Position",
    customEle: (props) => (
      <span
        title={`${props.pole_position ? "Yes" : "No"}`}
        className={props.pole_position ? "complete" : "red-cross"}
      />
    ),
  },
  {
    key: "fastest_lap",
    display: "Fastest lap",
    customEle: (props) => (
      <span
        title={`${props.fastest_lap ? "Yes" : "No"}`}
        className={props.fastest_lap ? "complete" : "red-cross"}
      />
    ),
  },
];
const DriverEventTable = ({ data, setActiveEventRace, activeEventRace }) => {
  const renderResults = (event) => {
    return (
      event?.["race results"]?.length > 0 && (
        <>
          <tr className="row btn-row">
            <td className="col row-heading">
              {activeEventRace !== `${event["event name"]}_${event["year"]}` ? (
                <Button
                  onClick={() =>
                    setActiveEventRace(
                      `${event["event name"]}_${event["year"]}`
                    )
                  }
                >
                  Race Result
                </Button>
              ) : (
                <Button onClick={() => setActiveEventRace(null)}>
                  Race Result
                </Button>
              )}
            </td>
          </tr>
        </>
      )
    );
  };

  const renderCol = (event) => {
    const rows = [];
    const headerRow = [];
    const valueRow = [];
    Object.entries(event)
      .filter(
        ([key]) =>
          !["event key", "event name", "race results", "year"].includes(key)
      )
      .forEach(([key, value]) => {
        headerRow.push(
          // <th className="col" key={key}>
          key
          // </th>
        );
        if (key === "car") {
          const carsList = [];
          value?.forEach((car) => {
            carsList.push(
              car.key ? (
                <a
                  className="link car-link"
                  href={`details?key=${encodeURIComponent(
                    car.key
                  )}&group=Cars+Models&type=model`}
                >
                  {car.name}
                </a>
              ) : (
                <span className="value">{car.name}</span>
              )
            );
          });
          valueRow.push(
            <div className="car-list" style={{ display: "inline" }}>
              {carsList}
            </div>
          );
        } else if (key === "engine") {
          valueRow.push(value?.join(", "));
        } else if (key === "tyres") {
          valueRow.push(value?.join(", "));
        } else {
          valueRow.push(
            // <td className="col" key={key + "value"}>
            value
            // </td>
          );
        }
      });
    let tempRowValue = [];
    if (headerRow.length > 5) {
      for (let i = 1, len = headerRow.length; i <= len; i++) {
        tempRowValue.push(
          <td className="col">
            <span className="heading col-heading">{headerRow[i - 1]} :</span>
            <span className="value">{valueRow[i - 1] || "-"}</span>
          </td>
        );
        if (i % 5 === 0) {
          rows.push(
            <tr className="row" key={`row_${i}`}>
              {tempRowValue}
            </tr>
          );
          tempRowValue = [];
        }
      }
      if (tempRowValue.length > 0) {
        rows.push(<tr className="row">{tempRowValue}</tr>);
      }
    } else {
    }

    return rows;
    // const eventLength = Object.keys(event).length;
    /* 
    
    return Object.keys(event).map((key, index) => {
      if (
        key !== "event key" &&
        key !== "event name" &&
        key !== "race results" &&
        key !== "year"
      ) {
        fiveKeyHolder.push(key);
      }

      let headerRow;
      let valueRow;
      if (fiveKeyHolder.length === 5) {
        headerRow = fiveKeyHolder.map((key) => {
          return <th className="row">{key}</th>;
        });
        valueRow = fiveKeyHolder.map((key) => {
          return <td className="col">{event[key] || "-"}</td>;
        });
        fiveKeyHolder = [];
        return (
          <>
            <tr className="row">{headerRow}</tr>
            <tr className="row">{valueRow}</tr>
          </>
        );
      } else if (index === eventLength - 1) {
        headerRow = fiveKeyHolder.map((key) => {
          return <th className="row">{key}</th>;
        });
        valueRow = fiveKeyHolder.map((key) => {
          return <td className="col">{event[key] || "-"}</td>;
        });
        fiveKeyHolder = [];
        return (
          <>
            <tr className="row">{headerRow}</tr>
            <tr className="row">{valueRow}</tr>
          </>
        );
      }
    }); */
  };
  const renderEvent = () => {
    return data.map((event) => {
      //console.log(eventLength);
      return (
        <div className="event-detail">
          <div>
            <h4 className="row-heading">{event["event name"]}</h4>
          </div>
          <table
            className={`table-outter${activeEventRace === `${event["event name"]}_${event["year"]}`
                ? " active-result"
                : ""
              }`}
          >
            {/* --------------------------- */}
            {renderCol(event)}
            {/* --------------------------- */}
            {renderResults(event)}
          </table>
          {activeEventRace === `${event["event name"]}_${event["year"]}` && (
            <>
              <div className="table-heading">Race Results</div>
              <Table
                header={tableHeader}
                data={event["race results"]}
                customClass="result-table"
              ></Table>
            </>
          )}
        </div>
      );
    });
  };

  return renderEvent();
};
export default DriverEventTable;
