function customReg(name, bits, construct, connectedhandler){
    // parent helper for components in iframe, defines element using iframe templates constructor callback
    customElements.define(name,
        class extends HTMLElement {
            constructor(){
                super();
                construct.call(this,bits);
            }
            connectedCallback(){
                connectedhandler.call(this);
            }
        }
    );
}
function customRegInput(name, bits, construct, connectedhandler){
    // parent helper for components in iframe, defines element using iframe templates constructor callback
    customElements.define(name,
        class extends HTMLElement {
            constructor(){
                super();
                construct.call(this,bits);
            }
            connectedCallback(){
                connectedhandler.call(this);
            }
        }//, {extends: "input"}
    );
}
