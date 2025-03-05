

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AlertModal = ({ show, onClose ,children,success}) => {
  return (
    <div
      className={`modal fade ${show ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-center" style={{ border: '2px solid #BF9958' }}>
          <div className="modal-body py-5">
            {success ? 
            <i className="bi bi-check-circle-fill" style={{ color: '#BF9958', fontSize: '60px' }}></i>
            :
            <i className="bi bi-x-circle-fill" style={{ color: '#D9534F', fontSize: '60px' }}></i>
            }
            
            <h4 className="mt-3 fs-5" style={{ color: '#6E5E57' }}>{children}</h4>
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

export default AlertModal;