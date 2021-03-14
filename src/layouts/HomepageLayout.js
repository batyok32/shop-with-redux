
import React from 'react'
import Header from "./../components/Header"
import Footer from "./../components/Footer"

function HomepageLayout({children}) {
    return (
        <div>
            <Header />
            <div className="app__main">
                {children}
            </div>
            {/* <div className="app__end"> */}
            <Footer />
            {/* </div> */}
        </div>
    )
}

export default HomepageLayout
