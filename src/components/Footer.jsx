
import { Icon } from "@iconify/react";


export default function Footer() {
  return (
    <footer className="bg-primary-02">
      <div className="container">
        <div className="row py-12 d-flex align-items-center g-4 ">
          <div className="col-12 col-md-8 col-lg-9">
            <div className="d-flex flex-column flex-md-row align-items-center">
              <img className="mb-4 mb-md-0"
                  src="/logo.png"
                  alt="Quality Time Logo"
                />
                <div className="ms-8 text-white text-md-start text-center">
                <p>店家地址：931 屏東縣佳冬鄉光明路16號</p>
                <p className="py-md-5 py-2">連絡電話：0968386848</p>
                <p>營業時間：10:30-22:00</p>
                </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            {/* 右側社群連結 */}
            <div className=" d-flex align-items-center justify-content-center ">
              <a to="#" >
                <Icon icon="ic:baseline-facebook" width="64" height="64"  style={{color: "#fff"}} />
              </a>
              <a to="#" className="mx-7">
                <Icon icon="icon-park-outline:instagram" width="64" height="64"  style={{color: "#fff"}} />
              </a>
              <a to="#" >
                <Icon icon="mage:line" width="64" height="64"  style={{color: "#fff"}} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
