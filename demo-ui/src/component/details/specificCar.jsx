/* eslint-disable react-hooks/exhaustive-deps */
import ImageGallery from "react-image-gallery";
import { useHistory, useLocation, Link } from "react-router-dom";
// import data from "./data";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./details.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import apiCall, { getDetailsReset } from "./logic.js";
import Specifications from "./specifications";
import Timeline from "./timeline";

const SpecificCarDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  // const [activeNavItem, setActiveNavItem] = useState(0);
  // const detailedData = data[id];
  const { loading = true, data: detailedData } = useSelector(
    (state) => state.detailedData
  );

  useEffect(() => {
    dispatch(apiCall(location.search, id));
    return () => dispatch(getDetailsReset());
  }, []);

  const onClickAuction = (ele) => {
    console.log({ test: detailedData.serial_number });
    const queryParam = {
      vin: detailedData.serial_number,
      search: "",
      // searchBy: "chassis",
      group: "Auction Data",
      subCat: "All",
      grpIdx: 2,
      subCatIdx: 0,
      showSideBar: false,
    };
    history.push(`/search?${new URLSearchParams(queryParam).toString()}`);
  };

  /* const onClickCarModel = (ele) => {
    console.log({ ele });
    if (ele.clickable) {
      dispatch(getDetailsReset());
      dispatch(apiCall(location.search));
      history.replace(
        `/details?id=${ele.key}&group=Cars&grpIdx=0&subCatIdx=0&subCat=All&type=model`
      );
    }
  }; */

  const renderClickableEle = (ele) => {
    if (ele.name === "Sources") {
      // console.log("hear");
      return (
        <div className="value">
          {ele.value.map((source, index) => (
            <>
              <a
                key={`source_${index}`}
                href={source.url}
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                {source.source_name}
              </a>
              {index !== ele.value.length - 1 && <span>, </span>}
            </>
          ))}
        </div>
      );
    }
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
    } else if (ele.name === "Model Name") {
      return ele.clickable ? (
        <Link
          className="value link"
          role="presentation"
          to={`/details?id=${ele.key}&group=Cars+Models&grpIdx=0&subCatIdx=0&subCat=All&type=model`}
          // onClick={() => onClickCarModel(ele)}
          style={{ cursor: ele.clickable ? "pointer" : "not-allowed" }}
        >
          {ele.value}
        </Link>
      ) : (
        <span
          className="value link"
          role="presentation"
          style={{ cursor: "not-allowed" }}
        >
          {ele.value}
        </span>
      );
    } else if (ele.name === "Auctions") {
      return (
        <span
          className="value link"
          role="presentation"
          onClick={() => onClickAuction(ele)}
        >
          View Auctions
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

  const renderRestorationDetails = () => {
    return detailedData.restorations.map((ele, index) => {
      return (
        <div className="restoration-item">
          <div className="restorer-name">
            <span className="label">Restored By:</span>
            <span className="value link">{ele.by}</span>
          </div>
          <div className="restoration-steps">
            {ele.restoration_process.map((ele, index) => (
              <div className="restoration-step">{ele}</div>
            ))}
          </div>
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
                showFullscreenButton={false}
                showThumbnails={detailedData?.showThumbnail}
                slideInterval={10000}
                onErrorImageURL="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                onImageError={(e) => {
                  console.log(e);
                  e.target.src =
                    "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
                }}
                lazyLoad
              />
            </section>
          </div>
          {detailedData?.timeline && (
            <div className="timeline-section">
              <div className="heading">Timeline</div>
              <div className="timeline-contain">
                <Timeline timelineDetails={detailedData?.timeline} />
              </div>
            </div>
          )}
          <div style={{ display: "flex" }}>
            <div
              className={`circuit-desc${detailedData?.restoration ||
                  detailedData?.restorations ||
                  detailedData?.history
                  ? " half-view"
                  : ""
                }`}
            >
              {detailedData?.description && (
                <>
                  <div className="heading">Description</div>
                  <div className="circuit-desc-container">
                    {detailedData?.description || "N/A"}
                  </div>
                </>
              )}
            </div>
            {!!detailedData?.restoration && (
              <div className="circuit-desc half-view">
                <div className="heading">Restoration Details</div>
                <div className="circuit-desc-container">
                  <ul>
                    {detailedData?.restoration.map((ele, index) => (
                      <li key={`re_${index}`}>{ele}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {!!detailedData?.restorations && (
              <div className="circuit-desc half-view">
                <div className="heading">Restoration Details</div>
                <div className="restoration">{renderRestorationDetails()}</div>
              </div>
            )}

            {!!detailedData?.history && (
              <div className="circuit-desc half-view">
                <div className="heading">History</div>
                <div className="circuit-desc-container">
                  <ul>
                    {detailedData?.history.map((ele, index) => (
                      <li key={`re_${index}`}>{ele}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          {/* ------------------------- */}
          {detailedData?.specifications && (
            <Specifications specifications={detailedData.specifications} />
          )}
        </Loader>
      </div>
    </div>
  );
};

export default SpecificCarDetails;
