import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email?: string;
}

interface UsersState {
  users: User[];
  page: number;
  totalPages: number;
  message: string | null;
}

const initialState: UsersState = {
  users: [],
  page: 1,
  totalPages: 1,
  message: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<{ users: User[]; totalPages: number }>) {
      state.users = action.payload.users;
      state.totalPages = action.payload.totalPages;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    updateUser(state, action: PayloadAction<User>) {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      state.message = "User updated successfully";
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.message = "User deleted successfully";
    },
    setMessage(state, action: PayloadAction<string | null>) {
      state.message = action.payload;
    },
  },
});

export const { setUsers, setPage, updateUser, deleteUser, setMessage } = usersSlice.actions;
export default usersSlice.reducer;