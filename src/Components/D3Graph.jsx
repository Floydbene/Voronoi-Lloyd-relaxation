import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Delaunay } from 'd3-delaunay';
import { useState } from 'react';

const D3GraphWithDelaunay = ({ pixelArray, width, height, imgData }) => {
  const [displayArray, setDisplayArray] = useState(pixelArray);
  const [which, setWhich] = useState(null);
  const [loading, setLoading] = useState(true);
  const svgRef = useRef(null);
  const svgWidth = width; // SVG width
  const svgHeight = height; // SVG height
  const reset = () => {
    setDisplayArray(pixelArray);
    setWhich(null);
  };
  useEffect(() => {
    if (!displayArray.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear SVG for new drawing

    // Determine the extent of the pixel coordinates
    const xExtent = d3.extent(displayArray, (d) => d.x);
    const yExtent = d3.extent(displayArray, (d) => d.y);

    // Create scales to map pixel coordinates to SVG coordinates
    const xScale = d3.scaleLinear().domain(xExtent).range([0, 400]);
    const yScale = d3.scaleLinear().domain(yExtent).range([0, 400]);

    // Plot original points using scaled coordinates
    displayArray.forEach((pixel) => {
      svg
        .append('circle')
        .attr('cx', xScale(pixel.x))
        .attr('cy', yScale(pixel.y))
        .attr('r', 3) // Adjust radius as needed
        .attr('fill', `rgb(${pixel.r},${pixel.g},${pixel.b})`);
    });

    // Compute and overlay Delaunay triangulation
    const points = displayArray.map((d) => [xScale(d.x), yScale(d.y)]);
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, svgWidth, svgHeight]);

    if (which == 'voronoi') {
      svg
        .append('path')
        .attr('d', voronoi.render())
        .style('stroke', '#ccc')
        .style('fill', 'none');
    } else if (which == 'delaunay') {
      svg
        .append('path')
        .attr('d', delaunay.render())
        .style('stroke', '#ccc')
        .style('fill', 'none');
    }
    setLoading(false);
  }, [displayArray, which]);

  const clicky = () => {
    let relaxedPixels = [...displayArray];

    for (let k = 0; k < 1; ++k) {
      const delaunay = Delaunay.from(relaxedPixels.map((d) => [d.x, d.y]));
      const voronoi = delaunay.voronoi([0, 0, svgWidth, svgHeight]);

      relaxedPixels = relaxedPixels.map((pixel, i) => {
        const cell = voronoi.cellPolygon(i);
        if (!cell) return pixel; // If no cell found, return the original pixel

        const centroid = d3.polygonCentroid(cell);

        // Adjust the calculation to correctly compute the index in imgData
        const index =
          (parseInt(centroid[1]) * width + parseInt(centroid[0])) * 4;

        const r = imgData[index];
        const g = imgData[index + 1];
        const b = imgData[index + 2];
        return {
          x: centroid[0],
          y: centroid[1],
          r: r,
          g: g,
          b: b,
        };
      });
    }
    setDisplayArray(relaxedPixels); // Update the state to trigger a re-render
  };
  useEffect(() => {
    setWhich('delaunay');
    reset();
  }, []);

  if (loading) return <h1>loading...</h1>;
  else
    return (
      <>
        <div className='canvas'>
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className='w-[400px] h-[400px] bg-white border-solide border-4 border-black dark:border-[var(--burnt-sienna)]  mx-[auto]'
          ></svg>
        </div>
        <div className='btns grid gap-1 grid-cols-6 w-[400px] mx-[auto] my-4'>
          <button
            className='col-span-3 dark:bg-[var(--burnt-sienna)] text-white'
            onClick={() => clicky()}
          >
            Relax Vertices
          </button>
          <button
            className='col-span-3 dark:bg-[var(--burnt-sienna)] text-white'
            onClick={() => setWhich('delaunay')}
          >
            See Delaunay Triangulation
          </button>
          <button
            className='col-span-3 dark:bg-[var(--burnt-sienna)] text-white'
            onClick={() => setWhich('voronoi')}
          >
            See Voronoi Graph
          </button>
          <button
            className='col-span-3 dark:bg-[var(--burnt-sienna)] text-white'
            onClick={() => setWhich(null)}
          >
            Remove Grid
          </button>
          <button
            className='col-span-6 dark:bg-[var(--burnt-sienna)] text-white'
            onClick={() => reset()}
          >
            Reset Image
          </button>
        </div>
      </>
    );
};

export default D3GraphWithDelaunay;
