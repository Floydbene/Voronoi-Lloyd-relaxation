import React from 'react';
import { FaWikipediaW, FaGithubAlt } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';

const Further = () => {
  return (
    <div>
      <div className='text-5xl  text-gray-800 mb-[1rem] dark:text-[var(--burnt-sienna)] font-light'>
        Further Reading
      </div>
      <p className='text-gray-800 dark:text-gray-300'>
        {' '}
        For those interested in delving deeper into the concepts of Lloyd's
        relaxation, Voronoi diagrams, and Delaunay triangulation, here's a
        curated list of further reading materials. These resources range from
        introductory overviews to more detailed explorations, providing a
        comprehensive understanding for enthusiasts and experts alike.
      </p>
      <div className='text-4xl  text-gray-800 my-[2rem] dark:text-[var(--burnt-sienna)]'>
        This Repository on GitHub
      </div>
      <FaGithubAlt
        className='text-black dark:text-[var(--burnt-sienna)] text-6xl cursor-pointer'
        onClick={() =>
          window.open('https://github.com/Floydbene/Voronoi-Lloyd-relaxation')
        }
      />
      <div className='text-4xl  text-gray-800 my-[2rem] dark:text-[var(--burnt-sienna)]'>
        Online Resources
      </div>
      <p className='text-gray-800  text-xl font-bold dark:text-gray-300 ml-5 my-3'>
        {' '}
        1. Wikipedia: Voronoi Diagram
        <FaWikipediaW
          className='text-black dark:text-[var(--burnt-sienna)] text-6xl cursor-pointer'
          onClick={() =>
            window.open('https://en.wikipedia.org/wiki/Voronoi_diagram')
          }
        />
      </p>
      <p className='text-gray-800   text-xl font-bold dark:text-gray-300 ml-5 my-3'>
        {' '}
        2. Mike Bostock’s D3.js Voronoi Visualization
        <TbWorldWww
          className='text-black dark:text-[var(--burnt-sienna)] text-6xl
        cursor-pointer'
          onClick={() =>
            window.open('https://observablehq.com/@mbostock/voronoi-stippling')
          }
        />
      </p>
      <p className='text-gray-800 text-xl font-bold dark:text-gray-300 ml-5 my-3'>
        {' '}
        3. Red Blob Games: Voronoi Diagrams
        <TbWorldWww
          className='text-black dark:text-[var(--burnt-sienna)] text-6xl cursor-pointer'
          onClick={() =>
            window.open('https://en.wikipedia.org/wiki/Voronoi_diagram')
          }
        />
      </p>
      <div className='text-4xl  text-gray-800 my-[2rem] dark:text-[var(--burnt-sienna)]'>
        Books
      </div>
      <p className='text-gray-800 dark:text-gray-300'>
        {' '}
        For those interested in delving deeper into the concepts of Lloyd's
        relaxation, Voronoi diagrams, and Delaunay triangulation, here's a
        curated list of further reading materials. These resources range from
        introductory overviews to more detailed explorations, providing a
        comprehensive understanding for enthusiasts and experts alike.
      </p>
      <p className='text-gray-800 font-bold dark:text-gray-300 ml-5 my-3'>
        {' '}
        1. "Computational Geometry: Algorithms and Applications" by Mark de
        Berg, Otfried Cheong, Marc van Kreveld, and Mark Overmars
      </p>
      <p className='text-gray-800 font-bold dark:text-gray-300 ml-5 my-3'>
        {' '}
        2. "Voronoi Diagrams and Delaunay Triangulations" by Steven Fortune
      </p>
    </div>
  );
};

export default Further;
