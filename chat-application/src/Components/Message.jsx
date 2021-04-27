import React from "react";
import ReactEmoji from "react-emoji";
import styles from "./Message.module.css";
import { RiDropFill } from 'react-icons/ri';

export const Message = ({ message: { user, text }, userName, isSame }) => {
    let isSentByCurrentUser = false;

    const trimmedName = userName.trim().toLowerCase();
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }
    return (
        isSentByCurrentUser ? (
            <div className={styles.currentUser}>
                <div>
                    <p>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : user === "Admin" ?
            <div className={styles.admin}>
                <div>
                    <p>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
            : <div className={styles.otherUser} >

                <div className={styles.otherUser__userName}>
                    {
                        !isSame && <div>
                            <RiDropFill className={styles.otherUser__userName__drop} />
                            <p className={styles.userName}>{user.split("").splice(0, 1).join("")}</p>
                        </div>
                    }
                </div>

                <div className={styles.otherUser__message}>
                    <p>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
    )
}