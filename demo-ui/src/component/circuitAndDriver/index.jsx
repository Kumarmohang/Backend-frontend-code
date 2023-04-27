/* eslint-disable react-hooks/exhaustive-deps */
import "../results/results.scss";
// import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Pagination } from "antd";
import Loader from "../loader";
import Card from "../results/card";
import apiCall, { getResultReset } from "./logic";
import { SearchOutlined } from "@ant-design/icons";

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

  const { loading: circuitOrDriverLoading, data: circuitOrDriverResult } =
    useSelector((state) => state.circuitOrDriverResult);

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
    dispatch(apiCall(dataFor, queryParm));
  }, [currentPage]);

  const handlePageChange = (pageState) => {
    setCurrentPage(pageState - 1);
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
    <div className="result" style={{ flexDirection: "column" }}>
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
            <span
              style={{
                fontSize: "14px",
                color: "#000",
                textTransform: "initial",
              }}
            >
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
      <div className="result-sections" style={{ paddingLeft: 0 }}>
        <section className="result-items no-side-bar" style={{ width: "100%" }}>
          {isSearchable && (
            <span className="dropdown-section circuits-driver">
              <form onSubmit={onSubmit} className="search-form">
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
                  <SearchOutlined />
                </button>
              </form>
            </span>
          )}
          <div
            className={`result-items-container small-col${circuitOrDriverLoading ? " loading-col" : ""
              }`}
          >
            <Loader
              isLoading={circuitOrDriverLoading}
              height={500}
              noData={!circuitOrDriverResult?.[dataFor]?.total}
            >
              {renderCards()}
            </Loader>
          </div>
          {!circuitOrDriverLoading &&
            !!circuitOrDriverResult?.[dataFor]?.total && (
              <Pagination
                className="pagination"
                size="small"
                current={currentPage + 1}
                defaultCurrent={1}
                total={circuitOrDriverResult?.[dataFor]?.total}
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
export default CircuitsAndDriver;
