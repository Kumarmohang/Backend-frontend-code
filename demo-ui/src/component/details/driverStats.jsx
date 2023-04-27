const DriverStats = ({ statData = [] }) => {
  const renderStat = () => {
    return statData.map((ele) => {
      return (
        <div className="stat-item">
          <div className="label">{ele.name} :</div>
          <div className="value">{ele.value}</div>
        </div>
      );
    });
  };

  return (
    <div className="desc-section">
      <div className="heading">Stats :</div>
      <div className="stat-section">{renderStat()}</div>
    </div>
  );
};

export default DriverStats;
