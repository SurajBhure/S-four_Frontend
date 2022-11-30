import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  useGetCatQuery,
  useDeleteCategoryMutation,
} from "../../../../app/Services/categoryServices";
import { setSuccess, clearMessage } from "../../../../app/reducers/globalReducer";
import Pagination from "../../../../components/Pagination";
import ScreenHeaders from "../../../../components/ScreenHeaders";
import Spinner from "../../../../components/Spinner";
import Wrapper from "./Wrapper";

const Categories = () => {
  const dispatch = useDispatch();

  
  // page distructure from Routing file path= categories/:page
  let { page } = useParams();
  console.log("Your page", page); // check in consle wheter the params is showing page in console

  if (!page) {
    // if page is undefiend then
    page = 1;
  }

  //message from redux store for succes category created
  const { success } = useSelector((state) => state.globalReducer);

  const { data = 0, isFetching } = useGetCatQuery(page); // data initial taking empty array
  // console.log(data, isLoading);

  const [removeCategory, removeResponse] = useDeleteCategoryMutation();
  // console.log("remove res:", removeResponse);

  const deleteCat = (id) => {
    if (window.confirm("Are you sure to delte the category?")) {
      removeCategory(id);
    }
  };

  useEffect(() => {
    if (removeResponse.isSuccess) {
      dispatch(setSuccess(removeResponse?.data?.message));
    }
  }, [removeResponse?.data?.message]);

  useEffect(() => {
    dispatch(setSuccess(success));
    //clear success msg after route changes methid call from redux store
    return () => {
      dispatch(clearMessage());
    };
  }, []);
  return (
    <Wrapper>
      <ScreenHeaders>
        <Link to="/dashboard/create-category" className="btn-dark">
          Add Categories <i className="bi bi-plus"></i>
        </Link>
      </ScreenHeaders>
      {success && <div className="alert-success">{success}</div>}
      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>
            <div>
              <table className="w-full bg-gray-900 rounded-md">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-sm text-gray-500 font-medium">
                      name
                    </th>
                    <th className="p-3 uppercase text-sm text-gray-500 font-medium">
                      edit
                    </th>
                    <th className="p-3 uppercase text-sm text-gray-500 font-medium">
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.categories?.map((category) => (
                    <tr key={category._id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        {category.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        <Link
                          to={`/dashboard/update-category/${category._id}`}
                          className="btn btn-warning capitalize"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        <button
                          className="btn btn-danger capitalize"
                          onClick={() => deleteCat(category._id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path={`dashboard/categories`}
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;
