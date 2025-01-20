import { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Section5() {

    const allCards = [
        { title: "lily_dreamnails", text: "細心到連最小的細節都照顧到！整體氛圍超棒，還能與毛小孩互動，簡直是完美的美甲體驗，每次都很期待！", img: "/2149265944.jpg" },
        { title: "semily_beautygram", text: "美甲師超用心，細節處理得超完美！狗狗和貓咪的陪伴讓整個過程好放鬆，下次一定還會來！", img: "/2149171315.jpg" },
        { title: "sophie_lifestyle", text: "手足護理超級細心，技術沒話說！不僅過程輕鬆愉快，美甲的效果也特別好，真心推薦給朋友們！", img: "/2149171329.jpg" },
        { title: "grace_cutevibes", text: "第一次來就超喜歡！不僅款式好看，細節處理也很到位，過程中還能和美甲師聊天，真的超放鬆，絕對...", img: "/26544.jpg" },
        { title: "julia_nailtime", text: "這裡環境溫馨舒適，美甲做得超細緻，光療的細節處理也非常到位，封層效果讓指甲持久又好看，五星好評！", img: "/nail.jpg" }
      ];
    
      const [activeIndex, setActiveIndex] = useState(0);
  
  
      // react-slick 設定
      const feedBackSettings = {
        dots: true, // 顯示指示點
        infinite: true, // 無限循環
        speed: 500, // 滑動速度
        slidesToShow: 4, // 一次顯示的卡片數（桌面）
        slidesToScroll: 1, // 每次滑動的卡片數
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        adaptiveHeight: true,
        afterChange: (current) => setActiveIndex(current),
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
          },
          {
            breakpoint: 1199, // 手機模式
            settings: {
              slidesToShow: 3, // 顯示 1 張卡片
              slidesToScroll: 1, // 每次滑動 1 張卡片s
            },
          }
        ],
      };
  
      SampleNextArrow.propTypes = {
        className: PropTypes.string,
        onClick: PropTypes.func,
        style: PropTypes.object,
      };
  
      function SampleNextArrow(props) {
        const { className, onClick ,style} = props;
        return (
            <ArrowForwardIosIcon className={className} onClick={onClick} style={{ ...style,fontSize: "2rem", color: "black" ,cursor: "pointer" }} />
        );
      }
      
      SamplePrevArrow.propTypes = {
          className: PropTypes.string,
          onClick: PropTypes.func,
          style: PropTypes.object,
      };
  
      function SamplePrevArrow(props) {
        const { className, onClick ,style} = props;
        return (
          <ArrowBackIosIcon className={className} onClick={onClick} style={{ ...style,fontSize: "2rem", color: "black" ,cursor: "pointer" }} />
        );
      }


    return (
        <>
            <div className='linear py-13'>
            <section className='container'>
            <h2 className="text-center fs-6 fs-sm-7 text-primary-02 pb-11">顧客反饋</h2>
                <Slider {...feedBackSettings} className='pb-11' >
                    {allCards.map((card,index) => (
                        <div key={index}>
                            <Card className='mx-2'sx={{ 
                                height: '470px' ,
                                maxwidth:'350px',
                                borderRadius: 0,
                                transition: "box-shadow 0.3s ease",
                                boxShadow: activeIndex === index ? "0px 4px 4px rgba(0, 0, 0, 0.3)" : "none",
                            }}>
                                <CardMedia component="img" image={card.img} height='312' className='card-img' alt={card.title} />
                                <CardContent >
                                <Typography className="fs-4 fs-md-5 fw-medium mb-1 text-primary-02 text-start">{card.title}</Typography>
                                <Typography component="div" className="card-text fs-2" >{card.text}</Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </Slider>      
            </section>
            </div>
        </>
    )
}

export default Section5