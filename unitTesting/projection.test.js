import { projection } from '../projection.js';

describe('Projection', () => {
  let canvas;
  let proj;

  beforeEach(() => {
    canvas = {
      width: 1200, // test canvas width
      height: 600, // test canvas height
    };
    proj = new projection(canvas);
  });

/* the values aren't just the projection but the projection according to the values in relation to the canvas.
 So basic tests are conducted to see how testing the extremes of Mercator test.
 */
  test('Testing: Extremities (poles and equator) latitude and longitude to x, y coordinates', () => {
    // testing with latitude 0, longitude 0 (should be the center of the canvas)
    const [x, y] = proj.convert(0, 0);
    expect(x).toBeCloseTo(canvas.width / 2); 
    expect(y).toBeCloseTo(canvas.height / 2); 

    // testing north pole with latitude 90 and verifying x-coordinate is close to the center of the canvas
    const [x2, y2] = proj.convert(0,90);
    expect(x2).toBeCloseTo(canvas.width / 2); 

    // testing south pole with latitude -90 and verifying x-coordinate is close to the center of the canvas
    const [x3, y3] = proj.convert(0, -90);
    expect(x3).toBeCloseTo(canvas.width / 2); 

    // testing Anti-Meridian with longitude 180 and verifying y-coordinate is close to the center of the canvas
    const [x4, y4] = proj.convert(180, 0);
    expect(y4).toBeCloseTo(canvas.height / 2); 

    // testing Anti-Meridian with longitude -180 and verifying y-coordinate is close to the center of the canvas
    const [x5, y5] = proj.convert(-180, 0);
    expect(y5).toBeCloseTo(canvas.height / 2); 
  });

  // projecting 45 and 90 of the poles and equator respectively project the same points as the maridian for 90 and 180  so they should have the same points.
  test('Testing: Intermediate Latitude and Longitude', () => {
    // testing latitude 45 and verifying x-coordinate is close to the center of the canvas
    const [x, y] = proj.convert(0, 45);
    expect(x).toBeCloseTo(canvas.width / 2); 

    // testing latitude -45 and verifying x-coordinate is close to the center of the canvas
    const [x2, y2] = proj.convert(0, -45);
    expect(x2).toBeCloseTo(canvas.width / 2);
    
    // testing longitude 90 and verifying y-coordinate is close to the center of the canvas
    const [x3, y3] = proj.convert(90, 0);
    expect(y3).toBeCloseTo(canvas.height / 2); 

     // testing longitude -90 and verifying y-coordinate is close to the center of the canvas
    const [x4, y4] = proj.convert(-90, 0);
    expect(y4).toBeCloseTo(canvas.height / 2); 
    });

});
