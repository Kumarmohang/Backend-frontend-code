import "react-image-gallery/styles/scss/image-gallery.scss";
import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import Specifications from "../details/specifications";
// import { useHistory, useLocation } from "react-router-dom";
// import data from "./data";
const CarStats = ({ data = {} }) => {
  const gallery = useRef(null);
  const {
    name = "812 Competizione",
    image = [
      {
        original:
          "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https%3a%2f%2fcdni.autocarindia.com%2fExtraImages%2f20210513101147_Ferrari_812_Competizione_top.jpg&h=795&w=1200&c=0",
        thumbnail:
          "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https%3a%2f%2fcdni.autocarindia.com%2fExtraImages%2f20210513101147_Ferrari_812_Competizione_top.jpg&h=795&w=1200&c=0",
      },
      {
        original:
          "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http%3a%2f%2fcdni.autocarindia.com%2fNews%2fFerrari_812_Competizione_front.jpg&c=0",
        thumbnail:
          "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http%3a%2f%2fcdni.autocarindia.com%2fNews%2fFerrari_812_Competizione_front.jpg&c=0",
      },
    ],
    overview = [
      { name: "Launch Year", value: "2021" },
      { name: "Car Type", value: "Latest" },
      { name: "Engine", value: "V12 -65°" },
      { name: "Max Power Output", value: "830 cvat 9,250 rpm" },
      { name: "Transmission", value: "-" },
    ],
    specifications = [
      {
        title: "Engine",
        value: {
          "Bore and Stroke": "94x 78mm",
          "Total displacement": "6496cc",
          "Maximum power": "830 cvat 9,250 rpm",
          "Maximum torque": "692 Nmat 7,000 rpm",
          "Maximum rpm": "9,500rpm",
          Type: "V12 -65°",
          "Compression Ratio": "13.5:1",
        },
      },
      {
        title: "Dimensions",
        value: {
          Length: "4,696mm",
          Width: "1,971mm",
          Height: "1276mm",
          Wheelbase: "2,720mm",
          "Front track": "1,672mm",
          "Rear track": "1,645mm",
          Weight: "1487 kgs",
          "Weight distribution": "49% – 51% front/rear",
          "Dry weight/power ratio": "1.79kg/cv",
        },
      },
      {
        title: "Brakes",
        value: {
          "Front Brakes": "398 mm x 223 x 38 mm",
          "Rear Brakes": "360 mm x 233 x 32 mm",
        },
      },
      {
        title: "Performance",
        value: {
          "Fiorano Lap Time": "1’20’’",
          "0-100 km/h (0-62 mph)": "2.85 sec",
          "0-200 km/h (0-124 mph)": "7.5 sec",
          "Fiorano lap time": "1’20’’",
        },
      },
      {
        title: "Transmission and Electronic Controls",
        value: {
          "7-SPEED": "F1 DCT",
          "WITH 4-WHEEL INDEPENDENT STEERING": "PCV 3.0",
          "High Performance": "ABS/EBD",
          "Side Slip Angle Control": "SSC 7.0",
        },
      },
    ],
  } = data;

  const renderBasicDetailsSections = () => {
    return overview.map((ele) => (
      <div key={ele.name} className="compare-stat">
        <span className="label">{ele.name}</span>
        <span className="value right-text">{ele.value}</span>
      </div>
    ));
  };
  return (
    <div className="carStats">
      <section className="car-title-section">
        <h4 className="heading">{name}</h4>
      </section>
      <section className="gallery-container">
        <ImageGallery
          items={image || []}
          showPlayButton={false}
          additionalClass="custom-img"
          autoPlay={false}
          showBullets={false}
          thumbnailPosition="left"
          showFullscreenButton={false}
          showThumbnails={false}
          onClick={() =>
            console.log({ toggle: gallery.current.toggleFullScreen() })
          }
          ref={gallery}
        />
      </section>
      <section className="stat-section">
        {renderBasicDetailsSections()}
        <Specifications specifications={specifications} hideHeading />
      </section>
    </div>
  );
};

export default CarStats;
