import React from "react";
import PropTypes from "prop-types";
import "./_table.scss";
import { indexOf } from "../../utils";

const Table = ({
  header,
  data,
  noDataMessage = "",
  headerClassName = "",
  isSelectable = false,
  checkboxDisabledCondition,
  checkboxCheckedCondition,
  selectedItemList = [],
  onSelect,
  isRowClickable,
  onRowClick,
  customClass = "",
}) => {
  // const headerKeys = header.map(ele => ele.key)

  /* --------- */
  //const { language = {} } = useSelector((state) => state.language);
  // TODO: need to remove this
  const language = {};

  const updatedHeader = [...header];

  const handelChange = (event, row, index) => {
    const { checked } = event.target;
    const copySelectedItem = [...selectedItemList];
    if (checked) {
      copySelectedItem.push(row);
      onSelect(copySelectedItem, row, index, event);
    } else {
      const rowIndex = indexOf(copySelectedItem, row);
      copySelectedItem.splice(rowIndex, 1);
    }
    onSelect(copySelectedItem, row, index, event);
  };

  const renderCheckbox = (row, index) => (
    <span className="checkbox">
      <span className="checkbox-item">
        <input
          type="checkbox"
          disabled={checkboxDisabledCondition?.(row) || false}
          checked={
            checkboxCheckedCondition
              ? checkboxCheckedCondition(row)
              : indexOf(selectedItemList, row) !== -1
          }
          onChange={(event) => handelChange(event, row, index)}
        />
      </span>
    </span>
  );
  if (isSelectable) {
    const selectableHeader = {
      key: "chk-box",
      display: "Select",
      customEle: renderCheckbox,
    };
    // updatedHeader.unshift(selectableHeader);
    // TODO: take insertion index from props
    const INSERTION_INDEX = 0;
    updatedHeader.splice(INSERTION_INDEX, 0, selectableHeader); // insertion of checkbox Header
  }
  /* --------- */
  const renderHeader = () =>
    updatedHeader.map((ele, index) => (
      <div
        title={ele.display || ele.key}
        className={`table-header-col ${ele.className || ""}`}
        key={`${ele.key}_${index}`}
      >
        {ele.display || ele.key}
      </div>
    ));
  const renderTableData = () => {
    if (data.length) {
      const dataArray = [];
      for (let i = 0, dataLen = data.length; i < dataLen; i++) {
        const ele = data[i];
        const colArray = [];
        for (let j = 0, colLen = updatedHeader.length; j < colLen; j++) {
          const {
            key,
            customEle: CustomEle = null,
            className,
            // onClick = () => {},
          } = updatedHeader[j];
          colArray.push(
            <span
              // title={CustomEle ? '' : ele[key] || '-'}
              className={`table-row-col ${className || ""}`}
              key={`table_col_${i}_${key}`}
              title={!CustomEle ? language[ele[key]] || ele[key] : ""}
            >
              {(CustomEle
                ? CustomEle(ele, i)
                : language[ele[key]] || ele[key]) || "-"}
            </span>
          );
        }
        dataArray.push(
          <div
            className={`table-row ${isRowClickable ? "clickable-row" : ""}`}
            key={`table_row_${i}`}
            role="presentation"
            onClick={(e) => onRowClick(e, ele)}
          >
            {colArray}
          </div>
        );
      }
      return dataArray;
    }
    return (
      <div style={{ height: 44, width: "100%" }} className="disp-flex center">
        {language[noDataMessage] || noDataMessage}
      </div>
    );
  };
  return (
    <div className={`table${customClass ? ` ${customClass}` : ""}`}>
      <div className={`table-header ${headerClassName || ""}`}>
        {renderHeader()}
      </div>
      <div className="table-data">{renderTableData()}</div>
    </div>
  );
};
Table.propTypes = {
  header: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      display: PropTypes.string,
      customEle: PropTypes.func,
      className: PropTypes.string,
    })
  ).isRequired,
  noDataMessage: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerClassName: PropTypes.string,
  isSelectable: PropTypes.bool,
  checkboxDisabledCondition: PropTypes.func,
  checkboxCheckedCondition: PropTypes.string,
  selectedItemList: PropTypes.array,
  onSelect: PropTypes.func,
  isRowClickable: PropTypes.bool,
  onRowClick: PropTypes.func,
  customClass: PropTypes.string,
};

Table.defaultProps = {
  noDataMessage: "No Data Found",
  headerClassName: "",
  isSelectable: false,
  checkboxDisabledCondition: null,
  checkboxCheckedCondition: null,
  selectedItemList: [],
  onSelect: null,
  isRowClickable: false,
  onRowClick: () => "clicked",
  customClass: "",
};

export default Table;
