import { db } from "../data/firebase";
import { collection, query, onSnapshot, doc, orderBy, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MessagesContainer } from "./MessagesContainer";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Messages = (props) => {
    const [messages, setMessages] = useState([]);

    const style = [
        { name: "received", container: "self-start text-gray-100", message: "bg-blue-400", time: " mt-2 text-gray-400 text-sm" },
        {
            name: "sent",
            container: "self-end text-blue-400 ",
            message: "self-end bg-gray-50 text-right",
            time: "self-end mt-2 text-gray-400 item-end text-sm",
        },
    ];

    let float = "";
    let dateTime = [];
    let previousDate = new Date("2019-10-1");

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                let msgs = [];
                querySnapshot.forEach((doc) => {
                    msgs.push({ ...doc.data(), id: doc.id });
                });
                setMessages(msgs);
            },
            (error) => {
                console.log("error", error);
            }
        );
        return () => unsubscribe();
    }, []);

    const getTime = (time_) => {
        let checked = false;
        var date = new Date(time_ * 1000);
        dateTime = [date, date.toLocaleTimeString("default")];
        if (date.setHours(0, 0, 0, 0) > previousDate) {
            previousDate = date.setHours(0, 0, 0, 0);
            checked = true;
        }
        return checked;
    };

    const getClass = (id) => {
        float = props.user.uid === id ? style[1] : style[0];
    };

    const handleDeleteSent = async (id) => {
        await deleteDoc(doc(db, "messages", id));
    };

    return (
        <div className="w-[100vw] h-[100%] overflow-y-auto px-8 pt-7">
            {messages &&
                messages.map((message) => (
                    <div key={message.id} className="w-full flex flex-col">
                        {getClass(message.uid)}
                        {message.timestamp !== null
                            ? getTime(message.timestamp.seconds) && (
                                  <p className="w-[100%] text-gray-400 text-center">
                                      {dateTime[0].getDate() + " " + monthNames[dateTime[0].getMonth()] + " " + dateTime[0].getFullYear()}{" "}
                                  </p>
                              )
                            : (dateTime[1] = "")}

                        <MessagesContainer message={message} dateTime={dateTime} float={float} handleDeleteSent={handleDeleteSent} />
                    </div>
                ))}
            <span ref={props.scrollToEnd}></span>
        </div>
    );
};

export default Messages;
