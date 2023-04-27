import { Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  postNewSuggestions,
  postNewSuggestionsReset,
} from "../suggestions/logic";
// import { apiClientSourceMapping } from "../../utils/apiClient";

const SuggestionModal = ({ visible, setVisibility, record, pageType }) => {
  const location = useLocation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading, flag } = useSelector((state) => state.postNewSuggestions);
  const { data: carDetail } = useSelector((state) => state.detailedData);
  const { data: circuitDetails } = useSelector((state) => state.circuitDetails);
  const { data: clubDetails } = useSelector((state) => state.clubDetails);
  const { data: driverDetails } = useSelector((state) => state.driverDetail);
  const { data: collectorDetails } = useSelector(
    (state) => state.collectorDetail
  );

  const typeDataMapping = {
    model: carDetail,
    dealers: carDetail,
    clubs: clubDetails,
    drivers: driverDetails,
    collectors: collectorDetails,
    circuits: circuitDetails,
    "specific-car": carDetail,
  };

  const onSubmit = (values) => {
    dispatch(
      postNewSuggestions({
        // artworkId: artwork.artworkId,
        ...values,
        status: "Pending",
        record: typeDataMapping[pageType],
        recordType: pageType,
        recordPath: `${location.pathname}/${location.search}`,
      })
    );
  };

  useEffect(() => {
    if (flag) {
      setVisibility(false);
      form.resetFields();
      message.success("Suggestion submitted successfully");
    }
    return () => {
      dispatch(postNewSuggestionsReset());
    };
  }, [flag]);

  return (
    <>
      <Modal
        visible={visible}
        title="Data Changes Suggestion"
        okText="Submit"
        cancelText="Cancel"
        onCancel={() => {
          setVisibility(false);
        }}
        footer={[
          <Button key="cancel" onClick={() => setVisibility(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  onSubmit(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
            disabled={form.isFieldsValidating(["comment"])}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            label="Comment"
            name="comment"
            rules={[
              {
                required: true,
                message: "Comment is required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item
            label="Created by"
            name="createdBy"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input type="text" placeholder="Enter your name" />
          </Form.Item> */}

          {/* {postData.error && (
            <>
              <br />
              <span style={{ color: "red" }}>{postData.data}</span>
            </>
          )} */}
        </Form>
      </Modal>
    </>
  );
};

export default SuggestionModal;
