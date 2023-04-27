/* eslint-disable react-hooks/exhaustive-deps */

// import { catArray } from "./data";
import "./results.scss";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import Loader from "../loader";
import Dropdown from "../Dropdown";
import apiCall, {
  updateCompareList,
  resetCompareList as resetCompareListAction,
} from "./logic";
import Card from "./card";
import SideBar from "./sidebar";
import AllDataOverview from "./overview";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import imageNotFound from "../../assests/No_Image_Thumbnail1.png";

const Result = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  /* --------QUERY PARAMS----------- */
  const query = new URLSearchParams(history.location.search);
  const pageNo = query.get("pageNo") ? parseInt(query.get("pageNo"), 10) : 0;
  const fetchSize = query.get("fetchSize")
    ? parseInt(query.get("fetchSize"), 10)
    : 24;
  let showSideBar = query.get("showSideBar") || "true";
  showSideBar = showSideBar === "true";
  const searchFor = query.get("search");
  const from = query.get("from") || "";

  /* ---------LOCAL STATE-------- */
  const [sortOrder, setSortOrder] = useState(query.get("sort_order") || -1);
  const [currentPage, setCurrentPage] = useState(pageNo);
  const [sortingKey, setSortingKey] = useState(undefined);
  const [activeFilter, setActiveFilters] = useState({});
  const [group, setGroup] = useState(query.get("group") || "All");

  /* ---------GLOBAL STATE (STORE)-------- */

  const { loading: sortingKeyLoading, data: carsSortingKey } = useSelector(
    (state) => state.carsSortingKey
  );
  const { data: compareList = [] } = useSelector((state) => state.compareList);
  const {
    loading: carsLoading = true,
    data: carsResult,
    queryparam: carsPreviousQuery,
  } = useSelector((state) => state.carsResult);

  const { loading: allResultLoading = true } = useSelector(
    (state) => state.searchData
  );

  const { loading: sideBarDataLoading } = useSelector(
    (state) => state.sideBarData
  );

  /* --------EFFECTS HANDLING----------- */
  const sortingKeyHandle = (checkForQueryParam = true) => {
    const query = new URLSearchParams(history.location.search);
    const activeSortingKeyValue = query.get("sort_key");
    let activeObj = null;
    
    if (checkForQueryParam && activeSortingKeyValue) {
      activeObj = carsSortingKey[query.get("group")]?.find(
        (ele) => ele.value === activeSortingKeyValue
      );
    } else {
      activeObj = carsSortingKey[query.get("group")]?.[0];
    }
    
    // console.log(activeObj);
    setSortingKey(activeObj);
    // console.log({ activeObj });
    query.set("sort_key", activeObj?.value);
    query.set("sort_order", sortOrder);
    history.replace(`${history.location.pathname}?${query.toString()}`);
    return activeObj;
  };

  useEffect(() => {
    const getData = () => {
      const queryParam = new URLSearchParams(history.location.search);
      sortingKeyHandle();
      if (
        queryParam.get("group") !== "All" &&
        queryParam.toString() !== carsPreviousQuery
      ) {
        dispatch(apiCall.getCarsResult(queryParam.toString()));
      }
    };

    const unlisten = history.listen((location, action) => {
      // const queryParam = new URLSearchParams(history.location.search);

      //console.log(queryParam.toString());
      if (action === "POP") {
        console.log("mount unmount history");
        getData(true);
      }
    });
    getData();
    // console.log({ carsSortingKey });
    /* if (carsSortingKey === null) {
      dispatch(apiCall.getSortKeyResult());
    } */
    return () => {
      unlisten();
    };
  }, []);

  //  useEffect(() => {
  //   if (sortingKeyFlag) {
  //     sortingKeyHandle();
  //   }
  // }, [sortingKeyFlag]); 

  /* ----------Functionality----------- */
  
  const onSortOrderChange = () => {
    const query = new URLSearchParams(history.location.search);

    const newSortOrder = sortOrder === 1 ? -1 : 1;
    query.set("sort_order", newSortOrder);
    setSortOrder(newSortOrder);
    history.push(`${history.location.pathname}?${query.toString()}`);
    setCurrentPage(0);
    dispatch(apiCall.getCarsResult(query));
  };

  const onCardClick = (ele) => {
    const group = query.get("group");
    const queryParam = new URLSearchParams({
      id: ele.id,
      group,
      type: "model",
    }).toString();
    history.push(`/details?${queryParam}`);
  };

  const onCardAddBtnClick = (isRemoved, car) => {
    const idList = [...compareList];
    if (isRemoved) {
      const idIdx = idList.indexOf(car.id);
      idList.splice(idIdx, 1);
    } else {
      idList.push(car.id);
    }
    dispatch(updateCompareList(idList));
  };

  const resetCompareList = (e) => {
    e.stopPropagation();
    dispatch(resetCompareListAction());
  };
  const handlePageChange = (pageState) => {
    setCurrentPage(pageState - 1);
    sortingKey?.display === "Price"
      ? query.get("group") === "Cars For Sale"
        ? setSortingKey(carsSortingKey[query.get("group")]?.[0])
        : setSortingKey(carsSortingKey[query.get("group")]?.[1])
      : setSortingKey(carsSortingKey[query.get("group")]?.[0]);
    const queryParam = new URLSearchParams(history.location.search);
    if (pageState.selected !== pageNo) {
      queryParam.set("pageNo", pageState - 1);
      history.push(`/search?${queryParam.toString()}`);
      dispatch(apiCall.getCarsResult(queryParam.toString()));
    }
  };
  const onSortKeyChange = (ele) => {
    console.log(ele);
    const queryParam = new URLSearchParams(history.location.search);
    setSortingKey(ele);
    
    
    setCurrentPage(0);
    queryParam.set("sort_key", ele.value);
    history.push(`/search?${queryParam.toString()}`);
    dispatch(apiCall.getCarsResult(queryParam.toString()));
  };

  const onSubCatChange = (group, updatedQueryString) => {
    setCurrentPage(0);
    setGroup(group.name);
    const queryParam = new URLSearchParams(updatedQueryString);
    if (group.name !== "All") {
      const updatedSortKey = sortingKeyHandle(false);
      if (updatedSortKey) {
        queryParam.set("sort_key", updatedSortKey.value);
        setSortingKey(updatedSortKey);
      }
      history.push(`/search?${queryParam.toString()}`);
      dispatch(apiCall.getCarsResult(queryParam.toString()));
    } else {
      queryParam.delete("sort_key");
      queryParam.delete("sort_order");
      history.push(`/search?${queryParam.toString()}`);
    }
  };

  const onOverviewHeaderClick = () => {
    sortingKeyHandle();
  };

  /* -------------Rendering ------------- */
  const renderCards = () => {
    // console.log({ btn: group.cat.name === "Cars", group });
    const searchData = query.get("group") !== "All" ? carsResult : [];
    return (searchData?.results || []).map((ele) => (
      <Card
        key={ele.id}
        item={{
          ...ele,
          extraData: ele.is_upcoming_auction ? "Upcoming Auction" : false,
        }}
        onClick={(ele) => onCardClick(ele)}
        showAddBtn={query.get("group") === "Cars Models"}
        onClickAdd={(isRemoved) => onCardAddBtnClick(isRemoved, ele)}
        list={compareList}
        showCross={ele.is_garbage}
        errorImage={imageNotFound}
      />
    ));
  };
  const loading =
    carsLoading || sortingKeyLoading || sideBarDataLoading || allResultLoading;
  const resultData = carsResult;
  return (
    <div className="result">
      {showSideBar && (
        <section className="filter-items">
          <SideBar
            onSubCatChange={onSubCatChange}
            activeFilters={activeFilter}
            onFilterChange={(newFilter, isInit = false) => {
              setActiveFilters(newFilter);
              if (!isInit) {
                setCurrentPage(0);
              }
            }}
          />
        </section>
      )}

      <div className="result-sections">
        <header className="result-for">
          {from !== "header" && (
            <span
              className="back-btn"
              role="presentation"
              onClick={() => {
                // history.action("POP");
                history.goBack();
              }}
            >
              <span>{"< Back"}</span>
            </span>
          )}
          <span className="heading-text">
            {from !== "header" ? (
              <span style={{ color: "#000", textTransform: "initial" }}>
                {`Results for: ${searchFor || query.get("vin") !== null?searchFor || query.get("vin"):"All" }`}
              </span>
            ) : (
              "All Cars"
            )}
            <br />
            {!loading && !showSideBar && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#000",
                  textTransform: "initial",
                }}
              >
                {resultData?.total || 0} records found
              </span>
            )}
            {query.get("group") === "Cars Models" && resultData?.total > 1 && (
              <span
                className="compare-text"
                style={{ color: "#000", textTransform: "initial" }}
              >
                {compareList.length >= 2 ? (
                  <>
                    <span
                      className="compare-btn"
                      role="presentation"
                      onClick={() =>
                        history.push(
                          `/compare?${new URLSearchParams({
                            ids: compareList,
                          }).toString()}`
                        )
                      }
                    >
                      Compare
                    </span>
                    <span
                      role="presentation"
                      onClick={resetCompareList}
                      style={{
                        marginLeft: "20px",
                        color: "#4a4a4a",
                        cursor: "pointer",
                      }}
                    >
                      Reset
                    </span>
                  </>
                ) : (
                  "Add 2 or more car to compare"
                )}
              </span>
            )}
          </span>
        </header>

        <section
          className={`result-items${showSideBar ? "" : " spec-car"}${
            loading ? " loading" : ""
          }`}
        >
          {!loading && carsSortingKey?.[query.get("group")] && (
            <span className="dropdown-section">
              {/* <span className="label dropdown-filter">Filters: </span> */}
              <span className="label dropdown-label">Sort By: </span>
              <Dropdown
                options={carsSortingKey[query.get("group")] || []}
                onChange={onSortKeyChange}
                active={sortingKey}
                // disabled={
                //   (carsSortingKey[query.get("group")] || []).length === 1
                // }
                className="sort-dropdown"
              />
              <span
                className="nav-icon"
                onClick={onSortOrderChange}
                title={sortOrder === 1 ? "Ascending" : "Descending"}
              >
                {/* <i
                  className={
                    sortOrder === 1
                      ? "fas fa-sort-amount-down"
                      : "fas fa-sort-amount-up"
                  }
                ></i> */}
                {sortOrder === 1 ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )}
              </span>
            </span>
          )}

          <div
            className={`result-items-container${
              query.get("group") === "All" ? " all-col" : ""
            }`}
          >
            <Loader
              isLoading={loading}
              height={500}
              noData={!resultData?.total && query.get("group") !== "All"}
            >
              {query.get("group") !== "All" ? (
                renderCards()
              ) : (
                <AllDataOverview
                  onHeaderClick={() => onOverviewHeaderClick()}
                />
              )}
            </Loader>
          </div>
          {!loading && query.get("group") !== "All" && !!resultData?.total && (
            <Pagination
              className="pagination"
              size="small"
              current={currentPage + 1}
              defaultCurrent={1}
              total={resultData.total}
              onChange={handlePageChange}
              showSizeChanger={false}
              pageSize={fetchSize}
              itemRender={(page, type) => {
                switch (type) {
                  case "page":
                    return <span className="pagination">{page}</span>;
                  case "prev":
                    return <span className="pagination">{`<`}</span>;
                  case "next":
                    return <span className="pagination">{">"}</span>;
                  case "jump-prev":
                    return <span className="pagination">{"..."}</span>;
                  case "jump-next":
                    return <span className="pagination">{`...`}</span>;
                  default:
                    return null;
                }
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
};
export default Result;
