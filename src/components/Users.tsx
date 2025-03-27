import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import {
  setUsers,
  setPage,
  updateUser,
  deleteUser,
  setMessage,
} from "../store/usersSlice";
import Toast from "./Toast";
import { logout } from "../store/authSlice";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email?: string;
}

const Users: React.FC = () => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, page, totalPages } = useSelector(
    (state: RootState) => state.users
  );
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      dispatch(logout());
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://reqres.in/api/users?page=${page}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Simulate token usage
          }
        );
        dispatch(
          setUsers({
            users: response.data.data,
            totalPages: response.data.total_pages,
          })
        );
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          // Simulate token expiration or invalidity
          dispatch(setMessage("Session expired. Please log in again."));
          dispatch(logout()); // Clear token on expiration
          navigate("/");
        } else {
          dispatch(setMessage("Error fetching users"));
        }
      }
    };

    fetchUsers();
  }, [page, token, navigate, dispatch]);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.first_name.toLowerCase().includes(query) ||
      user.last_name.toLowerCase().includes(query) ||
      (user.email && user.email.toLowerCase().includes(query))
    );
  });

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteUser(id));
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        dispatch(setMessage("Session expired. Please log in again."));
        dispatch(logout());
        navigate("/");
      } else {
        dispatch(setMessage("Error deleting user"));
      }
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${editingUser.id}`,
        {
          first_name: editingUser.first_name,
          last_name: editingUser.last_name,
          email: editingUser.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(updateUser({ ...editingUser, ...response.data }));
      setEditingUser(null);
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        dispatch(setMessage("Session expired. Please log in again."));
        dispatch(logout());
        navigate("/");
      } else {
        dispatch(setMessage("Error updating user"));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Users
      </h2>
      <div className="mb-6 flex flex-col justify-center items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full p-3 rounded-xl bg-white bg-opacity-90 backdrop-blur-md border-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500 shadow-md max-w-5xl w-full"
        />
      </div>
      <div className="space-y-4 flex flex-col justify-center items-center">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white bg-opacity-90 backdrop-blur-md p-4 rounded-2xl shadow-md flex items-center justify-between max-w-5xl w-full"
            >
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-gray-800 font-medium">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="p-2 px-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-2 px-3 rounded-full bg-gradient-to-r from-red-400 to-red-500 text-white shadow cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No users match your search.
          </p>
        )}
      </div>
      {editingUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-3">
          <form
            onSubmit={handleUpdate}
            className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-3xl shadow-lg w-full max-w-sm"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center justify-center">
              Edit User
            </h3>
            <div className="mb-4">
              <input
                type="text"
                value={editingUser.first_name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, first_name: e.target.value })
                }
                placeholder="First Name"
                className="w-full p-3 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={editingUser.last_name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, last_name: e.target.value })
                }
                placeholder="Last Name"
                className="w-full p-3 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                value={editingUser.email || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                placeholder="Email"
                className="w-full p-3 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="flex-1 p-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => dispatch(setPage(Math.max(page - 1, 1)))}
          disabled={page === 1}
          className="p-3 px-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md disabled:from-gray-300 disabled:to-gray-400 cursor-pointer"
        >
          Previous
        </button>
        <span className="p-3 text-gray-800 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => dispatch(setPage(Math.min(page + 1, totalPages)))}
          disabled={page === totalPages}
          className="p-3 px-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md disabled:from-gray-300 disabled:to-gray-400 cursor-pointer"
        >
          Next
        </button>
      </div>
      <Toast /> {/* Show toast for user actions */}
    </div>
  );
};

export default Users;
