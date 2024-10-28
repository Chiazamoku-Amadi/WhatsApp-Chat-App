import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message, User } from "../../types/types";

interface InitialState {
  users: User[];
  selectedUser: User | null;
}

const initialState: InitialState = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  selectedUser: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state?.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    selectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },

    addMessageToUser: (state, action: PayloadAction<Message>) => {
      const senderIndex = state.users.findIndex(
        (user) => user.id === action.payload.senderId
      );
      const receiverIndex = state.users.findIndex(
        (user) => user.id === action.payload.receiverId
      );

      // Create a copy of the users array
      const updatedUsers = [...state.users];

      // If sender exists, create a copy of the sender user and add the message to their messages array
      if (senderIndex !== -1) {
        const updatedSender = {
          ...state.users[senderIndex],
          messages: [...state.users[senderIndex].messages, action.payload],
        };

        // Update the sender user in the users array
        updatedUsers[senderIndex] = updatedSender;
      }

      // If receiver exists, create a copy of the receiver and add the message to their messages array
      if (receiverIndex !== -1) {
        const updatedReceiver = {
          ...state.users[receiverIndex],
          messages: [...state.users[receiverIndex].messages, action.payload],
        };

        // If the currently selected user is not the receiver, increment the unreadMessagesCount of the receiver
        if (state.selectedUser?.id !== action.payload.receiverId) {
          updatedReceiver.unreadMessagesCount =
            (updatedReceiver.unreadMessagesCount || 0) + 1;
        }

        // Update the receiver in the users array
        updatedUsers[receiverIndex] = updatedReceiver;
      }

      // Update the state with the updated users array
      state.users = updatedUsers;

      localStorage.setItem("users", JSON.stringify(state.users));
    },

    allUserMessagesRead: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        state.users[userIndex].messages.forEach((message) => {
          message.read = true; // Mark all messages as read
        });

        state.users[userIndex].unreadMessagesCount = 0;
      }

      localStorage.setItem("users", JSON.stringify(state.users));
    },

    setUserTyping: (
      state,
      action: PayloadAction<{ userId: string; typing: boolean }>
    ) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.userId
      );

      if (userIndex !== -1) {
        state.users[userIndex].typing = action.payload.typing;
      }

      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const {
  addUser,
  selectedUser,
  addMessageToUser,
  allUserMessagesRead,
  setUserTyping,
} = usersSlice.actions;

export default usersSlice.reducer;
