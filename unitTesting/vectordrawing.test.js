// testing vector drawing methods
import 'jest-canvas-mock';
import { VectorDrawingSystem } from '../vectordraw.js';


describe('Constructor', () => {
  // defining key variables.
  let canvas;
  let context;
  let vectorDrawingSystem;

  // beforeEach function runs before all tests in the file.
  beforeEach(() => {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    vectorDrawingSystem = new VectorDrawingSystem(canvas, context);
  });

  test('Testing: the canvas and context properties', () => {
    // checking if the canvas and context is set to the provided ones.
    expect(vectorDrawingSystem.canvas).toBe(canvas);
    expect(vectorDrawingSystem.context).toBe(context);
  });
  

});

describe('drawPoint', () => {
  // defining key variables.
  let canvas;
  let context;
  let vectorDrawingSystem;

  // beforeEach function runs before all tests in the file.
  beforeEach(() => {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    vectorDrawingSystem = new VectorDrawingSystem(canvas, context);
  });

  
  test('Testing: the drawPoint method draws a circle with the default settings', () => {
    // using the mock function 'spyon' on the rendering canvas methods.
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyArc = jest.spyOn(context, 'arc');
    const spyFill = jest.spyOn(context, 'fill');
    const spyStroke = jest.spyOn(context, 'stroke');
    // parsing parameters into the default drawPoint method (default is set as a circle with the colour black).
    vectorDrawingSystem.drawPoint(50, 50);
    // ensures that the canvas rendering methods are called and with the expected parameter for the arc.
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyArc).toHaveBeenCalledWith(50, 50, 5, 0, 2 * Math.PI);
    expect(spyFill).toHaveBeenCalled();
    expect(spyStroke).toHaveBeenCalled();
  });

  test('Testing: the drawPoint method draws a circle with the custom settings', () => {
    // using the mock function 'spyon' on rendering canvas methods (as seen on the vectordraw file).
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyArc = jest.spyOn(context, 'arc');
    const spyFill = jest.spyOn(context, 'fill');
    const spyStroke = jest.spyOn(context, 'stroke');
    // parsing parameters into the drawPoint method (blue is represented as #0000ff).
    vectorDrawingSystem.drawPoint(50, 50, 'circle', 'blue');
    // ensures that the canvas rendering methods are called and with the expected parameter for the arc.
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyArc).toHaveBeenCalledWith(50, 50, 5, 0, 2 * Math.PI);
    expect(spyFill).toHaveBeenCalled();
    expect(spyStroke).toHaveBeenCalled();

    // checks hexidecimal representation of the colour blue as stated in the drawPoint.
    expect(context.fillStyle).toBe('#0000ff');
  });

  test('Testing: the drawPoint method draws a square', () => {
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyFillRect = jest.spyOn(context, 'fillRect');
    const spyStrokeRect = jest.spyOn(context, 'strokeRect');
    //parsing parameters into the drawPoint method including the style 'square'.
    vectorDrawingSystem.drawPoint(100, 100, 'square');
    // checks the passed values cooincide with the parameter set for the square(x-5, y-5).
    expect(spyFillRect).toHaveBeenCalledWith(95, 95, 10, 10);
    expect(spyStrokeRect).toHaveBeenCalledWith(95, 95, 10, 10);
  });

  test('Testing: the drawPoint method draws a square and checks the colour', () => {
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyFillRect = jest.spyOn(context, 'fillRect');
    const spyStrokeRect = jest.spyOn(context, 'strokeRect');
    // parameters are passed into the function with x,y values aswell as style and colour being passed.
    vectorDrawingSystem.drawPoint(100, 100, 'square', 'yellow');
    // checks passed values aswell as the colour of the square is accurately represented as yellow using hexidecimal representaiton.
    expect(spyFillRect).toHaveBeenCalledWith(95, 95, 10, 10);
    expect(spyStrokeRect).toHaveBeenCalledWith(95, 95, 10, 10);
    expect(context.fillStyle).toBe('#ffff00');
  });

});

