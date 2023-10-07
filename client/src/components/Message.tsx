import React, { useCallback } from "react";
import { useTheme } from "../contexts/ThemesProvider";
import {
  currntTime as time,
  currntDate as date,
  addOneMinuteToTimeString,
} from "../hooks/useDateTime";
import { formattedMessage } from "../contexts/ConversationsProvider";
import { setRefToLastMessageFunType } from "../common.types";
type MessagePropsType = {
  message: formattedMessage;
  key: number;
  setRefToLastMessage: setRefToLastMessageFunType;
  isLastMessage: boolean;
  nowMessages: any;
  unReadMessages: any;
  setUnReadMessages: Function;
  group_id: string;
  date_?: string;
};
const Message = React.memo(
  ({
    message,
    key,
    setRefToLastMessage,
    isLastMessage,
    nowMessages,
    unReadMessages,
    setUnReadMessages,
    group_id,
    date_,
  }: MessagePropsType) => {
    console.log("Message");
    const isToday = useCallback((date_: string) => date_ === date(), []);
    let { theme } = useTheme();

    //console.log("render Message Component");
    if (message.type === "action-message")
      return (
        <p className="mx-auto text-muted">
          {message.text}
          <br />
        </p>
      );
    else
      return (
        <>
          <div className="row align-self-center">
            {date_ && (
              <p className="bg-light">
                {" "}
                {isToday(message.date) ? "today" : message.date}
              </p>
            )}
          </div>
          <div
            ref={isLastMessage ? setRefToLastMessage : null}
            key={key}
            onClick={() => setUnReadMessages([])}
            className={`my-1 d-flex flex-column ${
              message.fromMe ? "align-self-end" : ""
            }`}
          >
            <div
              className={`rounded px-2 py-1 ${
                message.fromMe ? `bg-${theme} text-white` : "border"
              } `}
            >
              {message.text}
            </div>
            <div
              className={`${
                unReadMessages[group_id]?.includes(key + 1) ? "bg-waring" : ""
              } text-muted small d-flex justify-content-between ${
                message.fromMe ? "text-right" : ""
              }`}
            >
              <b>{message.fromMe ? "You" : message.senderName}</b>
              <p
                className={`${
                  !message.fromMe && nowMessages.includes(key)
                    ? "bg-warning"
                    : ""
                } ps-2`}
              >{`${message.time === time() ? "Now" : message.time}`}</p>
            </div>
          </div>
        </>
      );
  },
  (prevProps, nextProps) => {
    // if the time of message exceeds the current time with one minute will render the corresponding message immediately
    return time() !== addOneMinuteToTimeString(nextProps.message.time);
  }
);

export default Message;
