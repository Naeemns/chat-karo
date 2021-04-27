import React from "react";
import { BsCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useHistory } from "react-router";
import styles from "./InfoBar.module.css";

export const InfoBar = ({ room }) => {
    const history = useHistory();

    const handleCloseClick = () => {
        history.push("/");
    }
    return (
        <div className={styles.infoBarContainer}>
            <div className={styles.infoBarContainer__left}>
                {/* <BsCircleFill className={styles.infoBarContainer__left__active} /> */}
                <h3>{room}</h3>
            </div>
            <div className={styles.infoBarContainer__right}>
                <AiFillCloseCircle onClick={handleCloseClick} className={styles.infoBarContainer__right__close} />
            </div>
        </div>
    )
}