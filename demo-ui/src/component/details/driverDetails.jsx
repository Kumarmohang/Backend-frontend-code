/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import { getDriveDetailsReset, getDriveDetails as apiCall } from "./logic.js";
import DriverStats from "./driverStats";
import DriverRaceEvent from "./driverEvent";
import Table from "../table";
import "./details.scss";
// import ReadMore from "./readMore";

/* const NAV_DATA = [
  {name: }, {}
]; */

const highlightHeaderList = [
  {
    key: "year",
    display: "Year",
  },
  {
    key: "event_name",
    display: "Event Name",
  },
  {
    key: "position",
    display: "Position",
  },
];

const CareerHighlight = ({ item: careerHighlight }) => {
  return (
    <Table
      header={highlightHeaderList}
      data={careerHighlight}
      customClass="highlights-table"
    ></Table>
  );
};

/* const Drivers = ({ item: drivers }) => {
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
}; */
const Cars = ({ item: cars }) => {
  return (
    <div className="drivers">
      {cars.length > 0 ? (
        (cars || []).map((ele, index) => (
          <div className="drivers-section" key={`${ele.name}_${index}`}>
            {ele.thumbnails?.[0] && (
              <div className="thumbnail">
                <img src={ele.thumbnails?.[0]} alt={ele.title} />
              </div>
            )}

            {/* {ele.thumbnails?.[0] && (
              <div className="flag">
                <img
                  src={ele.thumbnails?.[0]}
                  alt={ele.title}
                  title={ele.title}
                />
              </div>
            )} */}

            <div className="name">
              {" "}
              <Link
                className="link"
                to={{
                  pathname: "/details",
                  search: new URLSearchParams({
                    id: ele.id,
                    type: "model",
                    group: "Cars Models",
                  }).toString(),
                }}
              >
                {ele.title}
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

// const Achievements = ({ item: events }) => {
//   return (
//     <div className="event">
//       {/* <div className="event-section header">
//         <div className="event-name">Event</div>
//         <div className="event-year">Year</div>
//       </div> */}
//       {(events || []).map((ele) => (
//         <div className="event-section" key={`${ele.key}`}>
//           <div className="event-name capitalize">
//             <a href={ele.link} target="_blank" rel="noopener noreferrer">
//               {ele.key}:
//             </a>
//           </div>
//           <div className="event-year">{ele.value}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const Events = ({ item: events }) => {
//   return (
//     <div className="event">
//       <div className="event-section header">
//         <div className="event-name">Event</div>
//         <div className="event-year">Year</div>
//       </div>
//       {(events || []).map((ele) => (
//         <div
//           className="event-section"
//           key={`${ele.even_name}_${ele.event_year}`}
//         >
//           <div className="event-name">
//             <a
//               className="link"
//               href={ele.link}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {ele.event_name}
//             </a>
//           </div>
//           <div className="event-year">{ele.event_year}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

const componentMapping = {
  "ESports Highlights": CareerHighlight,
  "Racing Highlights": CareerHighlight,
  "Karting Highlights": CareerHighlight,

  // Teammates: Drivers,
  // Events,
  // Achievements,
  // Highlights: Achievements,

  Cars,
};

const DriverDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // const query = new URLSearchParams(location.search);
  // const id = query.get("id");
  const [activeNavItem, setActiveNavItem] = useState(0);
  // const detailedData = data[id];
  const { loading = true, data: detailedData } = useSelector(
    (state) => state.driverDetail
  );
  useEffect(() => {
    dispatch(apiCall(location.search));
    return () => dispatch(getDriveDetailsReset());
  }, []);
  const renderDescription = () => {
    const { value = [] } = detailedData?.section2 || {};
    console.log({ value });
    return value.length ? (
      value.map((ele, index) => (
        <p className="highlight" key={`desc_${index}`}>
          {ele}
        </p>
      ))
    ) : (
      <div className="no-data">No Data found</div>
    );
  };

  const renderNavSection = () => {
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
    }

    if (ele.name === "full name") {
      return (
        <span
          className="value info-value"
          style={{ textTransform: "capitalize" }}
        >
          {ele.value || "-"}
        </span>
      );
    }

    return (
      <span className="value info-value">
        {(ele.name === "birth date" || ele.name === "death date") && ele.value
          ? new Date(ele.value).toLocaleDateString()
          : ele.value || "-"}
      </span>
    );
  };

  const renderInfo = () => {
    return (
      <div className="info">
        {(detailedData?.overview || []).map((ele, index) => (
          <div className="info-section" key={index}>
            <span className="label info-label">{ele.name}</span>
            {renderClickableEle(ele)}
          </div>
        ))}
      </div>
    );
  };

  const renderRaceHistory = () => {
    return (
      <div className="desc-section">
        <div className="heading">Career History</div>
        {/* <div className="race-history-section"></div> */}
        <DriverRaceEvent data={detailedData?.raceHistory} />
      </div>
    );
  };
  const onError = (e) => {
    const { target } = e;
    target.src =
      "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
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
          <div className="details driver-details">
            <section className="image-section">
              <img
                src={detailedData?.image}
                alt={detailedData?.name}
                onError={onError}
              />
            </section>
            <section className="details-container" style={{ width: "80%" }}>
              <div className="header-section">
                <h3 className="title">{detailedData?.name || "-"}</h3>
              </div>
              {renderInfo()}
            </section>
          </div>
          <div className="highlight-container">
            {detailedData?.section2 && (
              <div className="left-section">
                <h3 className="heading">
                  {" "}
                  {detailedData?.section2?.name || "-"}:
                </h3>
                <div className="hightlights">{renderDescription()}</div>
              </div>
            )}
            <div
              className={`right-section${detailedData?.section2 ? "" : " full-width"
                }`}
            >
              {renderNavSection()}
            </div>
          </div>
          {!!detailedData?.stats?.length && (
            <DriverStats statData={detailedData.stats} />
          )}
          {!!detailedData?.raceHistory && renderRaceHistory()}
        </Loader>
      </div>
    </div>
  );
};

export default DriverDetails;
