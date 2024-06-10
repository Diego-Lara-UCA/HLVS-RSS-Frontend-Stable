import { Button } from "@nextui-org/react";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

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
    <div>
      <div className="flex justify-center items-center bg-gradient-to-tr from-zinc-700 to-zinc-900  h-[100vh] w-full p-2">
        <form
          className="flex flex-col justify-center items-center py-14 px-10 w-full max-w-sm  2xl:max-w-sm backdrop-blur-md bg-white/70 rounded-lg"
          action=""
        >
          <h1 className="mb-2 text-2xl text-center font-bold uppercase text-zinc-700">
            Log in
          </h1>
          <h2 className="text-lg font-light text-center mb-16 text-zinc-700">
            Welcome Back!
          </h2>

          <div className="flex w-full flex-col gap-4 mb-20 ">
            {/* <GoogleLogin
              width={270}
              shape="square"
              text="continue_with"
              locale="en"
              clientId="TU_ID_DE_CLIENTE_DE_GOOGLE"
              onSuccess={responseMessage}
              onError={errorMessage}
            /> */}
            <Button variant="shadow" className="bg-indigo-500 text-white">
              Acceder con Google
            </Button>

            <Link to="/">
              <Button variant="shadow" color="default" fullWidth>
                Back
              </Button>
            </Link>
          </div>

          <span className="text-xs text-center text-zinc-700">
            To have an account you have to have a Google account
          </span>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
