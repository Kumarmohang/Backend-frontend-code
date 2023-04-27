/* eslint-disable react-hooks/exhaustive-deps */

// import { catArray } from "./data";
import "./results.scss";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "../loader";
import Dropdown from "../Dropdown";
import apiCall, {
  updateCompareList,
  resetCompareList as resetCompareListAction,
} from "./logic";
import Card from "./card";
import SideBar from "./sidebar";
import AllDataOverview from "./overview";

const DropdownValues = {
  "Auction Data": [
    {
      display: "All",
      value: {
        SortTypes: "All",
      },
    },
    {
      display: "For Sale",
      value: {
        SortTypes: "for Sale",
      },
      title: "Search for cars using Model name/no",
    },
    {
      display: "Vintage",
      value: {
        SortTypes: "Vintage",
      },
      title: "Search for cars using VIN/Engin/chassis/serial no.",
    },
  ],
  Cars: [
    {
      display: "All",
      value: {
        SortTypes: "All",
      },
    },
    {
      display: "For Sale",
      value: {
        SortTypes: "for Sale",
      },
      title: "Search for cars using Model name/no",
    },
    {
      display: "Vintage",
      value: {
        SortTypes: "Vintage",
      },
      title: "Search for cars using VIN/Engin/chassis/serial no.",
    },
  ],
  "Cars For Sale": [
    {
      display: "All",
      value: {
        SortTypes: "All",
      },
    },
    {
      display: "For Sale",
      value: {
        SortTypes: "for Sale",
      },
      title: "Search for cars using Model name/no",
    },
    {
      display: "Vintage",
      value: {
        SortTypes: "Vintage",
      },
      title: "Search for cars using VIN/Engin/chassis/serial no.",
    },
  ],
  "Specific Cars": [
    {
      display: "All",
      value: {
        SortTypes: "All",
      },
    },
    {
      display: "For Sale",
      value: {
        SortTypes: "for Sale",
      },
      title: "Search for cars using Model name/no",
    },
    {
      display: "Vintage",
      value: {
        SortTypes: "Vintage",
      },
      title: "Search for cars using VIN/Engin/chassis/serial no.",
    },
  ],
};

/* const SortingOrder = {
  "car for sale": [
    {
      display: "asedingOrder",
      value: {
        order: false,
      },
    },
    {
      display: "deasecdingOrder",
      valeu: {
        order: true,
      },
    },
  ],
}; */

