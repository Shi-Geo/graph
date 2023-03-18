class Canvas {
    constructor({ id, width = 800, height = 500, WIN, callbacks }) {

        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');

        this.canvas.width = width;
        this.canvas.height = height;

        const { wheel, mouseUp, mouseDown, mouseMove, mouseLeave } = callbacks;
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousedown', mouseDown);
        this.canvas.addEventListener('mouseup', mouseUp);
        this.canvas.addEventListener('mousemove', mouseMove);
        this.canvas.addEventListener('mouseleave', mouseLeave);

        this.WIN = WIN;
    }

    xs = (x) => (x - this.WIN.left) / this.WIN.width * this.canvas.width;

    ys = (y) => this.canvas.height - (y - this.WIN.bottom) / this.WIN.height * this.canvas.height;

    sx = (x) => x * this.WIN.width / this.canvas.width;

    sy = (y) => -y * this.WIN.height / this.canvas.height;

    x = (xs) => xs * this.WIN.width / this.canvas.width + this.WIN.left;

    y = (ys) => -ys * this.WIN.height / this.canvas.height + this.WIN.bottom + this.WIN.height;

    drawRect = ({ x, y, width, height, color }) => {
        const heightRect = height * this.canvas.height / this.WIN.height;
        const widthRect = width * this.canvas.width / this.WIN.width;

        this.context.fillStyle = color;
        this.context.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);

    }

    clear = () => {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line = ({ x1, y1, x2, y2, width = 1, color = 'white', isDash = false }) => {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        if (isDash) {
            this.context.lineWidth = 1;
            this.context.setLineDash([10, 10]);
        } else {
            this.context.lineWidth = width;
            this.context.setLineDash([]);
        }
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
        this.context.closePath();
    }

    printText = ({ text, x, y, color = 'white', size = NaN }) => {
        this.context.font = `${size}px serif`;
        this.context.fillStyle = color;
        this.context.fillText(text, this.xs(x), this.ys(y));
    }

    point({ x, y, color = 'red', size = 4 }) {
        this.context.beginPath();
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();

    }
}

