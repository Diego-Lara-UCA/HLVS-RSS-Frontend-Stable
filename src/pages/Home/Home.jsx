import "./Home.css"

const Home = () =>{

    return (
        <div>
            <header className="header_home">
                <h1 className="header_logo">HLVS</h1>
                <a className="header_login_btn" href="#">LOG IN</a>  
            </header>
            <div className="container">
                <div className="home_container">
                    <h1 className="div_title_text">Residential Security System</h1>
                    <h3 className="div_sub_text">Take control of your residential security with our innovative access control system</h3>
                    <div className="btn_container">
                        <button className="div_get_started_btn">GET STARTED</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home