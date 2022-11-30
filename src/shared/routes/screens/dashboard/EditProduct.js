import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAllCategoriesQuery } from "../../../../app/Services/categoryServices";
import ScreenHeaders from "../../../../components/ScreenHeaders";
import Spinner from "../../../../components/Spinner";
import Wrapper from "./Wrapper";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid"; // for unique id code we use uuid
import Colors from "../../../../components/Colors";
import SizesList from "../../../../components/SizesList";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useUpdateProductMutation,
  useFetchProductQuery,
} from "../../../../app/Services/productServices";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../../../app/reducers/globalReducer";
import h2p from "html2plaintext"; // parse quill editor text so for that we need this package

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data = [], isFetching } = useAllCategoriesQuery();

  const { data: fetchProduct, isFetching: fetching } = useFetchProductQuery(id); //fetchProductQuery
  console.log("Data :->", fetchProduct);

  //   console.log(data, isFetching);
  const [value, setValue] = useState(""); // for description add we use rich quill editor

  const [product, setProduct] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
  });

  const [sizes] = useState([
    { name: "xsm" },
    { name: "sm" },
    { name: "md" },
    { name: "lg" },
    { name: "xl" },
    { name: "xxl" },
    { name: "1 year" },
    { name: "2 year" },
    { name: "3 year" },
    { name: "4 year" },
    { name: "5 year" },
  ]);

  const [sizeList, setSizeList] = useState([]);

  //input fileds handle
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const saveColors = (color) => {
    // console.log("color", color); // check the comming color which we select
    const filteredColor = product.colors.filter(
      (clr) => clr.color !== color.hex
    );

    setProduct({
      ...product,
      colors: [...filteredColor, { color: color.hex, id: uuidv4() }],
    });
  };
  //   console.log("state colors :", product.colors); //Check colors are uplaoded or not

  //delete color function
  const deleteColor = (color) => {
    const filterColor = product.colors.filter(
      (clr) => clr.color !== color.color
    );
    setProduct({ ...product, colors: filterColor });
  };

  // choose size function
  const chooseSize = (sizeObj) => {
    const filteredSize = sizeList.filter((size) => size.name !== sizeObj.name);
    setSizeList([...filteredSize, sizeObj]);
  };
  //   console.log("sizeList", sizeList); // check size are comming is sizeList

  //delete size from selected side
  const deleteSize = (name) => {
    const filteredSize = sizeList.filter((size) => size.name !== name);
    setSizeList([...filteredSize]);
  };

  //destructred the useCreateProductMutation to call createProduct method from redux services
  const [updateProduct, response] = useUpdateProductMutation();
  console.log("Your response", response);

  //create Product function on submit the form
  const createProduct = (e) => {
    e.preventDefault();

    console.log("update Pro :->", product);
    updateProduct(product);
  };

  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors.map((err) => toast.error(err.msg));
    }
  }, [response?.error?.data?.errors]);

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
      navigate("/dashboard/products");
    }
    // eslint-disable-next-line
  }, [response?.isSuccess]);

  //  to update description we have to use useEffect
  useEffect(() => {
    setProduct({ ...product, description: value });
  }, [value]);

  useEffect(() => {
    if (!fetching) {
      setProduct(fetchProduct);
      setSizeList(fetchProduct.sizes);
      setValue(h2p(fetchProduct.description));
    }
  }, [fetchProduct]);
  // console.log("Your fetch Product", product);
  // console.log("product.colors :", product.colors);

 

  return (
    <Wrapper>
      <ScreenHeaders>
        <Link to="/dashboard/products" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i> Products List
        </Link>
      </ScreenHeaders>
      <Toaster position="top-right" reverseOrder={true} />
      {!fetching ? (
        <div className="flex flrx-wrap -mx-3">
          <form className="w-full xl:w-8/12 p-3" onSubmit={createProduct}>
            <h3 className="pl-3 capitalize text-lg font-medium text-gray-400">
              edit product
            </h3>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={product.title}
                  className="form-control"
                  id="title"
                  placeholder="Title..."
                  onChange={handleInput}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="price" className="label">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  id="price"
                  placeholder="Price..."
                  value={product.price}
                  onChange={handleInput}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                  discount
                </label>
                <input
                  type="number"
                  name="discount"
                  className="form-control"
                  id="discount"
                  placeholder="discount..."
                  value={product.discount}
                  onChange={handleInput}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="stock" className="label">
                  stock
                </label>
                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  id="stock"
                  placeholder="stock..."
                  value={product.stock}
                  onChange={handleInput}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="category" className="label">
                  category
                </label>
                {!isFetching ? (
                  data?.categories?.length > 0 && (
                    <select
                      name="category"
                      id="category"
                      className="form-control"
                      value={product.category}
                      onChange={handleInput}
                    >
                      <option value="">Choose category</option>
                      {data?.categories.map((category) => (
                        <option value={category.name} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )
                ) : (
                  <Spinner />
                )}
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="colors" className="label">
                  choose color
                </label>
                <TwitterPicker onChangeComplete={saveColors} />
              </div>
              <div className="w-full p-3">
                <label htmlFor="colors" className="label">
                  choose sizes
                </label>
                {sizes.length > 0 && (
                  <div className="flex flex-wrap -mx-2">
                    {sizes.map((size) => (
                      <div
                        key={size.name}
                        className="size"
                        onClick={() => {
                          chooseSize(size);
                        }}
                      >
                        {size.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full p-3">
                <label htmlFor="description" className="label">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  id="description"
                  value={value}
                  onChange={setValue}
                  className="placeholder:text-white"
                  placeholder="Description.."
                />
              </div>
              <div className="w-full p-3">
                <input
                  type="submit"
                  value={response.isLoading ? "Loading..." : "Update product"}
                  disabled={response.isLoading ? true : false}
                  className="btn btn-indigo"
                />
              </div>
            </div>
          </form>
          <div className="w-full xl:w-4/12 p-3">
            <Colors colors={product.colors} deleteColor={deleteColor} />
            <SizesList sizeList={sizeList} deleteSize={deleteSize} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default EditProduct;
