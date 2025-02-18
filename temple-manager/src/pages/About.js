import React from 'react';

function About() {
  const currentYear = new Date().getFullYear();

  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>About Temple Manager</h2>
      <p className='lead mb-4'>
        A comprehensive solution for temple management
      </p>
      <div>
        <p className='mb-2'>
          Developed and maintained by:{' '}
          <span className='lead'>
            <a
              href='https://cyblore.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-decoration-none'
            >
              Cyblore IT Solutions Private Limited.
            </a>
          </span>
        </p>
      </div>
      <hr className='my-4' />
      <div className='text-muted'>
        <small>&copy; {currentYear} All rights reserved.</small>
      </div>
    </div>
  );
}

export default About;
