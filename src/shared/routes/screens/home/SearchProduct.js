import React from "react";
import Nav from "../../../../components/client-screens/Nav";
import Header from "../../../../components/client-screens/Header";
import { useParams } from "react-router-dom";
import { useSearchProductsQuery } from "../../../../app/Services/homeProdServices";
import ProductCard from "../../../../components/client-screens/ProductCard";
import Pagination from "../../../../components/Pagination";
import ProductSkeleton from "../../../../components/skeleton/ProductSkeleton";

const SearchProduct = () => {
  const { keyword, page = 1 } = useParams();
  const { data, isFetching } = useSearchProductsQuery({
    keyword,
    page: parseInt(page),
  });
    console.log(data, isFetching);
  //   console.log("params", name, page);
  return (
    <>
      <Nav />
      <div>
        <Header>#{keyword}</Header>
      </div>
      <div className="container my-10">
        {isFetching ? (
          <ProductSkeleton />
        ) : data.count > 0 ? (
          <>
            <div className="mb-3 text-base font-medium text-gray-700">
              {data.count} products found in #{keyword} categogy
            </div>
            <div className="flex flex-wrap -mx-5">
              {data?.products.map((product) => {
                return <ProductCard product={product} />;
              })}
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path={`cat-products/${keyword}`}
              theme="light"
            />
          </>
        ) : (
          <p className="alert-danger">No data found in ${keyword} keyword</p>
        )}
      </div>
    </>
  );
};

export default SearchProduct;
