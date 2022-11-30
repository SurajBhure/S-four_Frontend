import React, { useState, useEffect } from "react";
import { useAuthLoginMutation } from "../../../app/Services/authServices";
import { setAdminToken } from "../../../app/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [login, response] = useAuthLoginMutation();
  console.log("my response on click login button:->", response);

  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  useEffect(() => {
    if (response.isSuccess) {
      sessionStorage.setItem("admin-token", response?.data?.token);
      dispatch(setAdminToken(response?.data?.token));
      navigate('/dashboard/products')
    }
    // eslint-disable-next-line
  }, [response.isSuccess]);

  return (
    <>
      <div className="bg-black1 h-screen flex justify-center items-center">
        <form
          className="bg-black2 p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12 rounded"
          onSubmit={handleLoginSubmit}
        >
          <h3 className="mb-4 text-white capitalize font-semibold text-lg">
            Dashboard Login
          </h3>
          {errors.length > 0 &&
            errors.map((error, i) => (
              <div key={i}>
                <p className="alert-danger">
                  {error.msg}
                </p>
              </div>
            ))}
          <div className="mb-4 mt-4">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              className="w-full bg-black1 p-4 rounded outline-none text-white"
              placeholder="Enter Email..."
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              className="w-full bg-black1 p-4 rounded outline-none text-white"
              placeholder="Enter Password..."
            />
          </div>
          <div className="mb-4">
            <input
              type="submit"
              value={response.isLoading ? "Loading..." : "Sign In"}
              className="w-full bg-indigo-600 p-4 rounded outline-none text-white uppercase font-semibold cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
