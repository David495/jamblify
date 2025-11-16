import React from 'react'
import Image from 'next/image';
import NotFoundImage from '../public/not-found.png'

const Notfound = () => {
  return (
      <>
          <main className='flex justify-center items-center h-screen flex-col gap-3'>
              <Image
                  src={NotFoundImage}
                  alt='Not Found Image'
                  height={200}
              />
              <div>
                  <h1 className='text-center text-2xl'>404</h1>
                  <p>
                      Page not found
                  </p>
              </div>
      </main>
      </>
  )
}

export default Notfound;
