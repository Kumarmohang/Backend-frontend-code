import React, { useState } from "react";
import { Select, Tooltip as MyTooltip } from "antd";
import { LineChartGraph1 } from "./LineChartGraph1";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { InfoCircleOutlined } from "@ant-design/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart5 = ({ graphDataProp }) => {
  let componentGraphData1 = graphDataProp.one.data;
  let componentGraphData2 = graphDataProp.two.data;
  let componentGraphData3 = graphDataProp.three.data;
  const [cumulative, setCumulative] = useState(componentGraphData1[0].data);
  const [racingCars, setRacingCars] = useState(componentGraphData1[1].data);
  const [streetCars, setStreetCars] = useState(componentGraphData1[2].data);

  const [cumulative2, setCumulative2] = useState(componentGraphData2[0].data);
  const [racingCars2, setRacingCars2] = useState(componentGraphData2[1].data);
  const [streetCars2, setStreetCars2] = useState(componentGraphData2[2].data);

  const [cumulative3, setCumulative3] = useState(componentGraphData3[0].data);
  const [racingCars3, setRacingCars3] = useState(componentGraphData3[1].data);
  const [streetCars3, setStreetCars3] = useState(componentGraphData3[2].data);

  const [driveType, setDriveType] = useState("AWD");

  const [carType, setCarType] = useState("Cumulative");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const dropDownList = [
    {
      label: "Bugatti",
      value: "Bugatti",
    },
    {
      label: "Ferrari",
      value: "Ferrari",
    },
    {
      label: "Lamborghini",
      value: "Lamborghini",
    },
    {
      label: "McLaren",
      value: "McLaren",
    },
    {
      label: "Mercedes",
      value: "Mercedes",
    },
    {
      label: "Pagani",
      value: "Pagani",
    },
    {
      label: "Porsche",
      value: "Porsche",
    },
    {
      label: "Koenigsegg",
      value: "Koenigsegg",
    },
    {
      label: "Aston Martin",
      value: "Aston Marting",
    },
    {
      label: "Bentley",
      value: "Bentley",
    },
    {
      label: "Jaguar",
      value: "Jaguar",
    },
    {
      label: "Lotus",
      value: "Lotus",
    },
    {
      label: "Maserati",
      value: "Maserati",
    },
    {
      label: "Rolls Royce",
      value: "Rolls Royce",
    },
    {
      label: "Consolidated",
      value: "Consolidated",
    },
  ];

  const dropDownList2 = [
    {
      label: "Combined",
      value: "Cumulative",
    },
    {
      label: "Racing Cars",
      value: "Racing Cars",
    },
    {
      label: "Street Cars",
      value: "Street Cars",
    },
  ];

  const dropDownList3 = [
    {
      label: "AWD",
      value: "AWD",
    },
    {
      label: "FWD",
      value: "FWD",
    },
    {
      label: "RWD",
      value: "RWD",
    },
  ];

  const [graphData, setGraphData] = useState(componentGraphData1[0].data);

  /**
   * @Description This function takes array of all brand data & selected brand name as argument
   * and set filtered data state according to user selected barnad
   * @params takes array of all car's brands data and selected brand array as argument
   * @return {void} (nothing)
   */
  const renderBrandChange = (reserve, value) => {
    if (value[0]) {
      setGraphData(
        reserve.filter((ele) => {
          return value.indexOf(ele.brand) !== -1;
        })
      );
    } else {
      setGraphData(reserve);
    }
  };

  /**
   * @Description This function takes array of brand name as argument
   * when user select brand name and sets those brand name in selectedBrands state
   * @params takes array of car's brands as argument
   * @return {void} (nothing)
   */
  const handleBrandChange = (value) => {
    setSelectedBrands(value);
    let reserve;
    if (driveType === "AWD") {
      reserve =
        carType === "Racing Cars"
          ? racingCars
          : carType === "Street Cars"
          ? streetCars
          : carType === "Cumulative"
          ? cumulative
          : null;
    } else if (driveType === "FWD") {
      reserve =
        carType === "Racing Cars"
          ? racingCars2
          : carType === "Street Cars"
          ? streetCars2
          : carType === "Cumulative"
          ? cumulative2
          : null;
    } else if (driveType === "RWD") {
      reserve =
        carType === "Racing Cars"
          ? racingCars3
          : carType === "Street Cars"
          ? streetCars3
          : carType === "Cumulative"
          ? cumulative3
          : null;
    }
    renderBrandChange(reserve, value);
  };

  /**
   * @Description This function takes array of all car type data & selected car type name as argument
   * and set filtered data state according to user selected car type
   * @params takes array of all car's type data and selected brands array as argument
   * @return {void} (nothing)
   */
  const renderCarTypeChange = (reserve, selectedBrands) => {
    if (selectedBrands[0]) {
      setGraphData(
        reserve.filter((ele) => {
          return selectedBrands.indexOf(ele.brand) !== -1;
        })
      );
    } else {
      setGraphData(reserve);
    }
  };

  /**
   * @Description This function takes car type as argument
   * when user select car type, and sets car type in setCarType state
   * @params takes car type as argument
   * @return {void} (nothing)
   */
  const handlecarTypeChange = (type) => {
    setCarType(type);
    let reserve;
    if (driveType === "AWD") {
      reserve =
        type === "Racing Cars"
          ? racingCars
          : type === "Street Cars"
          ? streetCars
          : type === "Cumulative"
          ? cumulative
          : null;
    } else if (driveType === "FWD") {
      reserve =
        type === "Racing Cars"
          ? racingCars2
          : type === "Street Cars"
          ? streetCars2
          : type === "Cumulative"
          ? cumulative2
          : null;
    } else if (driveType === "RWD") {
      reserve =
        type === "Racing Cars"
          ? racingCars3
          : type === "Street Cars"
          ? streetCars3
          : type === "Cumulative"
          ? cumulative3
          : null;
    }
    renderCarTypeChange(reserve, selectedBrands);
  };

  /**
   * @Description This function takes drive type as argument
   * when user select drive type, and sets drive type in setDriveType state
   * @params takes drive type as argument
   * @return {void} (nothing)
   */
  const handleDriveTypeChange = (driveType) => {
    setDriveType(driveType);
    let reserve;
    if (driveType === "AWD") {
      reserve =
        carType === "Racing Cars"
          ? racingCars
          : carType === "Street Cars"
          ? streetCars
          : carType === "Cumulative"
          ? cumulative
          : null;
    } else if (driveType === "FWD") {
      reserve =
        carType === "Racing Cars"
          ? racingCars2
          : carType === "Street Cars"
          ? streetCars2
          : carType === "Cumulative"
          ? cumulative2
          : null;
    } else if (driveType === "RWD") {
      reserve =
        carType === "Racing Cars"
          ? racingCars3
          : carType === "Street Cars"
          ? streetCars3
          : carType === "Cumulative"
          ? cumulative3
          : null;
    }
    renderCarTypeChange(reserve, selectedBrands);
  };

  return (
    <div>
      <div className="select-box">
        <h3 className="select-box-heading5">
          <span>
            <img src="./1_down.svg" alt="pic" />
          </span>
          Drive type proportion
          <span className="i-button">
            <MyTooltip
              placement="bottom"
              title={
                <span>
                  10-year average of drive type proportion Click on the legend
                  will lead to disappearance of the line from the chart.
                </span>
              }
            >
              <InfoCircleOutlined />
            </MyTooltip>
          </span>
        </h3>
        <div className="select-box-container">
          <Select
            defaultValue="AWD"
            style={{
              width: 100,
            }}
            onChange={handleDriveTypeChange}
            options={dropDownList3}
          />
          <Select
            className="select-box-carType"
            defaultValue="Cumulative"
            onChange={handlecarTypeChange}
            options={dropDownList2}
            style={{ marginLeft: "10px" }}
          />
          <Select
            className="select-box-space"
            mode="multiple"
            allowClear
            placeholder="select brand"
            onChange={handleBrandChange}
            options={dropDownList}
            style={{ marginLeft: "10px" }}
          />
        </div>
      </div>
      {graphData ? <LineChartGraph1 graphdata={graphData} /> : null}
    </div>
  );
};
