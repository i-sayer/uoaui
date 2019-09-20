function customReg(name, bits, construct){
    // move this to js file, maybe pass modules required as attributes?
    customElements.define(name,
        class extends HTMLElement {
            constructor(){
                super();
                construct.call(this,bits);
        }
    });
}
