import { useEffect, useReducer, useState } from "react";
import useLocalStorage from "./useLocalStorage";
const STATUS = { active: "active", out: "out" };
const ADD_CONVERSATION = "add-conversation";
const EDIT_CONVERSATION = "edit-conversation";
const DELETE_CONVERSATION = "remove-conversation";
const LEAVE_CONVERSATION = "leave-conversation";
const REMOVE_MEMBER = "remove-member";
const ADD_MEMBER = "add-member";
const READ_MESSAGES_CONVERSATION = "read-messages-conversation";
const ADD_MESSAGE_TO_CONVERSATION = "add-message-to-conversation";

function conversationsReducer(state, action) {
    switch (action.type) {
        case ADD_CONVERSATION:
            return {
                ...state,
                [action.payload.group_id]: {
                    creator_id: action.payload.creator_id,
                    name: action.payload.name,
                    group_id: action.payload.group_id,
                    conversation: {
                        recipients: action.payload.recipients,
                        messages: []
                    },
                    unReadMessagesCount: 0,
                    status: STATUS.active
                }
            }
        case EDIT_CONVERSATION:
            return {
                ...state,
                [action.payload.group_id]: {
                    ...state[action.payload.group_id],
                    name: action.payload.name,
                    conversation: {
                        ...state[action.payload.group_id].conversation,
                        recipients: action.payload.recipients
                    }
                }
            }
        case DELETE_CONVERSATION:
            const updatedObject = {...state };
            delete updatedObject[action.payload.group_id];
            return updatedObject;
        case ADD_MEMBER:
            return {
                ...state,
                [action.payload.group_id]: {
                    ...state[action.payload.group_id],
                    status: STATUS.active
                }
            }
        case LEAVE_CONVERSATION:
            return {
                ...state,
                [action.payload.group_id]: {
                    ...state[action.payload.group_id],
                    conversation: {
                        ...state[action.payload.group_id].conversation,
                        recipients: action.payload.recipients
                    }
                }
            }
        case REMOVE_MEMBER:
            return {
                ...state,
                [action.payload.group_id]: {
                    ...state[action.payload.group_id],
                    status: STATUS.out
                }
            }
        case READ_MESSAGES_CONVERSATION:
            return {
                ...state,
                [action.payload.group_id]: {
                    ...state[action.payload.group_id],
                    unReadMessagesCount: 0
                }
            }
        case ADD_MESSAGE_TO_CONVERSATION:
            return {
                ...state,
                [action.payload.group_id]: {
                    ...state[action.payload.group_id],
                    conversation: {
                        ...state[action.payload.group_id].conversation,
                        messages: [
                            ...state[action.payload.group_id].conversation.messages,
                            action.payload.newMessage
                        ]
                    },
                    unReadMessagesCount: action.payload.isConversationOpen ? 0 : state[action.payload.group_id].unReadMessagesCount + 1
                }
            }
        default:
            return state
    }
}

const useReducersWithLocalStorage = (reducerName, storageName, initialValue = "") => {
    console.log("____________________________");
    let [localStorageConversations, setLocalStorageConversations] = useLocalStorage(storageName, initialValue);
    let [conversations, dispatchConversations] = useReducer(conversationsReducer, localStorageConversations);

    useEffect(() => { //write the consequences changes of conversations variable to localStorageConversations
        setLocalStorageConversations(conversations)
    }, [conversations, setLocalStorageConversations]);


    return [conversations, dispatchConversations];

}

export default useReducersWithLocalStorage;