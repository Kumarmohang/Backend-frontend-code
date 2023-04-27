/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Dropdown from "../../Dropdown";
import { Select } from "antd";
import apiCall from "../logic";

const getFilterQueryParamName = (str) => str.toLowerCase().replaceAll(" ", "_");

const { Option } = Select;
const FILTER_MAPPING = {
  Make: "Brand",
};

export const Filters = ({
  filters,
  activeFilters: propsActiveFilter,
  onFilterChange: propsOnFilterChange,
}) => {
  const history = useHistory();
  const [activeFilters, setActiveFilters] = useState(propsActiveFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParam = new URLSearchParams(history.location.search);
    const appliedFilters = {};
    filters.forEach((element) => {
      // console.log({ element });
      //filter.type.toLowerCase().replaceAll(" ", "_"),
      if (queryParam.has(getFilterQueryParamName(element.type))) {
        appliedFilters[element.type] = element.values.find((ele) => {
          return (
            `${ele.value}` ===
            queryParam.get(getFilterQueryParamName(element.type))
          );
        })?.value;
      } else {
        appliedFilters[element.type] = element.values[0].value;
      }
      setActiveFilters(appliedFilters);
      propsOnFilterChange(appliedFilters, true);
    });
  }, []);

  const onFilterChange = (filter, changedFilter) => {
    const queryParam = new URLSearchParams(history.location.search);
    const newActiveFilters = {
      ...activeFilters,
      [filter.type]: changedFilter,
    };
    setActiveFilters(newActiveFilters);
    propsOnFilterChange(newActiveFilters);

    queryParam.set(
      filter.type.toLowerCase().replaceAll(" ", "_"),
      changedFilter
    );
    queryParam.set("pageNo", 0);
    history.replace(`${history.location.pathname}?${queryParam.toString()}`);
    dispatch(apiCall.getFilterResult(queryParam.toString()));
    if (queryParam.get("group") !== "All") {
      dispatch(apiCall.getCarsResult(queryParam.toString()));
    } else {
      dispatch(apiCall.getSearchResult(queryParam.toString()));
    }
  };

  const onFilterClear = (filter) => {
    const queryParam = new URLSearchParams(history.location.search);
    const newActiveFilters = {
      ...activeFilters,
    };
    delete newActiveFilters[filter.type];

    setActiveFilters(newActiveFilters);
    propsOnFilterChange(newActiveFilters);
    queryParam.set("pageNo", 0);
    queryParam.delete(filter.type.toLowerCase().replaceAll(" ", "_"));
    history.replace(`${history.location.pathname}?${queryParam.toString()}`);
    dispatch(apiCall.getFilterResult(queryParam.toString()));
    // dispatch(apiCall.getCarsResult(queryParam.toString()));
    if (queryParam.get("group") !== "All") {
      dispatch(apiCall.getCarsResult(queryParam.toString()));
    } else {
      dispatch(apiCall.getSearchResult(queryParam.toString()));
    }
  };

  const queryParam = new URLSearchParams(history.location.search);
  const group = queryParam.get("group");
  const applicableFilter = filters.filter((filter) => {
    return filter.filterFor.includes(group);
  });

  const renderFilterOptions = (options) => {
    return options.map((option) => {
      return (
        <Option
          // style={{ background: "red" }}
          key={option.value}
          value={option.value}
          style={{ textTransform: "capitalize", fontSize: "12px" }}
        >
          {option.display}
        </Option>
      );
    });
  };
  return (
    applicableFilter?.length > 0 && (
      <div className="sidebar-filter-section">
        <div className="filter-heading">Filters</div>
        {(applicableFilter || []).map((ele) => {
          return (
            <div className="search-on" key={ele.type}>
              <label className="search-label label">
                {FILTER_MAPPING[ele.type] || ele.type}
              </label>

              {/* <Dropdown
                options={ele.values}
                onChange={(changedFilter) => onFilterChange(ele, changedFilter)}
                active={activeFilters?.[ele?.type] || {}}
                // clear={!!activeFilters?.[ele?.type]?.value}
                onClear={() => {
                  onFilterClear(ele);
                }}
              /> */}
              <Select
                defaultValue={propsActiveFilter[ele.type]}
                value={propsActiveFilter[ele.type]}
                placement="topLeft"
                // active={activeFilters?.[ele?.type] || {}}
                showSearch
                onChange={(value) => onFilterChange(ele, value)}
                style={{
                  width: 140,
                  textAlign: "left",
                  textTransform: "capitalize",
                  fontSize: 12,
                }}
              >
                {renderFilterOptions(ele.values)}
              </Select>
            </div>
          );
        })}
      </div>
    )
  );
};
