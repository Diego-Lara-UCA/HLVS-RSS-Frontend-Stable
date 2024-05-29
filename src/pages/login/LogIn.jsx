import "./LogIn.css";
import { GoogleLogin } from "@react-oauth/google";

const LogIn = () => {
  const responseMessage = (response) => {
    console.log(response);
    // Manejar la respuesta de Google
  };

  const errorMessage = (error) => {
    console.log(error);
    // Manejar el error de Google
  };

  return (
    <div className="container">
      <div className="image-section"></div>
      <div className="form-section">
        <div className="form">
          <div className="form-title">
            <h1>Log In</h1>
            <h2>Welcome back</h2>
          </div>
          <div className="form-buttons">
            <GoogleLogin
              clientId="TU_ID_DE_CLIENTE_DE_GOOGLE"
              onSuccess={responseMessage}
              onError={errorMessage}
            />
            <button>Back</button>
          </div>
          <label>You must have a Google account</label>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
