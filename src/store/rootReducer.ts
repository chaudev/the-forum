import {combineReducers} from '@reduxjs/toolkit';
import {
  userSlice,
  bottomTabSlice,
  newsSlice,
  globalState,
  courseSlice,
  isStoreState,
} from './reducers';

const rootReducer = combineReducers({
  user: userSlice,
  bottomTab: bottomTabSlice,
  news: newsSlice,
  globalState: globalState,
  course: courseSlice,
  isStore: isStoreState,
});

export default rootReducer;
