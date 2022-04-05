import {createSlice} from '@reduxjs/toolkit';

const globalState = createSlice({
  name: 'globalState',
  initialState: {
    term: {},
    FAQ: [],
    paieds: [],
    joined: [],
    resultTest: [],
    more: [],
  },
  reducers: {
    setTermOfUser: (state, action) => {
      state.term = action.payload;
    },
    setFAQ: (state, action) => {
      state.FAQ = action.payload;
    },
    setPaied: (state, action) => {
      state.paieds = action.payload;
    },
    setJoined: (state, action) => {
      state.joined = action.payload;
    },
    setResultTest: (state, action) => {
      state.resultTest = action.payload;
    },
    setMore: (state, action) => {
      state.more = action.payload;
    },
  },
});

export const {setTermOfUser, setFAQ, setPaied, setJoined, setResultTest, setMore} =
  globalState.actions;
export {globalState};
export default globalState.reducer;
