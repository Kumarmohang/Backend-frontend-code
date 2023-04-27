/* eslint-disable react-hooks/exhaustive-deps */
import ImageGallery from "react-image-gallery";
import { Link, useHistory, useLocation } from "react-router-dom";
// import data from "./data";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./details.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import { getClubDetailsReset, getClubDetails as apiCall } from "./logic.js";
// import ReadMore from "./readMore";

const SocialMedia = ({ item: socialMedia }) => {
  return (
    <div className="social-media">
      {(socialMedia || []).map((ele, index) => {
        return (
          <div className="info-section" key={index}>
            <span className="label">{ele.name}</span>
            {ele.clickable ? (
              <a
                className="value link"
                href={ele.link}
                target="_blank"
                rel="noreferrer"
              >
                {ele.value}
              </a>
            ) : (
              <span className="value">{ele.value || "-"}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
const Events = ({ item: events }) => {
  return (
    <div className="event">
      <div className="event-section header">
        <div className="event-name">Event</div>
        <div className="event-year">Date</div>
      </div>
      {(events || []).map((ele) => (
        <div
          className="event-section"
          key={`${ele.even_name}_${ele.event_date}`}
        >
          <div className="event-name">
            <Link
              to={{
                pathname: "/details",
                search: new URLSearchParams({
                  eventKey: ele.event_key,
                  type: "events",
                }).toString(),
              }}
              className="link"
            >
              {ele.event_name}
            </Link>
          </div>
          <div className="event-year">{ele.event_date}</div>
        </div>
      ))}
    </div>
  );
};

// const Timeline = ({ item: events }) => {
//   return <div className="timeline"></div>;
// };

const componentMapping = {
  "Social Media": SocialMedia,
  Events,
  // Auctions: AuctionContainer,
  // Specification: SocialMedia,
  // "Related Drivers": Drivers,
  // Highlights,
  // Timelines: Highlights,
  // "Cars By Dealer": DealerCarsContainer,
};

const Details = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // const id = query.get("id");
  const [activeNavItem, setActiveNavItem] = useState(0);
  // const detailedData = data[id];
  const { loading = true, data: detailedData } = useSelector(
    (state) => state.clubDetails
  );

  useEffect(() => {
    dispatch(apiCall(location.search));
    return () => dispatch(getClubDetailsReset());
  }, []);
  const renderHighlight = () => {
    /* const { value = [] } = detailedData?.section1 || {};
    return value.length ? (
      value.map((ele) => <li className="highlight">{ele}</li>)
    ) : (
      <li className="no-data">No Data found</li>
    ); */
    const { value = [] } = detailedData?.section2 || {};
    return value.length ? (
      value.map((ele) => <p className="highlight">{ele}</p>)
    ) : (
      <div className="no-data">No Data found</div>
    );
  };

  const renderSection3 = () => {
    const EmptyComp = () => <></>;
    const NavItemList = detailedData?.section3 || [];
    const RenderComp =
      componentMapping[NavItemList[activeNavItem]?.name] || EmptyComp;
    return (
      <div className="nav-section">
        <div className="nav-header">
          {NavItemList.map((ele, index) => (
            <h3
              className={`header inline${index === activeNavItem ? " active" : ""
                }`}
              key={`${index}_${ele.name}`}
              onClick={() => setActiveNavItem(index)}
            >
              {ele.name}
            </h3>
          ))}
        </div>

        {/* <h3 className="heading inline">Test 3</h3>
         */}
        <div className="nav-content">
          <RenderComp
            item={NavItemList[activeNavItem]?.value}
            carKey={detailedData?.key}
          />
        </div>
      </div>
    );
    // return EmptyComp;
  };

  const renderDesc = () => {
    return (detailedData?.section4?.value || []).map((ele, index) => {
      return (
        <div className="desc" key={index}>
          {ele.clickable ? (
            <a
              className="value"
              href={ele.link}
              target="_blank"
              rel="noreferrer"
            >
              {ele.heading}
            </a>
          ) : (
            ele.heading
          )}
        </div>
      );
    });
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
        <Loader isLoading={loading} height={500} noData={!!!detailedData}>
          <div className="details">
            <section className="details-container">
              <div className="header-section">
                <h3 className="title">{detailedData?.name || "-"}</h3>
              </div>
              <div className="info">
                {(detailedData?.overview || []).map((ele, index) => (
                  <div className="info-section" key={index}>
                    <span className="label">{ele.name}</span>
                    {ele.clickable ? (
                      <a
                        className="value break-word link"
                        href={ele.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {ele.value}
                      </a>
                    ) : (
                      <span className="value break-word">
                        {ele.value || "-"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="gallery-container">
              <ImageGallery
                items={detailedData?.image || []}
                showPlayButton={false}
                additionalClass="custom-img"
                autoPlay={true}
                showBullets={false}
                thumbnailPosition="left"
                showFullscreenButton={false}
                slideInterval={10000}
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
          <div className="highlight-container">
            <div className="left-section">
              <h3 className="heading">
                {" "}
                {detailedData?.section2?.name || "-"}:
              </h3>
              <div className="hightlights">{renderHighlight()}</div>
            </div>
            <div className="right-section">{renderSection3()}</div>
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default Details;

/*
      {
        (detailedData?.overview || []).map((ele, index) =>
        (
        <div className="info-section" key={index}>
          <span className="label">{ele.name}</span>
          {ele.clickable ? (
            <a
              className="value"
              href={ele.link}
              target="_blank"
              rel="noreferrer"
            >
              {ele.value}
            </a>
          )
          :
          (
            <span className="value">{ele.value || "-"}</span>
          ))
        }




*/
