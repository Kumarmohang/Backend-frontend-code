import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Table as AntdTable } from "antd";
import { Table, Button, Space, Typography } from "antd";
import {
  getAllSuggestions,
  getAllSuggestionsReset,
  putUpdateSuggestions,
  putUpdateSuggestionsReset,
} from "./logic";
import "./suggestions.scss";
import { useHistory, Link } from "react-router-dom";

const Suggestion = () => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const dispatch = useDispatch();
  const pageNo = query.get("pageNo") ? parseInt(query.get("pageNo"), 10) : 0;
  const fetchSize = query.get("fetchSize")
    ? parseInt(query.get("fetchSize"), 10)
    : 10;
  const [updatingId, setUpdatingId] = useState("");
  const [currentPage, setCurrentPage] = useState(pageNo);

  const {
    loading = true,
    data: suggestionData,
    // flag,
  } = useSelector((state) => state.suggestionList);

  const { loading: putLoading, flag: putFlag } = useSelector(
    (state) => state.updateSuggestion
  );

  useEffect(() => {
    history.replace(`?pageNo=${pageNo}&fetchSize=${fetchSize}`);
    dispatch(getAllSuggestions(`pageNo=${pageNo}&fetchSize=${fetchSize}`));

    return () => {
      dispatch(getAllSuggestionsReset());
    };
  }, []);

  useEffect(() => {
    if (putFlag) {
      dispatch(
        getAllSuggestions(
          new URLSearchParams(history.location.search).toString()
        )
      );
      dispatch(putUpdateSuggestionsReset());
      setUpdatingId("");
    }
  }, [putFlag]);

  const handlePageChange = (pageState) => {
    setCurrentPage(pageState - 1);
    const queryParam = new URLSearchParams(history.location.search);
    queryParam.set("pageNo", pageState - 1);
    history.push(`/suggestions/?${queryParam.toString()}`);
    dispatch(getAllSuggestions(queryParam.toString()));
  };

  const onSuggestionStatusChange = (row, status = "Changes Incorporated") => {
    setUpdatingId(row._id);
    dispatch(putUpdateSuggestions({ id: row._id, status }));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "record",
      key: "record",
      render: (record, row) => (
        <Link to={row?.recordPath} title={record?.name}>
          {record?.name}
        </Link>
      ),
      width: "20%",
    },
    {
      title: "Commented at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
      width: "10%",
    },
    { title: "Comment", dataIndex: "comment", key: "comment", width: "40%" },
    {
      title: "Created by",
      dataIndex: "createdBy",
      key: "createdBy",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Space size="middle">
          {text === "Pending" && (
            <Button
              type="default"
              className="btn"
              disabled={putLoading}
              onClick={() =>
                onSuggestionStatusChange(record, "Changes Incorporated")
              }
              loading={putLoading && updatingId === record._id}
            >
              Mark as Changes Incorporated
            </Button>
          )}
          {text === "Changes Incorporated" && (
            <Typography.Text type="success"> {text}</Typography.Text>
          )}
        </Space>
      ),
    },
  ];
  return (
    <div className="suggestions">
      <div className="suggestions-heading">Suggestions</div>
      <div className="suggestions-container">
        <Table
          loading={loading}
          scroll={{ x: 800 }}
          columns={columns}
          dataSource={suggestionData?.results || []}
          pagination={{
            position: ["bottomCenter"],
            className: "pagination",
            size: "small",
            current: currentPage + 1,
            defaultCurrent: 1,
            total: suggestionData?.total || 0,
            onChange: handlePageChange,
            showSizeChanger: false,
            pageSize: fetchSize,
            itemRender: (page, type) => {
              switch (type) {
                case "page":
                  return <span className="pagination">{page}</span>;
                case "prev":
                  return <span className="pagination">{`<`}</span>;
                case "next":
                  return <span className="pagination">{">"}</span>;
                case "jump-prev":
                  return <span className="pagination">{"..."}</span>;
                case "jump-next":
                  return <span className="pagination">{`...`}</span>;
                default:
                  return null;
              }
            },
          }}
        ></Table>
        {/*         <Pagination
          className="pagination"
          size="small"
          current={currentPage + 1}
          defaultCurrent={1}
          total={suggestionData.total}
          onChange={handlePageChange}
          showSizeChanger={false}
          pageSize={fetchSize}
          itemRender={(page, type) => {
            switch (type) {
              case "page":
                return <span className="pagination">{page}</span>;
              case "prev":
                return <span className="pagination">{`<`}</span>;
              case "next":
                return <span className="pagination">{">"}</span>;
              case "jump-prev":
                return <span className="pagination">{"..."}</span>;
              case "jump-next":
                return <span className="pagination">{`...`}</span>;
              default:
                return null;
            }
          }}
        /> */}
      </div>
    </div>
  );
};

export default Suggestion;