describe('drawLine', () =>{
  // defining key variables.
  let canvas;
  let context;
  let vectorDrawingSystem;

  // beforeEach function runs before all tests in the file.
  beforeEach(() => {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    vectorDrawingSystem = new VectorDrawingSystem(canvas, context);
  });

  test('Testing: the default line', () => {
    // canvas methods which are utilised in the method drawLine are observed and checked to see if the method functions as expected.
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    // defined function with x and y values passed into the method.
    vectorDrawingSystem.drawLine(100,100,200,200);
    // checked to see if canvas methods coincide with the passed values with the lines x and y values aswell as the default colour of black is set.
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalledWith(100,100);
    expect(spyLineTo).toHaveBeenCalledWith(200,200);
    expect(context.strokeStyle).toBe('#000000');
  });

  test('Testing: the colour of a line', () => {
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    // passed values into the method are the x,y values aswell as the style (default style) of solid and a colour 'blue'.
    vectorDrawingSystem.drawLine(100,100,200,200,'solid', 'blue');
    // checked to see if the beginPath has been called aswell x,y values of the canvas and the colour of the line coincide with the passed values.
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalledWith(100,100);
    expect(spyLineTo).toHaveBeenCalledWith(200,200);
    expect(context.strokeStyle).toBe('#0000ff');
  });

  test('Testing: the dashed line', () => {
    // a new canvas method is checked which checks the setLineDash has been called with the set value defined in the original function.
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyLineDash = jest.spyOn(context, 'setLineDash');
    // passed values now include a different style 'dashed'.
    vectorDrawingSystem.drawLine(100,100,200,200,'dashed');
    // canvas methods are checked to see if they function as expected.
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalledWith(100,100);
    expect(spyLineTo).toHaveBeenCalledWith(200,200);
    expect(spyLineDash).toHaveBeenCalledWith([5,5]);
    // default colour
    expect(context.strokeStyle).toBe('#000000');
  });

  test('Testing: the colour of a dashed line', () => {
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyLineDash = jest.spyOn(context, 'setLineDash');
    // passed values are the same as the previous test with the difference of a colour being passed.
    vectorDrawingSystem.drawLine(100,100,200,200,'dashed', 'yellow');
    // canvas methods are checked to see if they function as expected.
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalledWith(100,100);
    expect(spyLineTo).toHaveBeenCalledWith(200,200);
    expect(spyLineDash).toHaveBeenCalledWith([5,5]);
    // the new defined colour passed into the method represented as a hexadecimal value, yellow represented as #ffff00.
    expect(context.strokeStyle).toBe('#ffff00');
  });

});

describe('drawPolygon', () => {
  // defining key variables.
  let canvas;
  let context;
  let vectorDrawingSystem;

  // beforeEach function runs before all tests in the file.
  beforeEach(() => {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    vectorDrawingSystem = new VectorDrawingSystem(canvas, context);
  });

  test('Testing: the default polygon.', () => {
    // cavas method which are utilised in the method 'drawPolygon' are set to const variables which use the jest method 'spyOn' to see if method functions as expected.
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath= jest.spyOn(context, 'closePath');
    const spyStroke = jest.spyOn(context, 'stroke');
    // a list of points are passed into the method which contain x,y values of the different points of the polygon. 
    vectorDrawingSystem.drawPolygon([{ x: 400, y: 400 }, { x: 500, y: 300 }, { x: 800, y: 700 }]);

    // a check if the canvas rendering methods are called with the expected parameters
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalledWith(400, 400);
    expect(spyLineTo).toHaveBeenCalledWith(500, 300);
    expect(spyLineTo).toHaveBeenCalledWith(800, 700);
    expect(spyClosePath).toHaveBeenCalled();
    expect(spyStroke).toHaveBeenCalled();

    // a check if the default colour is applied
    expect(context.strokeStyle).toBe('#000000'); 

  });


  test('Testing: the a polygon with a colour defined.', () => {
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath= jest.spyOn(context, 'closePath');
    const spyStroke = jest.spyOn(context, 'stroke');
    // points are passed into the method aswell as the default style (solid) with a colour being now being defined.
    vectorDrawingSystem.drawPolygon([{ x: 400, y: 400 }, { x: 500, y: 300 }, { x: 800, y: 700 }], 'solid', 'purple');

    // sees if the canvas rendering methods are called with the expected parameters.
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalledWith(400, 400);
    expect(spyLineTo).toHaveBeenCalledWith(500, 300);
    expect(spyLineTo).toHaveBeenCalledWith(800, 700);
    expect(spyClosePath).toHaveBeenCalled();
    expect(spyStroke).toHaveBeenCalled();

    // checks if the new defined colour is applied.
    expect(context.strokeStyle).toBe('#800080'); 

  });

  test('Testing: the a polygon with a fill style.', () => {
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath= jest.spyOn(context, 'closePath');
    const spyFill = jest.spyOn(context, 'fill');
    const spyStroke = jest.spyOn(context, 'stroke');

    // the values of the points and a new style which is known as 'fill' is passed into the method.
    vectorDrawingSystem.drawPolygon([{ x: 400, y: 400 }, { x: 500, y: 300 }, { x: 800, y: 700 }], 'fill');

    // a check to see if the canvas rendering methods are called with the expected parameters.
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalledWith(400, 400);
    expect(spyLineTo).toHaveBeenCalledWith(500, 300);
    expect(spyLineTo).toHaveBeenCalledWith(800, 700);
    expect(spyClosePath).toHaveBeenCalled();
    expect(spyFill).toHaveBeenCalled();
    expect(spyStroke).toHaveBeenCalled();

    // checks if the default styles is applied.
    expect(context.fillStyle).toBe('#000000'); // check the default fill style.
    expect(context.strokeStyle).toBe('#000000'); 

  });


  test('Testing: the a polygon with a fill style and a colour defined.', () => {
    const spyBeginPath = jest.spyOn(context, 'beginPath');
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath= jest.spyOn(context, 'closePath');
    const spyFill = jest.spyOn(context, 'fill');
    const spyStroke = jest.spyOn(context, 'stroke');

    // points, the style 'fill' and a colour are the parameters of the method drawPolygon.
    vectorDrawingSystem.drawPolygon([{ x: 400, y: 400 }, { x: 500, y: 300 }, { x: 800, y: 700 }], 'fill', 'orange');

    // checks if the canvas rendering methods are called with the expected parameters.
    expect(spyBeginPath).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalledWith(400, 400);
    expect(spyLineTo).toHaveBeenCalledWith(500, 300);
    expect(spyLineTo).toHaveBeenCalledWith(800, 700);
    expect(spyClosePath).toHaveBeenCalled();
    expect(spyFill).toHaveBeenCalled();
    expect(spyStroke).toHaveBeenCalled();

    // check if the default new colours are applied.
    expect(context.fillStyle).toBe('#ffa500'); // check the colour of the fill style
    expect(context.strokeStyle).toBe('#ffa500'); 

  });
});


