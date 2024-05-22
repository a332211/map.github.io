export class VectorDrawingSystem {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
    }
    setDefault() {
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'black';
        this.context.fillStyle = 'black';
    }
    drawPoint(x, y, style = 'circle', color = 'black') {
        this.setDefault();
        if (style === 'circle') {
        this.context.beginPath();
        this.context.arc(x, y, 5, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.stroke();
        } else if (style === 'square') {
        this.context.fillStyle = color;
        this.context.fillRect(x - 5, y - 5, 10, 10);
        this.context.strokeRect(x - 5, y - 5, 10, 10);
        }
    }

    drawLine(startX, startY, endX, endY, style = 'solid', color = 'black') {
        this.setDefault();
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        if (style === 'dashed') {
        this.context.setLineDash([5,5]);
        }
        this.context.strokeStyle = color;
        this.context.stroke();
        this.context.setLineDash([]);
    }
    drawPolygon(points, style = 'solid', color = 'black') {
        this.setDefault();
        if (points.length < 3) return;
        this.context.beginPath();
        this.context.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
        this.context.lineTo(points[i].x, points[i].y);
        }
        this.context.closePath();
        if (style === 'fill') {
        this.context.fillStyle = color;
        this.context.fill();
        }
        this.context.strokeStyle = color;
        this.context.stroke();
    }
    rotate(angle) {
        this.context.rotate((Math.PI / 180) * angle);
    }
    scale(factorX, factorY) {
        this.context.scale(factorX, factorY);
    }
    resetTransform() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
}