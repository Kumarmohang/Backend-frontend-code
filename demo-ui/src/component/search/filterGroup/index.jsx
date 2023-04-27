import { useEffect, useState } from "react";
import Dropdown from "../../Dropdown";

const FilterGroup = ({ filter, onFilterChange }) => {
  const [activeDropdownElement, setActiveDropdownElement] = useState({
    group: filter?.[0],
    subFilter: {},
  });

  useEffect(() => {
    onFilterChange(activeDropdownElement);
  }, [activeDropdownElement]);
  const onDropdownChange = (ele) => {
    setActiveDropdownElement({
      group: ele,
      subFilter: {},
    });
  };

  const onSubFilterChange = (subFilter, changedFilter) => {
    setActiveDropdownElement((prevStat) => {
      return {
        ...prevStat,
        subFilter: {
          ...prevStat.subFilter,
          [subFilter.type]: changedFilter,
        },
      };
    });
  };

  const renderSubFilter = () => {
    return (activeDropdownElement?.group?.subFilter || []).map((ele) => {
      return (
        <div className="search-on" key={ele.type}>
          <label className="search-label label">{ele.type}</label>

          <Dropdown
            options={ele.values}
            onChange={(changedFilter) => onSubFilterChange(ele, changedFilter)}
            active={activeDropdownElement?.subFilter[ele?.type] || {}}
          />
        </div>
      );
    });
  };

  return (
    <div className="advance-search-options">
      <div className="search-on">
        <label className="search-label label">Search In</label>

        <Dropdown
          options={filter}
          onChange={onDropdownChange}
          active={activeDropdownElement.group}
        />
      </div>
      {renderSubFilter()}
    </div>
  );
};

export default FilterGroup;
