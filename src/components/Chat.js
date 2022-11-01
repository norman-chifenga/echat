import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../data/firebase";
import { db } from "../data/firebase";
import { collection, query, getDocs, deleteDoc } from "firebase/firestore";

//Signout 
const googleSignOut = () => {
    signOut(auth);
};

//Admin delete all chats
const handleDeleteChat = async () => {
    const q = query(collection(db, `messages`));
    const querySnapshot = await getDocs(q);
    const deleteOps = [];
    querySnapshot.forEach((doc) => {
        deleteOps.push(deleteDoc(doc.ref));
    });
    Promise.all(deleteOps).then(() => console.log("documents deleted"));
};

const Chat = (props) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="w-full height-full text-white">
            <ul className="list-none flex justify-between items-center px-5 h-[3rem] bg-blue-300">
                <li className="text-lg font-bold text-white ">eChat</li>
                <li onMouseEnter={() => setShowMenu(true)} onClick={() => setShowMenu(true)}>
                    <img className="max-h-[2.5rem] rounded-full " src={props.user.photoURL} referrerPolicy="no-referrer" alt="profilePhoto" />
                </li>
            </ul>
            <div
                style={{ display: showMenu ? "block" : "none" }}
                onMouseLeave={() => setShowMenu(false)}
                className="text-gray-400 bg-white  rounded-lg shadow-2xl absolute top-5 right-5"
            >
                <p className="py-3 text-grey-100 px-5 text-white bg-blue-400">{props.user.displayName}</p>
                <p className="hover:bg-gray-100 px-5 py-2 font-normal w-[100%] text-left" onClick={() => handleDeleteChat()}>
                    Delete Chat
                </p>
                <p className="hover:bg-gray-100 px-5 py-2 font-normal w-[100%] text-left" onClick={() => googleSignOut()}>
                    Logout
                </p>
                <button className="hover:bg-gray-100 px-5 py-2 w-[100%] text-left" onClick={() => setShowMenu(false)}>
                    Close
                </button>
            </div>
        </div>
    );
};
export default Chat;
