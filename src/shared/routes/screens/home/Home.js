import React from "react";
import Nav from "../../../../components/client-screens/Nav";
import Slider from "../../../../components/client-screens/Slider";
import Categories from "../../../../components/client-screens/Categories";
import { useRandomCategoriesQuery } from "../../../../app/Services/categoryServices";
import HomeProducts from "../../../../components/client-screens/HomeProducts";

const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  console.log("homeProduct :->", data, isFetching);
  return (
    <>
      <Nav />
      <div>
        <Slider />
      </div>
      <div className="container mt-5 mb-5">
        <Categories />
        {!isFetching &&
          data?.categories?.length > 0 &&
          data?.categories.map((category) => (
            <HomeProducts category={category} key={category._id} />
          ))}
      </div>
    </>
  );
};

export default Home;
