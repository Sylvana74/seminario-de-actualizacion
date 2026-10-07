// unidad-4/MVCCanvas.js

class Model extends EventTarget {
    constructor() {
        super();
    }
   
    changed() {
        this.dispatchEvent(new CustomEvent('changed'));
    }
}

class View extends HTMLElement {
    constructor() {
        super();
        this._canvas = document.createElement('canvas');
        this._canvas.width = 800;
        this._canvas.height = 600;
        this._canvas.style.border = '1px solid black';
        this.appendChild(this._canvas);
    }
    
    get ctx() {
        return this._canvas.getContext('2d');
    }

    get canvasWidth() {
        return this._canvas.width;
    }

    get canvasHeight() {
        return this._canvas.height;
    }
    
    set value(x) {}
    get value() {}
    
    connectedCallback() {
       console.log('Canvas agregado...');
    }
    
    disconnectedCallback() {}
}

customElements.define('x-view', View);

class Controller {
    constructor(view, model) {
        this._view = view;
        this._model = model;
        this._onModelChanged = this.onModelChanged.bind(this);
        this._onViewRequest = this.onViewRequest.bind(this);
    }
    enable() {
        this._model.addEventListener('changed', this._onModelChanged);
        this._view.addEventListener('request', this._onViewRequest);
    }
    disable() {
        this._model.removeEventListener('changed', this._onModelChanged);
        this._view.removeEventListener('request', this._onViewRequest);
    }
    onModelChanged() {}
    onViewRequest(event) {}
}