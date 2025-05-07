import React from "react";

function ContactLandordFrom({ email, listing }) {
  return (
    <form className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label>Your Email</label>
        <input
          defaultValue={email}
          className="border border-dark p-3 rounded-lg focus:border-secondary outline-none"
          type="email"
          placeholder="Your email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Your Message</label>
        <textarea
          defaultValue={`Hello, I am interested in ${listing}.`}
          className="border border-gray-400 p-3 rounded-lg focus:border-secondary outline-none"
          name=""
          id="message"
          row="5"
          placeholder="Your message"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-secondary text-white w-full md:px-10 lg:px-20 py-2 rounded-md hover:scale-105 transition duration-300 ease-in-out"
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactLandordFrom;
