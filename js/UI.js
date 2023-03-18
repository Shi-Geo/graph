class UI {
    constructor({addFunction, delFunction,createObjectFunc, addWidth, addColor, addDerivative, addZero}) {
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.createObjectFunc = createObjectFunc;
        this.addWidth = addWidth;
        this.addColor = addColor;
        this.addDerivative = addDerivative;
        this.addZero = addZero;
        this.num = 0;
        document.querySelector('.addFunction').addEventListener('click',
            () => this.addFunctionHandler());
    }


    addFunctionHandler() {

        this.createObjectFunc(this.num);

        const input = document.createElement('input');
        input.dataset.num = this.num;
        input.addEventListener('keyup', (event) => this.keyUpFunctionHandler(event));
        input.setAttribute('placeholder', 'f(x)');

        const inputWidth = document.createElement('input');
        inputWidth.dataset.num = this.num;
        inputWidth.addEventListener('keyup', (event) => this.keyUpWidthHandler(event));
        inputWidth.setAttribute('type', 'number');
        inputWidth.setAttribute('placeholder', 'width');

        const inputColor = document.createElement('input');
        inputColor.dataset.num = this.num;
        inputColor.addEventListener('keyup', (event) => this.keyUpColorHandler(event));
        inputColor.setAttribute('placeholder', 'Цвет');

        const button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', () => {
            this.delFunction(input.dataset.num);
            div.removeChild(input);
            div.removeChild(button);
            this.delFunction(input.dataset.num)
        })

        const div = document.querySelector('.funcInputs');
        div.appendChild(input);
        div.appendChild(inputWidth);
        div.appendChild(inputColor);
        div.appendChild(button);

        this.num++;
    }

    keyUpFunctionHandler(event) {
        try {
            let f;
            eval(`f = function(x) {return ${event.target.value};}`);
            this.addFunction({ f: f, num: event.target.dataset.num });
        } catch (e) {
            console.log(e);
        }
    }
    keyUpWidthHandler(event) {
        this.addWidth({ num: event.target.dataset.num, width: event.target.value });
    }
    keyUpColorHandler(event) {
        this.addColor({ num: event.target.dataset.num, color: event.target.value })
    }
}