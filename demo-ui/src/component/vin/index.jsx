import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiCall, { getVinReset } from "./logic";
// import Loader from "../loader";
// import Table from "../table";
import { Table as AntdTable } from "antd";
// import Dropdown from "../Dropdown";
// import Loader from "../loader";
// import FilterGroup from "./filterGroup";
// import apiCall from "./logic";

// import Card from "../results/card";
import "./vin.scss";
import Button from "../Button";
// import { type } from "os";
import { SearchOutlined } from "@ant-design/icons";

/* const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
]; */

/* const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
]; */

const Vin = () => {
  const history = useHistory();
  const [searchVin, setSearchVin] = useState(
    new URLSearchParams(history.location.search).get("vin") || ""
  );
  const dispatch = useDispatch();
  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchVin(value);
  };

  /* ------------------------------------- */
  /* const [country, setCountry] = useState();
  const [region, setRegion] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [carType, setCarType] = useState();
  const [vin, setVin] = useState("____");
  const [flag1, setFlag1] = useState(false); */

  /* ------------------------------------- */

  const {
    loading,
    // flag,
    data: vinData,
  } = useSelector((state) => state.vinResult);

  useEffect(() => () => dispatch(getVinReset()), []);
  const tableHeader = [
    {
      key: "make",
      title: "Make",
      render: (_, props) => <div>{props.make || "-"}</div>,
    },
    {
      key: "model",
      title: "Model",
      //render: (_, props) => <div>{props.model || "-"}</div>,
      render: (_, props) => {
        const carModel = vinData?.carModel || {};
        const queryParam = new URLSearchParams({
          id: carModel.id,
          group: "Cars Models",
          type: "model",
        }).toString();
        return carModel.id ? (
          <Link to={`details?${queryParam}`} title={props.model}>
            {props.model}
          </Link>
        ) : (
          props?.model
        );
      },
    },
    {
      key: "country",
      title: "Country",
      render: (_, props) => <div>{props.country || "-"}</div>,
    },
    {
      key: "years",
      title: "Years",
      render: (_, props) => {
        return <span title={props?.years || "-"}>{props?.years || "-"}</span>;
      },
    },
    {
      key: "manufacturer",
      title: "Manufacturer",
      render: (_, props) => <div>{props.manufacturer || "-"}</div>,
    },
    {
      key: "Body Class",
      title: "Body Type",
      render: (_, props) => <div>{props["Body Class"] || "-"}</div>,
    },
    {
      key: "vehicle type",
      title: "Vehicle Type",
      render: (_, props) => <div>{props["vehicle type"] || "-"}</div>,
    },
    {
      key: "Engine Model",
      title: "Engine Model",
      render: (_, props) => <div>{props["Engine Model"] || "-"}</div>,
    },
    {
      key: "Engine Configuration",
      title: "Engine Configuration",
      render: (_, props) => <div>{props["Engine Configuration"] || "-"}</div>,
    },
    /*  {
      key: "num",
      title: "Vin Number",
      render: (_, props) => <div>{props.num || "-"}</div>,
    }, */
    /* {
      key: "region",
      title: "Region",

      render: (_, props) => <div>{props.region || "-"}</div>,
    }, */

    /* {
      key: "vds",
      title: "VDS",

      render: (_, props) => <span>{props.vds || "-"}</span>,
    },
    {
      key: "vis",
      title: "VIS",

      render: (_, props) => <span>{props.vis || "-"}</span>,
    }, */
    /* {
      key: "wmi",
      title: "WMI",

      render: (_, props) => <span>{props.wmi || "-"}</span>,
    }, */
    /* {
      key: "country_code",
      title: "Country Code",

      render: (_, props) => <span>{props.country_code || "-"}</span>,
    }, */
    {
      key: "carInfo",
      title: "Identifier",
      render: (_, props) => {
        const carInfo = vinData?.carInfo || {};
        const queryParam = new URLSearchParams({
          vin: vinData?.vinDetails.identifier,
          group: "All",
          search: "",
        }).toString();
        return carInfo.id ? (
          <Link to={`search?${queryParam}`} title={carInfo.title}>
            {vinData?.vinDetails?.identifier}
          </Link>
        ) : (
          vinData?.vinDetails?.identifier
        );
      },
    },
  ];
  /* ------------------------------------------------- */
  /* const countryOptions = [
    { title: "India", value: "A", type: "country", continenet: "Asia" },
    { title: "Italy", value: "A", type: "country", continenet: "Europe" },
  ];
  const manufacturerOptions = [
    { title: "Ferrari", value: "F", type: "manufacturer" },
    { title: "lamborgini", value: "H", type: "manufacturer" },
  ];
  const regionOptions = [
    { title: "Europe", value: "Z", type: "region" },
    { title: "Asia", value: "M", type: "region" },
  ];

  const carTypeOptions = [
    { title: "2-door economy", value: "A", type: "carType" },
    { title: "2-door custom", value: "B", type: "carType" },
    { title: "2-door deluxe", value: "C", type: "carType" },
    { title: "2-door sports", value: "D", type: "carType" },
    { title: "4-door economy", value: "E", type: "carType" },
    { title: "4-door deluxe", value: "F", type: "carType" },
    { title: "2-door economy", value: "G", type: "carType" },
    { title: "16V / turbo", value: "H", type: "carType" },
    { title: "2-door sedan", value: "K", type: "carType" },
    { title: "4-door sedan (base)", value: "P", type: "carType" },
    { title: "4-door sedan (upgrade)", value: "R", type: "carType" },
    { title: "4-door sedan (upgrade)", value: "T", type: "carType" },
  ]; */

  /* --------------------------------------------------------- */
  const tableData = [];
  /* {
    vinData &&
      Object.keys(vinData?.details).map((key, index) => {
        key !== "manufacturer_is_small" &&
          key !== "details" &&
          key !== "region_code" &&
          tableData.push({ [key]: vinData?.details[key] });
      });
  } */

  // vinData && tableData.push(vinData?.details);
  if (vinData && vinData.vinDetails?.manufacturer) {
    tableData.push(vinData.vinDetails);
  }

  // console.log(vinData?.details);
  const onSearchData = (e) => {
    e.preventDefault();
    const query = {
      vin: searchVin,
    };
    history.replace(`/vin?${new URLSearchParams(query).toString()}`);
    const queryString = new URLSearchParams(query).toString();
    dispatch(apiCall(queryString));
  };

  /*  const onCardClick = (ele) => {
    const { group } = ele;
    const queryParam = new URLSearchParams({
      id: ele.id,
      group,
      type: "model",
    }).toString();
    history.push(`/details?${queryParam}`);
  }; */

  /* const dropDownChange = (e) => {
    var tempVin;
    switch (e.type) {
      case "region":
        setRegion(e);
        tempVin = e.value + vin.substr(1);
        setVin(tempVin);
        break;
      case "country":
        setCountry(e);
        tempVin = vin.substr(0, 1) + e.value + vin.substr(2);
        setVin(tempVin);
        break;
      case "manufacturer":
        setManufacturer(e);
        tempVin = vin.substr(0, 2) + e.value + vin.substr(3);
        setVin(tempVin);
        break;
      case "carType":
        setCarType(e);
        tempVin = vin.substr(0, 3) + e.value + vin.substr(4);
        setVin(tempVin);
        break;
    }
    setFlag1(true);
    console.log(vin.includes("_"));
  }; */

  return (
    <div className="vin-search">
      <h1 className="vin-heading">VIN Search</h1>
      <div className="vin-search-container">
        <section className="search-vin-section">
          <div className="search-box">
            <form
              style={{ marginBottom: 30 }}
              onSubmit={(e) => onSearchData(e)}
            >
              <label>Identification Number: </label>
              <input
                required
                type="text"
                className="search-vin"
                placeholder="Vehicle Identification Number"
                value={searchVin}
                onChange={onSearchChange}
              />
              <Button type="submit" className="button">
                <SearchOutlined />
              </Button>
            </form>
            {/* <AntdTable dataSource={dataSource} columns={columns} />; */}
            {!loading && (
              <AntdTable
                columns={tableHeader}
                dataSource={tableData || []}
                pagination={false}
              ></AntdTable>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Vin;
