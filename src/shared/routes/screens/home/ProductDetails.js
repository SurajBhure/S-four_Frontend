import React from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../../../../components/client-screens/Nav";
import { FiChevronRight } from "react-icons/fi";
import { useProductDetailQuery } from "../../../../app/Services/productServices";
import ProDetailsCard from "./ProDetailsCard";
import ProductDetailSkeleton from "../../../../components/skeleton/ProductDetailSkeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useProductDetailQuery(id);
  // console.log(data, isFetching);
  return (
    <>
      <Nav />
      <div className="container mt-6">
        {isFetching ? (
          <ProductDetailSkeleton />
        ) : (
          <>
            <ul className="flex items-center ">
              <li className="capitalize text-gray-600">
                <Link to="/">home</Link>
              </li>
              <FiChevronRight className="block mx-2" />
              <li className="capitalize text-gray-600">
                <Link to={`/cat-products/${data.category}`}>
                  {data?.category}
                </Link>
              </li>
              <FiChevronRight className="block mx-2" />
              <li className="capitalize text-gray-600">
                <Link to={`/product/${data._id}`}>{data?.title}</Link>
              </li>
            </ul>

            <ProDetailsCard product={data} />
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
