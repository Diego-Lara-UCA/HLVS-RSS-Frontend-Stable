import "./Home.css"

const Home = () =>{

    return (
        <div>
            <header className="header-home">
                <image className="header-logo">HLVS</image>
                <a className="header-login-btn" href="#">LOG IN</a>  
            </header>
            <div className="container">
                <div className="home-container">
                    <h1 className="div-title-text">Residential Security System</h1>
                    <h3 className="div-sub-text">Take control of your residential security with our innovative access control system</h3>
                    <div className="btn-container">
                        <button className="div-get-started-btn">GET STARTED</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home