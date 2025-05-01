import { useRef, useState, useEffect } from "react";
import { ID, storage } from "../../config/appWrite";
import { backEndBaseURL } from "../../utils/backendBaseURL";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { imageSrc } from "../../utils/imageAppwriteUrl";

function ImageUpload() {
  const { currentUser } = useSelector((state) => state.user);
  const myImage = imageSrc(currentUser?.avatar);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);
  const handleFileUpload = async () => {
    try {
      setLoading(true);
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
          currentUser._id
        );
        await storage.deleteFile(
          import.meta.env.VITE_nestNexusProfile,
          currentUser._id
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
      if (res) {
        const response = await fetch(
          `${backEndBaseURL}/api/user/user_update/${currentUser._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              avatar: res.$id,
            }),
          }
        );
        const data = await response.json();
        console.log("Updated avatar:", data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };
  return (
    <div className="relative p-5 shadow-lg bg-bg-white rounded-full hover:scale-105 transition-all duration-300 ease-in-out">
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
      />
      <div className="rounded-full w-24 h-24 flex items-center">
        <img src={myImage} alt={currentUser?.userName} className="" />
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
