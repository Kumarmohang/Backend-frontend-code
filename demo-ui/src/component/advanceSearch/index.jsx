import "./index.scss";
import React from "react";
import AdvanceSearch from "./advanceSearch";
import { Col, PageHeader, Row } from "antd";
import { useHistory } from "react-router-dom";

const AdvancedSearch = () => {
  const history = useHistory();

  /**
   * @description - This function push the history with queryParams for render the advanceSearchResults page.
   * @param {string} queryParam - Takes queryParams.
   * @returns {void}
   */
  const onSearch = (queryParam) => {
    history.push(`/advanceSearchResults?${queryParam}`);
  };

  return (
    <section className="list-item-as">
      <img src="/search_background.svg" alt="" className="search-background" />
      <img
        src="/driven_search_ring.png"
        className="search-background2"
        alt="Driven"
      />
      <div className="text-container">
        <span className="search-text-heading"> One Stop Search</span>
        <span className="search-text-heading-big">Exclusive Cars Data</span>
      </div>
      <Row>
        <Col span={11}>
          <PageHeader
            onBack={() => history.goBack()}
            title="Back"
            className="page-header"
          />
        </Col>
        <Col span={11}>
          <PageHeader title="Advanced Search" className="page-header" />
        </Col>
      </Row>

      <AdvanceSearch onSearch={onSearch} />
    </section>
  );
};

export default AdvancedSearch;
