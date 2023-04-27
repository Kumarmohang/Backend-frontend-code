/* eslint-disable react-hooks/exhaustive-deps */
import "./details.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import { useHistory, useLocation, Link } from "react-router-dom";
// import data from "./data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import Accordion from "../accordion";
import apiCall, { getDetailsReset } from "./logic.js";
// import ReadMore from "./readMore";
import Specifications from "./specifications";
// import Specifications from "./specifications2";
import PredictedPrice from "../valuation";
import { Image, Table } from "antd";
import { Modal } from "antd";
import { RadialChart } from "../compare/RadialChart";
import { getComparingCars } from "../compare/logic";

const FALLBACK_IMAGE =
  "https://driven.perpetualblock.io/api/static/no_image.png";
/* const FALLBACK_IMAGE =
  "https://driven.perpetualblock.io/api/static/cars/4230f695-f71e-460d-bfb6-d2b8923fc5e8";
 */
const Details = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // const id = query.get("id");
  const [activeNavItem, setActiveNavItem] = useState(0);
  // const detailedData = data[id];
  const {
    loading = true,
    data: detailedData,
    flag,
  } = useSelector((state) => state.detailedData);
  // console.log(detailedData, "from car detailed component");
  const dispatchComp = useDispatch();
  const { loading: loadingComp = true, data: comparisonData } = useSelector(
    (state) => state.comparisonData
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleGraphicalViewHeader = () => {
    if (detailedData?.section3?.[3]?.value?.[0]) {
      const ids = detailedData?.section3?.[3]?.value
        .filter((el, i) => i < 20)
        .map((el) => el.id)
        .join(",")
        .trim();
      dispatch(getComparingCars(`?ids=${ids}`));
      showModal();
    }
  };

  const handleGraphicalViewClick = (compIds) => {
    dispatchComp(getComparingCars(`?ids=${compIds}`));
    showModal();
  };

  useEffect(() => {
    dispatch(apiCall(location.search));
    return () => dispatch(getDetailsReset());
  }, []);

  const renderHighlight = () => {
    const { value = [] } = detailedData?.section2 || {};
    return value.length ? (
      value.map((ele, index) => (
        <p className="highlight pera" key={`desc_${index}`}>
          {ele}
        </p>
      ))
    ) : (
      <div className="no-data">No Data found</div>
    );
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (item) => {
        return (
          <Image
            src={item?.[0] || FALLBACK_IMAGE}
            alt="pic"
            style={{ objectFit: "contain", width: "80px", height: "80px" }}
            preview={false}
            fallback={FALLBACK_IMAGE}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title, item) => {
        return (
          <p
            onClick={() => {
              /* const queryParam = new URLSearchParams({
                id: item.id,
                group: "Cars Models",
                type: "model",
              }).toString();
              history.push(`/details?${queryParam}`);
              window.location.reload(); */
              dispatch(getDetailsReset());
              history.push(
                `/details?id=${item.id}&group=Cars+Models&grpIdx=0&subCatIdx=0&subCat=All&type=model`
              );
              dispatch(
                apiCall(
                  `?id=${item.id}&group=Cars+Models&grpIdx=0&subCatIdx=0&subCat=All&type=model`
                )
              );
            }}
            style={{ cursor: "pointer" }}
          >
            {title}
          </p>
        );
      },
    },
    {
      title: "Brand Name",
      dataIndex: "brand_name",
      key: "brand_name",
    },
    {
      title: (
        <>
          <p
            className="graphicalViewColumn"
            onClick={handleGraphicalViewHeader}
            style={{ margin: 0, padding: 0 }}
          >
            Graphical View
          </p>
          <p style={{ margin: 0, padding: 0, fontSize: "9.5px" }}>
            (Compares similar cars)
          </p>
        </>
      ),
      dataIndex: "id",
      key: "id",
      render: (item, title) => {
        return (
          <p
            className="graphicalViewColumn"
            onClick={() => {
              handleGraphicalViewClick(`${title.id},${detailedData.id}`);
              // console.log(`${title.id},${detailedData.id}`);
            }}
          >
            Compare individual cars
          </p>

          // <RadialChartCont
          //   chartIds={[{ id: title?.id }, { id: detailedData?.id }]}
          // />
        );
      },
    },
  ];

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
        grpIdx: 3,
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

  const SpecificCarsContainer = ({ item: specificCarDetails, carKey }) => {
    const history = useHistory();
    // const query = new URLSearchParams(history.location.search);
    const onClick = () => {
      const queryParam = {
        search: specificCarDetails?.[0]?.key,
        group: "Specific Cars",
        subCat: "All",
        grpIdx: 4,
        subCatIdx: 0,
      };
      history.push(`/search?${new URLSearchParams(queryParam).toString()}`);
    };
    return (
      <div className="auction-container">
        {specificCarDetails?.[0]?.count} specific cars found related to this car
        model.
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
                <span
                  className={`value ${ele.name}`}
                  title={ele.title || ele.value}
                >
                  {ele.value || "-"}
                </span>
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
              {ele.thumbnail && (
                <div className="thumbnail">
                  <img src={ele.thumbnail} alt={ele.name} />
                </div>
              )}

              {ele.flag_image && (
                <div className="flag">
                  <img
                    src={ele.flag_image}
                    alt={ele.nationality}
                    title={ele.nationality}
                  />
                </div>
              )}

              <div className="name">
                {" "}
                <Link
                  className="link"
                  to={{
                    pathname: "/details",
                    search: new URLSearchParams({
                      id: ele.id,
                      type: "drivers",
                    }).toString(),
                  }}
                >
                  {ele.name}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">No Data found</div>
        )}
      </div>
    );
  };

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

  const PriceInfo = ({ item: infoObj }) => {
    return (
      <div className="event">
        {/* <div className="event-section header">
        <div className="event-name">Condition</div>
        <div className="event-year">Approx Price</div>
      </div> */}
        {(infoObj.price_data || []).map((ele) => (
          <div className="event-section price-section" key={`${ele.condition}`}>
            <Accordion title={ele.year}>
              {ele.value.map(({ condition, price }) => (
                <div className="price-item" key={`${condition}_${ele.year}`}>
                  <div className="event-name">
                    {condition !== "averageValue" ? condition : "Average Price"}
                  </div>
                  <div className="event-year">{price}</div>
                </div>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    );
  };

  const K500Price = ({ item: priceData }) => {
    return (
      <div className="social-media">
        {(priceData || []).map((ele, index) => {
          return (
            <div className="info-section" key={index}>
              <span className="label">{ele.condition}</span>
              {ele.clickable ? (
                <a
                  className="value"
                  href={ele.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ele.price}
                </a>
              ) : (
                <span
                  className={`value ${ele.condition}`}
                  title={ele.title || ele.price}
                >
                  {ele.price || "-"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTableForSimilarCars = ({ item: similarCarData }) => {
    if (similarCarData.length > 0) {
      return (
        <Table
          dataSource={similarCarData || []}
          columns={columns}
          pagination={false}
          scroll={{ y: 300 }}
        />
      );
    } else {
      return <div className="no-data">No Data found</div>;
    }
  };

  const AuctionPrices = ({ item: auction }) => {
    return (
      <div className="event">
        <div className="event-section header">
          <div className="event-name">Year</div>
          <div className="event-year">Price</div>
        </div>
        {(auction || []).map((ele, index) => (
          <div
            className="event-section"
            key={`${ele.price}_${ele.year}_${index}`}
          >
            <div className="event-name">
              <a href={ele.link} target="_blank" rel="noopener noreferrer">
                {ele.year}
              </a>
            </div>
            <div className="event-year">{ele.price}</div>
          </div>
        ))}
      </div>
    );
  };

  const componentMapping = {
    Auctions: AuctionContainer,
    "Social Media": SocialMedia,
    Specification: SocialMedia,
    "Related Drivers": Drivers,
    Highlights,
    Events,
    Timelines: Highlights,
    "Cars From Dealers": DealerCarsContainer,
    "Resale Price": PriceInfo,
    "K500 Price Data": K500Price,
    "Auction Data": AuctionPrices,
    "Specific Cars": SpecificCarsContainer,
    "Similar Cars": renderTableForSimilarCars,
  };

  const renderSection3 = () => {
    const EmptyComp = () => <></>;
    const NavItemList = detailedData?.section3 || [];
    const RenderComp =
      componentMapping[NavItemList[activeNavItem]?.name] || EmptyComp;
    try {
      return (
        <div className="nav-section">
          <div className="nav-header">
            {NavItemList.map((ele, index) => (
              <h3
                className={`header inline${
                  index === activeNavItem ? " active" : ""
                }`}
                key={`${index}_${ele.name}`}
                onClick={() => setActiveNavItem(index)}
              >
                {ele.name}
              </h3>
            ))}
          </div>
          <div className="nav-content">
            <RenderComp
              item={NavItemList[activeNavItem]?.value}
              carKey={detailedData?.key}
            />
          </div>
        </div>
      );
    } catch (error) {
      return <>Something went Wrong</>;
    }
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

  const onClickCarModel = (ele) => {
    dispatch(getDetailsReset());
    history.push(
      `/details?id=${ele.key}&group=Cars+Models&grpIdx=0&subCatIdx=0&subCat=All&type=model`
    );
    dispatch(
      apiCall(
        `?id=${ele.key}&group=Cars+Models&grpIdx=0&subCatIdx=0&subCat=All&type=model`
      )
    );
  };

  const onClickBack = () => {
    history.goBack(-1);
    // TODO: Need to fix this
    setTimeout(() => {
      if (history.location.pathname === "/details") {
        dispatch(getDetailsReset());
        dispatch(apiCall(history.location.search));
      }
    }, 100);
  };

  const renderOverview = () => {
    return (detailedData?.overview || []).map((ele, index) => {
      // console.log({ ele });
      if (
        ele.name === "Auction listing Date" &&
        detailedData.is_upcoming_auction
      ) {
        return (
          <div className="info-section" key={index}>
            <span className="label">{"Upcoming auction date"}</span>
            <span className="value">
              {ele.value ? new Date(ele.value).toLocaleDateString() : "-"}
            </span>
          </div>
        );
      }
      if (ele.name === "Auction listing Date") {
        return (
          <div className="info-section" key={index}>
            <span className="label">{ele.name}</span>
            <span className="value">
              {ele.value ? new Date(ele.value).toLocaleDateString() : "-"}
            </span>
          </div>
        );
      }
      if (ele.name === "Collectables") {
        return (
          <div className="info-section">
            <span className="value collectables">{ele.value}</span>
          </div>
        );
      }
      if (ele.name === "racing car") {
        return (
          <div className="info-section">
            <span className="value collectables">{ele.value}</span>
          </div>
        );
      }
      if (ele.name === "Concept_car") {
        return (
          <div className="info-section">
            <span className="value collectables">{ele.value}</span>
          </div>
        );
      }
      if (ele.name === "Few offs") {
        return (
          <div className="info-section">
            <span className="value collectables">{ele.value}</span>
          </div>
        );
      }
      if (ele.name === "Fewoffs") {
        return (
          <div className="info-section">
            <span className="value collectables">{ele.value}</span>
          </div>
        );
      }
      if (ele.name === "Model Name") {
        return (
          <div className="info-section" key={index}>
            <span className="label">{ele.name}</span>
            {ele.clickable ? (
              <span
                className="value link"
                role="presentation"
                // to={`/details?id=${ele.key}&group=Cars&grpIdx=0&subCatIdx=0&subCat=All&type=model`}
                onClick={() => onClickCarModel(ele)}
                style={{
                  cursor: ele.clickable ? "pointer" : "not-allowed",
                }}
              >
                {ele.value}
              </span>
            ) : (
              <span
                className="value link"
                role="presentation"
                style={{ cursor: "not-allowed" }}
              >
                {ele.value}
              </span>
            )}
          </div>
        );
      }
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
                  style={{ textTransform: "capitalize" }}
                >
                  {source.source_name}
                </a>
                {index !== ele.value.length - 1 && <span>, </span>}
              </>
            ))}
          </div>
        );
      }
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
            <span
              className={`value ${ele.name}`}
              title={ele.title || ele.value}
            >
              {ele.value || "-"}
            </span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="details-view">
      <div className="back-btn" role="presentation" onClick={onClickBack}>
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
                {renderOverview()}
                {query.get("group") === "Auction Data" && flag && (
                  <PredictedPrice carData={detailedData} />
                )}
              </div>
            </section>

            <section className="gallery-container">
              <ImageGallery
                items={detailedData?.image || []}
                /* items={
                  detailedData?.image?.map((ele) => ({
                    original: ele.original || FALLBACK_IMAGE,
                    thumbnail: ele.thumbnail || FALLBACK_IMAGE,
                  })) || []
                } */
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
                  // console.log(e);
                  e.target.src =
                    "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
                }}
              />
            </section>
          </div>
          <div className="highlight-container">
            {detailedData?.section2 &&
              detailedData?.section2?.value?.length > 0 && (
                <div className="left-section">
                  <h3 className="heading">
                    {" "}
                    {detailedData?.section2?.name || "-"}:
                  </h3>
                  <div className="hightlights">{renderHighlight()}</div>
                </div>
              )}
            <div
              className={`right-section${
                detailedData?.section2 &&
                detailedData?.section2?.value?.length > 0
                  ? ""
                  : " full-width"
              }`}
            >
              {renderSection3()}
            </div>
          </div>
          {detailedData?.section4 &&
            !!detailedData?.section4?.value?.length && (
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
      {!loadingComp ? (
        <Modal
          title="Graphical View"
          centered
          width={600}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <RadialChart
            comparisonData={comparisonData}
            isDetailScreen={true}
            name={detailedData?.header}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default Details;
