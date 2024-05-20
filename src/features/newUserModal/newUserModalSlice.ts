import { createSlice } from "@reduxjs/toolkit";

interface NewUserModalState {
  isOpen: boolean;
}

const initialState: NewUserModalState = {
  isOpen: false,
};

const newUserModalSlice = createSlice({
  name: "newUserModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = newUserModalSlice.actions;
export default newUserModalSlice.reducer;
