import React, { useState, Fragment } from "react";
const ReadMore = ({ children }) => {
  const textArray = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore
        ? textArray?.[0]?.slice(0, 250) || ""
        : textArray.map((ele, idx) => (
            <Fragment key={idx}>
              {ele}
              <br />{" "}
            </Fragment>
          ))}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};
export default ReadMore;
