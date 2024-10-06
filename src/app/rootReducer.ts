import { combineReducers } from "@reduxjs/toolkit";
import newUserModalReducer from "../features/newUserModal/newUserModalSlice";
import usersReducer from "../features/users/usersSlice";
import chatReducer from "../features/chat/chatSlice";
import searchReducer from "../features/chat/searchSlice";

const rootReducer = combineReducers({
  newUserModal: newUserModalReducer,
  users: usersReducer,
  chat: chatReducer,
  search: searchReducer,
});

export default rootReducer;

// This type type-checks selectors and ensures type safety when accessing state properties in the components
export type RootState = ReturnType<typeof rootReducer>;
