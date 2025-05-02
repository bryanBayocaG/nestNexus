import { useRef } from "react";
import { CiImageOn } from "react-icons/ci";

function FileUpload() {
  const fileRef = useRef(null);
  const onSelectFile = (e) => {
    const selectedFile = e.target.files;
    console.log(selectedFile);
  };
  return (
    <>
      <p className="text-gray-600">
        <strong>Images: </strong>the first image will be the cover &#40;max
        6&#41;
      </p>
      <input
        ref={fileRef}
        type="file"
        name="images"
        onChange={onSelectFile}
        multiple
        accept="image/png, image/jpeg, image/webp"
        hidden
      />
      <div
        onClick={() => fileRef.current.click()}
        className="my-4 border-2 flex justify-center border-gray-100 p-3 rounded-lg cursor-pointer  shadow-lg"
      >
        <div className="flex flex-col items-center border-2 border-gray-200 p-4 rounded-md text-gray-500">
          <CiImageOn className=" w-10 h-10" />
          <p>Upload a file.</p>
        </div>
      </div>
    </>
  );
}

export default FileUpload;
