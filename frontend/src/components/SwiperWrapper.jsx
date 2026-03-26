// Import Swiper React components
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/SwiperWrapper.css";
// import required modules
import { Keyboard, Navigation, Pagination } from "swiper/modules";

export default function SwiperWrapper({ children }) {
  return (
    <Swiper
      keyboard={{ enabled: true }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Keyboard, Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        0: { slidesPerView: 1, spaceBetween: 16 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
        1280: { slidesPerView: 4, spaceBetween: 15 },
      }}
    >
      {children}
    </Swiper>
  );
}
