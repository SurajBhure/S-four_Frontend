import React from "react";

const ModalDataList = ({ title, data }) => {
  console.log("title ->", title, "data :->", data);
  return (
    <div className="flex ">
      <div className="text-sm w-full text-gray-500 border-0 border-b-[1px] border-gray-400 p-2 flex justify-between">
        <div className="w-5/12 capitalize">{title}</div>
        <div className="w-7/12 capitalize">
          {Array.isArray(data)
            ? data.map((datainfo, i) => <span key={i}>datainfo</span>)
            : data}
        </div>
      </div>
    </div>
  );
};

export default ModalDataList;
