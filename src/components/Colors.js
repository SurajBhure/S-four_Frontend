import React from "react";

const Colors = ({ colors, deleteColor }) => {
  // console.log("Colors -:>",colors);
  return (
    <>
      {colors.length > 0 && (
        <div className="right-heading">
          <h1 className="label capitalize">Color List</h1>
          <div className="flex flex-wrap -mx-1">
            {colors.map((color) => (
              <div className="p-1" key={color.id}>
                <div
                  className="w-[30px] h-[30px] rounded-full cursor-pointer "
                  style={{ backgroundColor: color.color }}
                  onClick={() => deleteColor(color)}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Colors;
