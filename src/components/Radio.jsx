
export default function Radio({type = 'radio', className = 'btn btn-outline-success-200', children,onClick,id,name}){
    return(<>
            <input type={type} className="btn-check" name={name} id={id} autoComplete="off"  onClick={onClick}/>
            <label className={className} htmlFor={id}>{children}</label>
        </>)
}