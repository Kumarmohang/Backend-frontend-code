import { message, Pagination } from "antd";
import Card from "../results/card";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import apiClient from "../../utils";
import Loader from "../loader";
import "./advanceSearch.scss";

/* Api configuration for axios */
const API_CONFIG = {
  GET_ADVANCE_SEARCH_RESULTS: {
    method: "GET",
    url: "/advanceSearchResults",
  },
};

/*  ------- AdvanceFilterResults Component -------  */

const AdvanceFilterResults = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState(null);
  const { data: compareList = [] } = useSelector((state) => state.compareList);
  const query = new URLSearchParams(history.location.search);
  const pageNo = query.get("pageNo") ? parseInt(query.get("pageNo"), 10) : 0;
  const [currentPage, setCurrentPage] = useState(pageNo);

  /* --------QUERY PARAMS----------- */

  const fetchSize = query.get("fetchSize")
    ? parseInt(query.get("fetchSize"), 10)
    : 24;
  const searchFor = query.get("search");

  /**
   * @description - This function push the history with ele props for render car detail page.
   * @param {object} ele - Takes ele as object.
   * @returns {void}
   */
  const onCardClick = (ele) => {
    const group = "Cars Models";
    const queryParam = new URLSearchParams({
      id: ele.id,
      group,
      type: "model",
    }).toString();
    history.push(`/details?${queryParam}`);
  };

  /**
   * @description - This function render cards to show data.
   * @returns {JSX[]}
   */
  const renderCards = () => {
    return carData?.results?.map((ele) => (
      <Card
        key={ele.id}
        item={{
          ...ele,
          extraData: ele.is_upcoming_auction ? "Upcoming Auction" : false,
        }}
        onClick={(ele) => onCardClick(ele)}
        showAddBtn={query.get("group") === "Cars Models"}
        list={compareList}
        showCross={ele.is_garbage}
      />
    ));
  };

  /**
   * @description - This function use for get latest results when page load first or on page change or queryParams change.
   * @returns {void}
   */
  const apiCallForResult = () => {
    const queryParams = new URLSearchParams(history.location.search);
    const apiPayload = { ...API_CONFIG.GET_ADVANCE_SEARCH_RESULTS };
    apiPayload.url += `?${queryParams.toString()}`;
    setLoading(true);
    apiClient(apiPayload)
      .then((res) => {
        setCarData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        message.error(err);
      });
  };

  /**
   * @description - This function use for get latest results on page change.
   * @param {number} pageState - Takes pageState as number.
   * @returns {void}
   */
  const handlePageChange = (pageState) => {
    setCurrentPage(pageState - 1);
    const queryParam = new URLSearchParams(history.location.search);
    if (pageState.selected !== pageNo) {
      queryParam.set("pageNo", pageState - 1);
      history.push(`/advanceSearchResults?${queryParam.toString()}`);
      apiCallForResult(queryParam.toString());
    }
  };

  useEffect(() => {
    apiCallForResult();
  }, []);

  return (
    <div className="advanceSearchResults">
      <header className="advanceSearchResults-for">
        <span
          className="back-btn"
          role="presentation"
          onClick={() => {
            history.goBack();
          }}
        >
          <span>{"< Back"}</span>
        </span>

        <span className="heading-text">
          <span style={{ color: "#000", textTransform: "initial" }}>
            {`Results for: ${!!searchFor || query.get("make") || "All Brands"}`}
          </span>

          <br />
          {!loading && (
            <span
              style={{
                fontSize: "14px",
                color: "#000",
                textTransform: "initial",
              }}
            >
              {carData?.total || 0} records found
            </span>
          )}
        </span>
      </header>
      <div className="advanceSearchResults-sections">
        <div className={`advanceSearchResults-items-container`}>
          <Loader isLoading={loading} height={500}>
            {!!carData && renderCards()}
          </Loader>
        </div>
        {!loading && !!carData?.total && (
          <Pagination
            className="pagination"
            size="small"
            current={currentPage + 1}
            defaultCurrent={1}
            total={carData?.total || 0}
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
      </div>
    </div>
  );
};

export default AdvanceFilterResults;
