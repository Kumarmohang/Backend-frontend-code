/* eslint-disable react-hooks/exhaustive-deps */
import "../results/results.scss";
// import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "../loader";
import Card from "../results/card";
import apiCall, { getResultReset } from "./logic";

const CircuitsAndDriver = ({
  dataFor = "Circuits",
  customCardClickAction,
  customHeading,
  customCount,
  isSearchable = false,
  showBackBtn = false,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = new URLSearchParams(history.location.search);
  const pageNo = query.get("pageNo") ? parseInt(query.get("pageNo"), 10) : 0;
  const fetchSize = query.get("fetchSize")
    ? parseInt(query.get("fetchSize"), 10)
    : 20;
  const [currentPage, setCurrentPage] = useState(pageNo);
  const [search, setSearch] = useState(query.get("search") || "");

  const onCardClick = (ele) => {
    if (!customCardClickAction) {
      const queryParam = new URLSearchParams({
        id: ele.id,
        type: dataFor.toLowerCase(),
      }).toString();
      history.push(`/details?${queryParam}`);
    } else {
      customCardClickAction(ele, history);
    }
  };

  const {
    loading: circuitOrDriverLoading,
    data: circuitOrDriverResult,
    flag,
  } = useSelector((state) => {
    if (dataFor === "Circuits") return state.circuitResult;
    else if (dataFor === "Drivers") return state.driverResult;
    else if (dataFor === "Dealers") return state.dealerResult;
    else if (dataFor === "Clubs") return state.clubsResult;
    else if (dataFor === "Influencers") return state.collectorsResult;
  });

  const renderCards = () => {
    return (circuitOrDriverResult?.[dataFor]?.results || []).map((ele) => (
      <Card
        key={ele.id}
        item={ele}
        onClick={(ele) => onCardClick(ele)}
        type="very-small"
      />
    ));
  };
  useEffect(() => {
    console.log("one");
    const queryParam = new URLSearchParams(history.location.search);
    queryParam.delete("pageNo");
    queryParam.delete("fetchSize");
    queryParam.append("pageNo", pageNo);
    queryParam.append("fetchSize", fetchSize);
    dispatch(apiCall(dataFor, queryParam.toString()));
    /* dispatch(apiCall(dataFor));*/
    return () => {
      dispatch(getResultReset());
    };
  }, []);

  useEffect(() => {
    console.log("two");
    // const queryParm = { pageNo: currentPage, fetchSize };
    const queryParm = new URLSearchParams(history.location.search);
    queryParm.delete("pageNo");
    queryParm.append("pageNo", currentPage);
    queryParm.delete("fetchSize");
    queryParm.append("fetchSize", fetchSize);
    if (search) {
      queryParm.delete("search");
      queryParm.append("search", search);
    } else {
      queryParm.delete("search");
    }
    history.replace(`?${queryParm.toString()}`);

    flag && dispatch(apiCall(dataFor, queryParm));
  }, [currentPage]);

  const handlePageChange = (pageState) => {
    setCurrentPage(pageState.selected);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (currentPage > 0) {
      setCurrentPage(0);
    } else {
      const queryParm = new URLSearchParams(history.location.search);
      queryParm.delete("pageNo");
      queryParm.append("pageNo", currentPage);
      queryParm.delete("fetchSize");
      queryParm.append("fetchSize", fetchSize);
      if (search) {
        queryParm.delete("search");
        queryParm.append("search", search);
      } else {
        queryParm.delete("search");
      }
      history.replace(`?${queryParm.toString()}`);
      dispatch(apiCall(dataFor, queryParm));
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  return (
    <div className="result">
      <header className="result-for">
        {showBackBtn && (
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
          {customHeading
            ? customHeading(history, circuitOrDriverResult?.[dataFor])
            : dataFor}
          <br />
          {!circuitOrDriverLoading && (
            <span style={{ fontSize: "14px" }}>
              {customCount ? (
                customCount(circuitOrDriverResult?.[dataFor], history)
              ) : (
                <>
                  {circuitOrDriverResult?.[dataFor]?.total || 0} {dataFor} found
                </>
              )}
            </span>
          )}
        </span>
      </header>
      <div className="result-sections">
        <section className="result-items no-side-bar" style={{ width: "100%" }}>
          {isSearchable && (
            <span className="dropdown-section circuits-driver">
              <form onSubmit={onSubmit}>
                {/* <span className="label dropdown-filter">Search: </span> */}
                <input
                  className="search-bar"
                  type="text"
                  name="dataSearch"
                  id="dataSearch"
                  value={search}
                  placeholder="Search..."
                  onChange={onChange}
                />
                <button className="search-btn" type="submit">
                  Search
                </button>
              </form>
            </span>
          )}
          <div className="result-items-container">
            <Loader
              isLoading={circuitOrDriverLoading}
              height={500}
              noData={!circuitOrDriverResult?.[dataFor]?.total}
            >
              {renderCards()}
            </Loader>
          </div>
          {!!circuitOrDriverResult?.[dataFor]?.total && (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(
                (circuitOrDriverResult?.[dataFor]?.total || 0) / fetchSize
              )}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"pagination no-side"}
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
    </div>
  );
};
export default CircuitsAndDriver;
