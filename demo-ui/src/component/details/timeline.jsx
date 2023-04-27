import { useHistory } from "react-router-dom";
import { timelineData } from "./data";
import "./timeline.scss";

const Timeline = ({ timelineDetails = timelineData }) => {
  const history = useHistory();
  const onClick = (ele) => {
    if (ele.auction) {
      history.push(
        `/details?car_link=${ele.auction.auction_link}&group=Auction+Events&grpIdx=0&subCatIdx=0&subCat=All`
      );
    }
  };
  const renderTimelineElement = () => {
    let isBotImg = false;
    return timelineDetails.map((ele, index) => {
      const node = (
        <li key={index}>
          {/* <div class={`img-handler-${isBotImg ? "top" : "bot"}`}>
            {ele.image[0] && (
              <img
                src={ele.image[0]}
                alt="Not found"
                className="timeline-image"
              />
            )}
          </div> */}
          <div class={`ps-${isBotImg ? "bot" : "top"}`}>
            <p
              role="presentation"
              onClick={() => onClick(ele)}
              className={ele.auction ? "link" : ""}
            >
              {ele.info}
            </p>
          </div>
          <span class={`outside ps-sp-${isBotImg ? "bot" : "top"}`}>
            <span title={new Date(ele.date).toLocaleDateString()}>
              {ele.displayDate}
            </span>
          </span>
        </li>
      );
      isBotImg = !isBotImg;
      return node;
    });
  };
  return (
    <section className="ps-timeline-sec">
      <div className="container">
        <ol className="ps-timeline">{renderTimelineElement()}</ol>
      </div>
    </section>
  );
};

export default Timeline;
/* {
    "date": "12/mar/04",
    "info": "80/early - Orvin L Middleton, Santa Barbara, California, USA (red/black)",
    "image": [
      "https://www.mediacenter.plus/MCSIMG_9e285316-903e-4de0-9769-2419b4f4ba9f.jpg_7.jpg"
    ],
    "displayDate": "2013",
    "auction": {
      "name": "RmSoutbe",
      "id": "60dd911bb1ba10f755b1fc25"
    }
  } */
