import { useHistory } from "react-router-dom";
import Loader from "../../loader";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card";
import { useEffect } from "react";
// import Slider from "../../slidableCards";
import apiCall from "../logic";
import "./search-overview.scss";
import { RightOutlined } from "@ant-design/icons";
// import Slider from "../../slidableCards";

/* function Arrow(props) {
  const { className, style, onClick, direction } = props;
  return (
    <div
      className={`${className} arrow`}
      style={{ ...style }}
      onClick={onClick}
    >
      <i
        className={`fa fa-chevron-${direction}`}
        aria-hidden="true"
        style={{
          fontSize: "35px",
          color: "#f34a4a",
        }}
      ></i>
    </div>
  );
} */

/* const SLIDABLE_SETTINGS = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  variableWidth: true,
  // slidesPerRow: 5,
  // dots: true,
rows: 1,
  nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
      responsive: [
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            // dots: true,
            rows: 1,
            variableWidth: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            // dots: true,
            rows: 1,
            variableWidth: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            // dots: true,
            rows: 1,
            variableWidth: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // dots: true,
            rows: 1,
            variableWidth: true,
          },
        },
        {
          breakpoint: 1,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            // dots: true,
            rows: 1,
            variableWidth: true,
          },
        },
      ],
  // className: "center",
  // centerMode: true,
}; */
const HEADER_TEXT = {
  "Cars Models": "Models",
  "Auction Data": "Auction Houses",
  "Cars For Sale": "Dealers",
  "Specific Cars": "Specific Cars Sources",
  "Cars From Dealers": "Dealers",
};
const AllDataOverview = ({ onHeaderClick: propsOnHeaderClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    loading: allResultLoading = true,
    data: allResultSearchData,
    queryparam: allResultPreviousQuery,
  } = useSelector((state) => state.searchData);
  let carData = [];
  if (allResultSearchData !== null) {
    const { results } = allResultSearchData;
    carData = results;
  }
  useEffect(() => {
    const query = new URLSearchParams(history.location.search);

    if (
      (allResultSearchData === null ||
        query?.toString() !== allResultPreviousQuery) &&
      allResultLoading !== true
    ) {
      dispatch(apiCall.getSearchResult(query?.toString()));
    }
  }, []);
  const onCardClick = (group, ele) => {
    // const group = query.get("group");
    const queryParam = new URLSearchParams({
      id: ele.id,
      group: group,
      type: group === "Specific Cars" ? "specific-car" : "model",
    }).toString();
    history.push(`/details?${queryParam}`);
  };

  const renderCard = (item) => {
    return (item?.value || []).slice(0, 5).map((ele) => (
      <Card
        key={ele.id}
        onClick={(ele) => onCardClick(item.type, ele)}
        item={{
          ...ele,
        }}
        showCross={ele.is_garbage}
      />
    ));
  };
  const onHeaderClick = (ele) => {
    const query = new URLSearchParams(history.location.search);
    query.set(
      "group",
      ele.type !== "Cars From Dealers" ? ele.type : "Cars For Sale"
    );
    query.set("subCat", "All");
    query.set("pageNo", 0);
    query.set("fetchSize", 24);
    history.push(`${history.location.pathname}?${query.toString()}`);
    propsOnHeaderClick();
    dispatch(apiCall.getCarsResult(query.toString()));
  };
  const renderOverview = () => {
    return carData.map((ele, index) => {
      return (
        <div className="search-overview-item" key={ele.type + "_" + index}>
          <div className="search-overview-heading">
            <span className="title" onClick={() => onHeaderClick(ele)}>
              {HEADER_TEXT[ele.type]}
              <span className="view-more">
                <RightOutlined
                  style={{ color: "#f34a4a", fontWeight: "bolder" }}
                />
              </span>
            </span>{" "}
          </div>
          <div className="search-overview-section">
            {/* <Slider {...SLIDABLE_SETTINGS} variableWidth> */}
            {renderCard(ele)}
            {/* </Slider> */}
          </div>

          {/* <Slider {...SLIDABLE_SETTINGS}>{renderCard(ele)}</Slider> */}
        </div>
      );
    });
  };
  return (
    <Loader
      isLoading={allResultLoading}
      height={500}
      noData={!allResultSearchData?.total}
    >
      <div className={`search-overview${allResultLoading ? " loading" : ""}`}>
        {renderOverview()}
      </div>
    </Loader>
  );
};
export default AllDataOverview;
