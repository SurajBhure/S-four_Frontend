import React from "react";
import { Link } from "react-router-dom";
import currencyFormatter from "currency-formatter";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const percentage = product.discount / 100;
  const discountPrice = product.price - product.price * percentage;
  //  console.log("discounted Price", discountPrice);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full sm:w-6/12 md:w-4/12 xl:w-3/12 px-5 py-10 border-gray-400 border-"
      key={product._id}
    >
      <Link to={`/product/${product._id}`}>
        <div className="w-full">
          <img
            src={`/images/${product.image1}`}
            alt={`${product.title}`}
            className="w-full h-[300px] object-cover"
          />
          <p className="capitalize font-base font-medium my-2.5 text-black">
            {product.title}
          </p>
          <div className="flex justify-between">
            <span className="text-black text-lg font-medium">
              {currencyFormatter.format(discountPrice, {
                code: "INR",
              })}
            </span>
            <span className="line-through text-gray-400 text-lg font-medium">
              {currencyFormatter.format(product.price, {
                code: "INR",
              })}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
