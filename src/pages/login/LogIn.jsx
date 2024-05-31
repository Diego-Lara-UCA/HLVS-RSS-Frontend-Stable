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
    <div className="flex justify-center items-center flex-col h-[100vh] 2xl:flex-row">
      <div className="hidden bg-black h-[100vh] w-full 2xl:block"></div>
      <div className="flex p-5 justify-center items-center h-100vh w-full">
        <form
          className="flex flex-col justify-center items-center p-12 w-full max-w-sm shadow-md 2xl:max-w-sm"
          action=""
        >
          <h1 className="mb-2 text-2xl text-center font-bold uppercase">
            Log in
          </h1>
          <h2 className="text-lg font-light text-center mb-16">
            Welcome Back!
          </h2>
          <GoogleLogin 
            clientId="TU_ID_DE_CLIENTE_DE_GOOGLE"
            onSuccess={responseMessage}
            onError={errorMessage}
          />
          <div className="flex w-full flex-col gap-4 mb-20">
            <button className="w-full border-[1px] py-4 border-gray-400 rounded-md">
              Acceder con Google
            </button>

            <button className=" w-full border-1 py-4 bg-gray-200 border-none rounded-md">
              Back
            </button>
          </div>

          <span className="text-xs text-center">
            To have an account you have to have a Google account
          </span>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
