// import { spawn } from "child_process";
import { useEffect } from "react";
import { useState } from "react";
import { isEmpty } from "../../utils";
import Accordion from "../accordion";
import Tooltip from "antd/lib/tooltip";

const PR = {
  Engine: 10,
  Powertrain: 10,
  Gearbox: 9,
  Performance: 7,
  Body: 8,
  Features: 1,
  Others: 0,
};

const priorityBasedSort = (arr) =>
  arr.sort((a, b) => (PR[b[0]] || 0) - (PR[a[0]] || 0));

const alphabeticSort = (val) => val.sort();

const sortEmptyValueToEnd = (array) => {
  return [
    ...array.filter(([_, value]) => !isEmpty(value)).sort(),
    ...array.filter(([_, value]) => isEmpty(value)).sort(),
  ];
};

const Specifications = ({ specifications: propsSpec, hideHeading = false }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    console.log({ activeTab });
  }, [activeTab]);
  const renderOuterSpecs = (specs) => {
    try {
      const specsDivs = priorityBasedSort(Object.entries(specs))
        .filter(([key, val]) => !isEmpty(val) && key !== "Others")
        .map(([key, value]) => {
          return renderInnerSpecs(key, value);
        });

      if (showAll) {
        return specsDivs;
      }
      return specsDivs.filter((ele) => ele.props.children.length);
    } catch (error) {
      return <></>;
    }
  };

  const renderInnerSpecs = (key, value) => {
    try {
      let innerSpecsArray = sortEmptyValueToEnd(
        alphabeticSort(Object.entries(value))
      );
      if (!showAll) {
        innerSpecsArray = innerSpecsArray.filter(([_, val]) => !isEmpty(val));
      }
      return (
        <Accordion key={key} title={key}>
          {innerSpecsArray.map(([innerKey, val]) => {
            return (
              <div className="specs" key={`specs_${key}_${innerKey}`}>
                <div className="label">{innerKey}</div>

                <Tooltip
                  title={
                    <>
                      <div>{val?.originalStrValue || "-"}</div>
                      {val?.originalUrl && (
                        <a
                          href={val.originalUrl}
                          style={{ color: "#fff" }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View source
                        </a>
                      )}
                    </>
                  }
                  mouseEnterDelay={0.6}
                >
                  <div className="value">{val?.finalSpecValueStr || "-"}</div>{" "}
                </Tooltip>
              </div>
            );
          })}
        </Accordion>
      );
    } catch (error) {
      return <></>;
    }
  };

  const renderNavigableSpec = () => {
    try {
      return (
        <>
          <div className="nav-tab">
            {propsSpec.map((ele, index) => (
              <span
                className={`nav-item${index === activeTab ? " active" : ""}`}
                key={ele.year}
                role="presentation"
                onClick={() => setActiveTab(index)}
              >
                {ele.year}
              </span>
            ))}
          </div>
          <div className="spec-area">
            {renderOuterSpecs(propsSpec?.[activeTab]?.specifications || [])}
          </div>
        </>
      );
    } catch (err) {
      return <></>;
    }
  };
  const handleShowEmptySpecsBtnClick = () => {
    setShowAll((prevState) => !prevState);
  };
  return (
    !!propsSpec && (
      <div className="specification-section">
        {!hideHeading && (
          <div
            className="heading"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span>Specifications:</span>
            <span
              role="presentation"
              className="link show-all-btn"
              onClick={handleShowEmptySpecsBtnClick}
            >
              {!showAll ? "Include empty specs" : "Hide empty specs"}
            </span>
          </div>
        )}
        {!Array.isArray(propsSpec) ? (
          <div className="specification-content">
            {renderOuterSpecs(propsSpec)}
          </div>
        ) : (
          <div className="specification-content">{renderNavigableSpec()}</div>
        )}
      </div>
    )
  );
};

export default Specifications;
