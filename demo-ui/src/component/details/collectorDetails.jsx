/* eslint-disable react-hooks/exhaustive-deps */
import ImageGallery from "react-image-gallery";
import { useHistory, useLocation, Link } from "react-router-dom";
// import data from "./data";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./details.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
// import Card from "../results/card";

import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import {
  getCollectorDetails as apiCall,
  getCollectorDetailsReset as getDetailsReset,
} from "./logic.js";

/* function Arrow(props) {
  const { className, style, onClick, direction } = props;
  return (
    <div className={`${className} arrow`} style={style} onClick={onClick}>
      <i class={`fa fa-chevron-${direction}`} aria-hidden="true"></i>
    </div>
  );
} */

// const Cars = ({ data }) => {
//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     // variableWidth: true,
//     rows: 1,
//     nextArrow: <Arrow direction="right" />,
//     prevArrow: <Arrow direction="left" />,
//     // className: "center",
//     // centerMode: true,
//   };
//   const { cars = [] } = data || {};
//   const history = useHistory();
//   const onCardClick = (ele) => {
//     // const group = query.get("group");
//     // console.log();
//     const queryParam = new URLSearchParams({
//       id: ele.id,
//       group: "Cars",
//       type: "model",
//     }).toString();
//     // console.log({ ele });
//     history.push(`/details?${queryParam}`);
//   };

//   const renderCards = () => {
//     // console.log({ btn: group.cat.name === "Cars", group });
//     return (cars || []).map((ele) => (
//       <Card
//         key={ele.id}
//         item={ele}
//         onClick={(ele) => onCardClick(ele)}
//         className="collector-car"
//       />
//     ));
//   };
//   /* id=60dd2f0a7154c409419275c7&group=Auction+Events&grpIdx=1&subCatIdx=0&subCat=All&type=model */
//   return (
//     <div className="collector-car-container">
//       {/* <Slider {...settings} width={"650px"}>
//         {renderCards()}
//       </Slider>
//       <div className="view-all">
//         <Link
//           className="link"
//           to={{
//             pathname: `/collector/cars`,
//             search: new URLSearchParams({
//               type: "Collector Cars",
//               id: data?.id || "",
//               col_name: data?.name || "",
//             }).toString(),
//           }}
//         >
//           View All Cars
//         </Link>
//       </div> */}
//     </div>
//   );
// };

const CollectorDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  // const [activeNavItem, setActiveNavItem] = useState(0);
  // const detailedData = data[id];
  const { loading = true, data: detailedData } = useSelector(
    (state) => state.collectorDetail
  );

  useEffect(() => {
    dispatch(apiCall(location.search, id));
    return () => dispatch(getDetailsReset());
  }, []);

  const renderClickableEle = (ele) => {
    if (ele.name === "Source") {
      return (
        <a
          className="value link"
          href={ele.link}
          target="_blank"
          rel="noreferrer"
        >
          {ele.value}
        </a>
      );
    }
    return (
      <span className={`value ${ele.name.toLowerCase()}`}>
        {ele.value || "-"}
      </span>
    );
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
    return detailedData?.description?.length ? (
      detailedData?.description?.map((ele, index) => (
        <p
          className="highlight"
          key={`desc_${index}`}
          dangerouslySetInnerHTML={{ __html: ele.replaceAll("\n", "<br>") }}
        ></p>
      ))
    ) : (
      <div className="no-data">No Data found</div>
    );
  };

  // console.log(detailedData);

  const renderHeader = () => {
    let headerElement = [
      "Car",
      "Brand",
      "Model Name",
      "Chassis Number",
      "description",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  console.log(detailedData?.image);
  const renderBody = () => {
    return detailedData?.image.map(
      ({ thumbnail, brand_name, model_name, chassis_no, description }) => {
        return (
          <tr key={id}>
            <td>
              <img
                src={thumbnail}
                style={{ width: "350px", height: "250px" }}
              ></img>
            </td>
            <td className="date-width">{brand_name}</td>
            <td>{model_name}</td>
            <td>{chassis_no}</td>
            <td className="dec-width">{description}</td>
          </tr>
        );
      }
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
        <Loader isLoading={loading} height={500} noData={!!!detailedData}>
          <div className="details">
            <section className="details-container">
              <div className="header-section">
                <h3 className="title">{detailedData?.name || "-"}</h3>
              </div>
              {renderInfo()}
            </section>
            <section className="image-container">{renderDesc()}</section>
            <div></div>
            {/* <section className="gallery-container">
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
            </section> */}
          </div>
          <div style={{ display: "flex" }}>
            <div
              className={`circuit-desc${detailedData?.cars ? " half-view" : " full-view"
                }`}
            >
              <div className="heading">Influencers Gallery</div>
              <div
                className="circuit-desc-container"
                style={{ maxHeight: 400 }}
              >
                <table id="collector">
                  <thead>
                    <tr>{renderHeader()}</tr>
                  </thead>
                  <tbody style={{ width: "30px" }}>{renderBody()}</tbody>
                </table>
              </div>
            </div>
            {/* {!!detailedData?.cars && (
            <div className="circuit-desc half-view">
              <div className="heading">Top Cars in Collection</div>
              <div
                className="circuit-desc-container"
              // style={{ overflowX: "hidden" }}
              >
                <Cars data={detailedData || {}} />
              </div>
            </div>
          )} */}
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default CollectorDetails;
