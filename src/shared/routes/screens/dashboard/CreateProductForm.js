import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAllCategoriesQuery } from "../../../../app/Services/categoryServices";
import ScreenHeaders from "../../../../components/ScreenHeaders";
import Spinner from "../../../../components/Spinner";
import Wrapper from "./Wrapper";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid"; // for unique id code we use uuid
import Colors from "../../../../components/Colors";
import SizesList from "../../../../components/SizesList";
import ImagesPreview from "../../../../components/ImagesPreview";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateProductMutation } from "../../../../app/Services/productServices";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../../../app/reducers/globalReducer";

const CreateProductForm = () => {
  const { data = [], isFetching } = useAllCategoriesQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   console.log(data, isFetching);
  const [value, setValue] = useState(""); // for description add we use rich quill editor

  const [product, setProduct] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
    image1: "",
    image2: "",
    image3: "",
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

  const [previewImg, setPreviewImg] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  //input fileds handle
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //image handle
  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
      const reader = new FileReader(); // inbuilt class in javascript
      reader.onloadend = () => {
        // onloadend is also inbuilt
        setPreviewImg({ ...previewImg, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  console.log("preview :", previewImg); // images preview

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
  const [createNewProduct, response] = useCreateProductMutation();
  console.log("Your response", response);

  //create Product function on submit the form
  const createProduct = (e) => {
    e.preventDefault();

    const formData = new FormData(); // FormData is inbuilt javascript function to send data in Json format
    formData.append("data", JSON.stringify(product));
    formData.append("sizes", JSON.stringify(sizeList));
    formData.append("description", value);
    formData.append("image1", product.image1);
    formData.append("image2", product.image2);
    formData.append("image3", product.image3);

    // console.log("product", product); // product goes in setProduct
    // console.log("sizeList", sizeList); // sizelist is also append in setProduct
    // console.log("previewImg", previewImg); // images cant not store in json format so we store it diffrently
    // console.log("product.image", product.image2);
    // console.log(`Rich text editor : ${value}`); // value goes in setProduct in description

    //create new fuction bcoz each any evry data is attche in formData
    createNewProduct(formData);
  };

  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors.map((err) => toast.error(err.msg));
    }
  }, [response?.error?.data?.errors]);

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
    // eslint-disable-next-line
  }, [response?.isSuccess]);

  return (
    <Wrapper>
      <ScreenHeaders>
        <Link to="/dashboard/products" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i> Products List
        </Link>
      </ScreenHeaders>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex flrx-wrap -mx-3">
        <form className="w-full xl:w-8/12 p-3" onSubmit={createProduct}>
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
              <label htmlFor="image1" className="label">
                Image 1
              </label>
              <input
                type="file"
                name="image1"
                onChange={handleImage}
                id="image1"
                className="input-file"
              />
            </div>
            <div className="w-full p-3">
              <label htmlFor="image2" className="label">
                Image 2
              </label>
              <input
                type="file"
                name="image2"
                onChange={handleImage}
                id="image2"
                className="input-file"
              />
            </div>
            <div className="w-full p-3">
              <label htmlFor="image3" className="label">
                Image 3
              </label>
              <input
                type="file"
                name="image3"
                onChange={handleImage}
                id="image3"
                className="input-file"
              />
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
                value={response.isLoading ? "Loading..." : "save product"}
                disabled={response.isLoading ? true : false}
                className="btn btn-indigo"
              />
            </div>
          </div>
        </form>
        <div className="w-full xl:w-4/12 p-3">
          <Colors colors={product.colors} deleteColor={deleteColor} />
          <SizesList sizeList={sizeList} deleteSize={deleteSize} />
          <ImagesPreview url={previewImg.image1} heading="image1" />
          <ImagesPreview url={previewImg.image2} heading="image2" />
          <ImagesPreview url={previewImg.image3} heading="image3" />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProductForm;
