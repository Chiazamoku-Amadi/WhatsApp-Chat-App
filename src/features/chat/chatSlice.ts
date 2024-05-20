import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../types/types";

interface ChatState {
  messages: Message[];
  inputValue: string;
}

const initialState: ChatState = {
  messages: [],
  inputValue: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },

    markMessageAsRead: (state, action: PayloadAction<{ userId: string }>) => {
      state.messages.forEach((message) => {
        if (message.receiverId === action.payload.userId) {
          message.read = true;
        }
      });
    },
  },
});

export const { sendMessage, setInputValue, markMessageAsRead } =
  chatSlice.actions;

export default chatSlice.reducer;
