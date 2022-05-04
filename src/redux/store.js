import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import { homeVideoReducer } from "./reducers/videos.reducer";
import { selectedVideoReduce } from "./reducers/videos.reducer";
import { relatedVideoReducer } from "./reducers/videos.reducer";
import { searchVideoReducer } from "./reducers/videos.reducer";
const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideoReducer,
    selectedVideo: selectedVideoReduce,
    relatedVideo: relatedVideoReducer,
    searchVideos: searchVideoReducer,
})
const store = createStore(rootReducer,{},composeWithDevTools(applyMiddleware(thunk)));

export default store;