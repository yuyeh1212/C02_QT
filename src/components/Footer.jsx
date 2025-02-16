
import { Icon } from "@iconify/react";


export default function Footer() {
  return (
    <footer className="bg-primary-02">
      <div className="container">
        <div className="row py-12 d-flex align-items-center g-4">
          <div className="col-12 col-md-3 d-flex justify-content-center">
            <div className="h-100">
              <img
                  src="/logo.png"
                  alt="Quality Time Logo"
                />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="ms-5 text-white text-md-start text-center">
                <p>店家地址：931 屏東縣佳冬鄉光明路16號</p>
                <p className="py-5">連絡電話：0968386848</p>
                <p>營業時間：10:30-22:00</p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            {/* 右側社群連結 */}
            <div className="float-md-end d-flex align-items-center justify-content-center ">
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
