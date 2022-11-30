import React from "react";
import Skeleton from "./Skeleton";
import Thumbnail from "./Thumbnail"
import Text from "./Text"
import Square from "./Square";

const ProductDetailSkeleton = () => {
  return (
    <Skeleton>
      <div className="flex flex-wrap mt-6">
        <div className="w-full order-2 md:order-1 md:w-6/12 p-5">
          <div className="flex flex-wrap -mx-1">
            <div className="w-full sm:w-6/12 p-1">
                <Thumbnail height="300px"/>
            </div>
            <div className="w-full sm:w-6/12 p-1">
                <Thumbnail height="300px"/>
            </div>
            <div className="w-full sm:w-6/12 p-1">
                <Thumbnail height="300px"/>
            </div>
          </div>
        </div>
        <div className="w-full order-2 md:order-1 md:w-6/12 p-5">
            <Text />
            <Text mt="15px" />
            <Text mt="15px" />
            <div className="flex">
                <div className="m-2">
                    <Square />
                </div>
                <div className="m-2">
                    <Square />
                </div>
                <div className="m-2">
                    <Square />
                </div>
            </div>
            <Text mt="15px" />
            <div className="flex">
                <div className="m-2">
                    <Square />
                </div>
                <div className="m-2">
                    <Square />
                </div>
                <div className="m-2">
                    <Square />
                </div>
            </div>
            <Text mt="15px" />
            <Text mt="15px" />
            <Text mt="15px" />
            <Text mt="15px" />
        </div>
      </div>
    </Skeleton>
  );
};

export default ProductDetailSkeleton;
