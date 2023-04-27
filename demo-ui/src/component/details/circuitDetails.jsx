/* eslint-disable react-hooks/exhaustive-deps */
import ImageGallery from "react-image-gallery";
import { useHistory, useLocation } from "react-router-dom";
// import data from "./data";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./details.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import {
  getCircuitDetails as apiCall,
  getCircuitDetailsReset,
} from "./logic.js";
// import Specifications from "./specifications";
// import Timeline from "./timeline";

const CircuitDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // const query = new URLSearchParams(location.search);
  // const [activeNavItem, setActiveNavItem] = useState(0);
  // const detailedData = data[id];
  const { loading = true, data: detailedData } = useSelector(
    (state) => state.circuitDetails
  );

  useEffect(() => {
    dispatch(apiCall(location.search));
    return () => dispatch(getCircuitDetailsReset());
  }, []);

  const renderDescription = () => {
    return detailedData?.description.map((ele, index) => {
      return <p key={`desc_${index}`}>{ele}</p>;
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
                    {ele.name === "Website:" ? (
                      <a
                        className="value"
                        href={ele.value}
                        target="_blank"
                        rel="noreferrer"
                        title={ele.value}
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textTransform: "lowercase",
                        }}
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

          <div className="circuit-desc">
            <div className="heading">Description</div>
            <div className="circuit-desc-container">{renderDescription()}</div>
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default CircuitDetails;
