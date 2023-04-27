import React, { useState, useEffect, useRef } from "react";
import CarCard from "../card/index";
import apiClient from "../../../../utils";
import "../card/carcard.scss";
import { Spin } from "antd";
// import Loader from "../../../loader";
import { Select } from "antd";
import { UpOutlined } from "@ant-design/icons";

const { Option } = Select;

const getYearWiseFilteredData = (year, dataArr) =>
  dataArr.filter((car) => car.year === year);

const removeDuplicateYears = (data) => {
  let removeIndex;
  for (let i = 0; i < data.length - 1; ++i) {
    if (data[i].year === data[i + 1].year) {
      removeIndex = i + 1;
      data[i].cars.push(...data[i + 1].cars);
    }
  }
  if (removeIndex) {
    const newArr = [
      ...data.slice(0, removeIndex),
      ...data.slice(removeIndex + 1),
    ];
    return newArr;
  }
  return data;
};

const Layout = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [count, setCount] = useState(20);
  const [totalData, setTotalData] = useState(0);
  const [carName, setCarName] = useState("Ferrari");
  const ref = useRef(null);

  const config = {
    method: "get",
  };

  const formatYearWiseData = (newData) => {
    const yearWiseData = [...items];
    // console.log(yearWiseData);
    // console.log({ newData });
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1800; year--) {
      const filterdData = getYearWiseFilteredData(year, newData);
      filterdData.length && yearWiseData.push({ year, cars: filterdData });
    }
    // console.log(yearWiseData);
    const newYearWiseData = removeDuplicateYears(yearWiseData);
    // console.log(newYearWiseData.length);
    setTotalLength(newYearWiseData.length);
    return newYearWiseData;
  };

  const fetchCars = async (carName, pageNo = 0) => {
    try {
      setIsLoading(true);
      const tempConfig = { ...config };
      tempConfig.url = `/cars/?make=${carName}&pageNo=${
        pageNo || 0
      }&fetchSize=20`;
      const response = await apiClient(tempConfig);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(carName)
      .then((response) => {
        setTotalData(response.total);
        setItems(formatYearWiseData(response.results));
        // setTotalRecord(response.total);
        console.log(response.total);
      })
      .catch((err) => console.log({ err }));
  }, [carName]);

  const fetchData = () => {
    setCount((prev) => prev + 20);
    fetchCars(carName, page + 1)
      .then((moreCarsData) => {
        setItems([...formatYearWiseData(moreCarsData.results)]);
        setPage((pervPage) => pervPage + 1);
      })
      .catch((err) => console.log({ err }));
  };

  const handleChange = (value) => {
    setCount(20);
    setTotalData(0);
    setItems([]);
    setCarName(value);
    console.log(items);
    console.log(`selected ${value}`);
    ref.current?.scrollIntoView({ behavior: "smooth" });

    // carsOnFilter(value);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  return (
    <div>
      <div className="floating-btn" role="presentation" onClick={scrollTop}>
        <UpOutlined />
      </div>
      <Select
        defaultValue="Ferrari"
        style={{
          width: 170,
          outline: "none",
          position: "absolute",
          left: 25,
          top: 120,
        }}
        onChange={handleChange}
        dropdownStyle={{
          backgroundColor: "rgba(255,255,255,0.5)",
        }}
        id="scroll-top"
      >
        <Option value="Ferrari">Ferrari</Option>
        <Option value="Bugatti">Bugatti</Option>
        <Option value="Lamborghini">Lamborghini</Option>
        <Option value="McLaren">McLaren</Option>
        <Option value="Mercedes-Benz">Mercedes-Benz</Option>
        <Option value="Pagani">Pagani</Option>
        <Option value="Porsche">Porsche</Option>
      </Select>
      <div className="mainmenu">
        {items[0] ? (
          <div ref={ref}>
            {items.map(({ year, cars }, index) => {
              return (
                <CarCard
                  items={cars}
                  key={`${year}_${index}`}
                  uniqueKey={year}
                />
              );
            })}
          </div>
        ) : (
          <div style={{ paddingTop: 30 }}>
            <Spin size="large" />
          </div>
        )}
        {items[0] && (
          <div className="loadmore">
            {count <= totalData ? (
              <button onClick={fetchData} className="btn-grad">
                {isLoading ? "Loading..." : "Load More"}
              </button>
            ) : (
              " "
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
