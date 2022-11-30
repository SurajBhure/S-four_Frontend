import React from "react";

const SizesList = ({ sizeList, deleteSize }) => {
  return (
    <>
      {sizeList.length > 0 && (
        <div className="right-heading">
          <h1 className="label capitalize">size's selected list</h1>
          <div className="flex flex-wrap mt-3 -mx-2">
            {sizeList.map((size) => (
              <div
                key={size.name}
                className="size cursor-pointer"
                onClick={() => deleteSize(size.name)}
              >
                {size.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SizesList;
