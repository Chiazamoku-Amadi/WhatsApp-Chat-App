import chats from "../assets/chats-filled.svg";
import defaultUser from "../assets/default-user.svg";
import community from "../assets/community-outline.svg";
import status from "../assets/status-outline.svg";
import newsletter from "../assets/newsletter-outline.svg";
import archived from "../assets/archived.svg";
import settings from "../assets/settings-outline.svg";
import starred from "../assets/star-outline.svg";
import newChat from "../assets/new-chat-outline.svg";
import menu from "../assets/menu.svg";
import viewLanding from "../assets/native-desktop-hero.png";
import lockSmall from "../assets/lock-small.svg";
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import { useState } from "react";
import { useAppDispatch } from "../app/store";
import { openModal } from "../features/newUserModal/newUserModalSlice";
import Users from "../features/users/Users";
import Chat from "../features/chat/Chat";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";

const Landing = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModal = () => {
    if (users.length >= 2) {
      alert("Maximum user limit reached. Cannot add new user.");
      return;
    }

    dispatch(openModal());
  };

  return (
    <div className="flex h-screen overflow-x-auto">
      <section className="flex h-full min-w-[100%] sm:min-w-[90%] lg:min-w-[34%] overflow-x-auto">
        {/* Menu Section */}
        <section className="flex flex-col justify-between items-center bg-wa-gray-light2 p-3 border-r border-[#4D565C] h-full sm:w-[10%] lg:w-[13%] w-[13%]">
          <div className="flex flex-col justify-between items-center gap-6 pr-2 w-full">
            <span className="flex flex-col justify-between items-center gap-6 pb-5 border-b border-[#4D565C] w-full">
              <img className="w-6" src={chats} alt="" />
              <img className="w-6" src={community} alt="" />
              <img className="w-6" src={status} alt="" />
              <img className="w-6" src={newsletter} alt="" />
            </span>
            <img className="w-6" src={archived} alt="" />
            <img src={starred} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center gap-5 w-full">
            <img className="w-7" src={settings} alt="" />
            <img className="w-8" src={defaultUser} alt="" />
          </div>
        </section>

        {/* Users List */}
        <section className="bg-wa-gray-v-dark py-2 h-full sm:w-[90%] lg:w-[87%] w-[87%] overflow-auto">
          <div className="flex justify-between items-center px-4 mb-4 w-full">
            <h2 className="text-user text-2xl font-bold w-[80%]">Chats</h2>
            <div className="flex justify-between items-center w-[20%]">
              <button>
                <img
                  className="cursor-pointer"
                  src={newChat}
                  alt=""
                  onClick={handleOpenModal}
                />
              </button>
              <img src={menu} alt="" />
            </div>
          </div>

          <div className="flex justify-between items-center px-4 mb-4 w-full">
            <div className="flex justify-start items-center bg-wa-gray-light2 py-[5px] rounded-lg w-[92%]">
              <img src={search} alt="" className=" pr-6 pl-3" />
              <input
                type="text"
                placeholder="Search or start new chat"
                name="searchQuery"
                value={searchQuery}
                onChange={handleSearch}
                className="bg-wa-gray-light2 text-sm text-read-msg placeholder:text-read-msg outline-none focus:text-white"
              />
            </div>
            <img src={filter} alt="" />
          </div>

          <div className="w-full">
            <Users />
          </div>
        </section>
      </section>

      {/* Chat Section */}
      <section className="flex-1 h-full min-w-[100%] sm:min-w-[90%] lg:min-w-[34%] overflow-auto">
        {selectedUser ? (
          <Chat />
        ) : (
          <main className="flex justify-center items-center flex-col gap-[86px] pt-24 bg-wa-gray-default h-screen w-full">
            <div className="flex justify-center items-center flex-col gap-3">
              <img className="w-80" src={viewLanding} alt="" />
              <h1 className="text-[#E9EDEFE0] text-2xl md:text-[32px] text-center font-light pt-2">
                Download WhatsApp for Windows
              </h1>
              <p className="text-read-msg text-xs md:text-sm text-center w-11/12">
                Make calls, share your screen and get a faster experience when
                you download the Windows app.
              </p>
              <button className="bg-button px-6 py-2.5 mt-5 rounded-3xl text-wa-gray-v-dark text-xs md:text-sm font-medium">
                Get from Microsoft Store
              </button>
            </div>
            <p className="flex justify-center items-center gap-1 text-[#667781] text-xs md:text-sm">
              <span className="pt-0.5">
                <img src={lockSmall} alt="" />
              </span>
              Your personal messages are end-to-end encrypted
            </p>
          </main>
        )}
      </section>
    </div>
  );
};

export default Landing;
