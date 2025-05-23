import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { backEndBaseURL } from "../utils/backendBaseURL";
import { imageSrc } from "../utils/imageAppwriteUrl";
import FileUpload from "../components/listingCreateComponent/FileUpload";
import { FaRegTrashAlt } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

function UpdateListingPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [upLoading, setUpLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    contact_email: currentUser.email,
    description: "",
    address: "",
    type: "rent",
    bedroom: 1,
    bathroom: 1,
    regularPrice: 500,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const listingId = params.listingId;
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(
          `${backEndBaseURL}/api/listing/get/${listingId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setFormData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        setError("Please upload at least one image.");
        return;
      }
      if (+formData.discountPrice >= +formData.regularPrice) {
        setError("Discounted price must be less than regular price.");
        return;
      }
      setLoading(true);
      setError(false);
      const res = await fetch(
        `${backEndBaseURL}/api/listing/update/${listingId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/listing`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="w-[95vw] mx-auto">
      <h2 className="font-bold text-2xl p-5">Update Listing</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
        <div className="flex-1 p-5">
          <div className="flex flex-col gap-4 md:gap-2">
            <div className="flex flex-col">
              <label className="hidden md:block">Name</label>
              <input
                id="name"
                className="border border-gray-400 p-3 rounded-lg focus:border-secondary outline-none"
                type="text"
                placeholder="Name"
                required
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="flex flex-col">
              <label className="hidden md:block">Email to contact</label>
              <input
                id="contact_email"
                className="border border-gray-400 p-3 rounded-lg focus:border-secondary outline-none"
                type="text"
                placeholder="Email to contact"
                required
                onChange={handleChange}
                value={formData.contact_email}
              />
            </div>
            <div className="flex flex-col">
              <label className="hidden md:block">Description</label>
              <textarea
                id="description"
                className="border border-gray-400 p-3 rounded-lg focus:border-secondary outline-none"
                type="text"
                rows="10"
                placeholder="Description"
                required
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            <div className="flex flex-col">
              <label className="hidden md:block">Address</label>
              <input
                id="address"
                className="border border-gray-400 p-3 rounded-lg focus:border-secondary outline-none"
                type="text"
                placeholder="Address"
                required
                onChange={handleChange}
                value={formData.address}
              />
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 "
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span className="text-sm">Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 "
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span className="text-sm">Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span className="text-sm">Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span className="text-sm">Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span className="text-sm">Offer</span>
              </div>
            </div>
            <div className="flex flex-col mt-2 md:mt-5 gap-4">
              <div className="flex w-fit justify-between relative gap-2 items-center border-2 border-gray-200 rounded-lg p-4">
                <div className="absolute -top-3 left-2 bg-white px-1 text-sm font-semibold">
                  <p>Bedrooms & Bathrooms</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    id="bedroom"
                    min="1"
                    max="10"
                    required
                    className="border border-gray-400 p-1 rounded-lg focus:border-secondary outline-none"
                    onChange={handleChange}
                    value={formData.bedroom}
                  />
                  <span className="text-sm">Beds</span>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    id="bathroom"
                    min="1"
                    max="10"
                    required
                    className="border border-gray-400 p-1 rounded-lg focus:border-secondary outline-none"
                    onChange={handleChange}
                    value={formData.bathroom}
                  />
                  <span className="text-sm">Baths</span>
                </div>
              </div>
              <div className="flex w-fit justify-between relative gap-2 items-center border-2 border-gray-200 rounded-lg p-4">
                <div className="absolute -top-3 left-2 bg-white px-1 text-sm font-semibold">
                  <p>Pricing</p>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    id="regularPrice"
                    min="500"
                    max="9999999"
                    required
                    className="border border-gray-400 p-1 rounded-lg focus:border-secondary outline-none"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm">Regular Price </p>
                    <span className="text-xs">($/Month)</span>
                  </div>
                </div>

                {formData.offer && (
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      id="discountPrice"
                      min="0"
                      max="9999999"
                      required
                      className="border border-gray-400 p-1 rounded-lg focus:border-secondary outline-none"
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                    <div className="flex flex-col">
                      <p className="text-sm">Discounted Price </p>
                      <span className="text-xs">($/Month)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-5">
          <FileUpload
            formData={formData}
            setFormData={setFormData}
            upLoading={upLoading}
            setUpLoading={setUpLoading}
          />
          <div className="flex my-5 flex-col gap-4 md:gap-2">
            <p className="">
              <strong>Current uploaded:</strong> images for this listing:
            </p>
            <div className="flex flex-col  gap-2 shadow-lg p-5">
              {formData.imageUrls.length > 0 ? (
                formData.imageUrls.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between gap-1 shadow-lg items-center p-5"
                    >
                      <img
                        className="w-auto h-20 object-cover rounded-lg"
                        src={imageSrc(image)}
                        alt="uploaded"
                      />
                      <p>{image}</p>
                      <button
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            imageUrls: prev.imageUrls.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                        type="button"
                        className="flex h-fit text-white bg-primary p-2 cursor-pointer transition duration-200 ease-in-out hover:scale-105 rounded-md"
                      >
                        <FaRegTrashAlt className="w-6 h-6" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="">No images uploaded</p>
              )}
            </div>
          </div>

          {error && (
            <div className="my-5 border-2 border-red-700 rounded-lg bg-gray-100 p-1">
              <p className="text-primary text-sm text-center">
                <strong>Error: </strong>
                {error}
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading || upLoading}
            className="w-full bg-secondary text-white rounded-lg p-1 hover:opacity-90 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div>
                <span>Updating listing</span>
                <PulseLoader
                  color="#ffffff"
                  loading={loading}
                  size={10}
                  aria-label="pulse loader"
                  data-testid="loader"
                />
              </div>
            ) : (
              <p>Update listing</p>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}

export default UpdateListingPage;
