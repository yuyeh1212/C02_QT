import { Icon } from '@iconify/react';

export default function Footer() {
  return (
    <footer className="bg-primary-02">
      <div className="container py-lg-10 py-md-8 py-6">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between ">
          <div className="d-flex flex-column flex-md-row align-items-center mb-4 mb-md-0">
            <img
              className="mb-4 mb-md-0 w-50 w-md-75 me-lg-8 me-md-5"
              src="logo1.svg"
              alt="Quality Time Logo"
              style={{ maxWidth: '217px', maxHeight: '144px' }}
            />
            <div className="text-white fs-2 fs-md-3 fs-md-4 text-lg-nowrap">
              <p className="text-center text-md-start">店家地址：931 屏東縣佳冬鄉光明路16號</p>
              <p className="py-md-5 py-4 text-center text-md-start">
                連絡電話：<a href="tel:+0968386848">0968-386-848</a>
              </p>
              <p className="text-center text-md-start">營業時間：10:30～22:00</p>
            </div>
          </div>
          {/* 右側社群連結 */}

          <div className=" d-flex gap-lg-7 gap-4 justify-content-center">
            <a
              href="https://www.facebook.com/Quality.Time.Studio.Nails?locale=zh_TW"
              target="_blank"
            >
              <Icon
                icon="ic:baseline-facebook"
                className="fs-lg-9 fs-5 fs-sm-8"
                style={{
                  color: '#fff',
                  maxWidth: '54px',
                  minWidth: '26.67px',
                  minHeight: '26.67px',
                }}
              />
            </a>
            <a
              href="https://www.instagram.com/quality_time_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
            >
              <Icon
                icon="icon-park-outline:instagram"
                className="fs-lg-9 fs-5 fs-sm-8"
                style={{
                  color: '#fff',
                  maxWidth: '54px',
                  minWidth: '26.67px',
                  minHeight: '26.67px',
                }}
              />
            </a>
            <a href="https://line.me/R/ti/p/@893ukbbx" target="_blank">
              <Icon
                icon="mage:line"
                className="fs-lg-9 fs-5 fs-sm-8"
                style={{
                  color: '#fff',
                  maxWidth: '54px',
                  minWidth: '26.67px',
                  minHeight: '26.67px',
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
