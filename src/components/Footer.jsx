
import { Icon } from "@iconify/react";


export default function Footer() {
  return (
    <footer className="bg-primary-02">
      <div className="container">
        <div className="row py-12 d-flex align-items-stretch">
          <div className="col-6">
            <div className="d-flex align-items-stretch">
              <img
                  src="/logo.png"
                  alt="Quality Time Logo"
                />
              <div className="ms-5 d-flex flex-column justify-content-between text-white">
                <p>店家地址：931 屏東縣佳冬鄉光明路16號</p>
                <p>連絡電話：0968386848</p>
                <p>營業時間：10:30-22:00</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            {/* 右側社群連結 */}
            <div className="float-end d-flex align-items-center h-100">
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
