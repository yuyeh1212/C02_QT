import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomButton = ({ to, type = 'button', className = 'btn btn-primary text-white', children, onClick }) => {
    // 如果有傳入 to，則渲染 Link，否則渲染 button
    if (to) {
      return (
        <Link to={to} className={`btn ${className}`}>
          {children}
        </Link>
      );
    }
  
    return (
      <button type={type} className={`btn ${className}`} onClick={onClick}>
        {children}
      </button>
    );
};

CustomButton.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default CustomButton;