function customReg(name, bits, construct, changehandler){
    // parent helper for components in iframe, defines element using iframe templates constructor callback
    customElements.define(name,
        class extends HTMLElement {
            constructor(){
                super();
                construct.call(this,bits);
            }
        }
    );
}
