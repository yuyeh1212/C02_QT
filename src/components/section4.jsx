import { useState ,useEffect} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';


function Section4() {

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
      { title:'img1',img:'/workImg1.png'},
      { title:'img2',img:'/workImg2.png'},
      { title:'img3',img:'/workImg3.png'},
      { title:'img4',img:'/workImg4.png'},
      { title:'img5',img:'/workImg5.png'},
      { title:'img6',img:'/workImg6.png'},
      { title:'img7',img:'/workImg7.png'},
      { title:'img8',img:'/workImg8.png'},
      { title:'img9',img:'/workImg9.png'}
    ];
  
    const collectionSettings = {
      dots: true, // 顯示指示點
      infinite: true, // 無限循環
      speed: 500, // 滑動速度
      slidesToShow: 1, // 一次顯示的卡片數（桌面）
      slidesToScroll: 1, // 每次滑動的卡片數
      arrows:false
    } 
  
  
    return (
      <>
        <div className='bg-neutral-200 py-13'>
          <section className='container '>
            <div className='pb-5'>
              {isMobile ? (
              // 顯示輪播（Carousel）在手機
                <div className='slider-container'>
                    <Slider {...collectionSettings}  style={{ userSelect: 'none' }}>
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
              <button className='btn col-10 col-sm-4 btn-outline-primary mx-4 my-2'>瀏覽更多</button>
              <Link className='btn col-10 col-sm-4 btn-primary mx-4 my-2 text-white' to='/reservation'>立即預約 <ArrowForwardIcon className='text-white' /></Link>
            </div>
          </section>
        </div>
      </>
    )
  }
  
  export default Section4
  