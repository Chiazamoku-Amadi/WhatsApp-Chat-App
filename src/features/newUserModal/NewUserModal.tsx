import {
  faCheck,
  faCloudArrowUp,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../app/store";
import { addUser } from "../users/usersSlice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/rootReducer";
import { useSelector } from "react-redux";
import { closeModal } from "./newUserModalSlice";

const NewUserModal = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [userData, setUserData] = useState<{
    userName: string;
    about: string;
    profilePicture: string | null;
  }>({
    userName: "",
    about: "",
    profilePicture: null,
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();

  const isOpen = useSelector((state: RootState) => state.newUserModal.isOpen);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];

    validateFile(droppedFile);
    readFile(droppedFile);

    setFileName(droppedFile.name);
    setFileUploaded(true);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    validateFile(file);
    readFile(file);
  };

  const readFile = (file: File) => {
    const reader = new FileReader(); // Creates a new instance of the FileReader object
    reader.readAsDataURL(file); // The file is read as a data url, thus, allowing us to access the file's contents as a base64-encoded string
    reader.onloadend = () => {
      // Sets up an event handler that will be called when the file reading operation is completed
      if (reader.result) {
        localStorage.setItem("profilePicture", reader.result.toString());
        setUserData((prevUserData) => ({
          ...prevUserData,
          profilePicture: reader.result!.toString(),
        }));
      }
    };
  };

  // Image Validation
  // Checks that file is an image file
  const validateFile = (file: File) => {
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type. Please upload a JPEG, PNG or WEBP image!");
      return false;
    }

    setError("");
    return true;
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setError("");
  };

  const createNewUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addUser({
        id: uuidv4(),
        userName: userData.userName,
        about: userData.about,
        profilePicture: userData.profilePicture,
        messages: [],
        unreadMessagesCount: 0,
        typing: false,
      })
    );

    handleCloseModal();

    // Reset form after submission
    // Handles profilePicture reset b/c reset using setUserData does not work
    if (formRef.current) {
      formRef.current.reset();
    }

    setUserData({
      userName: "",
      about: "",
      profilePicture: null,
    });

    setFileUploaded(false);
    setError("");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="p-8 fixed top-0 left-0 bg-neutral-700 opacity-50 z-50 w-full h-full" />
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <form
              ref={formRef}
              onSubmit={createNewUser}
              className="bg-slate-50 flex flex-col justify-start items-start p-10 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 h-auto w-1/2"
            >
              <FontAwesomeIcon
                icon={faX}
                style={{
                  cursor: "pointer",
                  alignSelf: "end",
                  color: "#00A884",
                }}
                onClick={handleCloseModal}
              />

              <header className="flex justify-center items-center w-full">
                <h2 className="text-button text-2xl font-semibold pb-2">
                  New User
                </h2>
              </header>

              <div className="flex flex-col justify-between items-center gap-8 w-full">
                <section className="flex flex-col justify-center items-start gap-2 w-full">
                  <label
                    htmlFor="userName"
                    className="text-button text-base font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userData.userName}
                    onChange={handleChange}
                    className="text-wa-gray-light2 p-2 rounded shadow outline-none border border-default w-full"
                  />
                </section>

                <section className="flex flex-col justify-center items-start gap-2 w-full">
                  <label
                    htmlFor="about"
                    className="text-button text-base font-semibold"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    value={userData.about}
                    cols={30}
                    rows={2}
                    onChange={handleChange}
                    className="text-wa-gray-light2 p-2 rounded shadow outline-none border border-default resize-none overflow-hidden w-full"
                  />
                </section>

                {/* Profile Picture Upload */}
                <section className="flex flex-col justify-center items-start gap-2 w-full">
                  <label
                    htmlFor="profilePicture"
                    className="text-button text-base font-semibold"
                  >
                    Profile Picture
                  </label>

                  {/* Upload via drag & drop */}
                  <div
                    className={`flex flex-col justify-center items-center gap-2 p-16 border border-dashed border-button ${
                      dragging && "bg-blue-100"
                    } w-full`}
                  >
                    {fileUploaded && !error ? (
                      <div className="font-semibold">
                        <span className="flex justify-center items-center gap-2">
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "#00A884" }}
                          />
                          <p className="text-button">
                            File uploaded successfully!
                          </p>
                        </span>
                        <p>{fileName}</p>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <FontAwesomeIcon
                          icon={faCloudArrowUp}
                          style={{ color: "#222E35", cursor: "pointer" }}
                        />
                        <p className="text-button">Drag and Drop to Upload</p>
                      </div>
                    )}
                  </div>

                  {/* Upload via file selection */}
                  <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    className="file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-white file:text-sm file:font-semibold
              file:bg-button hover:file:bg-emerald-600 font-medium"
                    onChange={handleFileInput}
                  />
                  {error && (
                    <p className="text-red-400 font-semibold text-xs">
                      {error}
                    </p>
                  )}
                </section>

                <section className="flex justify-end items-center w-full">
                  <button
                    className={`bg-button text-white hover:bg-emerald-600 py-2 px-8 rounded ${
                      error && "cursor-not-allowed"
                    }`}
                  >
                    Create User
                  </button>
                </section>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default NewUserModal;
