import React from "react";
import "./metaverse.scss";

const VirtualExhibition = () => {
  return (
    <div className="metaverse">
      <h1 className="metaverse-heading">Decentraland Car Exhibition</h1>
      <div className="metaverse-container">
        <iframe
          src={process.env.REACT_APP_METAVERSE_URL}
          title="MetaVerse"
          width="100%"
          //height="730px"
          style={{
            border: "none",
            borderRadius: "5px",
            height: "75vh",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default VirtualExhibition;
