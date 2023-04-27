import { useState, React } from "react";
// import PopUp from "../popup";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import imageNotFound from "../../../../assests/No_Image_Thumbnail1.png";
import "./carcard.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "35%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const Card = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onError = (e) => {
    const { target } = e;
    target.src = imageNotFound;
  };
  // console.log(props.items.is_racing);
  const carName = props.items.is_f1 ? "car-name f1" : "car-name";
  return (
    <div>
      <div className="cardt">
        <h3 className={carName} title={props.items.title}>
          {props.items.title}
        </h3>

        <img
          src={props.items.thumbnail}
          className="card-img"
          alt="car-img"
          onError={(e) => onError(e)}
        />
        <button className="card-btn" onClick={openModal}>
          See Details
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Ferrari Details"
      >
        <div>
          <button className="modal-close-btn" onClick={closeModal}>
            <CloseOutlined />
          </button>
          <h1>{props.items.title}</h1>
          <h2 className="popup-heading">Specifications</h2>
          <ul>
            <li>
              <span className="specs-text">
                Maximum Power:{" "}
                {props.items.specifications.Engine?.["Maximum Power"]
                  ?.finalSpecValueStr ||
                  props.items.specifications.Engine?.["Capacity"]
                    ?.originalStrValue ||
                  "-"}
              </span>
            </li>
            <li>
              <span className="specs-text">
                Number Of Cylinder:{" "}
                {props.items.specifications.Engine?.["Number Of Cylinder"]
                  ?.finalSpecValueStr ||
                  props.items.specifications.Engine?.["Capacity"]
                    ?.originalStrValue ||
                  "-"}
              </span>
            </li>
            <li>
              <span className="specs-text">
                Engine Type:{" "}
                {props.items.specifications.Engine?.["Engine Type"]
                  ?.finalSpecValueStr ||
                  props.items.specifications.Engine?.["Capacity"]
                    ?.originalStrValue ||
                  "-"}
              </span>
            </li>
            <li>
              <span className="specs-text">
                Capacity:{" "}
                {props.items.specifications.Engine?.["Capacity"]
                  ?.finalSpecValueStr ||
                  props.items.specifications.Engine?.["Capacity"]
                    ?.originalStrValue ||
                  "-"}
              </span>
            </li>
            <li>
              <Link
                to={{
                  pathname: "/details",
                  search: `?id=${props.items.id}&group=Cars+Models&type=model`,
                }}
                target="_parent"
                className="specs-text"
              >
                See All Details
              </Link>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
