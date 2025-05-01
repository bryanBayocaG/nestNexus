import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  openModalId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.openModalId = action.payload;
    },
    closeModal: (state) => {
      state.openModalId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
