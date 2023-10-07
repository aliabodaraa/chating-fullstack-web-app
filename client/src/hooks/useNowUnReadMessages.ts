import { useCallback, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { currntTime as time } from "../hooks/useDateTime";
interface useNowUnReadMessagesPropsType {
  (
    group_id: string,
    timeOfLastMessage: string,
    messagesLength: number,
    isLastMessageFromMe: boolean
  ): any;
}
const useNowUnReadMessages: useNowUnReadMessagesPropsType = (
  group_id,
  timeOfLastMessage,
  messagesLength,
  isLastMessageFromMe
) => {
  const [nowMessages, setNowMessages] = useLocalStorage<Array<number>>(
    "nowMessages",
    []
  );
  type UnReadMessagesType = {
    [key: string]: number[];
  };
  const [unReadMessages, setUnReadMessages] =
    useLocalStorage<UnReadMessagesType>("unReadMessages", {});
  const isNow = useCallback((time_: string) => time_ === time(), []);
  useEffect(() => {
    if (!isNow(timeOfLastMessage)) {
      setNowMessages([]);
      setUnReadMessages({});
      return;
    }
    setNowMessages((prev) => {
      let res = null;
      if (prev.includes(messagesLength)) res = prev;
      else res = [...prev, messagesLength];
      if (!isLastMessageFromMe)
        setUnReadMessages((prevUnRead) => ({
          ...prevUnRead,
          [group_id]: prevUnRead[group_id]
            ? [...prevUnRead[group_id], messagesLength]
            : [messagesLength],
        }));

      return res;
    });

    let interval = setInterval(() => {
      console.log("Interval Ali");
      if (!isNow(timeOfLastMessage)) {
        console.log("STOP INTERVAL WHEN TIME CHANGES");
        setNowMessages([]);
        return clearInterval(interval);
      }
    }, 10);

    return () => {
      console.log("CLEAR INTERVAL WHEN REFRESHING", interval);
      clearInterval(interval); //eliminate the interval each time you added a new message , the interval will be cleared and only the interval for the last message will be applied
    };
  }, [
    isLastMessageFromMe,
    messagesLength,
    timeOfLastMessage,
    setNowMessages,
    isNow,
    setUnReadMessages,
  ]);

  return [nowMessages, unReadMessages, setUnReadMessages] as [
    typeof nowMessages,
    typeof unReadMessages,
    typeof setUnReadMessages
  ];
};

export default useNowUnReadMessages;
