import React, { useState } from "react";
import { Modal } from "antd";
import { RadialChart } from "./RadialChart";

export const RadialChartContainer = ({ comparisonData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <span className="back-btn" onClick={showModal}>
        Graphical View
      </span>
      <div>
        <Modal
          title="Graphical View"
          centered
          width={600}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <RadialChart comparisonData={comparisonData} />
        </Modal>
      </div>
    </div>
  );
};
