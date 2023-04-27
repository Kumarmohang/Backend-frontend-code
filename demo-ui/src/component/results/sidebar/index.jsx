/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// import Dropdown from "../../Dropdown";
import Loader from "../../loader";
import apiCalls from "../logic";
import { Filters } from "./filter";
import { DownOutlined } from "@ant-design/icons";

import "./sidebar.scss";

// import { useLocation } from 'react-router-dom';

const SIDE_BAR_TEXT = {
  All: "All Results",
  "Cars Models": "Models",
  "Auction Data": "Auction Houses",
  "Cars For Sale": "Dealers",
  "Specific Cars": "Specific Cars Sources",
};

const SideBar = (props) => {
  const { onSubCatChange } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    flag,
    loading,
    data: sideBarData,
  } = useSelector((state) => state.sideBarData);
  const categoryArray = sideBarData?.assetClass;
  const filters = sideBarData?.filters;

  const [selectedGroup, selectNewGroup] = useState(0);

  useEffect(() => {
    dispatch(
      apiCalls.getFilterResult(
        new URLSearchParams(history.location.search).toString()
      )
    );
  }, []);

  useEffect(() => {
    if (flag && !loading) {
      const query = history.location.search;
      const queryParams = new URLSearchParams(query);
      const groupIdx = categoryArray.findIndex(
        (ele) => ele.name === queryParams.get("group")
      );
      selectNewGroup(groupIdx);
      console.log({ groupIdx });
    }
  }, [flag, loading]);

  const onSelect = (_e, index) => {
    selectNewGroup(index !== selectedGroup ? index : null);
  };

  const onAllCatSelect = () => {
    selectNewGroup(0);
    const query = history.location.search;
    const queryParams = new URLSearchParams(query);
    // queryParams.set("subCat", ele.name);
    queryParams.set("group", categoryArray[0].name);
    queryParams.set("pageNo", 0);
    history.replace(`/search?${queryParams.toString()}`);
    // dispatch(apiCalls.getCarsResult(queryParams.toString()));
    history.replace(`/search?${queryParams.toString()}`);
    onSubCatChange(categoryArray[0], queryParams);
  };

  const subCatSelect = (_e, _index, ele) => {
    const query = history.location.search;
    const queryParams = new URLSearchParams(query);
    // console.log({ ele });
    queryParams.set("subCat", ele.name);
    queryParams.set("group", categoryArray[selectedGroup].name);
    queryParams.set("pageNo", 0);
    history.replace(`/search?${queryParams.toString()}`);
    onSubCatChange(categoryArray[selectedGroup], queryParams);
    // dispatch(apiCalls.getCarsResult(queryParams.toString()));
  };

  const renderSubCat = (idx) => {
    const query = history.location.search;
    const queryParams = new URLSearchParams(query);
    let list = [];
    if (categoryArray[selectedGroup]?.name !== "Cars Models") {
      list = categoryArray[selectedGroup].subCat.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else {
      list = categoryArray[selectedGroup].subCat;
    }
    // console.log(categoryArray[selectedGroup]);

    return list.map((ele, index) => {
      const isSubCatActive =
        categoryArray[idx].name === queryParams.get("group") &&
        ele.name === queryParams.get("subCat");
      return (
        <div
          className={`subitem${isSubCatActive ? " active" : ""}${
            ele.count ? "" : " disabled"
          }`}
          role="presentation"
          key={"sub-cat-" + ele.name + index}
          onClick={(e) => ele.count && subCatSelect(e, index, ele)}
          style={{ cursor: ele.count ? "pointer" : "not-allowed" }}
        >
          <span className="name" style={{ textTransform: "capitalize" }}>
            {ele.name}
          </span>
          <span className="count">({ele.count})</span>
        </div>
      );
    });
  };

  const renderGroup = () => {
    return (categoryArray || []).map((ele, index) => {
      const isActive = index === selectedGroup;
      // console.log({ condition: ele?.subCat?.length });
      return ele.name !== "All" ? (
        <div
          role="presentation"
          className={`item ${ele?.subCat?.length ? "" : " disabled"}`}
          key={ele.name + index}
        >
          <div
            className="group"
            onClick={(e) => ele?.subCat?.length && onSelect(e, index, ele)}
          >
            <span>{SIDE_BAR_TEXT[ele.name] || ele.name}</span>

            <DownOutlined />
          </div>
          {isActive && <div className="subitems">{renderSubCat(index)}</div>}
        </div>
      ) : (
        <div role="presentation" className={`item`} key={ele.name + index}>
          <div className="group" onClick={(e) => onAllCatSelect(e, 0, ele)}>
            <span className="allResultMenu">{SIDE_BAR_TEXT["All"]}</span>
          </div>
        </div>
      );
    });
  };

  const renderFilters = () => {
    return flag && <Filters filters={filters} {...props} />;
  };

  return (
    <div className="sidebar">
      <Loader
        isLoading={loading}
        height={550}
        noData={!!!categoryArray}
        // mode="light"
      >
        <div className="sidebar-items">{renderGroup()}</div>
        <div className="sidebar-items">{renderFilters()}</div>
      </Loader>
    </div>
  );
};

export default SideBar;
