import { combineReducers } from "redux";
import taskReducers from "./taskSlice";
import userSlice from "./userSlice";
const rootReducer = combineReducers({
  task: taskReducers,
  user: userSlice,
});

export default rootReducer;
