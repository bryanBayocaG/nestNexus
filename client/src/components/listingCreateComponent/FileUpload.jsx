import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { ID, storage } from "../../config/appWrite";
import { PulseLoader } from "react-spinners";
import { FaRegTrashAlt } from "react-icons/fa";

function FileUpload({ formData, setFormData, upLoading, setUpLoading }) {
  const [selectedImages, setSelectedImages] = useState([]);

  // const [upLoading, setUpLoading] = useState(false);
  const fileRef = useRef(null);
  const onSelectFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => {
      const updated = [...prev, ...newImages].slice(0, 6);
      return updated;
    });

    e.target.value = null;
  };
  const handleImageUpload = () => {
    if (selectedImages.length < 6 && selectedImages.length > 0) {
      setUpLoading(true);
      const promises = selectedImages.map(({ file }) => storeImage(file));
      Promise.all(promises)
        .then((uploadedFiles) => {
          setFormData({
            ...formData,
            imageUrls: [
              ...(formData.imageUrls || []),
              ...uploadedFiles.map((f) => f.$id),
            ],
          });
          setUpLoading(false);
          setSelectedImages([]);
          fileRef.current.value = null;
        })
        .catch((err) => {
          console.error("Upload error", err);
          setUpLoading(false);
        });
    }
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      storage
        .createFile(import.meta.env.VITE_nestNexusProfile, ID.unique(), image)
        .then((res) => {
          storage
            .getFile(import.meta.env.VITE_nestNexusProfile, res.$id)
            .then((fileData) => {
              resolve(fileData);
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
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
        className="my-4 border-2 flex justify-center border-gray-100 p-3 rounded-lg cursor-pointer shadow-lg"
      >
        {selectedImages.length > 0 ? (
          <div className="flex flex-1 flex-col items-center gap-2 ">
            <div className="flex flex-col items-center gap-2 mb-2">
              <CiImageOn className=" w-10 h-10" />
              <p className="text-gray-500 text-sm">
                Current selected images ({selectedImages.length}):
              </p>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex w-full flex-col flex-wrap gap-2 p-2"
            >
              <p>Preview:</p>
              {selectedImages.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="cursor-pointer shadow-md flex justify-between items-center p-4 rounded-lg"
                  >
                    <div className="flex relative flex-col gap-1 ">
                      <img
                        src={image.preview}
                        alt="uploaded"
                        className="w-auto h-20 object-cover rounded-md"
                      />

                      <div className="bg-gray-500 absolute w-fit bottom-0 left-0 opacity-40">
                        <p className="text-white">{image.file.name}</p>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setSelectedImages((prev) => {
                          const newImages = [...prev];
                          newImages.splice(index, 1);
                          return newImages;
                        });
                      }}
                      className="flex text-white bg-primary p-2 cursor-pointer transition duration-200 ease-in-out hover:scale-105 rounded-md"
                    >
                      <FaRegTrashAlt className="w-6 h-6" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleImageUpload}
                className={`bg-secondary text-white px-4 py-2 rounded-md shadow-md ${
                  upLoading
                    ? ""
                    : "hover:scale-105 transition duration-200 ease-in-out"
                }`}
                type="button"
              >
                {upLoading ? (
                  <div className="flex items-center gap-2">
                    <span>Uploading</span>
                    <PulseLoader
                      color="#ffffff"
                      loading={upLoading}
                      size={10}
                      aria-label="pulse loader"
                      data-testid="loader"
                    />
                  </div>
                ) : (
                  "Upload Image(s)"
                )}
              </button>
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
