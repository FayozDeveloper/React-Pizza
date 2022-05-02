import React from 'react'
import classnames from 'classnames'
import button from "bootstrap/js/src/button";

export default function Button({onClick, className, outline, children}){
    return(
        <button className={classnames('button', className,{
            'button--outline' : outline,
        })} onClick={onClick}>
            {children}
        </button>
    )
}