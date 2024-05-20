import defaultUser from "../assets/default-user.svg";
import search from "../assets/search.svg";
import menu from "../assets/menu.svg";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";

const ChatAreaHeader = () => {
  const user = useSelector((state: RootState) => state.users.selectedUser);

  return (
    <div className="flex justify-between items-center p-5 bg-wa-gray-light2 h-14 w-full">
      <div className="flex justify-start items-center gap-4">
        <img
          className="rounded-full cursor-pointer object-cover h-10 w-10"
          src={user?.profilePicture || defaultUser}
          alt=""
        />
        <p className="text-user font-semibold">{user!.userName}</p>
      </div>

      <div className="flex justify-start items-center gap-4">
        <img className="cursor-pointer w-8" src={search} alt="" />
        <img className="cursor-pointer w-6" src={menu} alt="" />
      </div>
    </div>
  );
};

export default ChatAreaHeader;
