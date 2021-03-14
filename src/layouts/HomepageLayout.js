
import React from 'react'
import Header from "./../components/Header"
import Footer from "./../components/Footer"

function HomepageLayout(props) {
    return (
        <div>
            <Header {...props}/>
            <div className="app__main">
                {props.children}
            </div>
            {/* <div className="app__end"> */}
            <Footer />
            {/* </div> */}
        </div>
    )
}

export default HomepageLayout
