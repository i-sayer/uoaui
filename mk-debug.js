function customReg(name, bits, construct, connectedhandler) {
  // parent helper for components in iframe, defines element using iframe templates constructor callback
  customElements.define(
    name,
    class extends HTMLElement {
      constructor() {
        super();
        construct.call(this, bits);
      }
      connectedCallback() {
        connectedhandler.call(this);
      }
    }
  );
}
fetch("mk-ranch.html", { method: "GET", credentials: "same-origin" })
  .then(response => response.text())
  .then(data => {
    var ifrm = document.createElement("iframe");
    ifrm.frameBorder = ifrm.width = ifrm.height = "0";
    ifrm.ariaHidden = "true";
    ifrm.srcdoc = "<body>"+data+"</body>";
    document.body.appendChild(ifrm);
    setTimeout(u => {
      document.body.style.opacity = 1;
      // for (ifrm of ifrms)
      //     document.body.removeChild(ifrm);
    }, 90);
  });
function getString(a) {
  return Array.prototype.slice
    .call(a)
    .map(function(x) {
      return String.fromCharCode(x);
    })
    .join("");
}
function getInteger(b) {
  for (var i = 0, result = 0; i < b.byteLength; i++) result += b[i] << (i * 8);
  return result;
}
