import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const Login = (props) => {
    return (
        <div className="shadow-lg h-[50%] w-[80%] min-h-[400px] max-w-[1000px] rounded-lg flex flex-col sm:flex-row justify-center items-center  bg-slate-100 ">
            <p className="text-blue-300 flex justify-center items-center text-3xl font-bold h-[200px] sm:h-full w-full">eChat</p>
            <hr className="bg-gray-300  h-[7px] w-[80%]  sm:w-[7px] sm:min-h-[80%] " />
            <div className="flex p-5 flex-col justify-center items-center gap-4 h-full w-full">
                <GoogleLoginButton className="max-w-[300px] shadow-2xl" onClick={() => props.googleSignIn()} />
                <FacebookLoginButton className="max-w-[300px] shadow-2xl [5px]" onClick={() => props.facebookSignIn()} />
            </div>
        </div>
    );
};

export default Login;
