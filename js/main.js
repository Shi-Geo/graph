window.onload = () => {
    const height = 850;
    const width = window.innerWidth;
    const prop = width / height;

    const WIN = {
        left: -10 * prop,
        bottom: -10,
        width: 20 * prop,
        height: 20,
    };


    const zoomStep = 1;
    function wheel(event) {
        const delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;
        if (WIN.width + delta * prop > 0 && WIN.height + delta > 0) {
            WIN.width += prop * delta;
            WIN.height += delta;
            WIN.left -= prop * delta / 2;
            WIN.bottom -= delta / 2;
            render(event);
        }
    }

    let canMove = false;

    function mouseUp() {
        canMove = false;
    }

    function mouseDown() {
        canMove = true;
    }

    function mouseMove(event) {
        if (canMove) {
            WIN.left -= canvas.sx(event.movementX);
            WIN.bottom -= canvas.sy(event.movementY);
            render()
        }
        render(event);

    }

    function mouseLeave() {
        canMove = false;
        render();
    }

    const canvas = new Canvas({
        id: 'graph',
        width,
        height,
        WIN,
        callbacks: { wheel, mouseUp, mouseDown, mouseMove, mouseLeave },
    });

    const graph2d = new Graph2d({
        canvas,
        WIN,
    });

    const render = graph2d.render;

    const ui = new UI({
        addFunction,
        delFunction,
        createObjectFunc,
        addWidth,
        addColor
    });
    
    function addFunction({ num, f }) {
        graph2d.funcs[num].f = f;
        render();
    }
    function addWidth({ num, width }) {
        graph2d.funcs[num].width = width;
        render();
    }
    function addColor({ num, color }) {
        graph2d.funcs[num].color = color;
        render();
    }

    function createObjectFunc (num) {
        graph2d.funcs[num] = {
            f : null,
            color: '#d00',
            width: 2,
            showZero: false,
            showDerivative: false,
        }
    }

    function delFunction(num) {
        graph2d.funcs[num] = null;
        render();
    }

    function getZero({ f, a, b, eps = 0.0001 }) {
        if (f(a) * f(b) > 0) return null;
        if (f(a) === 0) return a;
        if (f(b) === 0) return b;
        if (Math.abs(f(b) - f(a) <= eps)) return (a + b) / 2;
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) return getZero({ f, a, b: half, eps })
        if (f(b) * f(half) <= 0) return getZero({ f, a: half, b, eps })
        else return null;
    }
    
    render();
    
}
