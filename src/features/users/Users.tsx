import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import defaultUser from "../../assets/default-user.svg";
import { allUserMessagesRead, selectedUser } from "./usersSlice";
import { User } from "../../types/types";
import grayTick from "../../assets/msg-unread-dblcheck.svg";
import blueTick from "../../assets/msg-dblcheck.svg";

const Users = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const currentUser = useSelector((state: RootState) =>
    state.users.users.find((user) => user.id === state.users.selectedUser?.id)
  );
  const dispatch = useDispatch();

  const handleUserClick = (user: User) => {
    dispatch(selectedUser(user));
    dispatch(allUserMessagesRead(user.id));
  };

  const renderedUsers =
    users.length > 0 ? (
      users.map((user) => {
        const lastMessage = user.messages[user.messages.length - 1];
        const lastMessageTime = new Date(
          lastMessage?.timestamp
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        let displayedLastMessage;

        // If the user is typing, display "typing..."
        if (user.id === currentUser?.id && currentUser?.typing) {
          displayedLastMessage = (
            <p className="text-button text-sm font-medium">{"typing..."}</p>
          );
          // If there is a last message, display it together with its read status (tick)
        } else if (lastMessage) {
          const isLastMessageSentByUser = lastMessage.senderId === user.id;

          displayedLastMessage = (
            <span className="flex justify-start items-center gap-1">
              <img
                className={`${!isLastMessageSentByUser && "hidden"}`} // If the last message was not sent by the user, do not display its read status
                src={lastMessage.read ? blueTick : grayTick}
                alt=""
              />

              <p className="text-read-msg text-sm">
                {lastMessage.content.length > 20
                  ? lastMessage.content.slice(0, 21) + "..."
                  : lastMessage.content}
              </p>
            </span>
          );
          // If there are no messages, display "No messages"
        } else {
          displayedLastMessage = (
            <p className="text-read-msg text-sm">{"No messages"}</p>
          );
        }

        return (
          <div
            key={user.id}
            className={`flex justify-start items-center gap-4 cursor-pointer px-4 hover:bg-wa-gray-light2 ${
              user === currentUser && "bg-[#2B3842] hover:bg-[#2B3842]"
            } w-full`}
            onClick={() => handleUserClick(user)}
          >
            <div>
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt=""
                  className="rounded-full object-cover h-11 w-11"
                />
              ) : (
                <img className="w-12" src={defaultUser} alt="" />
              )}
            </div>

            <div className="flex justify-between items-center pt-3 pb-3 border-b border-b-wa-gray-light w-[80%]">
              <div className="w-[85%]">
                <p className="text-white text-[17px]">{user.userName}</p>
                {displayedLastMessage}
              </div>

              <div className="flex flex-col justify-center items-center gap-[9px] self-start">
                <p className="text-read-msg text-sm">
                  {lastMessage ? lastMessageTime : ""}
                </p>

                {user.unreadMessagesCount ? (
                  <span className="flex justify-center items-center text-white text-xs px-2 py-1 bg-button rounded-full">
                    {user.unreadMessagesCount}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p className="text-white px-4">No users found</p>
    );

  return (
    <div className="flex flex-col justify-start items-start">
      {renderedUsers}
    </div>
  );
};

export default Users;
