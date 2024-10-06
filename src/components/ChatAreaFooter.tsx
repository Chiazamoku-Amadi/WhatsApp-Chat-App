import smiley from "../assets/smiley.svg";
import attach from "../assets/attach-menu-plus.svg";
import send from "../assets/send.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import {
  markMessageAsRead,
  sendMessage,
  setInputValue,
} from "../features/chat/chatSlice";
import { useEffect, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import { addMessageToUser, setUserTyping } from "../features/users/usersSlice";
import { v4 as uuidv4 } from "uuid";

interface Emoji {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
}

const ChatAreaFooter = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) => state.chat.inputValue);
  const users = useSelector((state: RootState) => state.users.users);
  const messages = useSelector((state: RootState) => state.chat.messages);
  const currentUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);  

  // Effect to focus the textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  // Effect to add the last sent message to both sender and receiver once there's a change in the messages array
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage) {
      dispatch(addMessageToUser(lastMessage));
    }
  }, [dispatch, messages]);

  //
  useEffect(() => {
    if (currentUser) {
      dispatch(markMessageAsRead({ userId: currentUser.id }));
    }
  }, [currentUser, dispatch]);

  // Effect to handle clicking outside the emoji picker to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Checks if emoji picker is rendered, click target is outside the emoji picker, and click target is not the emoji icon
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".emoji-icon")
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to cleanup the typing state for the current user by setting it to false when the component unmounts
  useEffect(() => {
    return () => {
      if (currentUser) {
        dispatch(setUserTyping({ userId: currentUser.id, typing: false }));
      }
    };
  }, [currentUser, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setInputValue(event.target.value));
    dispatch(setUserTyping({ userId: currentUser!.id, typing: true }));

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = window.setTimeout(() => {
      dispatch(setUserTyping({ userId: currentUser!.id, typing: false }));
    }, 2000);
  };

  // Handles sending messsage and "Enter + Shift" inserts a line break
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const receiver = users.find((user) => user.id !== currentUser!.id);

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      dispatch(
        sendMessage({
          id: uuidv4(),
          content: inputValue,
          senderId: currentUser!.id,
          receiverId: receiver!.id,
          timestamp: new Date().toISOString(),
          read: false,
        })
      );

      dispatch(setInputValue(""));
      dispatch(setUserTyping({ userId: currentUser!.id, typing: false }));

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  // Handles sending a message by clicking send icon
  const handleSendMessage = (event: React.MouseEvent) => {
    const receiver = users.find((user) => user.id !== currentUser!.id);

    event.preventDefault();
      dispatch(
        sendMessage({
          id: uuidv4(),
          content: inputValue,
          senderId: currentUser!.id,
          receiverId: receiver!.id,
          timestamp: new Date().toISOString(),
          read: false,
        })
      );

      dispatch(setInputValue(""));
      dispatch(setUserTyping({ userId: currentUser!.id, typing: false }));

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
  }

  const handleEmojiSelect = (emoji: Emoji) => {
    const updatedInputValue = inputValue + emoji.native;
    dispatch(setInputValue(updatedInputValue));
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center gap-2 p-5 bg-[#212D33] h-16 w-full">
        <img
          className="emoji-icon cursor-pointer"
          src={smiley}
          alt=""
          onClick={() =>
            setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker)
          }
        />
        <img src={attach} alt="" />
        <textarea
          ref={inputRef}
          name="message"
          value={inputValue}
          placeholder="Type a message"
          cols={30}
          rows={1}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="bg-[#2A3843] text-base text-read-msg placeholder:text-read-msg outline-none border-none resize-none overflow-hidden focus:text-white rounded-lg py-[10px] px-3 w-[85%]"
        />
        <img src={send} alt="" className="cursor-pointer" onClick={handleSendMessage} />
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-16 right-4" ref={emojiPickerRef}>
          <Picker
            onEmojiSelect={handleEmojiSelect}
            style={{
              position: "absolute",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatAreaFooter;
