
import { Icon } from "@iconify/react";


export default function Footer() {
  return (
    <footer className="bg-primary-02">
      <div className="container">
        <div className="row py-12 d-flex align-items-center g-5 ">
          <div className="col-12 col-md-4 col-lg-4 d-flex justify-content-center">        
            <img className="mb-4 mb-md-0 w-50 w-md-75"
              src="logo1.svg"
              alt="Quality Time Logo"
              style={{maxWidth:"217px"}}
            />
          </div>
          <div className="col-12 col-md-5 col-lg-4 d-flex justify-content-center">
            <div className="text-white text-center text-md-start fs-3">
              <p>店家地址：<br className="d-block d-xl-none"/>931 屏東縣佳冬鄉光明路16號</p>
              <p className="py-md-5 py-4">連絡電話：<br className="d-block d-lg-none" />0968-386-848</p>
              <p>營業時間：<br className="d-block d-lg-none" />10:30～22:00</p>
            </div>
          </div>  
          <div className="col-12 col-md-3 col-lg-4">
            {/* 右側社群連結 */}
            <div className=" d-flex gap-lg-7 gap-4 justify-content-center">
              <a href="https://www.facebook.com/Quality.Time.Studio.Nails?locale=zh_TW" target="_blank">
                <Icon icon="ic:baseline-facebook" className="fs-lg-9 fs-5 fs-md-8"  style={{color: "#fff",maxWidth:"54px"}} />
              </a>
              <a href="https://www.instagram.com/quality_time_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                <Icon icon="icon-park-outline:instagram"  className="fs-lg-9 fs-5 fs-md-8"  style={{color: "#fff" ,maxWidth:"54px"}} />
              </a>
              <a href="https://line.me/R/ti/p/@893ukbbx" target="_blank">
                <Icon icon="mage:line" className="fs-lg-9 fs-5 fs-md-8"   style={{color: "#fff" ,maxWidth:"54px"}} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
