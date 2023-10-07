import { useConversations } from "../contexts/ConversationsProvider";
import OpenConversation from "./OpenConverstion";
import Welcome from "./Welcome";

export default function MainInterface() {
  const { indexOfCurrentConversation } = useConversations();
  console.log("MainInterface");
  return (
    <>
      {indexOfCurrentConversation && <OpenConversation />}
      {!indexOfCurrentConversation && <Welcome />}
    </>
  );
}
