import React from 'react';
import Further from './Components/Further';
import ImageProcessor from './Components/ImageProcessor'; // Adjust the import path as necessary
import Intro from './Components/Intro';
import Switcher from './Components/Switcher';

const App = () => {
  localStorage.theme = 'light';
  document.body.classList.add(
    'dark:bg-[var(--charcoal)]',
    'transition',
    'duration-[1s]',
    'ease-out'
  );

  return (
    <>
      <div className='w-4/5 mx-auto my-10'>
        <Switcher />
        <Intro />
        <ImageProcessor />
        <Further />
      </div>
    </>
  );
};

export default App;
