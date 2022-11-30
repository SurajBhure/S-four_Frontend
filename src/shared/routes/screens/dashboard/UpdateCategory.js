import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenHeaders from "../../../../components/ScreenHeaders";
import Wrapper from "./Wrapper";
import { setSuccess } from "../../../../app/reducers/globalReducer";
import { useDispatch } from "react-redux";
import {
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../app/Services/categoryServices";
import Spinner from "../../../../components/Spinner";

const UpdateCategory = () => {
  const [cat, setCat] = useState("");
  const { id } = useParams();
  const { data, isFetching } = useFetchCategoryQuery(id);
  console.log("cat data :", data);

  useEffect(() => {
    data?.category && setCat(data?.category?.name);
  }, [data?.category]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saveCategory, response] = useUpdateCategoryMutation();
  console.log("updateCategory :", response);
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];

  const updateSubmit = (e) => {
    e.preventDefault();
    saveCategory({ name: cat, id });
  };

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
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
      {!isFetching ? (
        <form className="w-full md:8/12" onSubmit={updateSubmit}>
          <h3 className="text-lg capitalize mb-3 ">Update Category</h3>
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
              value="update"
              className="btn btn-indigo capitalize"
            />
          </div>
        </form>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default UpdateCategory;
