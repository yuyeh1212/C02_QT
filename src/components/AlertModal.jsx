import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const AlertModal = ({ show, onClose, children, status, redirectTo, onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  const handleClose = () => {
    onClose();           // 關閉目前 modal（你設 show = false）
    onComplete?.();      // 若有傳入 onComplete，就呼叫（外層可用來關外部 modal）
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <div
      className={`modal fade ${show ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-center" style={{ border: '2px solid #BF9958' }}>
          <div className="modal-body py-5">
            {status === true ? (
              <i className="bi bi-check-circle-fill" style={{ color: '#BF9958', fontSize: '60px' }}></i>
            ) : status === false ? (
              <i className="bi bi-x-circle-fill" style={{ color: '#D9534F', fontSize: '60px' }}></i>
            ) : status === 'unauthorized' ? (
              <i className="bi bi-person-lock" style={{ color: '#F0AD4E', fontSize: '60px' }}></i>
            ) : null}

            <h4 className="mt-3 fs-4 fs-sm-5" style={{ color: '#6E5E57' }}>
              {children.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
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
              onClick={handleClose}
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AlertModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  status: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  redirectTo: PropTypes.string,
  onComplete: PropTypes.func, // ✅ 加入 onComplete
};

export default AlertModal;
