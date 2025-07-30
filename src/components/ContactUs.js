import { useState } from "react";

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      email,
      message,
    };

    fetch(`${process.env.REACT_APP_API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then((response) => {
      if (response.ok) {
        alert("Message sent successfully!");
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert("Failed to send message. Please try again later.");
      }
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      alert("An error occurred while sending your message.");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className='sm:flex sm:text-left font-semibold'>
      <form onSubmit={sendEmail} className='sm:w-1/2 lg:w-1/3 sm:pl-10 xl:pl-20'>
        <div className='font-bold text-4xl'>Contact Us</div>
        <div className='pt-1 font-normal'>Send us a message on here, or Instagram</div>
        <div className='pt-1 font-normal'>
          Phone: <span className='text-purple-600 font-bold'>343-477-0229</span>
        </div>

        <div className='pt-4'>Name</div>
        <input
          required
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          name='user_name'
          className='bg-gray-200 border border-black rounded-xl w-64 md:w-72 h-10'
        />

        <div className='pt-4'>Email</div>
        <input
          required
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name='user_email'
          className='bg-gray-200 border border-black rounded-xl w-64 md:w-72 h-10'
        />

        <div className='pt-4'>Message</div>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name='message'
          className='bg-gray-200 border border-black rounded-xl w-64 md:w-72 h-20'
        />

        <div>
          <button
            type="submit"
            className='px-5 py-2 mb-5 mt-3 ml-1 transition duration-150 ease-in-out bg-purple-600 rounded-full lg:px-10 lg:text-base hover:bg-purple-500 text-white'
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>

      <div className='h-80 sm:h-auto sm:w-1/2 p-3 lg:w-2/3'>
        <iframe
          title='Google Map'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2857.2961430319124!2d-76.49385952332347!3d44.26272671279525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd2abdcc07b18c7%3A0xd4fdf52badacbadc!2s263%20Weller%20Ave%2C%20Kingston%2C%20ON%20K7K%206W9!5e0!3m2!1sen!2sca!4v1752888188640!5m2!1sen!2sca'
          className='w-full h-full border-4 border-black rounded-xl'
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
