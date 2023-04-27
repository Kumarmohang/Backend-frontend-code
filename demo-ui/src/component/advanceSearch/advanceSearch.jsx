import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import apiClient from "../../utils";
import queryString from "query-string";
import moment from "moment";
import { Row, Col, Form, Select, Button, Input, DatePicker, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import apiCallForAdvanceSearch, {
  apiCallForCarSeries,
  getAdvanceResultReset,
  apiCallForAspiration,
} from "./logic";

const { Item: FormItem } = Form;
const { Option } = Select;

const antIcon = (
  <LoadingOutlined
    style={{ fontSize: 18, color: "#f34a4a", fontWeight: "bold" }}
    spin
  />
);

/* Api configuration for axios */
const API_CONFIG = {
  GET_BRAND_SERIES: {
    method: "GET",
    url: "/cars/series",
  },
  GET_SEARCH_RESULT: {
    method: "GET",
    url: "/advanceSearchResults",
  },
};

/*  ------- AdvanceSearch Component -------  */

const AdvanceSearch = ({ onSearch: propOnSearch, loading: searchLoading }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(history.location.search);
  urlParams.set("count", "true");
  // const mySearchQuery = queryString.parse(history.location.search);
  const initialSeries = queryString
    ?.parse(history?.location?.search)
    ?.series?.split(",");
  const [series, setSeries] = useState([]);
  const initialBrands = queryString
    ?.parse(history?.location?.search)
    ?.make?.split(",");
  const [brands, setBrands] = useState(
    initialBrands?.[0] ? initialBrands : ["all"]
  );
  const { data: filterData, loading: filterLoading } = useSelector(
    (state) => state.sideBarData
  );

  const { data, loading } = useSelector((state) => state.searchAdvanceData);

  const { seriesData: optionData, loading: seriesLoading } = useSelector(
    (state) => state.getBrandSeriesData
  );

  const [formRef] = Form.useForm();
  // const SelectedSeries = Form.useWatch("series", formRef);
  // console.log(SelectedSeries, "Form ref");

  /* Getting applicable filters by filter received from redux global state store */
  const applicableFilter = filterData?.filters?.filter((item) => {
    return item.filterFor.includes("Cars Models");
  });

  /**
   * @description - This function return series form item on select the brand name.
   * @returns {JSX[]}
   */
  const renderOption = (seriesArray) => {
    return seriesArray.map((item, index) => {
      return (
        <Select.Option key={`series_${index + 1}`} value={item}>
          {item}
        </Select.Option>
      );
    });
  };

  /**
   * @description - This function update the queryParam with all latest form field values while submit the form.
   * @param {object} form - Takes object of form fields.
   * @returns {void}
   */
  const onFormSubmit = (form) => {
    const {
      make,
      count,
      series,
      categoryOfCar,
      gearType,
      driveType,
      roofTop,
      noOfSeats,
      noOfDoors,
      capacityFrom,
      capacityTo,
      maxPowerFrom,
      maxPowerTo,
      makeYearFrom,
      makeYearTo,
    } = form;

    const searchParam = new URLSearchParams(history.location.search);
    if (brands && brands.length) {
      let filterMake = brands.filter((item) => item !== "");
      searchParam.set("make", filterMake.join(","));
    } else {
      searchParam.delete("make");
    }
    if (series && series.length) {
      searchParam.set("series", series.join(","));
    } else {
      searchParam.delete("series");
    }
    if (categoryOfCar) {
      searchParam.set("categoryOfCar", categoryOfCar);
    } else {
      searchParam.delete("categoryOfCar");
    }
    if (gearType) {
      searchParam.set("gearType", gearType);
    } else {
      searchParam.delete("gearType");
    }
    if (driveType) {
      searchParam.set("driveType", driveType);
    } else {
      searchParam.delete("driveType");
    }
    if (roofTop) {
      searchParam.set("roofTop", roofTop);
    } else {
      searchParam.delete("roofType");
    }
    if (noOfSeats) {
      searchParam.set("noOfSeats", noOfSeats);
    } else {
      searchParam.delete("noOfSeats");
    }
    if (noOfDoors) {
      searchParam.set("noOfDoors", noOfDoors);
    } else {
      searchParam.delete("noOfDoors");
    }
    if (capacityFrom) {
      searchParam.set("capacityFrom", capacityFrom);
    } else {
      searchParam.delete("capacityFrom");
    }
    if (capacityTo) {
      searchParam.set("capacityTo", capacityTo);
    } else {
      searchParam.delete("capacityTo");
    }
    if (maxPowerFrom) {
      searchParam.set("maxPowerFrom", maxPowerFrom);
    } else {
      searchParam.delete("maxPowerFrom");
    }
    if (maxPowerTo) {
      searchParam.set("maxPowerTo", maxPowerTo);
    } else {
      searchParam.delete("maxPowerTo");
    }
    if (!!makeYearFrom) {
      searchParam.set("makeYearFrom", makeYearFrom.format("YYYY"));
    } else {
      searchParam.delete("makeYearFrom");
    }
    if (!!makeYearTo) {
      searchParam.set("makeYearTo", makeYearTo.format("YYYY"));
    } else {
      searchParam.delete("makeYearTo");
    }
    //  searchParam.set("group", group);
    // searchParam.set("subCat", subCat);
    //  searchParam.set("showSideBar", showSideBar);
    searchParam.set("pageNo", 0);
    searchParam.set("fetchSize", 24);
    searchParam.delete("count");

    propOnSearch(searchParam.toString());
  };

  /**
   * @description - This function return a object of queryParams which are take from url search.
   * @returns {object}
   */
  function getQueryData() {
    const searchQuery = queryString.parse(history.location.search);
    const initialValues = {};
    if (searchQuery.make) {
      initialValues.make = searchQuery.make.split(",");
    }
    if (searchQuery.series) {
      initialValues.series = searchQuery.series.split(",");
    }
    if (searchQuery.categoryOfCar) {
      initialValues.categoryOfCar = searchQuery.categoryOfCar;
    }
    if (searchQuery.gearType !== "undefined") {
      initialValues.gearType = searchQuery.gearType;
    }
    if (searchQuery.driveType !== "undefined") {
      initialValues.driveType = searchQuery.driveType;
    }
    if (searchQuery.roofTop !== "undefined") {
      initialValues.roofTop = searchQuery.roofTop;
    }
    if (searchQuery.noOfSeats !== "undefined") {
      initialValues.noOfSeats = searchQuery.noOfSeats;
    }
    if (searchQuery.noOfDoors !== "undefined") {
      initialValues.noOfDoors = searchQuery.noOfDoors;
    }
    if (searchQuery.capacityFrom) {
      initialValues.capacityFrom = searchQuery.capacityFrom;
    }
    if (searchQuery.capacityTo) {
      initialValues.capacityTo = searchQuery.capacityTo;
    }
    if (searchQuery.maxPowerFrom) {
      initialValues.maxPowerFrom = searchQuery.maxPowerFrom;
    }
    if (searchQuery.maxPowerTo) {
      initialValues.maxPowerTo = searchQuery.maxPowerTo;
    }
    if (searchQuery.makeYearFrom) {
      initialValues.makeYearFrom = moment(searchQuery.makeYearFrom, "YYYY");
    }
    if (searchQuery.makeYearTo) {
      initialValues.makeYearTo = moment(searchQuery.makeYearTo, "YYYY");
    }
    return initialValues;
  }

  /**
   * @description - This function return a memoized function to prevent unwanted re-rendering.
   * @param {function} func - Takes func.
   * @returns {function} - return memoized function.
   */
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  /**
   * @description - This function update queryParams in history & dispatch queryParams to get latest results.
   * @param {number} e - Takes e as number value.
   * @param {string} keyData - Takes keyData as form field name.
   * @returns {void}
   */
  const handleChange = (e, keyData) => {
    const queryData = getQueryData();
    Object.keys(queryData).forEach((key) => {
      if (queryData[key] === undefined) {
        delete queryData[key];
      }
    });

    if (moment.isMoment(queryData["makeYearFrom"])) {
      queryData["makeYearFrom"] = queryData["makeYearFrom"]._i;
    }
    if (moment.isMoment(queryData["makeYearTo"])) {
      queryData["makeYearTo"] = queryData["makeYearTo"]._i;
    }
    if (keyData === "capacityFrom") {
      const urlParams = new URLSearchParams(queryData);

      urlParams.delete("capacityFrom");
      urlParams.set("capacityFrom", e);

      history.replace(
        `${history.location.pathname}?${"count=true&" + urlParams.toString()}`
      );
      dispatch(
        apiCallForAdvanceSearch.getAdvanceSearchResult(
          "count=true&" + urlParams.toString()
        )
      );
    }
    if (keyData === "capacityTo") {
      const urlParams = new URLSearchParams(queryData);
      urlParams.delete("capacityTo");
      urlParams.set("capacityTo", e);
      history.replace(
        `${history.location.pathname}?${"count=true&" + urlParams.toString()}`
      );
      dispatch(
        apiCallForAdvanceSearch.getAdvanceSearchResult(
          "count=true&" + urlParams.toString()
        )
      );
    }
    if (keyData === "maxPowerFrom") {
      const urlParams = new URLSearchParams(queryData);
      urlParams.delete("maxPowerFrom");
      urlParams.set("maxPowerFrom", e);
      history.replace(
        `${history.location.pathname}?${"count=true&" + urlParams.toString()}`
      );
      dispatch(
        apiCallForAdvanceSearch.getAdvanceSearchResult(
          "count=true&" + urlParams.toString()
        )
      );
    }
    if (keyData === "maxPowerTo") {
      const urlParams = new URLSearchParams(queryData);
      urlParams.delete("maxPowerTo");
      urlParams.set("maxPowerTo", e);
      history.replace(
        `${history.location.pathname}?${"count=true&" + urlParams.toString()}`
      );
      dispatch(
        apiCallForAdvanceSearch.getAdvanceSearchResult(
          "count=true&" + urlParams.toString()
        )
      );
    }
  };

  /*  Used for register Memoized function using useCallback hook  */
  const optimizedFn = useCallback(debounce(handleChange), []);

  /**
   * @description - This function render select tag options on the based on filterType.
   * @param {string} filterType - Takes filterType parameter.
   * @returns {JSX[]}
   */
  const setFilterType = (filterType) => {
    let { values: filterFieldsArr } = applicableFilter?.find(
      (item) => item?.type === filterType
    );

    return filterFieldsArr?.map((item) => {
      return (
        <Option key={item?.value} value={item?.value}>
          {item?.display}
        </Option>
      );
    });
  };

  const apiCallForAspiration = (payload) => {
    // apiClient(payload)
    //   .then((res) => {
    //     setSeriesState({ ...seriesState, seriesOption: res.data.results });
    //   })
    //   .catch((err) => {
    //     message.error(err);
    //   });
    dispatch(apiCallForCarSeries.getSeriesSearchResult(payload));
  };

  const apiCallforCarSeries = (payload) => {
    // apiClient(payload)
    //   .then((res) => {
    //     setSeriesState({ ...seriesState, seriesOption: res.data.results });
    //   })
    //   .catch((err) => {
    //     message.error(err);
    //   });
    dispatch(apiCallForCarSeries.getSeriesSearchResult(payload));
  };

  const apiCallForBrand = (finalArr) => {
    const payload = { ...API_CONFIG.GET_BRAND_SERIES };
    payload.url += `?make=${finalArr.join(",")}&pageNo=0&fetchSize=50`;
    urlParams.delete("make");
    urlParams.set("make", finalArr.join(","));
    history.replace(`${history.location.pathname}?${urlParams.toString()}`);
    dispatch(
      apiCallForAdvanceSearch.getAdvanceSearchResult(urlParams.toString())
    );
    apiCallforCarSeries(urlParams.toString());
  };

  const onBrandChange = (brandsValue) => {
    if (
      (brandsValue.includes("all") &&
        brandsValue[brandsValue.length - 1] === "all") ||
      brandsValue.length === 0
    ) {
      setBrands(["all"]);
      apiCallForBrand([""]);
    } else if (brandsValue.includes("all")) {
      const newValue = brandsValue.filter((el) => el !== "all");
      setBrands([...newValue]);
      apiCallForBrand(newValue);
    } else {
      setBrands(brandsValue);
      apiCallForBrand(brandsValue);
    }

    dispatch(
      apiCallForAdvanceSearch.getAdvanceSearchResult(urlParams.toString())
    );
    setSeries([]);
    apiCallforCarSeries(urlParams.toString());
  };

  /*

const onAspirationChange = (aspvalue) => {
    if (
      (aspvalue.includes("all") &&
        aspvalue[aspvalue.length - 1] === "all") ||
      aspvalue.length === 0
    ) {
      setAspiration(["all"]);
      apiCallForAspiration([""]);
    } else if (aspvalue.includes("all")) {
      const newValue = aspvalue.filter((el) => el !== "all");
      setAspiration([...newValue]);
      apiCallForAspiration(newValue);
    } else {
      setAspiration(aspvalue);
      apiCallForAspiration(aspvalue);
    }
    console.log(series);
    dispatch(
      apiCallForAdvanceSearch.getAdvanceSearchResult(urlParams.toString())
    );
    setSeries([]);
    apiCallforCarSeries(urlParams.toString());
  };













*/

  const onSeriesChange = (seriesValue) => {
    // console.log(seriesValue, "on series change");
    // if (
    //   (seriesValue.includes("all") &&
    //     seriesValue[seriesValue.length - 1] === "all") ||
    //   seriesValue.length === 0
    // ) {
    //   setSeries(["all"]);
    // } else if (seriesValue.includes("all")) {
    //   const newValue = seriesValue.filter((el) => el !== "all");
    //   setSeries([...newValue]);
    //   apiCallForBrand(newValue);
    // } else {
    //   setSeries(seriesValue);
    // }
    urlParams.delete("series");
    urlParams.set("series", seriesValue.join(","));
    history.replace(`${history.location.pathname}?${urlParams.toString()}`);
    dispatch(
      apiCallForAdvanceSearch.getAdvanceSearchResult(urlParams.toString())
    );
  };

  useEffect(() => {
    /* Set active form item value receive from url */
    formRef.setFieldsValue(getQueryData());

    /* dispatch queryParams to get latest results for once, Big APi Call */
    dispatch(
      apiCallForAdvanceSearch.getAdvanceSearchResult(urlParams.toString())
    );

    /*API call for car series when user refresh*/
    if (initialBrands) {
      const payload = { ...API_CONFIG.GET_BRAND_SERIES };
      payload.url += `?make=${initialBrands.join(",")}&pageNo=0&fetchSize=50`;
      urlParams.delete("make");
      urlParams.set("make", initialBrands.join(","));
      history.replace(`${history.location.pathname}?${urlParams.toString()}`);
      apiCallforCarSeries(urlParams.toString());
    }
  }, []);

  return (
    <>
      <Row justify="center">
        <Col span={21}>
          <Form
            form={formRef}
            className="advance-search"
            onFinish={onFormSubmit}
          >
            <Row justify="center" gutter={[64, 16]}>
              <Col span={5}>
                <FormItem
                  label={<label className="label-color">Brand</label>}
                  name="make"
                >
                  <div
                    className="label-color"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "25px",
                    }}
                  >
                    {/*<FormItem label={<label className="label-color">Brand</label>}
                  name="brand">*/}
                    {/* <label className="label-color">Brand</label> */}
                    <Select
                      mode="multiple"
                      value={brands}
                      onChange={onBrandChange}
                      // initialvalues={["All"]}
                      // placeholder="All"
                      defaultValue={"All"}
                      allowClear
                      // style={{ width: "100%" }}
                      className="advance-search-select-multiple"
                      loading={loading}
                      disabled={loading ? true : false}
                    >
                      {applicableFilter?.length > 0 && setFilterType("Make")}
                      {/* <option>All</option> */}
                    </Select>
                  </div>
                </FormItem>
              </Col>

              <Col span={5}>
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "25px",
                  }}
                > */}
                <FormItem
                  label={<label className="label-color">Series</label>}
                  name="series"
                >
                  {/* <p>Series</p> */}
                  <Select
                    mode="multiple"
                    value={series}
                    onChange={onSeriesChange}
                    // initialvalues={["all"]}
                    placeholder="All"
                    allowClear
                    style={{ width: "100%" }}
                    className="advance-search-select"
                    notFoundContent={<div>No Data</div>}
                    // ref={seriesRef}
                    loading={seriesLoading}
                    // disabled={optionData?.results?.length > 0 ? false : true}
                  >
                    {/* <Option value="All">All</Option> */}
                    {optionData?.results?.length > 0 &&
                      renderOption(optionData.results)}
                    {/* <Select.Option value="f1">f1</Select.Option>
                    <Select.Option value="f2">f2</Select.Option>
                    <Select.Option value="f3">f3</Select.Option>
                    <Select.Option value="f4">f5</Select.Option>
                    <Select.Option value="f6">f6</Select.Option> */}
                  </Select>
                </FormItem>
                {/* </div> */}
              </Col>

              <Col span={5}>
                <FormItem
                  label={<label className="label-color">Car Category</label>}
                  name="categoryOfCar"
                >
                  <Select
                    // mode="multiple"
                    // allowClear
                    defaultValue={"all"}
                    // placeholder="All"
                    className="advance-search-select"
                    loading={filterLoading}
                    onChange={(e) => {
                      urlParams.delete("categoryOfCar");
                      urlParams.set("categoryOfCar", e);
                      history.replace(
                        `${history.location.pathname}?${urlParams.toString()}`
                      );
                      dispatch(
                        apiCallForAdvanceSearch.getAdvanceSearchResult(
                          urlParams.toString()
                        )
                      );
                    }}
                  >
                    {/* <Option value="">All</Option> */}
                    {applicableFilter?.length > 0 && setFilterType("Category")}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row justify="center" gutter={[64, 16]}>
              <Col span={5}>
                <FormItem
                  label={<label className="label-color">Gear Type</label>}
                  name="gearType"
                >
                  <Select
                    // mode="multiple"
                    // allowClear
                    defaultValue={""}
                    placeholder="Please select"
                    className="advance-search-select"
                    onChange={(e) => {
                      urlParams.delete("gearType");
                      urlParams.set("gearType", e);
                      history.replace(
                        `${history.location.pathname}?${urlParams.toString()}`
                      );
                      dispatch(
                        apiCallForAdvanceSearch.getAdvanceSearchResult(
                          urlParams.toString()
                        )
                      );
                    }}
                  >
                    <Option value="">All</Option>
                    <Option value="Manual">Manual</Option>
                    <Option value="Automatic">Automatic</Option>
                    <Option value="Semi-Automatic">Semi-Automatic</Option>
                    <Option value="Unknown">Unknown</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem
                  label={<label className="label-color">Drive Type</label>}
                  name="driveType"
                >
                  <Select
                    // mode="multiple"
                    // allowClear
                    defaultValue={""}
                    placeholder="Please select"
                    className="advance-search-select"
                    onChange={(e) => {
                      urlParams.delete("driveType");
                      urlParams.set("driveType", e);
                      history.replace(
                        `${history.location.pathname}?${urlParams.toString()}`
                      );
                      dispatch(
                        apiCallForAdvanceSearch.getAdvanceSearchResult(
                          urlParams.toString()
                        )
                      );
                    }}
                  >
                    <Option value="">All</Option>
                    <Option value="FWD">FWD</Option>
                    <Option value="RWD">RWD</Option>
                    <Option value="AWD">AWD</Option>
                    <Option value="Chains">Chains</Option>
                    <Option value="Unknown">Unknown</Option>

                    {/* <Option value="4WD">4WD</Option> */}
                  </Select>
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem
                  label={<label className="label-color">Roof Top</label>}
                  name="roofTop"
                >
                  <Select
                    // mode="multiple"
                    // allowClear
                    defaultValue={"all"}
                    placeholder="Please select"
                    className="advance-search-select"
                    loading={filterLoading}
                    onChange={(e) => {
                      urlParams.delete("roofType");
                      urlParams.set("roofType", e);
                      history.replace(
                        `${history.location.pathname}?${urlParams.toString()}`
                      );
                      dispatch(
                        apiCallForAdvanceSearch.getAdvanceSearchResult(
                          urlParams.toString()
                        )
                      );
                    }}
                  >
                    {/* <Option value="">All</Option> */}
                    {applicableFilter?.length > 0 && setFilterType("Roof Top")}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row justify="center" gutter={[64, 0]}>
              <Col span={5}>
                <FormItem
                  label={<label className="label-color">No of seats</label>}
                  name="noOfSeats"
                >
                  <Select
                    // mode="multiple"
                    // allowClear
                    defaultValue={""}
                    placeholder="Please select"
                    className="advance-search-select"
                    onChange={(e) => {
                      urlParams.delete("noOfSeats");
                      urlParams.set("noOfSeats", e);
                      history.replace(
                        `${history.location.pathname}?${urlParams.toString()}`
                      );
                      dispatch(
                        apiCallForAdvanceSearch.getAdvanceSearchResult(
                          urlParams.toString()
                        )
                      );
                    }}
                  >
                    <Option value="">All</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value=">5">More than 5</Option>
                    <Option value="Unknown">Unknown</Option>
                    {/*  <Option value=">5">{">"}5</Option> */}
                  </Select>
                </FormItem>
              </Col>
              <Col span={5}>
                <FormItem
                  label={<label className="label-color">No of doors</label>}
                  name="noOfDoors"
                >
                  <Select
                    // mode="multiple"
                    // allowClear
                    defaultValue={""}
                    placeholder="Please select"
                    className="advance-search-select"
                    onChange={(e) => {
                      urlParams.delete("noOfDoors");
                      urlParams.set("noOfDoors", e);
                      history.replace(
                        `${history.location.pathname}?${urlParams.toString()}`
                      );
                      dispatch(
                        apiCallForAdvanceSearch.getAdvanceSearchResult(
                          urlParams.toString()
                        )
                      );
                    }}
                  >
                    <Option value="">All</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value=">5">More than 5</Option>

                    <Option value="Unknown">Unknown</Option>
                    {/*    <Option value=">5">{">"}5</Option> */}
                  </Select>
                </FormItem>
              </Col>
              <Col span={5}></Col>
            </Row>
            <Row justify="center" gutter={[64, 0]}>
              <Col span={5}>
                <FormItem
                  label={<label className="label-color">Capacity(CC)</label>}
                ></FormItem>
              </Col>
              <Col span={5}>
                <FormItem
                  label={<label className="label-color">Max Power(HP)</label>}
                ></FormItem>
              </Col>
              <Col span={5}>
                <FormItem
                  label={<label className="label-color">Year of make</label>}
                ></FormItem>
              </Col>
            </Row>
            <Row
              justify="center"
              gutter={[64, 16]}
              style={{ textAlign: "left", marginTop: "-19px" }}
            >
              <Col span={5} style={{ display: "flex" }}>
                <FormItem label={""} name="capacityFrom">
                  <Input
                    type="number"
                    placeholder="From"
                    onChange={(e) =>
                      optimizedFn(e.target.value, "capacityFrom")
                    }
                  ></Input>
                </FormItem>
                <svg
                  viewBox="0 0 1024 1024"
                  focusable="false"
                  data-icon="swap-right"
                  width="2em"
                  height="1em"
                  fill="white"
                  aria-hidden="true"
                  style={{ marginTop: "8px" }}
                >
                  <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
                </svg>
                <FormItem label={""} name="capacityTo">
                  <Input
                    type="number"
                    placeholder="To"
                    onChange={(e) => optimizedFn(e.target.value, "capacityTo")}
                  ></Input>
                </FormItem>
              </Col>

              <Col span={5} style={{ display: "flex" }}>
                <FormItem label={""} name="maxPowerFrom">
                  <Input
                    type="number"
                    placeholder="From"
                    onChange={(e) =>
                      optimizedFn(e.target.value, "maxPowerFrom")
                    }
                  ></Input>
                </FormItem>
                <svg
                  viewBox="0 0 1024 1024"
                  focusable="false"
                  data-icon="swap-right"
                  width="2em"
                  height="1em"
                  fill="white"
                  aria-hidden="true"
                  style={{ marginTop: "8px" }}
                >
                  <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
                </svg>
                <FormItem label={""} name="maxPowerTo">
                  <Input
                    type="number"
                    placeholder="To"
                    onChange={(e) => optimizedFn(e.target.value, "maxPowerTo")}
                  ></Input>
                </FormItem>
              </Col>

              <Col span={5} style={{ display: "flex" }}>
                <FormItem label={""} name="makeYearFrom">
                  <DatePicker
                    picker="year"
                    placeholder="Start year"
                    onChange={(e) => {
                      if (e === null) {
                        urlParams.delete("makeYearFrom");
                        urlParams.set("makeYearFrom", "");
                        history.replace(
                          `${history.location.pathname}?${urlParams.toString()}`
                        );
                        dispatch(
                          apiCallForAdvanceSearch.getAdvanceSearchResult(
                            "count=true&" + urlParams.toString()
                          )
                        );
                      } else if (!!e) {
                        urlParams.delete("makeYearFrom");
                        urlParams.set("makeYearFrom", e.format("YYYY"));
                        history.replace(
                          `${history.location.pathname}?${urlParams.toString()}`
                        );
                        dispatch(
                          apiCallForAdvanceSearch.getAdvanceSearchResult(
                            "count=true&" + urlParams.toString()
                          )
                        );
                      }
                    }}
                  />
                </FormItem>
                <svg
                  viewBox="0 0 1024 1024"
                  focusable="false"
                  data-icon="swap-right"
                  width="2em"
                  height="1em"
                  fill="white"
                  aria-hidden="true"
                  style={{ marginTop: "8px" }}
                >
                  <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
                </svg>
                <FormItem label={""} name="makeYearTo">
                  <DatePicker
                    picker="year"
                    placeholder="End year"
                    // defaultValue={undefined}
                    onChange={(e) => {
                      if (e === null) {
                        urlParams.delete("makeYearTo");
                        urlParams.set("makeYearTo", "");
                        history.replace(
                          `${history.location.pathname}?${urlParams.toString()}`
                        );
                        dispatch(
                          apiCallForAdvanceSearch.getAdvanceSearchResult(
                            "count=true&" + urlParams.toString()
                          )
                        );
                      }
                      console.log(e);
                      if (!!e) {
                        urlParams.delete("makeYearTo");
                        urlParams.set("makeYearTo", e.format("YYYY"));
                        history.replace(
                          `${history.location.pathname}?${urlParams.toString()}`
                        );
                        dispatch(
                          apiCallForAdvanceSearch.getAdvanceSearchResult(
                            "count=true&" + urlParams.toString()
                          )
                        );
                      }
                    }}
                  />
                </FormItem>
              </Col>
            </Row>

            <Row
              justify="end"
              gutter={[64, 0]}
              style={{ marginBottom: "50px" }}
            >
              <Col span={12}>
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginRight: "15px",
                    //visibility: "hidden",
                  }}
                >
                  Total{" "}
                  <span style={{ color: "#f34a4a" }}>
                    {loading ? <Spin indicator={antIcon} /> : data?.total || 0}
                  </span>{" "}
                  cars found
                </span>

                <Button
                  type="primary"
                  htmlType="submit"
                  /*   icon={<SearchOutlined />} */
                  size="small"
                  className="apply-btn"
                  loading={searchLoading}
                >
                  Apply
                </Button>

                <Button
                  type="primary"
                  htmlType="reset"
                  /*   icon={<SearchOutlined />} */
                  size="small"
                  className="apply-btn-reset"
                  onClick={() => {
                    formRef.resetFields();
                    history.replace(`${history.location.pathname}`);
                    dispatch(getAdvanceResultReset());
                    window.location.reload();
                  }}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AdvanceSearch;
