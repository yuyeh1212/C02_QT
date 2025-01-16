import { useState,useEffect } from 'react'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function App() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 初始檢查視窗寬度

  // 監聽視窗大小變化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 每次resize都檢查視窗寬度
    };

    // 當視窗尺寸變動時，更新狀態
    window.addEventListener('resize', handleResize);

    // 清理事件監聽
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const artWorksCollection = [
    { title:'img1',img:'../../public/workImg1.png'},
    { title:'img2',img:'../../public/workImg2.png'},
    { title:'img3',img:'../../public/workImg3.png'},
    { title:'img4',img:'../../public/workImg4.png'},
    { title:'img5',img:'../../public/workImg5.png'},
    { title:'img6',img:'../../public/workImg6.png'},
    { title:'img7',img:'../../public/workImg7.png'},
    { title:'img8',img:'../../public/workImg8.png'},
    { title:'img9',img:'../../public/workImg9.png'}
  ];

  const collectionSettings = {
    dots: true, // 顯示指示點
    infinite: true, // 無限循環
    speed: 500, // 滑動速度
    slidesToShow: 1, // 一次顯示的卡片數（桌面）
    slidesToScroll: 1, // 每次滑動的卡片數
    arrows:false
  } 



  const allCards = [
    { title: "lily_dreamnails", text: "細心到連最小的細節都照顧到！整體氛圍超棒，還能與毛小孩互動，簡直是完美的美甲體驗，每次都很期待！", img: "../../public/2149265944.jpg" },
    { title: "semily_beautygram", text: "美甲師超用心，細節處理得超完美！狗狗和貓咪的陪伴讓整個過程好放鬆，下次一定還會來！", img: "../../public/2149171315.jpg" },
    { title: "sophie_lifestyle", text: "手足護理超級細心，技術沒話說！不僅過程輕鬆愉快，美甲的效果也特別好，真心推薦給朋友們！", img: "../../public/2149171329.jpg" },
    { title: "grace_cutevibes", text: "第一次來就超喜歡！不僅款式好看，細節處理也很到位，過程中還能和美甲師聊天，真的超放鬆，絕對...", img: "../../public/26544.jpg" },
    { title: "julia_nailtime", text: "這裡環境溫馨舒適，美甲做得超細緻，光療的細節處理也非常到位，封層效果讓指甲持久又好看，五星好評！", img: "../../public/nail.jpg" }
  ];

  // react-slick 設定
  const feedBackSettings = {
    dots: true, // 顯示指示點
    infinite: true, // 無限循環
    speed: 500, // 滑動速度
    slidesToShow: 4, // 一次顯示的卡片數（桌面）
    slidesToScroll: 1, // 每次滑動的卡片數
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 576, // 手機模式
        settings: {
          slidesToShow: 1, // 顯示 1 張卡片
          slidesToScroll: 1, // 每次滑動 1 張卡片
          arrows:false
        },
      },
      {
        breakpoint: 992, // 手機模式
        settings: {
          slidesToShow: 2, // 顯示 1 張卡片
          slidesToScroll: 1, // 每次滑動 1 張卡片s
        },
      }
    ],
  };

  function SampleNextArrow(props) {
    const { className, onClick ,style} = props;
    return (
        <ArrowForwardIosIcon className={className} onClick={onClick} style={{ ...style,fontSize: "2rem", color: "black" ,cursor: "pointer" }} />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, onClick ,style} = props;
    return (
      <ArrowBackIosIcon className={className} onClick={onClick} style={{ ...style,fontSize: "2rem", color: "black" ,cursor: "pointer" }} />
    );
  }


  return (
    <>
      <div className='bg-neutral-200 py-13'>
        <section className='container '>
          <div className='pb-5'>
            {isMobile ? (
            // 顯示輪播（Carousel）在手機
              <div className='slider-container'>
                  <Slider {...collectionSettings}>
                    {artWorksCollection.map((img,index) => (
                      <div key={index} className='px-2'>
                        <img src={img.img} className='img-over' alt={img.title} />
                      </div>
                    ))}
                  </Slider>
              </div>
              
            ) : (
              // 顯示九宮格在桌面
              <div className="row row-cols-3 ">
                {artWorksCollection.map((img,index) => (
                  <div className="col g-4" key={index}>
                    <img src={img.img} className="img-fluid" alt={img.title} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='row justify-content-center pt-4'>
            <button className='btn col-10 col-sm-2 btn-outline-primary mx-4 my-2'>瀏覽更多</button>
            <button className='btn col-10 col-sm-2 btn-primary mx-4 my-2 text-white'>立即預約 <ArrowForwardIcon className='text-white'/></button>
          </div>
        </section>
      </div>
      <div className='linear py-13'>
        <section className='container'>
        <h2 className="text-center h4 text-primary-02 pb-11">顧客反饋</h2>
          <Slider {...feedBackSettings} className='pb-11'>
            {allCards.map((card,index) => (
              <div key={index}>
                <div className="card mx-2">
                  <img src={card.img} className="card-img-top card-img object-fit-cover" alt={card.title} />
                  <div className="card-body">
                    <h5 className="card-title h6 text-primary-02">{card.title}</h5>
                    <p className="card-text">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>      
        </section>
      </div>
    </>
  )
}

export default App
