import React from "react";
import Skeleton from "./Skeleton";
import Text from "./Text";
import Thumbnail from "./Thumbnail";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-wrap -mx-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-4/12 xl:w-3/12 p-4"
          key={item}
        >
          <Skeleton>
            <Thumbnail height="320px" />
            <Text mt="10px" />
            <Text mt="10px" />
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
