import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../index.css";

import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination, Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";

function Carousel({ featuredProducts }) {
  return (
    <div className="max-w-5xl mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper mb-10 pb-12"
        style={{ paddingBottom: "40px" }}
        breakpoints={{
          //md
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          //lg
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          //xl
          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {featuredProducts.map((featured) => (
          <SwiperSlide>
            <ProductCard product={featured} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
