import React, { useEffect, useState } from "react";
import Header from "../../../../components/client-screens/Header";
import Nav from "../../../../components/client-screens/Nav";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUserRegisterMutation } from "../../../../app/Services/authServices";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../../app/reducers/authReducer";
import { setSuccess } from "../../../../app/reducers/globalReducer";
import { useForm } from "../../../../hooks/Form";
import { showError } from "../../../../utils/showError";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // for errors
  const [errors, setErrors] = useState([]);

  // for state here we use custom useForm hook

  const { state, onHandleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [registerUser, response] = useUserRegisterMutation();
  //   console.log("registerUser response :->", response);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    // console.log("Register user:->", state); //check wheter data is getting in state or not
    registerUser(state);
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
      dispatch(setSuccess(response?.data?.message));
      navigate("/user");
    }
  }, [response.isSuccess]);

  return (
    <>
      <Nav />
      <div className="pb-[80px]">
        <Header>sign up</Header>
        <div className="flex flex-wrap justify-center">
          <motion.div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12  p-6">
            <form
              className="bg-white rounded-lg -mt-40 border border-gray-200 p-10"
              onSubmit={onHandleSubmit}
            >
              <h1 className="heading mb-5">sign up</h1>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  name
                </label>
                <input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={onHandleChange}
                  id="name"
                  className={`form-input ${
                    showError(errors, "name")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                  placeholder="Name..."
                />
                {showError(errors, "name") && (
                  <span className="error">{showError(errors, "name")}</span>
                )}
              </div>
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
                  value={`${response.isLoading ? "Loading..." : "sign up"}`}
                  className="btn btn-indigo w-full"
                  disabled={response.isLoading ? true : false}
                />
              </div>
              <div>
                <p>
                  Already have an account ?
                  <span className="capitalize font-medium text-base text-black">
                    <Link to="/login"> sign in</Link>
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

export default Register;
