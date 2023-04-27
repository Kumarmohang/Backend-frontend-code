import "./compare.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../loader";
import { getComparingCars } from "./logic";
import CarStats from "./carStatsContainer";
import { RadialChartContainer } from "./RadialChartContainer";

const Compare = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading = true, data: comparisonData } = useSelector(
    (state) => state.comparisonData
  );
  // const { data: compareList = [] } = useSelector((state) => state.compareList);

  useEffect(() => {
    console.log(history.location.search, "Before Compare Api Call");
    dispatch(getComparingCars(history.location.search));
  }, []);

  const renderCars = () =>
    (comparisonData || []).map((car) => (
      <div className="compare-item" key={car.id}>
        <CarStats data={car} />
      </div>
    ));
  return (
    <div className="compare">
      <header className="result-for">
        <span
          className="back-btn"
          role="presentation"
          onClick={() => {
            history.goBack(-1);
          }}
        >
          {"< Back"}
        </span>
        <span className="heading-text">Compare</span>
        <span>
          <RadialChartContainer comparisonData={comparisonData} />
        </span>
      </header>
      <Loader
        isLoading={loading}
        height={500}
        noData={!comparisonData?.length || 0}
      >
        <div className="compare-section">
          {renderCars()}
          {/* <div className="compare-item add-item">
          <div className="add-ico hand" title="Add car to compare"></div>
        </div> */}
        </div>
      </Loader>
    </div>
  );
};

export default Compare;
