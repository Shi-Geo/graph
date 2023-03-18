class Graph2d {
    constructor({ canvas, WIN }) {
        this.canvas = canvas;
        this.WIN = WIN;
        this.funcs = [];
    }

    printOXY() {
        for (let i = 0; i <= this.WIN.left + this.WIN.width; i++) {
            this.canvas.line({ x1: i, y1: this.WIN.bottom, x2: i, y2: this.WIN.bottom + this.WIN.height, color: '#c1c1c1' });
        }
        for (let i = 0; i >= this.WIN.left; i--) {
            this.canvas.line({ x1: i, y1: this.WIN.bottom, x2: i, y2: this.WIN.bottom + this.WIN.height, color: '#c1c1c1' });
        }
        for (let i = 0; i <= this.WIN.bottom + this.WIN.height; i++) {
            this.canvas.line({ x1: this.WIN.left, y1: i, x2: this.WIN.left + this.WIN.width, y2: i, color: '#c1c1c1' });
        }
        for (let i = 0; i >= this.WIN.bottom; i--) {
            this.canvas.line({ x1: this.WIN.left, y1: i, x2: this.WIN.left + this.WIN.width, y2: i, color: '#c1c1c1' });
        }
        this.canvas.line({ x1: this.WIN.left, y1: 0, x2: this.WIN.width + this.WIN.left, y2: 0, width: 2 });
        this.canvas.line({ x1: 0, y1: this.WIN.bottom, x2: 0, y2: this.WIN.bottom + this.WIN.height, width: 2 });

        this.canvas.line({ x1: this.WIN.width + this.WIN.left, y1: 0, x2: this.WIN.width + this.WIN.left - 0.6, y2: 0.3, width: 2 });
        this.canvas.line({ x1: this.WIN.width + this.WIN.left, y1: 0, x2: this.WIN.width + this.WIN.left - 0.6, y2: -0.3, width: 2 });
        this.canvas.line({ x1: 0, y1: this.WIN.bottom + this.WIN.height, x2: 0.3, y2: this.WIN.bottom + this.WIN.height - 0.6, width: 2 });
        this.canvas.line({ x1: 0, y1: this.WIN.bottom + this.WIN.height, x2: -0.3, y2: this.WIN.bottom + this.WIN.height - 0.6, width: 2 });
    }

    printZeros = ({ f, color = 'red', x, dx }) => {
        if (f(x) * f(x + dx) <= 0) {
            this.canvas.point({ x: x + dx / 2, y: 0, color })
        }
    }

    getDerivative(f, x0, dx = 0.00001) {
        return (f(x0 + dx) - f(x0)) / dx;
    }

    printDerivative({f, x}) {
        const k = this.getDerivative(f, x)
        let b = f(x) - k * x;
        let x1 = this.WIN.left;
        let x2 = this.WIN.left + this.WIN.width;
        let y1 = k * x1 + b;
        let y2 = k * x2 + b;
        this.canvas.line(x1, y1, x2, y2, 1, 'darkred', true);
    }

    /*printDerivative({ f, x }) {
        const dx = Math.pow(10, -9);
        const k = (f(x + dx) - f(x)) / dx;
        const b = f(x) - k * x;
        this.canvas.line({ x1: b, y1: 0, x2: x, y2: f(x), color: '#aaa' })
        this.canvas.line({ x1: x, y1: 0, x2: x, y2: f(x), color: '#aaa', isDash: true })
    }*/

    printFunction({ f, color = 'white', width = 2, showZero }) {
        const dx = this.WIN.width / 1000;
        let x = this.WIN.left;

        while (x < this.WIN.width + this.WIN.left) {
            const y1 = f(x);
            const y2 = f(x + dx);
            if (Math.abs(y1 - y2) < this.WIN.height) {
                this.canvas.line({ x1: x, y1: f(x), x2: x + dx, y2: f(x + dx), color: color, width: width });
                if (showZero) {
                    this.printZeros({ f, x, dx });
                }
            }
            else {
                this.canvas.line({ x1: x, y1: f(x), x2: x + dx, y2: f(x + dx), color: color, width: width, isDash: true });
            }

            x += dx;
        }
    }

    printNums() {
        const streakLength = this.WIN.height / (this.WIN.width + 30);
        const len = streakLength / 2;
        const shiftY = -this.WIN.height * 0.01 - 0.04;
        const shiftX = this.WIN.width * 0.001 + 0.04;
        for (let i = Math.round(this.WIN.left); i < this.WIN.left + this.WIN.width; i++) {
            this.canvas.line({ x1: i, y1: len, x2: i, y2: -len, width: 2.5 });
            this.canvas.printText({ text: i, x: i + shiftX, y: shiftY, });
        }
        for (let i = Math.round(this.WIN.bottom); i < this.WIN.bottom + this.WIN.height; i++) {
            this.canvas.line({ x1: len, y1: i, x2: -len, y2: i, width: 2.5 });
            this.canvas.printText({ text: i, x: shiftX, y: i + shiftY, });
        }
    }

    printRect(event) {
        const x = Math.floor(this.canvas.x(event.offsetX));
        const y = Math.ceil(this.canvas.y(event.offsetY));

        this.canvas.drawRect({ x: x, y: y, width: 1, height: 1, color: 'red' });

    }

    render = (event = null) => {
        this.canvas.clear();
        if (event) {
            this.printRect(event)
        }
        this.printOXY();
        this.printNums();
        this.funcs.forEach(func => {
            if (func) {
                this.printFunction({ f: func.f, color: func.color, width: func.width, showZero: func.showZero })
            } if (func.showDerivative) {
                const x = this.canvas.x(event.offsetX);
                this.printDerivative({ f: func.f, x })
            }
        });
    }

}