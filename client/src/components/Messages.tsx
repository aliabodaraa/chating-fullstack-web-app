import useNowUnReadMessages from "../hooks/useNowUnReadMessages";
import Message from "./Message";
import { formattedMessage } from "../contexts/ConversationsProvider";
import { setRefToLastMessageFunType } from "../common.types";

type MessagesPropsType = {
  messages: formattedMessage[];
  group_id: string;
  setRefToLastMessage: setRefToLastMessageFunType;
};
const Messages = ({
  messages,
  group_id,
  setRefToLastMessage,
}: MessagesPropsType) => {
  console.log("Messages");
  let timeOfLastMessage = messages[messages.length - 1]?.time;
  let messagesLength = messages.length;
  let isLastMessageFromMe = messages[messagesLength - 1]?.fromMe;
  const [nowMessages, unReadMessages, setUnReadMessages] = useNowUnReadMessages(
    group_id,
    timeOfLastMessage,
    messagesLength,
    isLastMessageFromMe
  );
  const distinctDatesMessages: string[] = [];
  const messagesWithOneDate: JSX.Element[] = messages.map((message, index) => {
    const isLastMessage = messages.length - 1 === index;
    const is_find = distinctDatesMessages.includes(message.date);
    if (!is_find) distinctDatesMessages.push(message.date);
    return (
      <>
        {JSON.stringify(unReadMessages)}
        {!is_find ? (
          <Message
            message={message}
            key={index}
            setRefToLastMessage={setRefToLastMessage}
            isLastMessage={isLastMessage}
            nowMessages={nowMessages}
            unReadMessages={unReadMessages}
            setUnReadMessages={setUnReadMessages}
            group_id={group_id}
            date_={message.date}
          />
        ) : (
          <Message
            message={message}
            key={index}
            setRefToLastMessage={setRefToLastMessage}
            isLastMessage={isLastMessage}
            nowMessages={nowMessages}
            unReadMessages={unReadMessages}
            setUnReadMessages={setUnReadMessages}
            group_id={group_id}
          />
        )}
      </>
    );
  });
  return <>{messagesWithOneDate}</>;
};

export default Messages;
