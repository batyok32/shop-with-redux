import React from 'react'
import "./styles.scss"

function AuthWrapper({ headline, children }) {
    return (
        <div className="authWrapper">
            <div className="authWrapper__wrap">
                {headline && (<h2>{headline}<hr/></h2>)}
                
                <div className="children">
                {children && children}
                </div>
                
            </div>
        </div>
    )
}

export default AuthWrapper
