import React from "react";
import Iframe from "react-iframe";

function Calendar() {
  return (
    <div className='bg-white ' id='calendar'>
      <div className=''>
        <div className='px-6 py-4 mb-6 text-left lg:m-10 '>
          <h1 className='mb-2 text-4xl font-bold'>Upcoming Events</h1>
          <p className='text-lg '>
            Stay up to date with our latest programs, events, and activities for families. Check the calendar below for upcoming sessions, workshops, and special gatherings. We look forward to seeing you!
          </p>
        </div>
        <div className='p-2 border-4 border-black rounded-3xl sm:px-6 sm:py-4 sm:m-3 lg:m-10'>
          <Iframe
            url='https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FToronto&showPrint=0&src=Z3JlYXRzdGFydGZvcmZhbWlsaWVza3dAZ21haWwuY29t&src=ZW4uY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%230B8043'
            width='100%'
            height='600px'
            id='myId'
            className='myClassname'
            display='initial'
            position='relative'
            frameBorder='0'
            style={{ border: 'solid 1px #777' }}
            scrolling='no'
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
