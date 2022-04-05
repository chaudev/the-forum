import {createSlice} from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState: {
    data: [],
  },
  reducers: {
    setCourseList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setCourseList} = courseSlice.actions;
export default courseSlice.reducer;
