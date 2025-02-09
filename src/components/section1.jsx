import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

function Section1() {
  const [manicureData] = useState([
    {
      id: 1,
      image: "/3270.jpg",
      title: "精心時刻",
      subTitle: "為您提供專業的手足部美甲",
      description1: "享受舒適獨立的居家工作室服務",
      description2: "讓我們一起打造屬於您的美麗時刻！",
      description3: "萌寵陪伴與溫馨氣氛，增添更多溫暖。",
    },
    {
      id: 2,
      image: "/2149171335.png",
      title: "精心時刻",
      subTitle: "為您提供專業的手足部美甲",
      description1: "享受舒適獨立的居家工作室服務",
      description2: "讓我們一起打造屬於您的美麗時刻！",
      description3: "萌寵陪伴與溫馨氣氛，增添更多溫暖。",
    },
    {
      id: 3,
      image: "/3785.jpg",
      title: "精心時刻",
      subTitle: "為您提供專業的手足部美甲",
      description1: "享受舒適獨立的居家工作室服務",
      description2: "讓我們一起打造屬於您的美麗時刻！",
      description3: "萌寵陪伴與溫馨氣氛，增添更多溫暖。",
    },
  ]);

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={30}
        initialSlide={1}
        autoplay={{ delay: 3000 }}
        className="h-[942px]"
      >
        {manicureData.map((item) => (
          <SwiperSlide key={item.id} className="relative h-[942px]">
            {/* 設定背景圖片 */}
            <div className="absolute inset-0 bg-cover bg-center"></div>
            {/* 文字區塊 */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center py-14 bg-black bg-opacity-50"
              style={{ backgroundImage: `url( '${item.image}')` }}
            >
              <h1 className="fs-10 fw-bold leading-lg">{item.title}</h1>
              <h2 className="fs-7 fw-medium leading-lg">{item.subTitle}</h2>
              <p className="fs-5 fw-medium leading-lg">{item.description1}</p>
              <p className="fs-5 fw-medium leading-lg">{item.description2}</p>
              <p className="fs-5 fw-medium leading-lg">{item.description3}</p>
              <Link
                className="btn mt-6 px-5 py-4 btn-primary text-white"
                to="/reservation"
              >
                立即預約
                <ArrowForwardIcon className="text-white" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Section1;
