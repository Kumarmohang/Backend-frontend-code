/* eslint-disable react-hooks/exhaustive-deps */
import ImageGallery from "react-image-gallery";
import { useHistory, useLocation } from "react-router-dom";
// import data from "./data";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./details.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import apiCall, { getDetailsReset } from "./logic.js";
// import ReadMore from "./readMore";
import Specifications from "./specifications";

/* const NAV_DATA = [
  {name: }, {}
]; */

const AuctionContainer = ({ item: auctionDetails, carKey }) => {
  const history = useHistory();
  // const query = new URLSearchParams(history.location.search);
  const onClick = () => {
    const queryParam = {
      search: auctionDetails?.[0]?.key,
      group: "Auction Data",
      subCat: "All",
      grpIdx: 2,
      subCatIdx: 0,
    };
    history.push(`/search?${new URLSearchParams(queryParam).toString()}`);
  };
  return (
    <div className="auction-container">
      {auctionDetails?.[0]?.count} auctions found related to this car model.
      <br></br>
      <span className="link" role="presentation" onClick={onClick}>
        click here
      </span>{" "}
      for auction details.
    </div>
  );
};

const DealerCarsContainer = ({ item: dealerCarDetails, carKey }) => {
  const history = useHistory();
  // const query = new URLSearchParams(history.location.search);
  const onClick = () => {
    const queryParam = {
      search: dealerCarDetails?.[0]?.key,
      group: "Cars For Sale",
      subCat: "All",
      grpIdx: 4,
      subCatIdx: 0,
    };
    history.push(`/search?${new URLSearchParams(queryParam).toString()}`);
  };
  return (
    <div className="auction-container">
      {dealerCarDetails?.[0]?.count} cars found related to this car model.
      <br></br>
      <span className="link" role="presentation" onClick={onClick}>
        click here
      </span>{" "}
      for details.
    </div>
  );
};

const SocialMedia = ({ item: socialMedia }) => {
  return (
    <div className="social-media">
      {(socialMedia || []).map((ele, index) => {
        return (
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
            ) : (
              <span className="value">{ele.value || "-"}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Drivers = ({ item: drivers }) => {
  return (
    <div className="drivers">
      {drivers.length > 0 ? (
        (drivers || []).map((ele, index) => (
          <div className="drivers-section" key={`${ele.name}_${index}`}>
            <div className="thumbnail">
              <img src={ele.thumbnail} alt={ele.name} />
            </div>

            <div className="flag">
              <img
                src={ele.flag_image}
                alt={ele.nationality}
                title={ele.nationality}
              />
            </div>

            <div className="name">
              {" "}
              <a href={ele.link} target="_blank" rel="noopener noreferrer">
                {ele.name}
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="no-data">No Data found</div>
      )}
    </div>
  );
};

/* {(highlights || []).map((ele, index) => (
        <p className="highlight-item" key={`highlight_${index}`}>
          {ele}
        </p>
      ))} */
const Highlights = ({ item: highlights }) => {
  return (
    <div className="highlights-section">
      {(highlights?.length || 0) > 0 ? (
        (highlights || []).map((ele, index) => (
          <p className="highlight-item" key={`highlight_${index}`}>
            {ele}
          </p>
        ))
      ) : (
        <div className="no-data">No data found</div>
      )}
    </div>
  );
};

const Events = ({ item: events }) => {
  return (
    <div className="event">
      <div className="event-section header">
        <div className="event-name">Event</div>
        <div className="event-year">Year</div>
      </div>
      {(events || []).map((ele) => (
        <div
          className="event-section"
          key={`${ele.even_name}_${ele.event_year}`}
        >
          <div className="event-name">
            <a href={ele.link} target="_blank" rel="noopener noreferrer">
              {ele.event_name}
            </a>
          </div>
          <div className="event-year">{ele.event_year}</div>
        </div>
      ))}
    </div>
  );
};

// const Timeline = ({ item: events }) => {
//   return <div className="timeline"></div>;
// };

const componentMapping = {
  Auctions: AuctionContainer,
  "Social Media": SocialMedia,
  Specification: SocialMedia,
  "Related Drivers": Drivers,
  Highlights,
  Events,
  Timelines: Highlights,
  "Cars By Dealer": DealerCarsContainer,
};

const Details = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [activeNavItem, setActiveNavItem] = useState(0);
  // const detailedData = data[id];
  const { loading = true, data: detailedData } = useSelector(
    (state) => state.detailedData
  );

  useEffect(() => {
    dispatch(apiCall(location.search));
    return () => dispatch(getDetailsReset());
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
                        className="value"
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
          {detailedData?.section4 && !!detailedData?.section4?.value?.length && (
            <div className="desc-section">
              <div className="heading">
                {" "}
                {detailedData?.section4.name || "-"} :
              </div>
              {renderDesc()}
            </div>
          )}
          {detailedData?.specifications && (
            <Specifications specifications={detailedData.specifications} />
          )}
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
