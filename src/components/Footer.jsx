
import { Icon } from "@iconify/react";


export default function Footer() {
  return (
    <footer className="bg-primary-02">
      <div className="container">
        <div className="row py-12 d-flex align-items-center g-4 ">
          <div className="col-12 col-md-9 col-lg-8">
            <div className="d-flex flex-column flex-md-row align-items-center fs-2 fs-lg-3">
              <img className="mb-4 mb-md-0 w-25 w-md-75"
                  src="logo1.png"
                  alt="Quality Time Logo"
                  style={{maxWidth:"217px"}}
                />
                <div className="ms-8 text-white text-md-start text-center">
                <p>店家地址：931 屏東縣佳冬鄉光明路16號</p>
                <p className="py-md-5 py-2">連絡電話：0968386848</p>
                <p>營業時間：10:30-22:00</p>
                </div>
            </div>
          </div>
          <div className="col-12 col-md-3 col-lg-4">
            {/* 右側社群連結 */}
            <div className=" d-flex gap-lg-7 gap-4 justify-content-center">
              <a href="https://www.facebook.com/Quality.Time.Studio.Nails?locale=zh_TW" >
                <Icon icon="ic:baseline-facebook" className="fs-lg-9 fs-5 fs-md-8"  style={{color: "#fff",maxWidth:"54px"}} />
              </a>
              <a href="https://www.instagram.com/quality_time_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" >
                <Icon icon="icon-park-outline:instagram"  className="fs-lg-9 fs-5 fs-md-8"  style={{color: "#fff" ,maxWidth:"54px"}} />
              </a>
              <a href="https://line.me/R/ti/p/@893ukbbx" >
                <Icon icon="mage:line" className="fs-lg-9 fs-5 fs-md-8"   style={{color: "#fff" ,maxWidth:"54px"}} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
