import Slide from "react-slick";
import "./slidable.scss";

const Slider = (props) => {
  const { width = "80vw" } = props;
  return (
    <div
      className="slidable-container"
      style={{
        maxWidth: width,
        width: "100%",
        margin: "5px auto",
        // height: "398px",
      }}
    >
      <Slide {...props}>{props.children}</Slide>
    </div>
  );
};

export default Slider;
