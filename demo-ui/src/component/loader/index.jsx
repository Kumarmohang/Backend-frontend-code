import loading from "./495.png";
import "./loader.scss";
const Loader = ({
  isLoading,
  children,
  height = 100,
  width = 170,
  noData = false,
  mode = "dark",
}) => {
  return isLoading ? (
    <div className="loading" style={{ height, width }}>
      <img
        src={loading}
        alt="loading..."
        className={mode === "light" ? "light" : ""}
      />
    </div>
  ) : noData ? (
    <div className="loading" style={{ height, width }}>
      <div>No data found</div>
    </div>
  ) : (
    children
  );
};

export default Loader;
