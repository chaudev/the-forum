import {createSlice} from '@reduxjs/toolkit';

const newsSlice = createSlice({
  name: 'newsSlice',
  initialState: {
    data: [],
  },
  reducers: {
    setNewsFeed: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setNewsFeed} = newsSlice.actions;
export default newsSlice.reducer;
