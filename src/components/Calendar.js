import React from "react";
import Iframe from "react-iframe";

function Calendar() {
  return (
    <div className='bg-white ' id='calendar'>
      <div className=''>
        <div className='px-6 py-4 mb-6 text-left lg:m-10 '>
          <h1 className='mb-2 text-4xl font-bold'>Upcoming Events</h1>
          <p className='text-lg '>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className='p-2 border-4 border-black rounded-3xl sm:px-6 sm:py-4 sm:m-3 lg:m-10'>
          <Iframe
            url='https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FToronto&src=Z3JlYXRzdGFydGZvcmZhbWlsaWVza3dAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%230B8043'
            width='100%'
            height='600px'
            id='myId'
            className='myClassname'
            display='initial'
            position='relative'
            frameBorder='0'
            style={{ border: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
