import { useRef, useState, useEffect } from "react";
import { ID, storage } from "../../config/appWrite";
import { backEndBaseURL } from "../../utils/backendBaseURL";
import { useSelector, useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { imageSrc } from "../../utils/imageAppwriteUrl";
import { updateUserSuccess } from "../../redux/user/userSlice";

function ImageUpload() {
  const { currentUser } = useSelector((state) => state.user);
  const myImage = imageSrc(currentUser?.avatar);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);
  const handleFileUpload = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const timestamp = `${now.getFullYear()}${String(
        now.getMonth() + 1
      ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
        now.getHours()
      ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
        now.getSeconds()
      ).padStart(2, "0")}`;
      const fileID = ID.custom(`${currentUser._id}_${timestamp}`.slice(0, 36));
      try {
        await storage.getFile(
          import.meta.env.VITE_nestNexusProfile,
          currentUser.avatar
        );
        await storage.deleteFile(
          import.meta.env.VITE_nestNexusProfile,
          currentUser.avatar
        );
      } catch (err) {
        if (err.code !== 404) {
          setLoading(false);
          throw err;
        }
      }
      const res = await storage.createFile(
        import.meta.env.VITE_nestNexusProfile,
        ID.custom(fileID),
        file
      );

      console.log("imageupload", res);
      if (res) {
        const response = await fetch(
          `${backEndBaseURL}/api/user/user_update/${currentUser._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              avatar: res.$id,
            }),
          }
        );
        const data = await response.json();
        dispatch(updateUserSuccess(data));
        setLoading(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };
  console.log("current image", myImage);
  return (
    <div className="relative p-2 shadow-lg bg-bg-white rounded-full hover:scale-105 transition-all duration-300 ease-in-out">
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
      />
      <div className="rounded-full shadow-lg w-24 h-24 flex items-center overflow-hidden">
        <img
          src={myImage}
          alt={currentUser?.userName}
          referrerPolicy="no-referrer"
        />
      </div>
      <div
        onClick={() => fileRef.current.click()}
        className="opacity-0 hover:opacity-60 hover:cursor-pointer bg-slate-900  absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center"
      >
        <p className="text-white text-center">Change image</p>
      </div>
      {loading && (
        <div className="opacity-60 bg-slate-900  absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center">
          <PulseLoader
            color="#ffffff"
            loading={loading}
            size={10}
            aria-label="pulse loader"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
