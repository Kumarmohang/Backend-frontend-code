import { combineReducers } from "redux";
import { searchReducer } from "../component/results/logic";
import { detailsReducer } from "../component/details/logic";
import { circuitAndDriverReducer } from "../component/circuitAndDriver/logic";
import { comparisonReducer } from "../component/compare/logic";
import { loginDataReducer } from "../component/login/logic";
import { commonReducer } from "../logic";
import { eventCalenderReducer } from "../component/eventCalender/logic";
import { searchFilterReducer } from "../component/search/logic";
import { vinReducer } from "../component/vin/logic";
import { valuationDataReducer } from "../component/valuation/logic";
import { suggestionReducer } from "../component/suggestions/logic";
import { advanceSearchReducer } from "../component/advanceSearch/logic";

export default combineReducers({
  ...commonReducer,
  ...searchReducer,
  ...detailsReducer,
  ...circuitAndDriverReducer,
  ...comparisonReducer,
  ...loginDataReducer,
  ...eventCalenderReducer,
  ...searchFilterReducer,
  ...vinReducer,
  ...valuationDataReducer,
  ...suggestionReducer,
  ...advanceSearchReducer,
});
