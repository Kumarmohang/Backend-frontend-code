/* eslint-disable react-hooks/exhaustive-deps */
import ImageGallery from "react-image-gallery";
import { useHistory, useLocation, Link } from "react-router-dom";
// import data from "./data";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./details.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import {
  getEventDetails as apiCall,
  getEventDetailsReset as getDetailsReset,
} from "./logic.js";

const Lots = ({ item: lots }) => {
  /* id=60dd2f0a7154c409419275c7&group=Auction+Events&grpIdx=1&subCatIdx=0&subCat=All&type=model */
  return (
    <div className="event" style={{ width: "auto" }}>
      <div className="event-section header">
        <div className="event-name">Lots</div>
        {/* <div className="event-year">Price</div> */}
      </div>
      {(lots || []).map((ele) => (
        <div className="event-section" key={`${ele._id}`}>
          <div className="event-name">
            <Link
              to={{
                pathname: "/details",
                search: new URLSearchParams({
                  id: ele._id,
                  group: "Auction Data",
                  type: "model",
                  grpIdx: 2,
                  subCatIdx: 0,
                  subCat: "All",
                }).toString(),
              }}
              className="link"
            >
              {ele.car_name}
            </Link>
          </div>
          {/* <div className="event-year">{ele.price}</div> */}
        </div>
      ))}
    </div>
  );
};

const EventDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("eventKey");
  // const [activeNavItem, setActiveNavItem] = useState(0);
  // const detailedData = data[id];
  const { loading = true, data: detailedData } = useSelector(
    (state) => state.eventDetail
  );

  useEffect(() => {
    dispatch(apiCall(location.search, id));
    return () => dispatch(getDetailsReset());
  }, []);

  const onClickOrganizer = (ele) => {
    //TODO: need to change logic according to organizer type
    history.push(`/details?clubName=${ele.organizer.key}&type=clubs`);
  };

  const renderClickableEle = (ele) => {
    if (ele.name === "Source") {
      return (
        <a
          className="value link"
          href={ele.link}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          {ele.value}
        </a>
      );
    } else if (ele.name === "Organizer" && ele.isClickable) {
      return (
        <span
          className="value link"
          role="presentation"
          onClick={() => onClickOrganizer(ele)}
        >
          {ele.value}
        </span>
      );
    }
    return <span className="value">{ele.value || "-"}</span>;
  };

  const renderInfo = () => {
    return (
      <div className="info">
        {(detailedData?.overview || []).map((ele, index) => (
          <div className="info-section" key={index}>
            <span className="label">{ele.name}</span>
            {renderClickableEle(ele)}
          </div>
        ))}
      </div>
    );
  };

  const renderDesc = () => {
    /* const { value = [] } = detailedData?.section1 || {};
    return value.length ? (
      value.map((ele) => <li className="highlight">{ele}</li>)
    ) : (
      <li className="no-data">No Data found</li>
    ); */
    return detailedData?.description?.length ? (
      detailedData?.description?.map((ele) => (
        <p
          className="highlight"
          dangerouslySetInnerHTML={{ __html: ele.replaceAll("\n", "<br>") }}
        ></p>
      ))
    ) : (
      <div className="no-data">No Data found</div>
    );
  };

  return (
    <div className="details-view">
      <div
        className="back-btn"
        role="presentation"
        onClick={() => history.goBack(-1)}
      >
        {"<"} Back
      </div>
      <div className="detail-data-container">
        <Loader isLoading={loading} height={500}>
          <div className="details">
            <section className="details-container">
              <div className="header-section">
                <h3 className="title">{detailedData?.name || "-"}</h3>
              </div>
              {renderInfo()}
            </section>

            <section className="gallery-container">
              <ImageGallery
                items={detailedData?.image || []}
                showPlayButton={false}
                additionalClass="custom-img"
                autoPlay={true}
                showBullets={false}
                thumbnailPosition="left"
                slideInterval={10000}
                showFullscreenButton={false}
                showThumbnails={detailedData?.showThumbnail}
                onErrorImageURL="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                onImageError={(e) => {
                  console.log(e);
                  e.target.src =
                    "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
                }}
              />
            </section>
          </div>
          <div style={{ display: "flex" }}>
            <div
              className={`circuit-desc${detailedData?.auction_lot ? " half-view" : " full-view"
                }`}
            >
              <div className="heading">Description</div>
              <div
                className="circuit-desc-container"
                style={{ maxHeight: 250 }}
              >
                {renderDesc()}
              </div>
            </div>
            {!!detailedData?.auction_lot && (
              <div className="circuit-desc half-view">
                <div className="heading">Lot Details</div>
                <div
                  className="circuit-desc-container"
                // style={{ overflowX: "hidden" }}
                >
                  <Lots item={detailedData.auction_lot} />
                </div>
              </div>
            )}
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default EventDetails;
