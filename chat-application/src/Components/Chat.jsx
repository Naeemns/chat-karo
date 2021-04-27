import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useHistory, useLocation } from "react-router-dom";
import { MessageWindow } from "./MessageWindow";
import styles from "./Chat.module.css";
import teemuPaananen from "../images/teemuPaananen.jpg"
import { AiOutlineSend } from 'react-icons/ai';


let socket;
export const Chat = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get("user");
    const room = searchParams.get("room");
    const ENDPOINT = "https://chat-karo-web-application.herokuapp.com/";
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const history = useHistory();
    const [users, setUsers] = useState([]);


    useEffect(() => {
        socket = io(ENDPOINT);
        // console.log(socket)
        socket.emit("join", { userName, room }, (error) => {
            if (error) {
                history.push("/");
            }
        });

        return () => {
            socket.disconnect();

            socket.off();
        }
    }, [])


    useEffect(() => {
        socket.on("message", (userMessage) => {
            // console.log(messages)

            // outputMessage(userMessage);
            setMessages(messages => [...messages, userMessage]);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        })
    }, [])


    //Sending messages
    const sendMessage = (e) => {
        e.preventDefault();
        if (text) {
            setText("");
            socket.emit("sendMessage", text);
        }
    }

    const handleCloseClick = () => {
        history.push("/");
    }


    return (
        <div className={styles.chat__container}>
            {/* <div style={{ width: "100%", position: "absolute", top: "10%", right: "10%", zIndex: -1 }}>
                <svg height="650px" width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f86d5c" fill-opacity="1" d="M0,224L26.7,208C53.3,192,107,160,160,170.7C213.3,181,267,235,320,261.3C373.3,288,427,288,480,245.3C533.3,203,587,117,640,74.7C693.3,32,747,32,800,42.7C853.3,53,907,75,960,101.3C1013.3,128,1067,160,1120,154.7C1173.3,149,1227,107,1280,101.3C1333.3,96,1387,128,1413,144L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#05293C" fill-opacity="1" d="M0,224L26.7,208C53.3,192,107,160,160,170.7C213.3,181,267,235,320,261.3C373.3,288,427,288,480,245.3C533.3,203,587,117,640,74.7C693.3,32,747,32,800,42.7C853.3,53,907,75,960,101.3C1013.3,128,1067,160,1120,154.7C1173.3,149,1227,107,1280,101.3C1333.3,96,1387,128,1413,144L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
            </div> */}
            <div>
                <div className={styles.chat__container__chat}>
                    <MessageWindow messages={messages} userName={userName} />
                    <div className={styles.form}>
                        <form onSubmit={sendMessage}>
                            <input value={text} type="text"
                                onChange={(e) => setText(e.target.value)}
                                placeholder={`${userName}, type your message here...`}
                            />
                            <button type="submit" onClick={sendMessage} className={styles.send__button}> <AiOutlineSend className={styles.send__button__icon} /></button>
                        </form>
                    </div>
                </div>
                <div className={styles.chat__container__users}>
                    {/* <InfoBar room={room} /> */}
                    <div className={styles.chat__container__users__room}>
                        <h3>{room}</h3>
                    </div>
                    <div className={styles.chat__container__users__container}>
                        {
                            users?.map(user => {
                                return <div key={user.userName} className={styles.chat__container__users__container__user}>{user.userName}</div>
                            })
                        }
                    </div>
                    <button className={styles.chat__container__users__leave__button} onClick={handleCloseClick}>Leave Room</button>
                </div>
                <div className={styles.background__container}><img className={styles.background} src={teemuPaananen} alt="forest" /></div>
            </div>
        </div >
    )
}