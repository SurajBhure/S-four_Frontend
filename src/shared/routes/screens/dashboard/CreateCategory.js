import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScreenHeaders from "../../../../components/ScreenHeaders";
import Wrapper from "./Wrapper";
import { useCreateCatMutation } from "../../../../app/Services/categoryServices";
import { setSuccess } from "../../../../app/reducers/globalReducer";
import { useDispatch } from "react-redux";

const CreateCategory = () => {
  const [cat, setCat] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [saveCategory, response] = useCreateCatMutation();
  console.log("createCat :", response);
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const submitCat = (e) => {
    e.preventDefault();
    saveCategory({ name: cat });
  };

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.message))
      navigate("/dashboard/categories");
    } 
    // eslint-disable-next-line
  }, [response?.isSuccess]);

  return (
    <Wrapper>
      <ScreenHeaders>
        <Link to="/dashboard/categories" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i> Categories List
        </Link>
      </ScreenHeaders>
      <form className="w-full md:8/12" onSubmit={submitCat}>
        <h3 className="text-lg capitalize mb-3 ">Create Category</h3>
        {errors.length > 0 &&
          errors.map((error, i) => (
            <div key={i}>
              <p className="alert-danger">{error.msg}</p>
            </div>
          ))}
        <div className="mb-3">
          <input
            type="text"
            name=""
            value={cat}
            onChange={(e) => {
              setCat(e.target.value);
            }}
            className="form-control"
            placeholder="Category Name..."
          />
        </div>
        <div className="mb-3">
          <input
            type="submit"
            value={response.isLoading ? "Loading..." : "create-category"}
            className="btn-indigo"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
