import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { CiSquareRemove } from "react-icons/ci";

function FileUpload() {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileRef = useRef(null);
  const onSelectFile = (e) => {
    const selectedFile = e.target.files;
    const selectedFileArray = Array.from(selectedFile);
    const imageArray = selectedFileArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImages(
      (prev) => {
        const newImages = [...prev, ...imageArray];
        if (newImages.length > 6) {
          return newImages.slice(0, 6);
        }
        return newImages;
      },
      (e.target.value = null) // Reset the input value to allow re-uploading the same files
    );
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
        {selectedImages.length > 0 ? (
          <div className="flex flex-col items-center border boder-2 border-gray-200 rounded-md px-5 py-4">
            <CiImageOn className=" w-10 h-10" />
            <p className="text-gray-500 text-sm">
              Current images uploaded ({selectedImages.length}):
            </p>
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex justify-center flex-wrap gap-2 p-2"
            >
              {selectedImages.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer shadow-md"
                  >
                    <img
                      src={image}
                      alt="uploaded"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="absolute p-1 top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition duration-200 ease-in-out rounded-md flex items-center justify-center">
                      <div
                        onClick={() => {
                          setSelectedImages((prev) => {
                            const newImages = [...prev];
                            newImages.splice(index, 1);
                            return newImages;
                          });
                        }}
                        className="absolute top-0 right-0 rounded-full p-1 text-white"
                      >
                        <CiSquareRemove className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center border-2 px-10 border-gray-200 p-4 rounded-md text-gray-500">
            <CiImageOn className=" w-10 h-10" />
            <p>Upload a file.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default FileUpload;
