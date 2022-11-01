import Login from "./components/Login";
import Chat from "./components/Chat";
import Messages from "./components/Messages";
import SentMessages from "./components/SentMessages";
import { FacebookAuthProvider, signInWithPopup, getRedirectResult, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./data/firebase";
import { useRef } from "react";

//login with google
const googleSignIn = () => {
    try {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((res) => console.log(res));
    } catch (e) {
        console.log("failed to login");
    }
};

//login with facebook
const facebookSignIn = () => {
    try {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider);
    } catch (e) {
        console.log("failed to login");
    }
};

function App() {
    const [user, loading, error] = useAuthState(auth);
    const scrollToEnd = useRef();

    return (
        <>
            {!user ? (
                <div className="w-screen h-screen bg-blue-300 flex justify-center items-center">
                    <Login googleSignIn={googleSignIn} facebookSignIn={facebookSignIn} />
                </div>
            ) : (
                <div id="message-scrollbar" className="h-screen flex flex-col overflow-y-hidden">
                    <Chat user={user} />
                    <Messages scrollToEnd={scrollToEnd} user={user} />
                    <SentMessages scrollToEnd={scrollToEnd} user={user} />
                </div>
            )}
        </>
    );
}

export default App;
