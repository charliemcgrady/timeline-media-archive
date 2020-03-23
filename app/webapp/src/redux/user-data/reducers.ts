import { combineReducers } from "redux";
import mediaReducer from "~/redux/user-data/media/reducers";
import storiesReducer from "~/redux/user-data/stories/reducers";

export default combineReducers({
  media: mediaReducer,
  stories: storiesReducer
});
