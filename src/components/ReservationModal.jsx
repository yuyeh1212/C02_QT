import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ReservationModal = ({ show, onClose }) => {
  const [notices] = useState([
    { numbering: 1, content: '這裡有一隻臘腸狗和一隻肥橘貓，腸腸有分離焦慮，都會跟在腳邊，他心情好會跟你sayHI（汪），事先做好心理準備，請不用害怕。如果會擔心接觸他們，可事先告知，會安置在推車內，與您保持友善距離。' },
    { numbering: 2, content: '施作需2.5～4小時（依施作項目而定），預約前請事先評估預留足夠時間，趕時間的人請斟酌預約。' },
    { numbering: 3, content: '可傳圖報價，但因手法、素材不同，無法100%完全複製，請理解見諒。' },
    { numbering: 4, content: '不接受病變甲及皮膚病，有此狀況會立即中止服務。' },
    { numbering: 5, content: '請確定好日期及時間再預約，若要取消、更改時段請於3天前告知。' },
    { numbering: 6, content: '完成預約後，款式請提前三天與我討論呦。' },
    { numbering: 7, content: '預約時間請準時，現場保留10分鐘，遲到請告知，超過時間視同取消。' },
    { numbering: 8, content: '當日放鳥、遲到及臨時取消，達3次者將不再服務。' },
    { numbering: 9, content: '施作前請避免指甲修剪過短，以確保施作品質。' },
    { numbering: 10, content: '工作室僅能喝水及飲料，禁止飲食。' },
    { numbering: 11, content: '私宅一人作業工作室，有獨立空間，請勿攜伴及寵物。' },
    { numbering: 12, content: '美甲屬於1對1個人服務，一定會在溝通確定後才施作，服務後無提供免費卸甲及不滿意退費機制。' },
    { numbering: 13, content: '目前服務都未收取訂金，請寶寶們遵守條款，尊重彼此的時間及權益。' },
    { numbering: 14, content: '同業預約請事先告知，謝謝。' },
  ]);

  // 使用 useEffect 鎖定背景滾動
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';  // 鎖定滾動
    } else {
      document.body.style.overflow = 'auto';  // 恢復滾動
    }

    // 清除副作用
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  return (
    <div
      className={`modal fade ${show ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1049 }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ maxHeight: '90vh', overflow: 'hidden' }}  // 控制 modal-dialog 的最大高度
      >
        <div
          className="modal-content text-center"
          style={{ border: '2px solid #BF9958', height: '100%', display: 'flex', flexDirection: 'column' }} // 確保內容填滿 modal
        >
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title text-primary text-center w-100">預約須知</h5>
          </div>

          {/* Modal Body - 設定滿版高度，並允許滾動 */}
          <div className="modal-body py-4" style={{ overflowY: 'auto', maxHeight: 'calc(80vh - 56px)' }}>
            {notices.map(({ numbering, content }) => (
              <div className="d-flex align-items-start mb-3" key={numbering}>
                <div className="px-1 me-3">
                  <span className="number-box">{numbering}</span>
                </div>
                <p className="fs-3 text-start text-primary-02 fw-bold">{content}</p>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="modal-footer justify-content-center border-0">
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: '#BF9958',
                color: 'white',
                padding: '0.5rem 2rem',
                borderRadius: '2rem',
              }}
              onClick={onClose}
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReservationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReservationModal;
