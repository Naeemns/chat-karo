import React, { createRef, useState } from "react";
import { Message } from "./Message";
import ScrollableFeed from 'react-scrollable-feed';
import styles from "./MessageWindow.module.css";
import { CgChevronDoubleDownO } from 'react-icons/cg';

export const MessageWindow = ({ messages, userName }) => {
    const [isAtBottom, setIsAtBottom] = useState(true);
    const scrollableRef = createRef();
    const scrollButtom = `${styles.scrollDown} btn btn-primary m-2`

    const scrollToBottom = () => {
        scrollableRef.current.scrollToBottom();
    }

    const updateIsAtBottomState = (bool) => {
        setIsAtBottom(bool);
    }

    return (
        <div className={styles.messageContainer} >
            <ScrollableFeed
                ref={scrollableRef}
                onScroll={isAtBottom => updateIsAtBottomState(isAtBottom)}
                className={styles.scrollWindow}>
                <CgChevronDoubleDownO onClick={() => scrollToBottom()} style={isAtBottom ? { display: "none" } : { display: "block" }} disabled={isAtBottom} type="button" className={scrollButtom} />
                {
                    messages?.map((message, index) => {
                        // console.log(message.text + index)
                        return (
                            <div key={index}>
                                <Message message={message} userName={userName} isSame={index === 0 ? true : messages[index - 1].user === messages[index].user ? true : false} />
                            </div>
                        )
                    })
                }
            </ScrollableFeed>
        </div>
    )
}