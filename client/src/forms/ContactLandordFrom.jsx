import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

function ContactLandordFrom({ email, listing, poster_email }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsLoading(false);
          setError(null);
          form.current.reset();
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        },
        (error) => {
          console.log(error.text);
          setError(error.message);
          setIsLoading(false);
        }
      );
  };

  return (
    <form onSubmit={sendEmail} ref={form} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <input
          value={`Someone is interested with "${listing}" - via NestNexus`}
          name="subject"
          type="text"
          hidden
        />
        <input value={poster_email} name="email_to" type="text" hidden />
        <label>Your Email</label>
        <input
          defaultValue={email}
          name="sender_email"
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
          name="message"
          row="5"
          placeholder="Your message"
        ></textarea>
      </div>
      {error && (
        <div className="my-2 border-2 border-red-700 rounded-lg bg-gray-100 p-1">
          <p className="text-primary text-sm text-center">
            <strong>Error: </strong>
            {error}
          </p>
        </div>
      )}
      {success && (
        <div className="my-2 border-2 border-green-700 rounded-lg bg-gray-100 p-1">
          <p className="text-green-700 text-sm text-center">
            Your message has been sent successfully.
          </p>
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-secondary mt-3 text-white w-full md:px-10 lg:px-20 py-2 rounded-md hover:opacity-80 transition duration-300 ease-in-out disabled:bg-slate-500"
      >
        {isLoading ? "Sending message" : "Send Message"}
      </button>
    </form>
  );
}

export default ContactLandordFrom;
