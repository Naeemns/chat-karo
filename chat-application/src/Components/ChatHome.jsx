import React, { useState } from "react";
import { useHistory } from "react-router";
import styles from "./ChatHome.module.css";

export const ChatHome = () => {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [info, setInfo] = useState(false);
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userName || !room) {
            setInfo(true);
            return;
        };
        history.push(`/chat?user=${userName}&room=${room}`);
    }

    return (
        <div className={styles.homeContainer}  >
            <div className={styles.homeContainer__info}>
                <h1>Join a Chat Room</h1>
                <h1>have fun!!</h1>
            </div>
            <div className={styles.homeContainer__form}>
                {
                    info && <span style={{ color: "#cc3300" }} >Please fill the required fields</span>
                }
                <form onSubmit={handleSubmit} >
                    <input type="text" placeholder="Enter unique name.." onChange={(e) => setUserName(e.target.value)} required />
                    <input type="text" placeholder="Enter room name.." onChange={(e) => setRoom(e.target.value)} required />
                    <input type="submit" value="Sign in" onClick={handleSubmit} className={styles.homeContainer__form__button} />
                </form>
            </div>
            <div className={styles.credits}>
                Photo by <a href="https://unsplash.com/@worthyofelegance?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alex</a> on <a href="https://unsplash.com/s/photos/coffee-break?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </div>
        </div>
    )
}