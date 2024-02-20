import React, { useRef, useState, useEffect } from 'react';
import Voronoi from './Voronoi';
import FloydImage from '../assets/flower.jpeg'; // Import the image

const ImageProcessor = () => {
  const canvasRef = useRef(null);
  const [rgbArray, setRgbArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [imgData, setImgData] = useState();
  useEffect(() => {
    const img = new Image();
    img.src = FloydImage; // Use the imported image here
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.naturalWidth;
        setWidth(img.naturalWidth);
        setHeight(img.naturalHeight);
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(
          0,
          0,
          img.naturalWidth,
          img.naturalHeight
        );
        const data = imageData.data;
        setImgData(data);
        const tempRgbArray = [];
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness =
            (r * 0.3) / 255 + (g * 0.39) / 255 + (b * 0.11) / 255;
          tempRgbArray.push({ r, g, b, brightness });
        }

        setRgbArray(tempRgbArray);
        setLoading(false); // Processing is done
      }
    };

    img.onerror = (error) => {
      console.error('Image loading error:', error);
    };
    setLoading(false); // Handle loading error
  }, []); // Empty dependency array if imageUrl is static and doesn't depend on props or state
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className='grid gap-x-[15px] grid-cols-1 lg:grid-cols-2  my-12 justify-items-center w-[80vw]'>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        <div className='originalImage'>
          <h2 className='text-black text-4xl dark:text-[var(--burnt-sienna)] font-light my-3 h-24'>
            Original Image
          </h2>
          <img
            src={FloydImage}
            alt=''
            className='w-[400px] h-[400px] bg-white border-solide border-4 border-black dark:border-[var(--burnt-sienna)] mx-[auto]'
          />
        </div>
        {/* Displaying the image is optional since it's used on canvas */}
        {rgbArray.length > 1 && imgData && (
          <div className='voronoi'>
            <h2 className='text-black text-4xl dark:text-[var(--burnt-sienna)] font-light my-3 h-24'>
              Voronoi Reperesentation
            </h2>
            <Voronoi
              rgbArray={rgbArray}
              width={width}
              height={height}
              imgData={imgData}
            />
          </div>
        )}
      </div>
    );
  }
};

export default ImageProcessor;
