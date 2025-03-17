
import PropTypes from 'prop-types';

export default function Radio({type = 'radio', className = 'btn btn-outline-success-200', children,onClick,id,name}){
    return(<>
            <input type={type} className="btn-check" name={name} id={id} autoComplete="off"  onClick={onClick}/>
            <label className={className} htmlFor={id}>{children}</label>
    </>)
}
Radio.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string
};     