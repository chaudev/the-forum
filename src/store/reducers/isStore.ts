import {createSlice} from '@reduxjs/toolkit';

const isStoreState = createSlice({
  name: 'globalState',
  initialState: {
    status: false,
  },
  reducers: {
    setIsStore: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {setIsStore} = isStoreState.actions;
export {isStoreState};
export default isStoreState.reducer;
