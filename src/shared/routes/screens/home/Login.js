import React, { useState, useEffect } from "react";
import Header from "../../../../components/client-screens/Header";
import Nav from "../../../../components/client-screens/Nav";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserLoginMutation } from "../../../../app/Services/authServices";
import { setUserToken } from "../../../../app/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useForm } from "../../../../hooks/Form";
import { showError } from "../../../../utils/showError";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // for errors
  const [errors, setErrors] = useState([]);

  // for state here we use custom useForm hook

  const { state, onHandleChange } = useForm({
    email: "",
    password: "",
  });

  const [userLogin, response] = useUserLoginMutation();
  console.log("user login response :->", response);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    userLogin(state);
  };
  // to handle Error from response
  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data]);
  //   console.log("register errors :->", errors); // Check errors we are geeting from response and store in array form

  // after all details fill -- we get response.isSuccess
  useEffect(() => {
    if (response.isSuccess) {
      sessionStorage.setItem("user-token", response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      navigate("/user");
    }
  }, [response.isSuccess]);

  // console.log("errors", errors); //check errors array

  return (
    <>
      <Nav />
      <div className="pb-[80px]">
        <Header>sign in</Header>
        <div className="flex flex-wrap justify-center">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 p-6"
          >
            <form
              className="bg-white rounded-lg -mt-40 border border-gray-200 p-10"
              onSubmit={onHandleSubmit}
            >
              <h1 className="heading mb-5">sign in</h1>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={onHandleChange}
                  id="email"
                  className={`form-input ${
                    showError(errors, "email")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                  placeholder="Email..."
                />
                {showError(errors, "email") && (
                  <span className="error">{showError(errors, "email")}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={onHandleChange}
                  id="password"
                  className={`form-input ${
                    showError(errors, "password")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                  placeholder="Pasword..."
                />
                {showError(errors, "password") && (
                  <span className="error">{showError(errors, "password")}</span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="submit"
                  value={`${response.isLoading ? "Loading..." : "sign in"}`}
                  className="btn btn-indigo w-full"
                  disabled={response.isLoading ? true : false}
                />
              </div>
              <div>
                <p>
                  Don't have an account ?
                  <span className="capitalize font-medium text-base text-black">
                    <Link to="/register"> Register here</Link>
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
