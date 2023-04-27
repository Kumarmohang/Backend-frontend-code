import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { session, headerUtils } from "../../utils";
import { resetFlag } from "../login/logic";
const navMenuList = [
  {
    name: "Home",
    path: "/",
    title: "Search for cars",
    isActive: (location) =>
      location.pathname === "/" ||
      location.pathname === "/advanceSearchDetails",
  },
  {
    name: "Cars",
    path: "/cars?search=&group=Cars+Models&subCat=All&grpIdx=0&subCatIdx=0&showSideBar=true&pageNo=0&fetchSize=24&from=header",
    title: "Search for cars",

    isActive: (location) =>
      location.search.includes("type=model") ||
      location.pathname === "/cars" ||
      location.pathname === "/search" ||
      location.pathname === "/advanceSearchResults" ||
      location.search.includes("type=specific-car"),
  },
  {
    name: "Timeline",
    path: "/timeline",
    title: "View brand timeline",
    isActive: (location) => location.pathname === "/timeline",
  },
  {
    name: "Virtual Exhibition",
    path: "/virtualExhibition",
    title: "Virtual Exhibition",
    isActive: (location) => location.pathname === "/virtualExhibition",
  },
  {
    name: "Dealers",
    path: "/dealers",
    title: "All dealer list",
    isActive: (location) =>
      location.pathname === "/dealers" ||
      location.search.includes("type=dealers") ||
      location.pathname === "/dealer/cars",
  },
  {
    name: "Drivers",
    path: "/drivers",
    title: "All driver list",
    isActive: (location) =>
      location.pathname === "/drivers" ||
      location.search.includes("type=drivers"),
  },
  {
    name: "Influencers",
    path: "/influencers",
    title: "Collector List",
    isActive: (location) =>
      location.pathname === "/influencers" ||
      location.search.includes("type=influencers"),
  },
  /* {
    name: "Events",
    path: "/events",
    title: "Event Calender",
    isActive: (location) =>
      location.pathname === "/events/" ||
      location.search.includes("type=events"),
  }, */
  {
    name: "Circuits",
    path: "/circuits",
    title: "All circuit list",
    isActive: (location) =>
      location.pathname === "/circuits" ||
      location.search.includes("type=circuits"),
  },
  {
    name: "Clubs",
    path: "/clubs",
    title: "All club list",
    isActive: (location) =>
      location.pathname === "/clubs" || location.search.includes("type=clubs"),
  },
  {
    name: "VIN",
    path: "/vin",
    title: "Search VIN Number",
    isActive: (location) => location.pathname === "/vin",
  },
  {
    name: "Analytics",
    path: "/analytics",
    title: "Analytics",
    isActive: (location) => location.pathname === "/analytics",
  },

  {
    name: "Suggestions",
    path: "/suggestions",
    title: "View Suggestions",
    isActive: (location) => location.pathname === "/suggestions",
  },
  // {
  //   name: "User",
  //   path: "/userProfile",
  //   title: "User",
  //   isActive: (location) => location.pathname === "/userProfile",
  // },
];
const Header = ({ history }) => {
  const dispatch = useDispatch();

  const { flag } = useSelector((state) => state.userData);

  const location = useSelector((state) => state.location);
  const navigateTo = (navItem) => {
    if (
      history.location.pathname !==
      new URL(`http://test.com${navItem.path}`).pathname
    ) {
      history.push(navItem.path);
    }
  };

  const logout = () => {
    session.clearSession();
    headerUtils.discardHeader();
    dispatch(resetFlag());
    history.push("/login");
  };

  const renderNavItems = () => {
    return navMenuList.map((ele) => {
      const isActive = ele.isActive(location);
      return (
        <div
          className={`nav-item${isActive ? " active" : ""}`}
          key={ele.path}
          title={ele.title}
          role="presentation"
          onClick={() => navigateTo(ele)}
        >
          {ele.name}
        </div>
      );
    });
  };
  return (
    <header className="main-header">
      <span
        className="logo"
        role="presentation"
        onClick={() => history.push("/")}
      >
        <img className="logo-img" src="/drivenLogo.png" alt="Driven" />
      </span>
      <nav className="header-nav">
        {flag && renderNavItems()}
        {flag && (
          <div
            className={`nav-item`}
            title="logout"
            role="presentation"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
