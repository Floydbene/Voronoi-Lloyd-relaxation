import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import D3Graph from './D3Graph';
// import DelaunayGraph from './DelaunayGraph';

const Voronoi = ({ rgbArray, width, height, imgData, reset }) => {
  const selectedPixels = [];
  const attemptsLimit = rgbArray.length; // Limit attempts to avoid infinite loops

  let attempts = 0;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    while (selectedPixels.length < 1000 && attempts < attemptsLimit) {
      const randomIndex = Math.floor(Math.random() * rgbArray.length);
      const pixel = rgbArray[randomIndex];
      const { r, g, b, brightness } = pixel;
      const randomNum = Math.random();
      const x = randomIndex % width; // x coordinate
      const y = Math.floor(randomIndex / width); // y coordinate
      if (brightness > randomNum) {
        selectedPixels.push({
          x,
          y,
          r,
          g,
          b,
          brightness,
        });
      }
      attempts++;
    }
    setLoading(false);
  });
  if (loading) {
    return <h1>Loading...</h1>;
  } else
    return (
      <>
        <D3Graph
          pixelArray={selectedPixels}
          width={width}
          height={height}
          rgbArray={rgbArray}
          imgData={imgData}
          reset={reset}
        />
      </>
    );
};

export default Voronoi;
