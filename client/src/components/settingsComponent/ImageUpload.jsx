import React from "react";
import { useRef, useState, useEffect } from "react";
import { ID, storage } from "../../config/appWrite";
import { backEndBaseURL } from "../../utils/backendBaseURL";
import { useSelector } from "react-redux";

function ImageUpload() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);
  const handleFileUpload = async () => {
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
          currentUser._id
        );
        await storage.deleteFile(
          import.meta.env.VITE_nestNexusProfile,
          currentUser._id
        );
      } catch (err) {
        if (err.code !== 404) {
          throw err;
        }
      }
      const res = await storage.createFile(
        import.meta.env.VITE_nestNexusProfile,
        ID.custom(fileID),
        file
      );
      console.log("created a file", res);
      if (res) {
        const response = await fetch(
          `${backEndBaseURL}/api/user/avatar_update`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: currentUser._id,
              avatar: `https://fra.cloud.appwrite.io/v1/storage/buckets/${
                import.meta.env.VITE_nestNexusProfile
              }/files/${res.$id}/view?project=${
                import.meta.env.VITE_AppwriteID
              }&mode=admin`,
            }),
          }
        );
        const data = await response.json();
        console.log("Updated avatar:", data);
      }
    } catch (error) {
      console.error("Upload failed:", error);
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
        <img
          src={currentUser?.avatar}
          alt={currentUser?.userName}
          className=""
        />
      </div>
      <div
        onClick={() => fileRef.current.click()}
        className="opacity-0 hover:opacity-60 hover:cursor-pointer bg-slate-900  absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center"
      >
        <p className="text-white text-center">Change image</p>
      </div>
    </div>
  );
}

export default ImageUpload;