describe('rotate', () => {
  // defining key variables.
  let canvas;
  let context;
  let vectorDrawingSystem;

  // beforeEach function runs before all tests in the file.
  beforeEach(() => {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    vectorDrawingSystem = new VectorDrawingSystem(canvas, context);
  });

  test('Testing: rotate method with positive angle', () => {
    // the canvas value of rotate is checked this test.
    const spyRotate = jest.spyOn(context, 'rotate');

    const angle = 45;
    vectorDrawingSystem.rotate(angle);

    // check to see if the rotate method is called with the correct angle.
    expect(spyRotate).toHaveBeenCalledWith((Math.PI / 180) * angle);
    

    // a check for the sin and cosine values components of the transformMatrix of the canvas.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBeCloseTo(Math.cos((Math.PI / 180) * angle), 5); 
    expect(transformMatrix.b).toBeCloseTo(Math.sin((Math.PI / 180) * angle), 5); 
  });

  test('Testing: rotate method with negative angle', () => {
    // this test checks if the rotate method is functioning with a negative angle.
    const spyRotate = jest.spyOn(context, 'rotate');
    //  the angle is now negative.
    const angle = -30;
    vectorDrawingSystem.rotate(angle);

    // a check if the rotate method is called with the correct angle.
    expect(spyRotate).toHaveBeenCalledWith((Math.PI / 180) * angle);
    
    // a check for the sin and cosine values components of the transformMatrix of the canvas.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBeCloseTo(Math.cos((Math.PI / 180) * angle), 5); 
    expect(transformMatrix.b).toBeCloseTo(Math.sin((Math.PI / 180) * angle), 5); 
  });

  test('Testing: drawPoint with rotation (positive angle)',()=>{
    const spyArc = jest.spyOn(context, 'arc');
    const spyFill = jest.spyOn(context, 'fill');
    const spyStroke = jest.spyOn(context, 'stroke');
    const spyRotate = jest.spyOn(context, 'rotate');

    // setting up initial point and rotation angle.
    const x = 100;
    const y = 100;
    const angle = 30;

    // rotating the point.
    vectorDrawingSystem.rotate(angle);
    vectorDrawingSystem.drawPoint(x,y);


    // using setTimeout to wait for transformations to be applied then checking the change
    setTimeout(() => {
      // calculate the expected x,y values after rotation
      const RX = Math.cos((Math.PI / 180) * angle) * x - Math.sin((Math.PI / 180) * angle) * y;
      const RY = Math.sin((Math.PI / 180) * angle) * x + Math.cos((Math.PI / 180) * angle) * y;

      // checks the rotated coordinates after drawing the point aswell as the necessary canvas methods have been called.
      expect(spyArc).toHaveBeenCalledWith(RX, RY, 5, 0, 2 * Math.PI);
      expect(spyFill).toHaveBeenCalled();
      expect(spyStroke).toHaveBeenCalled();
      expect(spyRotate).toHaveBeenCalledWith((Math.PI / 180) * angle);
      done(); // signal that the test is complete
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });

  test('Testing: drawPoint with rotation (negative angle)',()=>{
    // identical to the previous test except the angle is negative.
    const spyArc = jest.spyOn(context, 'arc');
    const spyFill = jest.spyOn(context, 'fill');
    const spyStroke = jest.spyOn(context, 'stroke');
    const spyRotate = jest.spyOn(context, 'rotate');

    // setting up initial point and rotation angle.
    const x = 100;
    const y = 100;
    const angle = -47;
    
    // rotating the point.
    vectorDrawingSystem.rotate(angle);
    vectorDrawingSystem.drawPoint(x,y);

    // using setTimeout to wait for transformations to be applied then checking the change
    setTimeout(() => {
      // calculate the expected x,y values after rotation
      const RX = Math.cos((Math.PI / 180) * angle) * x - Math.sin((Math.PI / 180) * angle) * y;
      const RY = Math.sin((Math.PI / 180) * angle) * x + Math.cos((Math.PI / 180) * angle) * y;

      // checks the rotated coordinates after drawing the point aswell as the necessary canvas methods have been called.
      expect(spyArc).toHaveBeenCalledWith(RX, RY, 5, 0, 2 * Math.PI);
      expect(spyFill).toHaveBeenCalled();
      expect(spyStroke).toHaveBeenCalled();
      expect(spyRotate).toHaveBeenCalledWith((Math.PI / 180) * angle);
      done(); // signal that the test is complete
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });


  test('Testing: drawLine with rotation (positive angle)', () => {
    // this test checks the positive angle rotation on the vectordraw.js method  rotate(angle).
    //  canvas methods which are utilised in the method drawLine are observed to see if rotating it functions (rotate method in the canvas will effect drawings after the rotation method is called).
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyRotate = jest.spyOn(context, 'rotate');
    
    // values used
    const startX = 100;
    const startY = 100;
    const endX = 200;
    const endY = 200;
    const angle = 30;
  
    // variables are passed into the methods of rotate and drawLine.
    vectorDrawingSystem.rotate(angle);
    vectorDrawingSystem.drawLine(startX, startY, endX, endY, 'solid', 'black');
  
    // check if the rotate method is called with the correct angle.
    expect(spyRotate).toHaveBeenCalledWith((Math.PI / 180) * angle);

    // using setTimeout to wait for transformations to be applied then checking the change
    setTimeout(() => {
        // calculate the expected coordinates after rotation
        const RStartX = Math.cos((Math.PI / 180) * angle) * startX - Math.sin((Math.PI / 180) * angle) * startY;
        const RStartY = Math.sin((Math.PI / 180) * angle) * startX + Math.cos((Math.PI / 180) * angle) * startY;
        const REndX = Math.cos((Math.PI / 180) * angle) * endX - Math.sin((Math.PI / 180) * angle) * endY;
        const REndY = Math.sin((Math.PI / 180) * angle) * endX + Math.cos((Math.PI / 180) * angle) * endY;

        // check for the rotated coordinates after drawing the line.
        expect(spyMoveTo).toHaveBeenCalledWith(RStartX, RStartY);
        expect(spyLineTo).toHaveBeenCalledWith(REndX,REndY);
        done(); // signal that the test is complete
    }, 0); // use a timeout of 0 to allow the event loop to complete.
    
  });

  test('Testing: drawLine with rotation (negative angle)', () => {
    //identical to the previous test except the angle is negative.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyRotate = jest.spyOn(context, 'rotate');
  
    // values used.
    const startX = 100;
    const startY = 100;
    const endX = 200;
    const endY = 200;
    const angle = -30;
  
    // variables are passed into the methods of rotate and drawLine.
    vectorDrawingSystem.rotate(angle);
    vectorDrawingSystem.drawLine(startX, startY, endX, endY, 'solid', 'black');
  
    // check if the rotate method is called with the correct angle.
    expect(spyRotate).toHaveBeenCalledWith((Math.PI / 180) * angle);
    
    // using setTimeout to wait for transformations to be applied then checking the change.
    setTimeout(() => {
      // calculate the expected coordinates after rotation.
      const RStartX = Math.cos((Math.PI / 180) * angle) * startX - Math.sin((Math.PI / 180) * angle) * startY;
      const RStartY = Math.sin((Math.PI / 180) * angle) * startX + Math.cos((Math.PI / 180) * angle) * startY;
      const REndX = Math.cos((Math.PI / 180) * angle) * endX - Math.sin((Math.PI / 180) * angle) * endY;
      const REndY = Math.sin((Math.PI / 180) * angle) * endX + Math.cos((Math.PI / 180) * angle) * endY;

      // check for the rotated coordinates after drawing the line.
      expect(spyMoveTo).toHaveBeenCalledWith(RStartX, RStartY);
      expect(spyLineTo).toHaveBeenCalledWith(REndX,REndY);
      done(); // signal that the test is complete.
  }, 0); // use a timeout of 0 to allow the event loop to complete.
    
  });

  test('Testing: drawPolygon with rotation (positive angle)', () => {
    //  canvas methods which are utilised in the method drawPolygon are observed to see if rotating it functions (rotate method in the canvas will effect drawings after the rotation method is called).
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath = jest.spyOn(context, 'closePath');
    const spyRotate = jest.spyOn(context, 'rotate');

    // variable and Array used.
    const points = [{ x: 400, y: 400 },{ x: 500, y: 300 },{ x: 800, y: 700 },];
    const angle = 45;

    // variable and the array are passed into the methods of rotate and drawPolygon.
    vectorDrawingSystem.rotate(angle);
    vectorDrawingSystem.drawPolygon(points);
    
    // check if the rotate method is called with the correct angle.
    expect(spyRotate).toHaveBeenCalledWith((Math.PI / 180) * angle);

    // using setTimeout to wait for transformations to be applied then checking the change.
    setTimeout(() => {
      // calculate the expected coordinates after rotation by mapping the array to the variable RPoints.
      const RPoints = points.map(({ x, y }) => ({
        x: Math.cos((Math.PI / 180) * angle) * x - Math.sin((Math.PI / 180) * angle) * y,
        y: Math.sin((Math.PI / 180) * angle) * x + Math.cos((Math.PI / 180) * angle) * y
      }));

      // checks the rotated coordinates after drawing the polygon.
      expect(spyMoveTo).toHaveBeenCalledWith(RPoints[0].x, RPoints[0].y);
      expect(spyLineTo).toHaveBeenCalledWith(RPoints[1].x, RPoints[1].y);
      expect(spyLineTo).toHaveBeenCalledWith(RPoints[2].x, RPoints[2].y);
      expect(spyClosePath).toHaveBeenCalled();
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.

  });

  test('Testing: drawPolygon with rotation (negative angle)', () => {
    //  canvas methods which are utilised in the method drawPolygon are observed to see if rotating it functions (rotate method in the canvas will effect drawings after the rotation method is called).
     const spyMoveTo = jest.spyOn(context, 'moveTo');
     const spyLineTo = jest.spyOn(context, 'lineTo');
     const spyClosePath = jest.spyOn(context, 'closePath');
     const spyRotate = jest.spyOn(context, 'rotate');
 
    // variable and Array used.
     const points = [{ x: 400, y: 400 },{ x: 500, y: 300 },{ x: 800, y: 700 },];
     const angle = -60;
 
    // variable and the array are passed into the methods of rotate and drawPolygon.
     vectorDrawingSystem.rotate(angle);
     vectorDrawingSystem.drawPolygon(points);
     
     // check if the rotate method is called with the correct angle.
     expect(spyRotate).toHaveBeenCalledWith((Math.PI / 180) * angle);

    // using setTimeout to wait for transformations to be applied then checking the change.
    setTimeout(() => {
      // calculate the expected coordinates after rotation by mapping the array to the variable RPoints.
      const RPoints = points.map(({ x, y }) => ({
        x: Math.cos((Math.PI / 180) * angle) * x - Math.sin((Math.PI / 180) * angle) * y,
        y: Math.sin((Math.PI / 180) * angle) * x + Math.cos((Math.PI / 180) * angle) * y
      }));

      // checks the rotated coordinates after drawing the polygon.
      expect(spyMoveTo).toHaveBeenCalledWith(RPoints[0].x, RPoints[0].y);
      expect(spyLineTo).toHaveBeenCalledWith(RPoints[1].x, RPoints[1].y);
      expect(spyLineTo).toHaveBeenCalledWith(RPoints[2].x, RPoints[2].y);
      expect(spyClosePath).toHaveBeenCalled();
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
     
   });
  
});

describe('scale', () => {
  // defining key variables.
  let canvas;
  let context;
  let vectorDrawingSystem;

  // beforeEach function runs before all tests in the file.
  beforeEach(() => {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    vectorDrawingSystem = new VectorDrawingSystem(canvas, context);
  });

  test('Testing: scale method with positive factors', () => {
    // the canvas method scale is checked this test.
    const spyScale = jest.spyOn(context, 'scale');
    // the scale factors for the x,y values in the canvas.
    const factorX = 2;
    const factorY = 1.5;
    
    // the scale factors are passed into the scale(factorX, factorY) method.
    vectorDrawingSystem.scale(factorX, factorY);
  
    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);
  
    // check the transformation matrix after scaling.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(factorX); 
    expect(transformMatrix.b).toBe(0); 
    expect(transformMatrix.c).toBe(0); 
    expect(transformMatrix.d).toBe(factorY); 
    expect(transformMatrix.e).toBe(0); 
    expect(transformMatrix.f).toBe(0); 
  });
  
  test('Testing: scale method with negative factors', () => {
    // the canvas method scale is checked this test.
    const spyScale = jest.spyOn(context, 'scale');
    // the scale factors for the x,y values in the canvas and for this test the scale factors are negative.
    const factorX = -1.5;
    const factorY = -0.5;
  
    // the scale factors are passed into the scale(factorX, factorY) method.
    vectorDrawingSystem.scale(factorX, factorY);
  
    // check if the scale method is called with the correct factors
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);
  
    // check the transformation matrix after scaling.
    // 0 and -0 are the same but perceived on javascript has 'signed' zeros so I used toBeCloseTo as a work around.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(factorX);
    expect(transformMatrix.b).toBeCloseTo(0); 
    expect(transformMatrix.c).toBeCloseTo(0);
    expect(transformMatrix.d).toBe(factorY); 
    expect(transformMatrix.e).toBeCloseTo(0); 
    expect(transformMatrix.f).toBeCloseTo(0); 
  });
  
  test('Testing: scale method with zero factors for the X value', () => {
    const spyScale = jest.spyOn(context, 'scale');
    
    // the scale factors for the x,y values in the canvas with the zero factor being the factorX.
    const factorX = 0;
    const factorY = 2;
  
    // the scale factors are passed into the scale(factorX, factorY) method.
    vectorDrawingSystem.scale(factorX, factorY);
  
    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // check the transformation matrix after scaling to see if the values are expected.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(0); 
    expect(transformMatrix.b).toBe(0); 
    expect(transformMatrix.c).toBe(0); 
    expect(transformMatrix.d).toBe(factorY); 
    expect(transformMatrix.e).toBe(0); 
    expect(transformMatrix.f).toBe(0); 
  });

  test('Testing: scale method with zero factors for the Y value', () => {
    const spyScale = jest.spyOn(context, 'scale');
  
    // the scale factors for the x,y values in the canvas with the zero factor being the factorY.
    const factorX = 2;
    const factorY = 0;
    
    // the scale factors are passed into the scale(factorX, factorY) method.
    vectorDrawingSystem.scale(factorX, factorY);
  
    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // check the transformation matrix after scaling to see if the values are expected.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(factorX); 
    expect(transformMatrix.b).toBe(0); 
    expect(transformMatrix.c).toBe(0); 
    expect(transformMatrix.d).toBe(0); 
    expect(transformMatrix.e).toBe(0); 
    expect(transformMatrix.f).toBe(0); 
  });

  test('Testing: scale method with zero factors for both the X and Y value', () => {
    const spyScale = jest.spyOn(context, 'scale');
  
    // the scale factors for the x,y values in the canvas with the zero factor being the factorY.
    const factorX = 2;
    const factorY = 0;
    
    // the scale factors are passed into the scale(factorX, factorY) method.
    vectorDrawingSystem.scale(factorX, factorY);
  
    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // check the transformation matrix after scaling to see if the values are expected.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(factorX); 
    expect(transformMatrix.b).toBe(0); 
    expect(transformMatrix.c).toBe(0); 
    expect(transformMatrix.d).toBe(0); 
    expect(transformMatrix.e).toBe(0); 
    expect(transformMatrix.f).toBe(0); 
  });

  test('Testing: drawPoint with scaling (positive factors)', () => {
    // the canvas method scale is checked this test.
    const spyScale = jest.spyOn(context, 'scale');

    // scaling factors
    const factorX = 2;
    const factorY = 3;

    vectorDrawingSystem.scale(factorX, factorY);

    // Check if the scale method is called with the correct factors
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // Check the transformation matrix after scaling
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(factorX);
    expect(transformMatrix.b).toBe(0);
    expect(transformMatrix.c).toBe(0);
    expect(transformMatrix.d).toBe(factorY);
    expect(transformMatrix.e).toBe(0);
    expect(transformMatrix.f).toBe(0);
  });

  test('Testing: drawPoint with scaling (negative factors)', () => {
    // the canvas method scale is checked this test.
    const spyScale = jest.spyOn(context, 'scale');

    // scaling factors
    const factorX = -2;
    const factorY = -3;

    vectorDrawingSystem.scale(factorX, factorY);

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // check the transformation matrix after scaling.
    // 0 and -0 are the same but perceived on javascript has 'signed' zeros so I used toBeCloseTo as a work around.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(factorX);
    expect(transformMatrix.b).toBeCloseTo(0);
    expect(transformMatrix.c).toBeCloseTo(0);
    expect(transformMatrix.d).toBe(factorY);
    expect(transformMatrix.e).toBeCloseTo(0);
    expect(transformMatrix.f).toBeCloseTo(0);
  });

  test('Testing: drawPoint with scaling (zero factors: on the X coordinates)', () => {
    // the canvas method scale is checked this test.
    const spyScale = jest.spyOn(context, 'scale');

    // scaling factors
    const factorX = 0;
    const factorY = 7;

    vectorDrawingSystem.scale(factorX, factorY);

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // check the transformation matrix after scaling.
    // 0 and -0 are the same but perceived on javascript has 'signed' zeros so I used toBeCloseTo as a work around.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(factorX);
    expect(transformMatrix.b).toBeCloseTo(0);
    expect(transformMatrix.c).toBeCloseTo(0);
    expect(transformMatrix.d).toBe(factorY);
    expect(transformMatrix.e).toBeCloseTo(0);
    expect(transformMatrix.f).toBeCloseTo(0);
  });

  test('Testing: drawPoint with scaling (zero factors: on the Y coordinates)', () => {
    // the canvas method scale is checked this test.
    const spyScale = jest.spyOn(context, 'scale');

    // scaling factors.
    const factorX = 8;
    const factorY = 0;

    vectorDrawingSystem.scale(factorX, factorY);

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // check the transformation matrix after scaling.
    // 0 and -0 are the same but perceived on javascript has 'signed' zeros so I used toBeCloseTo as a work around.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(factorX);
    expect(transformMatrix.b).toBeCloseTo(0);
    expect(transformMatrix.c).toBeCloseTo(0);
    expect(transformMatrix.d).toBe(factorY);
    expect(transformMatrix.e).toBeCloseTo(0);
    expect(transformMatrix.f).toBeCloseTo(0);
  });

  test('Testing: drawPoint with scaling (zero factors: on both X and Y coordinates)', () => {
    // the canvas method scale is checked this test.
    const spyScale = jest.spyOn(context, 'scale');

    // scaling factors.
    const factorX = 0;
    const factorY = 0;

    vectorDrawingSystem.scale(factorX, factorY);

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // check the transformation matrix after scaling.
    // 0 and -0 are the same but perceived on javascript has 'signed' zeros so I used toBeCloseTo as a work around.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(factorX);
    expect(transformMatrix.b).toBeCloseTo(0);
    expect(transformMatrix.c).toBeCloseTo(0);
    expect(transformMatrix.d).toBe(factorY);
    expect(transformMatrix.e).toBeCloseTo(0);
    expect(transformMatrix.f).toBeCloseTo(0);
  });


  test('Testing: drawLine with scaling (positive factors)', () => {
    // the canvas method scale and ones to check coordinates for drawing a line is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyScale = jest.spyOn(context, 'scale');

    // values used.
    const startX = 100;
    const startY = 100;
    const endX = 200;
    const endY = 200;
    const factorX = 2;
    const factorY = 3;

    // variables are passed into the methods of scale and drawLine.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawLine(startX, startY, endX, endY, 'solid', 'black');

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // check if the drawLine coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(startX * factorX, startY * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(endX * factorX, endY * factorY);
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.

  });

  test('Testing: drawLine with scaling (negative factors)', () => {
    // the canvas method scale and ones to check coordinates for drawing a line is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyScale = jest.spyOn(context, 'scale');

    // values used.
    const startX = 100;
    const startY = 100;
    const endX = 200;
    const endY = 200;
    const factorX = -2;
    const factorY = -3;

    // variables are passed into the methods of scale and drawLine.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawLine(startX, startY, endX, endY, 'solid', 'black');

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // check if the drawLine coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(startX * factorX, startY * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(endX * factorX, endY * factorY);
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });

  test('Testing: drawLine with scaling (zero factors: on the X coordinates)', () => {
    // the canvas method scale and ones to check coordinates for drawing a line is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyScale = jest.spyOn(context, 'scale');

    // values used.
    const startX = 100;
    const startY = 100;
    const endX = 200;
    const endY = 200;
    const factorX = 0;
    const factorY = 11;

    // variables are passed into the methods of scale and drawLine.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawLine(startX, startY, endX, endY, 'solid', 'black');

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // check if the drawLine coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(startX * factorX, startY * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(endX * factorX, endY * factorY);
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });

  test('Testing: drawLine with scaling (zero factors: on the Y coordinates)', () => {
    // the canvas method scale and ones to check coordinates for drawing a line is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyScale = jest.spyOn(context, 'scale');

    // values used.
    const startX = 100;
    const startY = 100;
    const endX = 200;
    const endY = 200;
    const factorX = 4;
    const factorY = 0;

    // variables are passed into the methods of scale and drawLine.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawLine(startX, startY, endX, endY, 'solid', 'black');

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // check if the drawLine coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(startX * factorX, startY * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(endX * factorX, endY * factorY);
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });

  test('Testing: drawLine with scaling (zero factors: on both X and Y coordinates)', () => {
    // the canvas method scale and ones to check coordinates for drawing a line is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyScale = jest.spyOn(context, 'scale');

    // values used.
    const startX = 100;
    const startY = 100;
    const endX = 200;
    const endY = 200;
    const factorX = 0;
    const factorY = 0;

    // variables are passed into the methods of scale and drawLine.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawLine(startX, startY, endX, endY, 'solid', 'black');

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // check if the drawLine coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(startX * factorX, startY * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(endX * factorX, endY * factorY);
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });


  test('Testing: drawPolygon with scaling (positive factors)', () => {
    // the canvas method scale and ones to check coordinates for drawing a polygon is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath = jest.spyOn(context, 'closePath');
    const spyScale = jest.spyOn(context, 'scale');

    // variables and Array used.
    const points = [{ x: 400, y: 400 }, { x: 500, y: 300 }, { x: 800, y: 700 }];
    const factorX = 2;
    const factorY = 3;

    // variables are passed into the methods of scale and drawPolygon.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawPolygon(points);

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // Check if the drawPolygon coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(points[0].x * factorX, points[0].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[1].x * factorX, points[1].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[2].x * factorX, points[2].y * factorY);
      expect(spyClosePath).toHaveBeenCalled();
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });

  test('Testing: drawPolygon with scaling (negative factors)', () => {
    // the canvas method scale and ones to check coordinates for drawing a polygon is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath = jest.spyOn(context, 'closePath');
    const spyScale = jest.spyOn(context, 'scale');

    // variables and Array used.
    const points = [{ x: 400, y: 400 }, { x: 500, y: 300 }, { x: 800, y: 700 }];
    const factorX = -2;
    const factorY = -6;

    // variables are passed into the methods of scale and drawPolygon.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawPolygon(points);

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // Check if the drawPolygon coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(points[0].x * factorX, points[0].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[1].x * factorX, points[1].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[2].x * factorX, points[2].y * factorY);
      expect(spyClosePath).toHaveBeenCalled();
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });

  test('Testing: drawPolygon with scaling (zero factors: on the X coordinates)', () => {
    // the canvas method scale and ones to check coordinates for drawing a polygon is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath = jest.spyOn(context, 'closePath');
    const spyScale = jest.spyOn(context, 'scale');

    // variables and Array used.
    const points = [{ x: 400, y: 400 }, { x: 500, y: 300 }, { x: 800, y: 700 }];
    const factorX = 0;
    const factorY = 21;

    // variables are passed into the methods of scale and drawPolygon.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawPolygon(points);

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // Check if the drawPolygon coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(points[0].x * factorX, points[0].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[1].x * factorX, points[1].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[2].x * factorX, points[2].y * factorY);
      expect(spyClosePath).toHaveBeenCalled();
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });

  test('Testing: drawPolygon with scaling (zero factors: on the Y coordinates)', () => {
    // the canvas method scale and ones to check coordinates for drawing a polygon is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath = jest.spyOn(context, 'closePath');
    const spyScale = jest.spyOn(context, 'scale');

    // variables and Array used.
    const points = [{ x: 400, y: 400 }, { x: 500, y: 300 }, { x: 800, y: 700 }];
    const factorX = 41;
    const factorY = 0;

    // variables are passed into the methods of scale and drawPolygon.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawPolygon(points);

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // Check if the drawPolygon coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(points[0].x * factorX, points[0].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[1].x * factorX, points[1].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[2].x * factorX, points[2].y * factorY);
      expect(spyClosePath).toHaveBeenCalled();
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });

  test('Testing: drawPolygon with scaling (zero factors: on both X and Y coordinates)', () => {
    // the canvas method scale and ones to check coordinates for drawing a polygon is checked this test.
    const spyMoveTo = jest.spyOn(context, 'moveTo');
    const spyLineTo = jest.spyOn(context, 'lineTo');
    const spyClosePath = jest.spyOn(context, 'closePath');
    const spyScale = jest.spyOn(context, 'scale');

    // variables and Array used.
    const points = [{ x: 400, y: 400 }, { x: 500, y: 300 }, { x: 800, y: 700 }];
    const factorX = 0;
    const factorY = 0;

    // variables are passed into the methods of scale and drawPolygon.
    vectorDrawingSystem.scale(factorX, factorY);
    vectorDrawingSystem.drawPolygon(points);

    // check if the scale method is called with the correct factors.
    expect(spyScale).toHaveBeenCalledWith(factorX, factorY);

    // using setTimeout to wait for scaling to be applied then checking the change
    setTimeout(() => {
      // Check if the drawPolygon coordinates are transformed correctly after scaling.
      expect(spyMoveTo).toHaveBeenCalledWith(points[0].x * factorX, points[0].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[1].x * factorX, points[1].y * factorY);
      expect(spyLineTo).toHaveBeenCalledWith(points[2].x * factorX, points[2].y * factorY);
      expect(spyClosePath).toHaveBeenCalled();
      done(); // signal that the test is complete.
    }, 0); // use a timeout of 0 to allow the event loop to complete.
  });

});


describe('resetTransform', () => {
  // defining key variables.
  let canvas;
  let context;
  let vectorDrawingSystem;

  // beforeEach function runs before all tests in the file.
  beforeEach(() => {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    vectorDrawingSystem = new VectorDrawingSystem(canvas, context);
  });

  test('resets canvas transformations to identity matrix', () => {
    // spy on the canvas method setTransform. 
    const spySetTransform = jest.spyOn(context, 'setTransform');
  
    // apply some transformations to the canvas.
    context.translate(50, 50);
    context.scale(2, 2);
    context.rotate(Math.PI / 4);
  
    // call resetTransform method.
    vectorDrawingSystem.resetTransform();
  
    // check if setTransform is called with identity matrix.
    expect(spySetTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
  
    // check canvas transformation matrix after reset.
    const transformMatrix = context.getTransform();
    expect(transformMatrix.a).toBe(1);
    expect(transformMatrix.b).toBe(0);
    expect(transformMatrix.c).toBe(0);
    expect(transformMatrix.d).toBe(1);
    expect(transformMatrix.e).toBe(0);
    expect(transformMatrix.f).toBe(0);
  });
  
});