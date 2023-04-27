import { Button } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";

// import Loader from "../loader";
// import FilterGroup from "./filterGroup";
// import apiCall from "./logic";

import { AutoComplete } from "antd";
import { useEffect } from "react";
import "./search.scss";
import apiClient from "../../utils/apiClient";
import { FilterOutlined } from "@ant-design/icons";
// import axios from "axios";

const Options = AutoComplete.Option;
const Search = () => {
  const history = useHistory();

  // const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const [isAdvanceSearchActive, setAdvanceSearchActiveStatus] = useState(false);
  const [carList, setCarList] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  // const { data: carList } = useSelector((state) => state.autocomplete);
  /* const [advanceFilter, setAdvanceFilter] = useState({
    group: {},
    subFilter: {},
  }); */
  /* const {
    loading = true,
    isError = false,
    data: advanceSearchFilter,
  } = useSelector((state) => state.advanceSearchFilter); */
  /*   useEffect(() => {
    dispatch(apiCall());
  }, [dispatch]); */
  // const onSearchChange = (value) => {
  //   // const { value } = e.target;
  //   // setSearchText(value);
  // };

  useEffect(() => {
    console.log({ searchText });
    const query = {
      search: searchText,
      pageNo: 0,
      fetchSize: 10,
    };
    if (searchText.length >= 3) {
      // setLoading(true);
      apiClient({
        method: "get",
        url: "/cars",
        params: query,
      })
        .then((res) => {
          if (searchText === query.search) {
            setCarList(res.data.results);
          }
          // setLoading(false);
        })
        .catch((error) => {
          console.log({ error });
          // axios.isCancel(error);
          // setLoading(false);
        });
    }
  }, [searchText]);

  const onSearchData = (value) => {
    // source.cancel("Operation canceled by the user.");
    setSearchText(value);
  };

  const onElementSelect = (value, e) => {
    history.push(`/details?id=${value}&group=Cars+Models&type=model`);
  };
  /* const onFilterChange = (updatedFilter) => {
    setAdvanceFilter(updatedFilter);
  }; */

  const onAdvanceSearch = () => {
    history.push(`/advanceSearchDetails`);
  };

  const renderOptions = () => {
    console.log({ carList });
    return carList?.map((car) => {
      return (
        <Options key={car.id} value={car.id} onSelect={onElementSelect}>
          {car.title}
        </Options>
      );
    });
  };
  const onSubmitData = (e) => {
    e.preventDefault();
    const query = {
      search: searchText,
      group: "Cars Models",
      subCat: "All",
      showSideBar: true,
      pageNo: 0,
      fetchSize: 24,
    };
    /* if (isAdvanceSearchActive) {
      query.group = advanceFilter.group.value;
      console.log({
        adv: advanceFilter.group,
      });
      query.showSideBar = false;
      Object.entries(advanceFilter.subFilter).forEach(([key, value]) => {
        console.log({ key, value });
        query[key.toLowerCase().replaceAll(" ", "_")] = value.value;
      });
    } */
    history.push(`/search?${new URLSearchParams(query).toString()}`);
  };
  return (
    <section className="search-section">
      {/* <h2 className="search-landing-title">Exclusive Car Search</h2> */}
      {/* <div className="search-info-text">Search here for cars</div> */}
      <div className="search-box">
        <form
          className="search-form"
          onSubmit={(e) => onSubmitData(e)}
          autoComplete="on"
        >
          <div className="search-box-container">
            {isAdvanceSearchActive && (
              <div className="header-section">
                <h4 className="heading">Advance Search</h4>
                <i
                  className="far fa-times-circle link"
                  onClick={() => setAdvanceSearchActiveStatus(false)}
                ></i>
              </div>
            )}
            <div
              className={`normal-search-container${
                isAdvanceSearchActive ? " bot-border" : ""
              }`}
            >
              <div className="search-input-container">
                <AutoComplete
                  // value={searchText}
                  // options={}
                  onSelect={onElementSelect}
                  onSearch={onSearchData}
                  // onChange={onSearchChange}
                  placeholder="Search..."
                  style={{
                    width: "100%",
                    marginRight: 30,
                    minWidth: "250px",
                    textAlign: "left",
                  }}
                >
                  {renderOptions()}
                </AutoComplete>
              </div>
              {!isAdvanceSearchActive && (
                <button className="search-btn" type="submit">
                  Search
                  {/* <i className="fa fa-search" aria-hidden="true"></i> */}
                </button>
              )}
            </div>

            {/* ------------- */}
            {isAdvanceSearchActive &&
              {
                /* <Loader
isLoading={loading}
noData={isError || advanceSearchFilter?.length === 0}
>
<div className="advance-search-section">
<FilterGroup
filter={advanceSearchFilter || []}
onFilterChange={onFilterChange}
></FilterGroup>
<div className="advance-search-btn">
<button className="search-btn" type="submit">
Search
</button>
</div>
</div>
</Loader> */
              }}
          </div>
          {!isAdvanceSearchActive && false && (
            <div className="advance-search-section">
              <span
                className="link"
                onClick={() => setAdvanceSearchActiveStatus(true)}
              >
                Advance Search
              </span>
            </div>
          )}
        </form>
      </div>
      <img src="/search_background.svg" alt="" className="search-background" />
      <img
        src="/driven_search_ring.png"
        className="search-background2"
        alt="Driven"
      />
      <div className="text-container">
        <span className="search-text-heading"> One Stop Search</span>
        <span className="search-text-heading-big">Exclusive Cars Data</span>
      </div>
      <div>
        <Button
          type="default"
          onClick={onAdvanceSearch}
          icon={<FilterOutlined />}
          className="advance-search-btn"
        >
          Advanced Search
        </Button>
      </div>
    </section>
  );
};

export default Search;
