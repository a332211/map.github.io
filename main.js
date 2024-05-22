import { VectorDrawingSystem } from './vectordraw.js';

import { projection } from './projection.js';

const canvas = document.getElementById('mcanvas');
const context = canvas.getContext('2d');

const vectorDrawingSystem = new VectorDrawingSystem(canvas, context);
const project = new projection(canvas);

// object to store node and an Array to store road information.
var nodes = {};
var roadsToDraw = [];

// retrieving element road to print
const roadPrinting = document.getElementById('road');

// defining bounding values and values used for scaling
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
let mapCenterX = 0;
let mapCenterY = 0;
let scale = 1;

function getScale() {
    return scale; 
}
function getMapCentreX() {
    return mapCenterX; 
}
function getMapCentreY() {
    return mapCenterY; 
}
window.getScale = getScale;
window.getMapCentreX = getMapCentreX;
window.getMapCentreY = getMapCentreY;

// printing the road name onto page
function printRoad(the_road) {
    roadPrinting.textContent = 'Road Name: ' + the_road;
    roadPrinting.scrollTop = roadPrinting.scrollHeight;
    
}

// moved the calculation of the map bounds and drawing of the roads to dedicated functions
function calculateMapBounds() {
    const mapWidth = maxX - minX;
    const mapHeight = maxY - minY;
    mapCenterX = (maxX + minX) / 2;
    mapCenterY = (maxY + minY) / 2;
    scale = Math.min(canvas.width / mapWidth, canvas.height / mapHeight);
}
function drawRoads() {
    vectorDrawingSystem.context.clearRect(0, 0, canvas.width, canvas.height);

    roadsToDraw.forEach((road) => {
        const wayNodes = road.nodeRefs.map(nodeId => nodes[nodeId]);
        const wayPoints = wayNodes.map(node => ({ lon: node?.lon, lat: node?.lat }));

        vectorDrawingSystem.context.beginPath();

        for (let j = 0; j < wayPoints.length - 1; j++) {
            const startPoint = wayPoints[j];
            const endPoint = wayPoints[j + 1];
           
            if (startPoint.lon !== undefined && startPoint.lat !== undefined &&
                endPoint.lon !== undefined && endPoint.lat !== undefined) {
                // if the road is primary, trunk, or their links draw  map with the colour blue; if not, grey
                const roadcolour = (road.way.tags.highway === "trunk" || road.way.tags.highway === "primary" ||
                    road.way.tags.highway === "trunk_link" || road.way.tags.highway === "primary_link") ? '#5248E4' : '#8E8E8E';

                const start = project.convert(startPoint.lon, startPoint.lat);
                const end = project.convert(endPoint.lon, endPoint.lat);
                const startX = (start[0] - mapCenterX) * scale + canvas.width / 2;
                const startY = (start[1] - mapCenterY) * scale + canvas.height / 2;
                const endX = (end[0] - mapCenterX) * scale + canvas.width / 2;
                const endY = (end[1] - mapCenterY) * scale + canvas.height / 2;
                vectorDrawingSystem.drawLine(startX, startY, endX, endY, 'solid', roadcolour);
            }
        }

        vectorDrawingSystem.context.stroke();
    });
}

// add click event listener to canvas
canvas.addEventListener('click', (event) => {
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;

    // check if the click is within any road
    for (const road of roadsToDraw) {
        const wayNodes = road.nodeRefs.map(nodeId => nodes[nodeId]);
        const wayPoints = wayNodes.map(node => ({ lon: node?.lon, lat: node?.lat }));

        // check if the click is near any point of the road (within a threshold, the smaller the more accurate)
        for (const point of wayPoints) {
            const [roadX, roadY] = project.convert(point.lon, point.lat);
            const roadCanvasX = (roadX - mapCenterX) * scale + canvas.width / 2;
            const roadCanvasY = (roadY - mapCenterY) * scale + canvas.height / 2;

            // calculate distance between click and road point
            const distance = Math.sqrt(Math.pow(roadCanvasX - clickX, 2) + Math.pow(roadCanvasY - clickY, 2));

            const threshold = 5;
            if (distance < threshold) {
                if(road.way.tags.name!=undefined) printRoad(road.way.tags.name); // prints the road name if it's not undefined 
                return; // exit loop if road is found
            }
        }
    }
});

// this function handles zooming and adjusted with the mouse scroll (factor)
function zoom(factor) {
    const newScale = scale * factor;
    if (newScale < 1477.2953072611913) {
        scale = 1477.2953072611913; // set scale to the min value 
        console.log('Maximum zoom out');
    } else {
        scale = newScale; // update scale
    }
    drawRoads();
}

// this handles panning 
function pan(x, y) {
    const newMapCenterX = mapCenterX - x / scale;
    const newMapCenterY = mapCenterY - y / scale;

    // calculate boundaries to prevent panning outside canvas area
    const mapWidth = (maxX - minX) * scale;
    const mapHeight = (maxY - minY) * scale;

    const minXBoundary = canvas.width / 2 / scale;
    const minYBoundary = canvas.height / 2 / scale;
    const maxXBoundary = (canvas.width - canvas.width / 2) / scale;
    const maxYBoundary = (canvas.height - canvas.height / 2) / scale;

    // limit panning to keep the map within canvas boundaries
    if (mapWidth > canvas.width) {
        mapCenterX = Math.max(minX + minXBoundary, Math.min(maxX - maxXBoundary, newMapCenterX));
    } else {
        mapCenterX = (minX + maxX) / 2;
    }

    if (mapHeight > canvas.height) {
        mapCenterY = Math.max(minY + minYBoundary, Math.min(maxY - maxYBoundary, newMapCenterY));
    } else {
        mapCenterY = (minY + maxY) / 2;
    }
    drawRoads();
}


// event listener for mouse scroll handling
canvas.addEventListener('wheel', (event) => {
    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
    zoom(zoomFactor);
});

// variables for panning
let isDragging = false;
let lastX = 0;
let lastY = 0;

// event listners for handling dragging of the map (panning)
canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
});
canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const x = event.clientX - lastX;
        const y = event.clientY - lastY;

        // limiting panning to keep the map within the canvas
        if (mapCenterX + x / scale >= 0 && mapCenterX + x / scale <= canvas.width &&
            mapCenterY + y / scale >= 0 && mapCenterY + y / scale <= canvas.height) {
            pan(x, y);
        }
        lastX = event.clientX;
        lastY = event.clientY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

pbfParser.parse({
    filePath: 'hg1.pbf',
    endDocument: function () {
        // collecting data
        // iterate through the data and update min and max values accordingly
        roadsToDraw.forEach((road) => {
            const wayNodes = road.nodeRefs.map(nodeId => nodes[nodeId]);
            const wayPoints = wayNodes.map(node => ({ lon: node?.lon, lat: node?.lat }));

            for (let j = 0; j < wayPoints.length; j++) {
                const point = wayPoints[j];
                if (point.lon !== undefined && point.lat !== undefined) {
                    const [x, y] = project.convert(point.lon,point.lat);
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        });

        // calculating bounds and drawing functions called
        calculateMapBounds();
        drawRoads();
        console.log('Document end');
    },
    way: function (way) {
        // stores information about the primary roads
        if (way.tags && way.tags.highway && way.tags != undefined) {
            roadsToDraw.push({ way: way, nodeRefs: way.nodeRefs });
        }
    },
    node: function (node) {
        // stores node information in an object using the node id as the key.
        nodes[node.id] = node;
    },
    error: function (msg) {
        console.error('error: ' + msg);
        throw msg;
    }
});