import React, { useState } from "react";
import currencyFormatter from "currency-formatter";
import h2p from "html2plaintext"; // parse quill editor text so for that we need this package
import htmlParser from "html-react-parser";
import DetailsImage from "../../../../components/client-screens/DetailsImage";
import Quantity from "../../../../components/client-screens/Quantity";
import { motion } from "framer-motion";
import { BsCheck2 } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { addCart } from "../../../../app/reducers/cartReducer";
import { useDispatch } from "react-redux";
import { discount } from "../../../../utils/discount";

const ProDetailsCard = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [sizeState, setSizeState] = useState(
    product?.sizes.length > 0 && product?.sizes[0].name
  );
  // console.log(sizeState);

  const [colorState, setColorState] = useState(
    product?.colors.length > 0 && product?.colors[0].color
  );
  // console.log(colorState);

  const discountPrice = discount(product.price, product.discount);
  console.log("product :->", product);

  let descrip = h2p(product.description);
  // console.log("h2p :->",descrip);
  descrip = htmlParser(descrip);
  // console.log("htmlParser :->",descrip);

  const inc = () => {
    setQuantity(quantity + 1);
  };
  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    const {
      ["colors"]: colors,
      ["sizes"]: sizes,
      ["createdAt"]: createdAt,
      ["updatedAt"]: updatedAt,
      ...newProduct
    } = product;
    newProduct["size"] = sizeState;
    newProduct["color"] = colorState;
    newProduct["quantity"] = quantity;
    console.log("newProduct:->", newProduct);

    const cart = sessionStorage.getItem("cart");
    const cartItem = cart ? JSON.parse(cart) : []; // we have array here for cartItem By JSON.parse they array in session storage

    const checkItem = cartItem.find((item) => item._id === newProduct._id);
    if (!checkItem) {
      cartItem.push(newProduct);
      sessionStorage.setItem("cart", JSON.stringify(cartItem)); // JSON.stringify we have to change the aray object
      dispatch(addCart(newProduct)); // store in redux
    } else {
      toast.error(`${newProduct.title} is already in cart`);
      return;
    }
  };
  return (
    <motion.div
      className="flex flex-wrap -mx-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Toaster />
      <div className="w-full order-2 md:order-1 md:w-6/12 p-5">
        <div className="flex flex-wrap">
          <DetailsImage image={product.image1} />
          <DetailsImage image={product.image2} />
          <DetailsImage image={product.image3} />
        </div>
      </div>
      <div className="w-full order-1 md:order-2 md:w-6/12 p-5">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          {product.title}
        </h1>
        <div className="flex justify-between my-5">
          <span className="text-black text-lg font-bold">
            {currencyFormatter.format(discountPrice, {
              code: "INR",
            })}
          </span>
          <span className="line-through text-gray-400 text-lg font-bold">
            {currencyFormatter.format(product.price, {
              code: "INR",
            })}
          </span>
        </div>

        {product.sizes.length > 0 && (
          <>
            <h3 className="text-base font-medium capitalize text-gray-700 mb-2">
              sizes
            </h3>
            <div className="flex flex-wrap -mx-1">
              {product.sizes.map((size) => {
                return (
                  <div
                    className={`p-2 border border-gray-500 m-1 rounded cursor-pointer ${
                      sizeState === size.name && "bg-indigo-600"
                    }`}
                    key={size.name}
                    onClick={() => setSizeState(size.name)}
                  >
                    <span
                      className={`text-sm font-semibold uppercase ${
                        sizeState === size.name ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {size.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {product.colors.length > 0 && (
          <>
            <h3 className="text-base font-medium capitalize text-gray-700 mt-3 mb-2">
              colors
            </h3>
            <div className="flex flex-wrap -mx-1">
              {product.colors.map((color) => {
                return (
                  <div
                    className="m-1 rounded cursor-pointer"
                    key={color.color}
                    onClick={() => setColorState(color.color)}
                  >
                    <span
                      className="min-w-[30px] min-h-[30px] rounded flex items-center justify-center"
                      style={{ backgroundColor: color.color }}
                    >
                      {colorState === color.color && (
                        <BsCheck2 className="text-white" size={20} />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div className="flex -mx-3 items-center">
          <div className="w-full sm:w-6/12 p-3">
            <Quantity quantity={quantity} inc={inc} dec={dec} />
          </div>
          <div className="w-full sm:w-6/12 p-3">
            <button className="btn btn-indigo" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        <h3 className="text-base font-medium capitalize text-gray-700 mt-3 mb-2">
          description
        </h3>
        <div className="leading-[27px]">{descrip}</div>
      </div>
    </motion.div>
  );
};

export default ProDetailsCard;
