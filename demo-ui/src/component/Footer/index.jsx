/* import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { session, headerUtils } from "../../utils";
import { resetFlag } from "../login/logic"; */
import "./footer.scss";

const Footer = () => {
  /* // const dispatch = useDispatch();
  // const history = useHistory();
  const pathName = history.location.pathname;
  const { flag } = useSelector((state) => state.userData);
  console.log(pathName);
  const [activeTab, setActiveTab] = useState(pathName);
  const navigateTo = (navItem) => {
    setActiveTab(navItem.path);
    history.push(navItem.path);
  };
  const logout = () => {
    session.clearSession();
    headerUtils.discardHeader();
    dispatch(resetFlag());
    history.push("/login");
  }; */
  return (
    <div className="footer">
      <footer className="main-footer">
        <span className="cp-text">Copyright &copy; 2022 PerpetualBlock AG</span>
      </footer>
    </div>
  );
};

export default Footer;
