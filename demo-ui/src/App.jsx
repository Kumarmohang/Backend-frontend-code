import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./component/header";
import Footer from "./component/Footer";
import Result from "./component/results";
import Search from "./component/search";
import Details from "./component/details";
import CircuitsAndDriver from "./component/circuitAndDriver";
import Compare from "./component/compare";
import EventsCalender from "./component/eventCalender";
import Vin from "./component/vin";
import BrandTimeline from "./component/BrandTimeline";
import "./App.scss";
import "react-toastify/dist/ReactToastify.min.css";

import Login from "./component/login";
import AuthRoute from "./component/authRoute";
import notifyUtil from "./utils/notifyUtil";
import { headerUtils, session } from "./utils";
import { resetFlag } from "./component/login/logic";
import { resetCommon, updateLocation } from "./logic";
import Suggestion from "./component/suggestions";
import VirtualExhibition from "./component/metaverse";
import AdvancedSearch from "./component/advanceSearch";
import AdvanceFilterResults from "./component/advanceSearchResults";
import Analytics from "./component/Ansalytics/Index";
import UserProfile from "./component/userProfile";
import { checkIfLogin } from "./utils/sessionManagement";
import apiCall from "./component/results/logic";

export const simpleAction = () => (dispatch) => {
  dispatch({
    type: "SIMPLE_ACTION",
    payload: "result_of_simple_action",
  });
};

const Circuit = () => <CircuitsAndDriver dataFor="Circuits" isSearchable />;
const Driver = () => <CircuitsAndDriver dataFor="Drivers" isSearchable />;
const Dealer = () => (
  <CircuitsAndDriver
    dataFor="Dealers"
    customCardClickAction={(ele, history) => {
      const query = new URLSearchParams({
        dealer: ele.dealer_key,
        group: "Cars For Sale",
        subCat: ele.dealer_key,
        showSideBar: false,
        pageNo: 0,
        fetchSize: 20,
      });
      history.push(`/dealer/cars?${query.toString()}`);
    }}
  />
);
const Clubs = () => <CircuitsAndDriver dataFor="Clubs" />;
const CarsByDealer = () => (
  <CircuitsAndDriver
    dataFor="Cars by dealer"
    customCardClickAction={(ele, history) => {
      history.push(`/details?id=${ele.id}&group=Cars+For+Sale&type=model`);
    }}
    customHeading={(history) => {
      const query = new URLSearchParams(history.location.search);
      const dealer = query.get("dealer");
      return `Cars by ${dealer}`;
    }}
    showBackBtn
  />
);

/* details?id=60f7ecf9de3a5a18949f0b04&group=Cars+For+Sale&grpIdx=2&subCatIdx=2&subCat=Carugati+Automobile&type=model */
const Collectors = () => <CircuitsAndDriver dataFor="Influencers" />;
const CollectorCars = () => (
  <CircuitsAndDriver
    dataFor="Collector Cars"
    customCardClickAction={(ele, history) => {
      history.push(`/details?id=${ele.id}&group=Cars&type=model`);
    }}
    customHeading={(history) => {
      const query = new URLSearchParams(history.location.search);
      const collector = query.get("col_name");
      return `${collector} Cars Collection`;
    }}
    showBackBtn
  />
);

const AllCars = () => (
  <>
    {" "}
    <Result />{" "}
  </>
);

const history = createBrowserHistory({ basename: "/" });

function App() {
  const dispatch = useDispatch();
  const { isError, error } = useSelector((state) => state.apiStatus);
  const { flag } = useSelector((state) => state.userData);
  const { loading: filterLoading, flag: filterFlag } = useSelector(
    (state) => state.sideBarData
  );

  useEffect(() => {
    history.block(() => {
      if (!navigator.onLine) {
        notifyUtil("No internet connection", "error", {
          toastId: "common-error",
        });
      }
      return navigator.onLine;
    });
    if (isError) {
      const response = error.response;
      if (response) {
        notifyUtil(error.response.data?.msg, "error", {
          toastId: "common-error",
        });
        if (response.status === 401) {
          session.clearSession();
          headerUtils.discardHeader();
          dispatch(resetFlag());
          if (history.location.pathname !== "/login") {
            history.push("/login");
          }
        }
      } else {
        notifyUtil(
          "Something went wrong please try again after some time",
          "error",
          { toastId: "common-error" }
        );
      }
      dispatch(resetCommon());
    }
    const unlisten = history.listen((location) => {
      dispatch(updateLocation(location));
    });
    // console.log("called");
    return () => {
      unlisten();
    };
  }, [isError, error]);

  useEffect(() => {
    if (flag && !filterFlag && !filterLoading && checkIfLogin()) {
      dispatch(apiCall.getFilterResult());
    }
  }, [flag]);

  return (
    <>
      <div className={`App`}>
        <ToastContainer />
        <Header history={history} location={history.location} />
        <div
          className={`main-section${
            history.location.pathname !== "/login" ? "" : " login-page"
          }`}
        >
          {/* <Search /> */}
          {/* <Result></Result> */}
          <Router history={history}>
            <Switch>
              <Route path="/login" exact component={Login} />
              <AuthRoute path="/" exact component={Search} />
              <AuthRoute path="/search" component={Result} />
              <AuthRoute
                path="/advanceSearchDetails"
                component={AdvancedSearch}
              />
              <AuthRoute
                path="/advanceSearchResults"
                component={AdvanceFilterResults}
              />
              <AuthRoute path="/cars" component={AllCars} />
              <AuthRoute path="/details" component={Details} />
              <AuthRoute path="/circuits" component={Circuit} />
              <AuthRoute path="/drivers" component={Driver} />
              <AuthRoute path="/dealers" component={Dealer} />
              <AuthRoute path="/clubs" component={Clubs} />
              <AuthRoute path="/compare" component={Compare} />
              <AuthRoute path="/events" component={EventsCalender} />
              <AuthRoute path="/dealer/cars" component={CarsByDealer} />
              <AuthRoute exact path="/influencers" component={Collectors} />
              <AuthRoute path="/collector/cars" component={CollectorCars} />
              <AuthRoute path="/vin" component={Vin} />
              <AuthRoute path="/analytics" component={Analytics} />
              <AuthRoute path="/suggestions" component={Suggestion} />
              <AuthRoute path="/timeline" component={BrandTimeline} />
              <AuthRoute
                path="/virtualExhibition"
                component={VirtualExhibition}
              />
              <AuthRoute path="/userProfile" component={UserProfile} />
              <Route component={() => <div>404 Page not found</div>} />
            </Switch>
          </Router>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
