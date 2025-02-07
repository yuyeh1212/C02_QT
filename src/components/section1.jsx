import React, { Component } from "react";
import Slider from "react-slick";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

function Section1() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="card text-white">
          <img src="../public/3270.jpg" alt="" />
          <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center">
            <h1 className="card-title fs-10">精心時刻</h1>
            <h5 className="subTitle fs-7">為您提供專業的手足部美甲</h5>
            <div className="card-text fs-5">
              <p>享受舒適獨立的居家工作室服務</p>
              <p>讓我們一起打造屬於您的美麗時刻！</p>
              <p>萌寵陪伴與溫馨氣氛，增添更多溫暖。</p>
            </div>
            <Link className="btn btn-primary btn-lg fs-5 px-5 py-4 text-white" to='/reservation'>
              前往預約<ArrowForwardIcon className='text-white' />
            </Link>
          </div>
        </div>
        <div className="card text-white text-center">
          <img src="../public/3785.jpg" alt="" />
          <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center">
            <h1 className="card-title fs-10">精心時刻</h1>
            <h5 className="subTitle fs-7">為您提供專業的手足部美甲</h5>
            <div className="card-text fs-5">
              <p>享受舒適獨立的居家工作室服務</p>
              <p>讓我們一起打造屬於您的美麗時刻！</p>
              <p>萌寵陪伴與溫馨氣氛，增添更多溫暖。</p>
            </div>
            <Link className="btn btn-primary btn-lg fs-5 px-5 py-4 text-white" to='/reservation'>
              前往預約<ArrowForwardIcon className='text-white' />
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Section1;
