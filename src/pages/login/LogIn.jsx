import { Button } from "@nextui-org/react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "@mui/icons-material/Google";

const LogIn = () => {
  function sendAuth(token) {
    axios({
      method: "post",
      url: `https://api.securityhlvs.com/api/auth/login/${token}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        token: token,
      },
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        window.location.href = "/profile";
      } else if (response.status === 202) {
        window.location.href = "/dashboard";
      }
    })
    .catch((error) => {
      console.error("Error during authentication:", error);
    });
  }

  const loginAuth = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      sendAuth(tokenResponse.access_token);
    },
  });

  return (
    <div>
      <div className="flex justify-center items-center bg-gradient-to-tr from-zinc-700 to-zinc-900 h-[100vh] w-full p-2">
        <form
          className="flex flex-col justify-center items-center py-14 px-10 w-full max-w-sm 2xl:max-w-sm backdrop-blur-md bg-white/70 rounded-lg"
          action=""
        >
          <h1 className="mb-2 text-2xl text-center font-bold uppercase text-zinc-700">
            Log in
          </h1>
          <h2 className="text-lg font-light text-center mb-16 text-zinc-700">
            Welcome Back!
          </h2>

          <div className="flex w-full flex-col gap-4 mb-20">
            <Button
              onClick={() => loginAuth()}
              variant="shadow"
              className="bg-slate-800 text-white"
              startContent={<GoogleIcon />}
            >
              Continue with Google
            </Button>
            <Button variant="shadow" color="default" fullWidth>
              Back
            </Button>
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
