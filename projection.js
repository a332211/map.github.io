// using Mercator projection to convert lat and lon to x,y coordinates
export class projection {
    // constructor retrieving the canvas (used to calculate the projection with respect to the display) 
    constructor(canvas) {
        this.canvas = canvas;
    }
    convert(longitude, latitude) {
        // get x value
        let x = (longitude + 180) * (this.canvas.width / 360);
        // convert from degrees to radians
        let latRad = (latitude * Math.PI) / 180;
        // get y value
        let mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
        let y = (this.canvas.height / 2) - (this.canvas.width * mercN / (2 * Math.PI));
        return [x, y];
     }
}
