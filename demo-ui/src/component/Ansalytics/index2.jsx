import React, { useState, useEffect } from "react";
import { LineChart1 } from "./LineChart1";
import { LineChart2 } from "./LineChart2";
import { LineChart3 } from "./LineChart3";
import { LineChart4 } from "./LineChart4";
import { LineChart5 } from "./LineChart5";
import { LineChart6 } from "./LineChart6";
import "./analytics.scss";

export const Index2 = ({ DataArrFromApi }) => {
  const [allGraphData, setAllGraphData] = useState("");
  const allGraphDataArrFromApi = DataArrFromApi;

  /**
   * @Description This function takes consolidated data Array
   * and makes It graph representing format
   * @return return formatted consolidated data array for particular brand
   */
  const getBrandDataForCumulative = (cumArr) => {
    let returnCumArr = [];
    for (let i = 0; i < cumArr.length; i++) {
      cumArr[i]?.value?.cumilative &&
        cumArr[i]?.count?.cumilative &&
        returnCumArr.push({
          x: cumArr[i].decade,
          y: cumArr[i].value.cumilative,
          count: cumArr[i].count.cumilative,
        });
    }
    return returnCumArr;
  };

  /**
   * @Description This function takes racing car data Array
   * and makes It graph representing format
   * @return return formattrd racing car array for particular brand
   */
  const getBrandDataForRacingCar = (racingArr) => {
    let returnRacingArr = [];
    for (let i = 0; i < racingArr.length; i++) {
      racingArr[i].value.racing_cars &&
        racingArr[i]?.count?.racing_cars &&
        returnRacingArr.push({
          x: racingArr[i]?.decade,
          y: racingArr[i].value.racing_cars,
          count: racingArr[i].count.racing_cars,
        });
    }
    return returnRacingArr;
  };

  /**
   * @Description This function takes street car data Array
   * and makes It graph representing format
   * @return return formatted street car data array for particular brand
   */

  const getBrandDataForStreetCar = (streetArr) => {
    let returnStreetArr = [];
    for (let i = 0; i < streetArr.length; i++) {
      streetArr[i]?.value?.street_car &&
        streetArr[i]?.count?.street_car &&
        returnStreetArr.push({
          x: streetArr[i].decade,
          y: streetArr[i].value.street_car,
          count: streetArr[i].count.street_car,
        });
    }
    return returnStreetArr;
  };

  /**
   * @Description This function takes data recieved from api and seprate out
   * single graph data.
   * @return return formatted single graph data array
   */
  const getArrOfOneGraph = (arrOfOneModule) => {
    let returnArrOfOneModule = [];
    returnArrOfOneModule.push({
      category: "Cumulative",
      data: [
        {
          brand: "Bugatti",
          data: getBrandDataForCumulative(arrOfOneModule[0].data),
        },
        {
          brand: "Ferrari",
          data: getBrandDataForCumulative(arrOfOneModule[1].data),
        },
        {
          brand: "Lamborghini",
          data: getBrandDataForCumulative(arrOfOneModule[2].data),
        },
        {
          brand: "McLaren",
          data: getBrandDataForCumulative(arrOfOneModule[3].data),
        },
        {
          brand: "Mercedes",
          data: getBrandDataForCumulative(arrOfOneModule[4].data),
        },
        {
          brand: "Pagani",
          data: getBrandDataForCumulative(arrOfOneModule[5].data),
        },
        {
          brand: "Porsche",
          data: getBrandDataForCumulative(arrOfOneModule[6].data),
        },
        {
          brand: "Consolidated",
          data: getBrandDataForCumulative(arrOfOneModule[7].data),
        },
      ],
    });

    returnArrOfOneModule.push({
      category: "Racing Cars",
      data: [
        {
          brand: "Bugatti",
          data: getBrandDataForRacingCar(arrOfOneModule[0].data),
        },
        {
          brand: "Ferrari",
          data: getBrandDataForRacingCar(arrOfOneModule[1].data),
        },
        {
          brand: "Lamborghini",
          data: getBrandDataForRacingCar(arrOfOneModule[2].data),
        },
        {
          brand: "McLaren",
          data: getBrandDataForRacingCar(arrOfOneModule[3].data),
        },
        {
          brand: "Mercedes",
          data: getBrandDataForRacingCar(arrOfOneModule[4].data),
        },
        {
          brand: "Pagani",
          data: getBrandDataForRacingCar(arrOfOneModule[5].data),
        },
        {
          brand: "Porsche",
          data: getBrandDataForRacingCar(arrOfOneModule[6].data),
        },
        {
          brand: "Consolidated",
          data: getBrandDataForRacingCar(arrOfOneModule[7].data),
        },
      ],
    });

    returnArrOfOneModule.push({
      category: "Street Cars",
      data: [
        {
          brand: "Bugatti",
          data: getBrandDataForStreetCar(arrOfOneModule[0].data),
        },
        {
          brand: "Ferrari",
          data: getBrandDataForStreetCar(arrOfOneModule[1].data),
        },
        {
          brand: "Lamborghini",
          data: getBrandDataForStreetCar(arrOfOneModule[2].data),
        },
        {
          brand: "McLaren",
          data: getBrandDataForStreetCar(arrOfOneModule[3].data),
        },
        {
          brand: "Mercedes",
          data: getBrandDataForStreetCar(arrOfOneModule[4].data),
        },
        {
          brand: "Pagani",
          data: getBrandDataForStreetCar(arrOfOneModule[5].data),
        },
        {
          brand: "Porsche",
          data: getBrandDataForStreetCar(arrOfOneModule[6].data),
        },
        {
          brand: "Consolidated",
          data: getBrandDataForStreetCar(arrOfOneModule[7].data),
        },
      ],
    });

    return returnArrOfOneModule;
  };

  /**
   * @Description This function takes data recieved from api primarly and seprate out
   * calls above function using loop for all graph.
   * @return return formatted all graph data arrays.
   */

  const getFormattedData = () => {
    const allGraphDataArr = [];
    for (let i = 0; i < allGraphDataArrFromApi.length; i++) {
      allGraphDataArr.push({
        type: allGraphDataArrFromApi[i].type,
        name: allGraphDataArrFromApi[i].name,
        key: allGraphDataArrFromApi[i].key,
        value_unit: allGraphDataArrFromApi[i].value_unit,
        data: getArrOfOneGraph(allGraphDataArrFromApi[i].data),
      });
    }
    console.log(allGraphDataArr, "formatted Data");
    setAllGraphData(allGraphDataArr);
  };

  useEffect(() => {
    getFormattedData();
  }, []);

  return (
    <>
      {allGraphData ? (
        <>
          <div className="container-upper-section">
            <div>
              <LineChart1 graphDataProp={allGraphData[1]} />
            </div>
            <div>
              <LineChart2 graphDataProp={allGraphData[0]} />
            </div>
          </div>
          <div className="container-middle-section">
            <div>
              <LineChart3 graphDataProp={allGraphData[3]} />
            </div>
            <div>
              <LineChart4 graphDataProp={allGraphData[2]} />
            </div>
          </div>
          <div className="container-lower-section">
            <div>
              <LineChart5
                graphDataProp={{
                  one: allGraphData[5],
                  two: allGraphData[6],
                  three: allGraphData[7],
                }}
              />
            </div>
            <div>
              <LineChart6 graphDataProp={allGraphData[4]} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
