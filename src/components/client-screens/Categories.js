import React from "react";
import { useAllCategoriesQuery } from "../../app/Services/categoryServices";
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";
import Thumbnail from "../skeleton/Thumbnail";

const Categories = () => {
  const { data, isFetching } = useAllCategoriesQuery();
  let i = 1;
  console.log(data, isFetching);
  return isFetching ? (
    <div className="flex flex-wrap -mx-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-[20%] xl:w-2/12 p-4"
          key={item}
        >
          <Skeleton>
            <Thumbnail height="150px"/>
          </Skeleton>
        </div>
      ))}
    </div>
  ) : (
    data?.categories.length > 0 && (
      <Swiper
        modules={[Virtual]}
        spaceBetween={20}
        slidesPerView={3}
        virtual
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1080: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
        className="w-full h-[150px] mb-10"
      >
        {data.categories.map((category, index) => {
          if (i >= 5) {
            i = 1;
          } else {
            i++;
          }
          return (
            <SwiperSlide
              className="w-full overflow-hidden rounded-lg relative"
              key={category._id}
              virtualIndex={index}
            >
              <div className="w-full h-[150px] rounded-lg overflow-hidden">
                <img src={`./images/slider/${i}.jpg`} alt={`${i}`} />
              </div>
              <div className="absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center">
                <Link to={`/cat-products/${category.name}`} className="text-white font-semibold capitalize">
                  {category.name}
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    )
  );
};

export default Categories;
