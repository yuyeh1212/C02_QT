
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'; // 引入Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // 引入Bootstrap Icons
import "../assets/style/footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* 左側 LOGO & 店家資訊 */}
          <div className="footer-left">
            <div className="footer-logo">
              <img
                src="https://lh3.googleusercontent.com/d/1tTrhc6AzlKwVzhL7aS8cK6CWc_3k9QO_"
                alt="Quality Time Logo"
              />
            </div>
            <div className="footer-info">
              <p>店家地址：931 屏東縣佳冬鄉光明路16號</p>
              <p>連絡電話：0968386848</p>
              <p>營業時間：10:30-22:00</p>
            </div>
          </div>

          {/* 右側社群連結 */}
          <div className="footer-social">
            <Link to="#" target="_blank">
              <i className="bi bi-facebook social-icon"></i>
            </Link>
            <Link to="#" target="_blank">
              <i className="bi bi-instagram social-icon"></i>
            </Link>
            <Link to="#" target="_blank">
              <i className="bi bi-line social-icon"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
