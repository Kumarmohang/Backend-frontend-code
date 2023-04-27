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

export const LineChart2 = ({ graphDataProp }) => {
  let componentGraphData = graphDataProp.data;
  const [cumulative, setCumulative] = useState(componentGraphData[0].data);
  const [racingCars, setRacingCars] = useState(componentGraphData[1].data);
  const [streetCars, setStreetCars] = useState(componentGraphData[2].data);

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

  const [graphData, setGraphData] = useState(componentGraphData[0].data);

  /**
   * @Description This function takes array of brand name as argument
   * when user select brand name and sets those brand name in selectedBrands state
   * @params takes array of car's brands as argument
   * @return {void} (nothing)
   */
  const handleBrandChange = (value) => {
    setSelectedBrands(value);
    if (carType === "Racing Cars") {
      let reserve = racingCars;
      if (value[0]) {
        setGraphData(
          reserve.filter((ele) => {
            return value.indexOf(ele.brand) !== -1;
          })
        );
      } else {
        setGraphData(reserve);
      }
    } else if (carType === "Street Cars") {
      let reserve = streetCars;
      if (value[0]) {
        setGraphData(
          reserve.filter((ele) => {
            return value.indexOf(ele.brand) !== -1;
          })
        );
      } else {
        setGraphData(reserve);
      }
    } else if (carType === "Cumulative") {
      let reserve = cumulative;
      if (value[0]) {
        setGraphData(
          reserve.filter((ele) => {
            return value.indexOf(ele.brand) !== -1;
          })
        );
      } else {
        setGraphData(reserve);
      }
    }
  };

  /**
   * @Description This function takes car type as argument
   * when user select car type, and sets car type in setCarType state
   * @params takes car type as argument
   * @return {void} (nothing)
   */
  const handlecarTypeChange = (type) => {
    if (type === "Racing Cars") {
      setCarType("Racing Cars");
      // setGraphData(racingCars);
      let reserve = racingCars;
      if (selectedBrands[0]) {
        setGraphData(
          reserve.filter((ele) => {
            return selectedBrands.indexOf(ele.brand) !== -1;
          })
        );
      } else {
        setGraphData(reserve);
      }
    } else if (type === "Street Cars") {
      setCarType("Street Cars");
      // setGraphData(streetCars);
      let reserve = streetCars;
      if (selectedBrands[0]) {
        setGraphData(
          reserve.filter((ele) => {
            return selectedBrands.indexOf(ele.brand) !== -1;
          })
        );
      } else {
        setGraphData(reserve);
      }
    } else if (type === "Cumulative") {
      setCarType("Cumulative");
      // setGraphData(streetCars);
      let reserve = cumulative;
      if (selectedBrands[0]) {
        setGraphData(
          reserve.filter((ele) => {
            return selectedBrands.indexOf(ele.brand) !== -1;
          })
        );
      } else {
        setGraphData(reserve);
      }
    }
  };

  return (
    <div>
      <div className="select-box">
        <h3>
          <span>
            <img src="./2_top.svg" alt="pic" />
          </span>
          Average Top Speed in <sapn>{graphDataProp.value_unit}</sapn>
          <span className="i-button">
            <MyTooltip
              placement="bottom"
              title={
                <span>
                  10-year average of annual average top speed. Click on the
                  legend will lead to disappearance of the line from the chart.
                </span>
              }
            >
              <InfoCircleOutlined />
            </MyTooltip>
          </span>
        </h3>
        <div className="select-box-container">
          <Select
            className="select-box-carType"
            defaultValue="Cumulative"
            onChange={handlecarTypeChange}
            options={dropDownList2}
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
