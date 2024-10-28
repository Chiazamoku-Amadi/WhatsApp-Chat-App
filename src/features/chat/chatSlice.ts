import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../types/types";

interface ChatState {
  messages: Message[];
  inputValue: string;
}

const initialState: ChatState = {
  messages: JSON.parse(localStorage.getItem("messages") || "[]"),
  inputValue: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);

      // Save updated messages to localStorage
      localStorage.setItem("messages", JSON.stringify(state.messages));
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

      // Update localStorage with read messages
      localStorage.setItem("messages", JSON.stringify(state.messages));
    },
  },
});

export const { sendMessage, setInputValue, markMessageAsRead } =
  chatSlice.actions;

export default chatSlice.reducer;
