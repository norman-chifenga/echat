import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

export const MessagesContainer = (props) => {
    const [viewDelete, setViewDelete] = useState("hidden");

    return (
        <div className={props.float.container + " w-[55%] mb-[20px] min-h-[40px] flex items-center"} key={props.message.id}>
            {props.float.name === "received" && (
                <img className="rounded-full my-auto max-h-[30px]" src={props.message.photo} alt="imag" referrerPolicy="no-referrer" />
            )}
            <div className="ml-2 flex flex-col w-[100%]">
                {props.float.name === "received" && <p className="text-blue-400">{props.message.name}</p>}
                <p
                    className={props.float.message + " break-all h-fit w-fit rounded-lg shadow-lg py-4 px-4"}
                    onMouseEnter={() => {
                        setViewDelete("inline-block");
                    }}
                    onMouseLeave={() => {
                        setViewDelete("hidden");
                    }}
                >
                    {props.float.name === "sent" && (
                        <RiDeleteBin5Line className={`text-[1.5em] ${viewDelete}`} onClick={() => props.handleDeleteSent(props.message.id)} />
                    )}{" "}
                    {props.message.text}
                </p>
                <p className={props.float.time}> {props.dateTime[1]}</p>
            </div>
        </div>
    );
};
