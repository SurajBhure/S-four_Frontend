import React from "react";
import { Link } from "react-router-dom";
import { useCatProductsQuery } from "../../app/Services/homeProdServices";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import ProductCard from "./ProductCard";

const HomeProducts = ({ category }) => {
  console.log(category.name);
  const { data, isFetching } = useCatProductsQuery({
    name: category.name,
    page: "",
  });
  console.log("HomeProduct :->", data?.products);
  return (
    <>
      {isFetching ? (
        <ProductSkeleton />
      ) : (
        data?.products?.length > 0 && (
          <>
            <div className="flex justify-between">
              <span className="text-xl font-medium capitalize">{category.name}</span>
              <span className="capitalize">
                <Link to={`/cat-products/${category.name}`}>
                  sell all products
                </Link>
              </span>
            </div>
            <div className="flex flex-wrap -mx-5">
{data?.products?.map((product)=>(
    <ProductCard product={product} />
))}
            </div>
          </>
        )
      )}
    </>
  );
};

export default HomeProducts;
