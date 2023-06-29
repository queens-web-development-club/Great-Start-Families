import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import Iframe from "react-iframe";

function ContactUs() {
  const sendClick = () => {
    alert("Cannot send yet");
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_kwq36rk", "template_e3xqzxo", form.current, "Ak_G6XwOaOph3OwTB").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
        sendClick();
      }
    );
    e.target.reset();
  };

  //  <form ref={form} onSubmit={sendEmail}>
  //   <label>Name</label>
  //   <input type="text" name="user_name" />
  //   <label>Email</label>
  //   <input type="email" name="user_email" />
  //   <label>Message</label>
  //   <textarea name="message" />
  //   <input type="submit" value="Send" />
  // </form >

  return (
    <div className='sm:flex sm:text-left font-semibold'>
      <form ref={form} onSubmit={sendEmail} className=' sm:w-1/2 lg:w-1/3 sm:pl-10 xl:pl-20'>
        <div className='font-bold text-4xl'>Contact Us</div>
        <div className='pt-1 font-normal'>Send us a message on here, or instagram</div>
        <div className='pt-4'>Name</div>
        <input type='text' name='user_name' className='bg-gray-200 border border-black rounded-xl w-64 md:w-72 h-10'></input>
        <div className='pt-4'>Email</div>
        <input type='email' name='user_email' className='bg-gray-200 border border-black rounded-xl w-64 md:w-72  h-10'></input>

        <div className='pt-4'>Message</div>
        <textarea type='submit' name='message' className='bg-gray-200 border border-black rounded-xl w-64 md:w-72  h-20'></textarea>
        <div>
          <button className='px-5 py-2 mb-5 ml-2 transition duration-150 ease-in-out bg-purple-600 rounded-full  lg:px-10 lg:text-xl hover:bg-purple-500'>
            Send
          </button>
        </div>
      </form>

      <div className='h-80 sm:h-auto sm:w-1/2 p-3 lg:w-2/3'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.807681901188!2d-76.48860587611664!3d44.25893857137939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd2abc493313247%3A0x238a5295cd760614!2sJohn%20Graves%20Simcoe%20Public%20School!5e0!3m2!1sen!2scz!4v1688035289314!5m2!1sen!2scz'
          className='w-full h-full border-4 border-black rounded-xl'
        ></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
