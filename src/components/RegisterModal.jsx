import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const RegisterModal = ({ show, onClose, redirectTo }) => {
  const navigate = useNavigate();

   // 使用 useEffect 鎖定背景滾動
   useEffect(() => {
    if (show) {
      // 鎖定滾動並隱藏滾動條
      document.body.style.overflow = 'hidden';
      
    } else {
      // 恢復滾動
      document.body.style.overflow = 'auto';
      
    }

    // 清除副作用
    return () => {
      document.body.style.overflow = 'auto';
      
    };
  }, [show]);

  const handleClose = () => {
    onClose(); // 呼叫父組件傳入的 onClose 函數
    if (redirectTo) {
      navigate(redirectTo); // 如果有 redirectTo，跳轉到該路徑
    }
  };
  
  const registrationRules = [
    "所有欄位皆為必填",
    "未滿15歲不予註冊",
    "註冊密碼至少8字元，包含至少一位英文、數字、特殊符號",
    "生日欄位用於提供專屬折扣",
    "Line ID欄位只接受英文、數字、底線及連字號"
  ];
  

  return (
    <div
      className={`modal fade ${show ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        
        <div className="modal-content text-center" style={{ border: '2px solid #BF9958' }}>
          <div className="modal-header">
            <h5 className="modal-title text-primary text-center w-100">註冊須知</h5>
          </div>
          <div className="modal-body py-5">
            <h4 className="mt-3 fs-4 fs-sm-5 text-start" style={{ color: '#6E5E57' }}>
              <ul>
              {registrationRules.map((line, index) => (
                <li key={index} className='py-2'>
                  {line}
                </li>
              ))}
              </ul>
              
            </h4>
          </div>
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
              onClick={handleClose} // 呼叫 handleClose 來處理關閉和跳轉
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  status: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  redirectTo: PropTypes.string, // 接受跳轉路徑作為 prop
};

export default RegisterModal;
