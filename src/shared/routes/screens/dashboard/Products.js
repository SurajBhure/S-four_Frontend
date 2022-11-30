import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ScreenHeaders from "../../../../components/ScreenHeaders";
import Wrapper from "./Wrapper";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../../../../app/reducers/globalReducer";
import toast, { Toaster } from "react-hot-toast";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../../app/Services/productServices";
import Spinner from "../../../../components/Spinner";
import Pagination from "../../../../components/Pagination";

const Products = () => {
  const dispatch = useDispatch();

  // page distructure from Routing file path= categories/:page
  let { page } = useParams();
  // console.log("Your page", page); // check in consle wheter the params is showing page in console

  if (!page) {
    // if page is undefiend then
    page = 1;
  }

  const { data = [], isFetching } = useGetProductsQuery(page);
  // console.log("data :->", data, "isFetching :->", isFetching);

  //message from redux store for succes category created
  const { success } = useSelector((state) => state.globalReducer);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    return () => {
      dispatch(clearMessage());
    };
  }, []);

  //useDeleteProductMutation destructuring
  const [delProduct, response] = useDeleteProductMutation();

  //delete product function
  const deleteProduct = (id) => {
    if (window.confirm("Are sure to delete this product?")) {
      delProduct(id);
    }
  };

  return (
    <Wrapper>
      <ScreenHeaders>
        <Link to="/dashboard/create-product" className="btn-dark">
          Create Product <i className="bi bi-plus"></i>
        </Link>
        <Toaster position="top-right" />
      </ScreenHeaders>

      {!isFetching ? (
        data?.products?.length > 0 ? (
          <>
            <div>
              <table className="w-full bg-gray-900 rounded-md">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-sm text-gray-500 font-medium">
                      title
                    </th>
                    <th className="p-3 uppercase text-sm text-gray-500 font-medium">
                      price
                    </th>
                    <th className="p-3 uppercase text-sm text-gray-500 font-medium">
                      stock
                    </th>
                    <th className="p-3 uppercase text-sm text-gray-500 font-medium">
                      category
                    </th>
                    <th className="p-3 uppercase text-sm text-gray-500 font-medium">
                      image
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
                  {data?.products?.map((product) => (
                    <tr key={product._id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        {product.title}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        Rs.{product.price}.00
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        {product.stock}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        {product.category}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        <div className="flex flex-wrap -mx-1">
                          <img
                            src={`/images/${product.image1}`}
                            alt="image"
                            className="w-14 h-14 mx-1 rounded-md object-cover"
                          />
                          <img
                            src={`/images/${product.image2}`}
                            alt="image"
                            className="w-14 h-14 mx-1 rounded-md object-cover"
                          />
                          <img
                            src={`/images/${product.image3}`}
                            alt="image"
                            className="w-14 h-14 mx-1 rounded-md object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        <Link
                          to={`/dashboard/edit-product/${product._id}`}
                          className="btn btn-warning capitalize"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-500">
                        <button
                          className="btn btn-danger capitalize"
                          onClick={() => deleteProduct(product._id)}
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
              path="dashboard/products"
            />
          </>
        ) : (
          "No Products"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Products;
