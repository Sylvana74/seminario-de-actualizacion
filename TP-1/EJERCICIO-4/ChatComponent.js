class ChatComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    // Método para insertar dinámicamente mensajes
    insertMessage(text, side = 'right', time = 'Justo ahora') {
        const container = this.shadowRoot.querySelector('.chat-container');
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', side);
        
        msgDiv.innerHTML = `
            <p>${text}</p>
            <span class="time-${side}">${time}</span>
        `;
        container.appendChild(msgDiv);
        // Auto-scroll al fondo
        container.scrollTop = container.scrollHeight;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .chat-container {
                    border: 3px solid #f1f1f1;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 10px 0;
                    max-width: 400px;
                    height: 300px;
                    overflow-y: auto;
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: #f9f9f9;
                }
                .message {
                    border: 2px solid #dedede;
                    background-color: #f1f1f1;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 10px 0;
                    clear: both;
                }
                .message.right {
                    border-color: #ccc;
                    background-color: #ddd;
                    float: right;
                    width: 80%;
                }
                .message.left {
                    float: left;
                    width: 80%;
                }
                .message p { margin: 0 0 5px 0; }
                .message span { font-size: 10px; color: #999; }
                .time-right { float: right; }
                .time-left { float: left; }
            </style>
            <div class="chat-container">
                </div>
        `;
    }
}
customElements.define('chat-component', ChatComponent);