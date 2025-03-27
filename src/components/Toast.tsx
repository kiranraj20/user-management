import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setMessage } from "../store/usersSlice";

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.users.message);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(setMessage(null));
      }, 3000); // Toast disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`p-4 rounded-xl shadow-lg text-white font-medium transition-all duration-300 transform ${
          message.includes("Error")
            ? "bg-gradient-to-r from-red-500 to-red-600"
            : "bg-gradient-to-r from-green-500 to-green-600"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;