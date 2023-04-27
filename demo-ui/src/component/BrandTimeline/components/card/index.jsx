import React from "react";
import Card from "./Card";
import "./carcard.scss";

import Slider from "react-slick";

const CarCard = (props) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ferrariData = props.items;
  // console.log(ferrariData.length);
  const renderData = () => {
    return ferrariData?.map((car, index) => {
      return <Card items={car} key={`${car}_${index}`} />;
    });
  };
  // console.log(props.uniqueKey[0]);
  return (
    <div className="single-page-wrapper">
      <section className="section1">
        <div className="section-heading-outer">
          <span className="section-heading">{props.uniqueKey}</span>
        </div>
        <div style={{ marginLeft: "7%" }}>
          <Slider {...settings}>{renderData()}</Slider>
        </div>
      </section>
    </div>
  );
};

export default CarCard;
