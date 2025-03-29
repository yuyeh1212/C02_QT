import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomButton from './CustomButton';

function HomeBanner() {
  const [manicureData] = useState([
    {
      id: 1,
      image: '3270.jpg',
      textColor: 'secondary',
    },
    {
      id: 2,
      image: '2149171335.png',
      textColor: 'white',
    },
    {
      id: 3,
      image: '3785.jpg',
      textColor: 'white',
    },
  ]);

  return (
    <div className=" position-relative" style={{maxHeight: '942px'}}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={30}
        initialSlide={1}
        autoplay={{ delay: 5000 }}
        speed={2000}
        loop={true}
      >
        {manicureData.map((item) => (
          <SwiperSlide key={item.id} >
            {/* 設定背景圖片 */}
            {/* <div className="absolute inset-0 bg-cover bg-center"></div> */}
            {/* 文字區塊 */}
            <div
              className=" text-white text-center py-14 d-flex flex-column align-items-center"
              style={{
                backgroundImage: `url( '${item.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="bg-black bg-opacity-25 p-6 ">
                <h1 className="fs-9 fs-md-10 fw-bold leading-lg pb-8">精心時刻</h1>
                <h2 className="fs-4 fs-sm-6 fs-md-7 fw-medium leading-lg pb-8">
                  為您提供專業的手足部美甲
                </h2>
                <p className="fs-3 fs-md-5 fw-medium leading-lg">享受舒適獨立的居家工作室服務</p>
                <p className="fs-3 fs-md-5 fw-medium leading-lg py-3">
                  讓我們一起打造屬於您的美麗時刻！
                </p>
                <p className="fs-3 fs-md-5 fw-medium leading-lg pb-6">
                  萌寵陪伴與溫馨氣氛，
                  <br className="d-sm-none" />
                  增添更多溫暖。
                </p>
              </div>
              <CustomButton
                to="/member/reservation"
                className="mt-6 px-5 py-4 btn-primary text-white"
              >
                立即預約 <ArrowForwardIcon className="text-white" />
              </CustomButton>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeBanner;
