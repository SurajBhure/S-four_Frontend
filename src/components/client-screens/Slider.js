import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React components
import { Pagination } from "swiper"; // import required modules
import { useRandomCategoriesQuery } from "../../app/Services/categoryServices";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const Slider = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  //   console.log("Data:=>", data, "isFetching :->", isFetching);
  return isFetching ? (
    <div className="container h-[70px] flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {data?.categories.length > 0 &&
        data?.categories.map((category, i) => (
          <SwiperSlide className="slide" key={category._id}>
            <div
              className={`slide-img bg-[url('../public/images/slider/${
                i + 1
              }.jpg')]`}
            ></div>
            <div className="absolute inset-0 w-full h-full bg-black/50">
              <div className="container h-[70vh] flex flex-col items-center justify-center">
                <h1 className="text-white text-xl font-medium capitalize">
                  {category.name}
                </h1>
                <div className="mt-10">
                  <Link
                    to={`/cat-products/${category.name}`}
                    className="bt btn-indigo text-sm"
                  >
                    browse collection
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );

  //   (
  //     <>

  //       <Swiper
  //         pagination={{
  //           dynamicBullets: true,
  //         }}
  //         modules={[Pagination]}
  //         className="mySwiper"
  //       >
  //         <SwiperSlide className="slide">
  //           <div className="slide-img bg-[url('../public/images/slider/1.jpg')]"></div>
  //         </SwiperSlide>
  //         <SwiperSlide className="slide">
  //           <div className="slide-img bg-[url('../public/images/slider/2.jpg')]"></div>
  //         </SwiperSlide>
  //         <SwiperSlide className="slide">
  //           <div className="slide-img bg-[url('../public/images/slider/3.jpg')]"></div>
  //         </SwiperSlide>
  //       </Swiper>
  //     </>
  //   );
};

export default Slider;
