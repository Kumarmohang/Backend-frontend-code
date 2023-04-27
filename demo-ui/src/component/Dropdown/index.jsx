import React from "react";
import PropTypes from "prop-types";
import ClickOutside from "../ClickOutside";
import "./index.scss";

class Dropdown extends React.Component {
  state = {
    inputText: "",
    open: this.props.open,
    searchOptions: [],
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.searchOptions) !==
      JSON.stringify(prevProps.searchOptions)
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        searchOptions: this.props.searchOptions,
      });
    }
  }

  onChange = (e, value, i = -1) => {
    e.stopPropagation();
    this.setState(
      {
        inputText: "",
        open: false,
      },
      () => this.props.onChange(value, i)
    );
  };

  getTitle = () => {
    if (this.props.active && Object.keys(this.props.active).length > 0) {
      return this.props.active.display;
    }
    return this.props.title;
  };

  onTextChange = (e) => {
    const inputText = e.target.value || "";
    let searchOptions = [];

    // Use internal search if user does not provide custom search
    if (!this.props.onSearch && this.props.searchFunction) {
      searchOptions = this.props.searchFunction(inputText, this.props.options);
    }
    this.setState(
      {
        inputText,
        searchOptions,
      },
      () => {
        if (this.state.inputText.length >= this.props.minSearchLength) {
          if (this.props.onSearch) {
            this.props.onSearch(this.state.inputText);
          }
        }
      }
    );
  };

  onSearchClose = () => {
    this.setState({
      inputText: "",
      searchOptions: [],
    });
  };

  toggleDropdown = () =>
    !this.props.disabled &&
    this.setState((prevState) => ({ open: !prevState.open }));

  renderItems() {
    const { minSearchLength, search, options } = this.props;
    if (this.props.loading) {
      return <div className="dropdown-no-data-found">Loading....</div>;
    }
    if (search) {
      if (
        this.state.inputText.length <= minSearchLength &&
        options.length === 0
      ) {
        return (
          <div className="dropdown-no-data-found">
            {this.props.noDataSearchText}
          </div>
        );
      }
      if (this.state.inputText.length > minSearchLength) {
        const searchOptions = this.props.onSearch
          ? this.props.searchOptions
          : this.state.searchOptions;
        if (searchOptions.length === 0) {
          return (
            <div className="dropdown-no-data-found">
              {this.props.noSearchDataText}
            </div>
          );
        }
        return searchOptions.map((item, i) => (
          <li
            key={i}
            className="dropdown-container-list-item"
            role="presentation"
            onClick={(e) => this.onChange(e, item, i)}
          >
            {item.display}
          </li>
        ));
      }
    }
    if (options.length === 0) {
      return (
        <div className="dropdown-no-data-found">{this.props.noDataText}</div>
      );
    }
    return options.map((item, i) => (
      <li
        key={i}
        className="dropdown-container-list-item"
        role="presentation"
        onClick={(e) => this.onChange(e, item, i)}
        title={item.title || item.display}
      >
        {item.display}
      </li>
    ));
  }

  renderBox() {
    if (this.state.open && this.props.search) {
      return (
        <div
          className={`dropdown-box-search dropdown-box-default
          ${this.state.inputText.length > 0 ? "dropdown-box-clear" : ""}`}
        >
          <input
            className="dropdown-box-search-input"
            onChange={this.onTextChange}
            placeholder={this.props.placeholder}
            type="text"
            value={this.state.inputText}
          />
          {this.state.inputText.length > 0 ? (
            <div
              className="dropdown-box-clear-btn"
              onClick={this.onSearchClose}
              role="presentation"
            >
              &#10005;
            </div>
          ) : (
            <div className="search-icon" />
          )}
        </div>
      );
    }
    const title = this.getTitle();
    const titleActive =
      this.props.active && Object.keys(this.props.active).length > 0;
    return (
      <div
        onClick={this.toggleDropdown}
        className="dropdown-click-boundary"
        role="presentation"
      >
        {this.props.header ? (
          this.props.header
        ) : (
          <div
            className={`dropdown-box-default${this.props.disabled ? " dropdown-box-disabled" : ""
              }`}
          >
            <>
              <span
                className={titleActive ? "title" : "title-inactive"}
                id="title"
                title={typeof title === "string" ? title : undefined}
              >
                {title}
              </span>
              {this.props.active && this.props.clear ? (
                <div
                  className="dropdown-box-clear"
                  onClick={this.props.onClear}
                  role="presentation"
                >
                  &#10005;
                </div>
              ) : null}
            </>
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div
        className={`inline${this.props.className ? ` ${this.props.className}` : ""
          }`}
      >
        <ClickOutside onClickOutside={() => this.setState({ open: false })}>
          <div className="dropdown">
            <div className="dropdown-box">{this.renderBox()}</div>
            {this.state.open ? (
              <div className="dropdown-container">
                <ul className="dropdown-container-list scrollbar">
                  {this.renderItems()}
                </ul>
              </div>
            ) : null}
          </div>
        </ClickOutside>
      </div>
    );
  }
}

Dropdown.propTypes = {
  active: PropTypes.shape({
    display: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  clear: PropTypes.bool,

  /** Disable option to click on dropdown */
  disabled: PropTypes.bool,

  /**
   * To render a different dropdown box instead of the current one
   */
  header: PropTypes.node,
  loading: PropTypes.bool,

  /** Minimum length of search string to be typed before search is triggered */
  minSearchLength: PropTypes.number,

  noDataSearchText: PropTypes.string,
  noDataText: PropTypes.string,
  noSearchDataText: PropTypes.string,
  onClear: PropTypes.func,

  /** Function to be used to get search query(can be used for async/API search) */
  onSearch: PropTypes.func,

  /** To control open/close of dropdown */
  open: PropTypes.bool,

  /** Placeholder term to be used in input field during search */
  placeholder: PropTypes.string,

  /** Enable/Disable Search */
  search: PropTypes.bool,

  /**
   * Function to be used if search is to be performed internally
   */
  searchFunction: PropTypes.func,

  /**
   * Search results to be shown as options
   */
  searchOptions: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
      ]),
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
      ]),
    })
  ),

  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  /** Options to be rendered */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
      ]),
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
      ]),
    })
  ).isRequired,
};

Dropdown.defaultProps = {
  className: "",
  active: null,
  clear: false,
  disabled: false,
  header: null,
  loading: false,
  minSearchLength: 0,
  noDataSearchText: "Search for options",
  noDataText: "No data found",
  noSearchDataText: "No search data found",
  onClear: () => "",
  open: false,
  placeholder: "Search",
  onSearch: undefined,
  search: false,
  searchFunction: (query, options) =>
    options.filter(
      (i) =>
        typeof i.value === "string" && i.value.match(new RegExp(query, "i"))
    ),
  searchOptions: [],
  title: "Select",
};

export default Dropdown;
