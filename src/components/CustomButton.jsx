import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomButton = ({
  href,
  to,
  type = 'button',
  className = 'btn btn-primary text-white',
  children,
  onClick,
  form,
  target,
}) => {
  // 如果有傳入 to，則渲染 Link，否則渲染 button
  if (to) {
    return (
      <Link to={to} className={`btn ${className}`}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={`btn ${className}`} target={target}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick} form={form}>
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  form: PropTypes.string,
  target: PropTypes.string,
};

export default CustomButton;
