import defaultUser from "../assets/default-user.svg";
import menu from "../assets/menu.svg";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import Search from "./Search";

const ChatAreaHeader = () => {
  const user = useSelector((state: RootState) => state.users.selectedUser);

  return (
    <div className="flex justify-between items-center p-5 bg-wa-gray-light2 h-14 w-full">
      <div className="flex justify-start items-center gap-4">
        <img
          className="rounded-full object-cover h-10 w-10"
          src={user?.profilePicture || defaultUser}
          alt=""
        />
        <p className="text-user font-semibold">{user!.userName}</p>
      </div>

      <div className="flex justify-start items-center gap-4 w-3/5 md:w-2/5">
        <Search placeholder="Search messages" />
        <img className="w-6" src={menu} alt="" />
      </div>
    </div>
  );
};

export default ChatAreaHeader;