const Result = () => {
  const [callapi, setCallapi] = useState(false);
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const pageNo = query.get("pageNo") ? parseInt(query.get("pageNo"), 10) : 0;
  const fetchSize = query.get("fetchSize")
    ? parseInt(query.get("fetchSize"), 10)
    : 24;
  let showSideBar = query.get("showSideBar") || "true";
  showSideBar = showSideBar === "true";
  const searchFor = query.get("search");
  const grpIdx = query.get("grpIdx") || 0;
  const from = query.get("from") || "";
  // TODO :Need to remove hard coded for filters
  const makeFilter = query.get("make");
  const [activeSideBarFilters, setSideBarFilters] = useState({});

  const [isFilterClear, setIsFilterClear] = useState(false);

  const {
    loading: sortingKeyLoading,
    flag: sortingKeyFlag,
    data: carsSortingKey,
  } = useSelector((state) => state.carsSortingKey);

  const {
    loading: sideBarLoading = true,
    data: sideBarData,
    flag,
  } = useSelector((state) => state.sideBarData);
  const filterArray = sideBarData?.filters?.map((ele) => ele.type);
  const filterArrayQuery = sideBarData?.filters?.map((ele) =>
    query.get(ele.type.toLowerCase())
  );
  console.log(filterArray);
  const { data: compareList = [] } = useSelector((state) => state.compareList);
  const [group, setGroup] = useState({ index: grpIdx, cat: null });
  const [currentPage, setCurrentPage] = useState(pageNo);
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState(query.get("sort_order") || -1);

  // const handleClick = () => setSortingKey(onSubCatSelectFilter);

  const {
    loading: carsLoading = true,
    data: carsResult,
    queryparam: carsPreviousQuery,
  } = useSelector((state) => state.carsResult);
  const [activeDropdownElement, setActiveDropdownElement] = useState(undefined);
  /*  1st useeffect run on rendering when all cars page first render*/
  useEffect(() => {
    setGroup({ index: grpIdx, cat: sideBarData?.assetClass[grpIdx] });

    if (flag && sideBarData.filters) {
      let sideBarFilterObject = {};
      console.log(filterArrayQuery);
      filterArray.map((ele, index) => {
        if (filterArrayQuery[index] !== null) {
          sideBarFilterObject = {
            ...sideBarFilterObject,
            [ele]: sideBarData.filters[index].values.find(
              (elel) => filterArrayQuery[index] == elel.value
            ),
          };
        }

        return null;
      });
      console.log(sideBarFilterObject);
      /* if (Object.keys(sideBarFilterObject).length !== 0) {
        setSideBarFilters(sideBarFilterObject);
      } else {
        setSideBarFilters({});
      } */
      setSideBarFilters(
        makeFilter
          ? {
            Make: sideBarData.filters[0].values.find(
              (ele) => makeFilter === ele.value
            ),
          }
          : {}
      );
      console.log(activeSideBarFilters);
    }
  }, [flag]);
  useEffect(() => {
    const getData = (renderSideBar = true) => {
      const queryParam = new URLSearchParams(history.location.search);

      if (queryParam.get("group") === undefined) {
        queryParam.set("group", sideBarData.assetClass[grpIdx].name);
      }
      if (queryParam.toString() !== carsPreviousQuery) {
        dispatch(apiCall.getFilterResult(queryParam.toString()));
      }
      if (
        queryParam.get("group") !== "All" &&
        queryParam.toString() !== carsPreviousQuery
      ) {
        dispatch(apiCall.getCarsResult(queryParam.toString()));
      }
    };

    const unlisten = history.listen((location, action) => {
      const queryParam = new URLSearchParams(history.location.search);

      //console.log(queryParam.toString());
      if (action === "POP") {
        console.log("mount unmount history");
        getData(true);
      }
    });
    getData();
    // console.log({ carsSortingKey });
    if (carsSortingKey === null) {
      dispatch(apiCall.getSortKeyResult());
    }
    return () => {
      unlisten();
    };
  }, []);
  /* Useeffect runs when activedropdownelement and currentpage changes */
  useEffect(() => {
    const queryParam = new URLSearchParams(history.location.search);
    if (activeDropdownElement?.value) {
      /* Object.entries(activeDropdownElement?.value).forEach(([key, value]) =>
        queryParam.set(key, value)
      ); */
      queryParam.set("sort_key", activeDropdownElement?.value);
    }
    const sideBarFilters = Object.entries(activeSideBarFilters);
    if (sideBarFilters.length) {
      sideBarFilters.forEach(([key, value]) => {
        queryParam.set([key.toLowerCase().replaceAll(" ", "_")], value.value);
      });
    }
    queryParam.set("pageNo", currentPage);
    history.replace(`${history.location.pathname}?${queryParam.toString()}`);
    if (callapi) {
      if (queryParam.get("group") === undefined) {
        queryParam.set("group", sideBarData.assetClass[grpIdx].name);
      }
      if (query.get("group") !== "All") {
        dispatch(
          apiCall.getCarsResult(
            new URLSearchParams(history.location.search).toString()
          )
        );
      }
    }
    setCallapi(true);
  }, [currentPage, activeDropdownElement]);
  /* Useeffect calls when sidebarfilter changes*/

  useEffect(() => {
    let needToRefresh = false;
    const queryParam = new URLSearchParams(history.location.search);
    if (activeDropdownElement?.value) {
      Object.entries(activeDropdownElement?.value).forEach(([key, value]) =>
        queryParam.set(key, value)
      );
    }
    const sideBarFilters = Object.entries(activeSideBarFilters);
    if (sideBarFilters.length || isFilterClear) {
      setIsFilterClear(false);
      if (isFilterClear) {
        needToRefresh = true;
      }
      sideBarFilters.forEach(([key, value]) => {
        queryParam.set([key.toLowerCase().replaceAll(" ", "_")], value.value);
        if (
          queryParam.get(key.toLowerCase().replaceAll(" ", "_")) !==
          new URLSearchParams(history.location.search).get(
            key.toLowerCase().replaceAll(" ", "_")
          )
        ) {
          needToRefresh = true;
        }
      });
    }
    if (needToRefresh) {
      history.replace(`${history.location.pathname}?${queryParam.toString()}`);
      dispatch(
        apiCall.getFilterResult(
          new URLSearchParams(history.location.search).toString()
        )
      );

      if (queryParam.get("group") === undefined) {
        queryParam.set("group", sideBarData.assetClass[grpIdx].name);
      }
      if (queryParam.get("group") !== "All") {
        dispatch(
          apiCall.getCarsResult(
            new URLSearchParams(history.location.search).toString()
          )
        );
      }
    }
    // dispatch(apiCall.getFilterResult(queryParam.))
  }, [activeSideBarFilters]);

  useEffect(() => {
    if (sortingKeyFlag) {
      const activeSortingKeyValue = query.get("sort_key");
      if (activeSortingKeyValue) {
        const activeObj = carsSortingKey[query.get("group")].find(
          (ele) => ele.value === activeSortingKeyValue
        );
        setActiveDropdownElement(activeObj);
      }
    }
  }, [sortingKeyFlag]);

  const onGroupSelect = (ele, index) => {
    setGroup({ cat: ele, index });
  };
  const onSubCatSelect = (ele, index) => {
    const query = new URLSearchParams(history.location.search);
    const prevGroup = query.get("group");
    query.set("group", group.cat?.name);
    query.set("subCat", ele.name);
    query.set("grpIdx", group.index);
    query.set("subCatIdx", index);
    query.set("pageNo", 0);

    // query.append('g')
    // history.location.searchquery;
    if (prevGroup !== group.cat?.name) {
      query.delete("sort_key");
      query.delete("sort_order");
      setActiveDropdownElement(undefined);
      setSortOrder(-1);
    }
    history.push(`${history.location.pathname}?${query.toString()}`);
    if (currentPage !== 0) {
      setCurrentPage(0);
      // setActiveDropdownElement(undefined);
    } else if (query.toString() !== carsPreviousQuery) {
      dispatch(apiCall.getCarsResult(query));
      // setActiveDropdownElement(undefined);
    }
    // dispatch(apiCall.getSearchResult(query));
  };

  const onSortOrderChange = () => {
    const query = new URLSearchParams(history.location.search);
    const newSortOrder = sortOrder === 1 ? -1 : 1;
    // query.set("sort_key", "test");
    query.set("sort_order", newSortOrder);
    setSortOrder(newSortOrder);
    history.push(`${history.location.pathname}?${query.toString()}`);
    if (currentPage !== 0) {
      setCurrentPage(0);
    } else if (!sortOrder) {
    } else if (query.toString() !== carsPreviousQuery) {
      dispatch(apiCall.getCarsResult(query));
    }
    // dispatch(apiCall.getSearchResult(query));
  };

  const onCardClick = (ele) => {
    const group = query.get("group");
    const queryParam = new URLSearchParams({
      id: ele.id,
      group,
      grpIdx: query.get("grpIdx"),
      subCatIdx: query.get("subCatIdx"),
      subCat: query.get("subCat"),
      type:
        query.get("searchBy") === "chassis" && group === "Specific Cars"
          ? "specific-car"
          : "model",
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

  const renderCards = () => {
    // console.log({ btn: group.cat.name === "Cars", group });
    const searchData = query.get("group") !== "All" ? carsResult : [];
    return (searchData?.results || []).map((ele) => (
      <Card
        key={ele.id}
        item={ele}
        onClick={(ele) => onCardClick(ele)}
        showAddBtn={group?.cat?.name === "Cars"}
        onClickAdd={(isRemoved) => onCardAddBtnClick(isRemoved, ele)}
        list={compareList}
      />
    ));
  };
  const resetCompareList = (e) => {
    e.stopPropagation();
    dispatch(resetCompareListAction());
  };
  const handlePageChange = (pageState) => {
    setCurrentPage(pageState.selected);
  };
  const onDropdownChange = (ele) => {
    // setActiveDropdownElement(ele);
    console.log({ ele });
    setActiveDropdownElement(ele);
    setCurrentPage(0);
  };
  const onAllSelect = (e, index, ele) => {
    setGroup({ cat: ele, index });
    const query = new URLSearchParams(history.location.search);
    console.log({ ele });
    query.set("search", searchFor);
    query.set("group", ele?.name);
    query.set("grpIdx", 0);
    query.set("pageNo", 0);
    query.set("fetchSize", fetchSize);
    /* {
      search: searchFor,
      group: ele?.name,
      grpIdx: 0,
      pageNo: 0,
      fetchSize: fetchSize,
    } */

    if (from) {
      query.set("from", from);
    }
    // history.location.searchquery;
    history.replace(`${history.location.pathname}?${query.toString()}`);
    if (currentPage !== 0) {
      setCurrentPage(0);
    } else {
      dispatch(apiCall.getSearchResult(query));
    }
    // setCurrentPage(0);
  };
  const onHeaderClick = (queryString, element) => {
    setCurrentPage(0);
    dispatch(apiCall.getCarsResult(queryString));
    setGroup({
      index: element.grp,
      cat: { name: element.type, subCat: element.value },
    });
  };

  const onSideBarFilterChange = (ele, filterValue) => {
    setSideBarFilters((preStat) => ({
      ...preStat,
      [ele.type]: filterValue,
    }));
  };
  const onSideBarFilterClear = (ele) => {
    const query = new URLSearchParams(history.location.search);
    query.delete(ele.type.toLowerCase().replaceAll(" ", "_"));
    history.replace(`${history.location.pathname}?${query.toString()}`);
    setIsFilterClear(true);
    setSideBarFilters((preStat) => {
      const copyStat = { ...preStat };
      delete copyStat[ele.type];
      // console.log({ copyStat });
      return copyStat;
    });
  };
  const loading = carsLoading;
  const resultData = carsResult;
  return (
    <div className="result">
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
            {"< Back"}
          </span>
        )}
        <span className="heading-text">
          {from !== "header"
            ? `Showing results for : ${searchFor}`
            : "All Cars"}
          <br />
          {!loading && !showSideBar && (
            <span style={{ fontSize: "14px" }}>
              {resultData?.total || 0} records found
            </span>
          )}
          {group?.cat?.name === "Cars" && (
            <span
              className={`compare-btn${compareList.length < 2 ? " disabled" : ""
                }`}
              role="presentation"
              onClick={() =>
                history.push(
                  `/compare?${new URLSearchParams({
                    ids: compareList,
                  }).toString()}`
                )
              }
            >
              {compareList.length >= 2 ? (
                <>
                  <span>Compare</span>
                  <span
                    role="presentation"
                    onClick={resetCompareList}
                    style={{ marginLeft: "20px", color: "#4a4a4a" }}
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
      <Loader
        isLoading={
          (sideBarLoading || loading || sortingKeyLoading) && showSideBar
        }
      >
        <div className="result-sections">
          {showSideBar && (
            <section className="filter-items">
              <SideBar
                categoryArray={sideBarData?.assetClass}
                onSubCatSelect={onSubCatSelect}
                onGroupSelect={onGroupSelect}
                grpIdx={parseInt(query.get("grpIdx") || 0)}
                subCatIdx={parseInt(query.get("subCatIdx"))}
                onAllSelect={onAllSelect}
                filters={sideBarData?.filters}
                onFilterChange={onSideBarFilterChange}
                activeFilters={activeSideBarFilters}
                onFilterClear={onSideBarFilterClear}
              />
            </section>
          )}

          <section className={`result-items${showSideBar ? "" : " spec-car"}`}>
            {!loading && carsSortingKey?.[query.get("group")] && (
              <span className="dropdown-section">
                {/* <span className="label dropdown-filter">Filters: </span> */}
                <span className="label dropdown-label">Sort By: </span>
                <Dropdown
                  options={carsSortingKey[query.get("group")]}
                  onChange={onDropdownChange}
                  active={activeDropdownElement}
                />

                <span
                  className="nav-icon"
                  onClick={onSortOrderChange}
                  title={sortOrder === 1 ? "Ascending" : "Descending"}
                >
                  <i
                    className={
                      sortOrder === 1
                        ? "fas fa-sort-amount-down"
                        : "fas fa-sort-amount-up"
                    }
                  ></i>
                </span>
              </span>
            )}

            <div className="result-items-container">
              {query.get("group") !== "All" ? (
                <Loader
                  isLoading={loading}
                  height={500}
                  noData={!resultData?.total}
                >
                  {renderCards()}
                </Loader>
              ) : (
                <AllDataOverview
                  searchFor={searchFor}
                  onHeaderClick={onHeaderClick}
                />
              )}
            </div>
            {query.get("group") !== "All" && !!resultData?.total && (
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil((resultData?.total || 0) / fetchSize)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={`pagination${showSideBar ? " with-side-bar" : ""
                  }`}
                activeClassName={"active"}
                pageClassName="page"
                nextClassName="page"
                previousClassName="page previous"
                disabledClassName="disabled"
                initialPage={currentPage}
                forcePage={currentPage}
              />
            )}
          </section>
        </div>
      </Loader>
    </div>
  );
};
export default Result;
