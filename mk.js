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
fetch("mkmodules.zip", { method: "GET", credentials: "same-origin" })
  .then(response => response.arrayBuffer())
  .then(data => {
    var EOCD = data.byteLength - 22;
    var vw = new Uint8Array(data);
    const files = [];

    var sig = getInteger(vw.subarray(EOCD, EOCD + 4));
    if (sig != 0x6054b50) return console.log("error locating EOCD");
    var i,
      numrecs = getInteger(vw.subarray(EOCD + 8, EOCD + 10));
    var CD = getInteger(vw.subarray(EOCD + 16, EOCD + 20));
    if (getString(vw.subarray(CD, CD + 4)) != "PK\01\02")
      return console.log("error locating CD");
    for (i = 0; i < numrecs; i++) {
      // get each entry
      var filenamelen = getInteger(vw.subarray(CD + 28, CD + 30));
      var extralen = getInteger(vw.subarray(CD + 30, CD + 32));
      var filename = getString(vw.subarray(CD + 46, CD + 46 + filenamelen));
      var offset = getInteger(vw.subarray(CD + 42, CD + 46));
      extralen = getInteger(vw.subarray(offset + 28, offset + 30));
      var compressedSize = getInteger(vw.subarray(CD + 20, CD + 24));
      var fdata = getString(
        vw.subarray(
          offset + 30 + filenamelen + extralen,
          offset + 30 + filenamelen + extralen + compressedSize
        )
      );
      if (vw[CD + 10] != 0) return console.log("compressed files not allowed"); //fdata = RawDeflate.inflate(fdata);
      files.push({ name: filename, data: fdata });
      CD += 82 + filenamelen; // was 46
    }
    // ifrm.srcdoc = files[0].data;
    var ifrm = document.createElement("iframe");
    ifrm.frameBorder = ifrm.width = ifrm.height = "0";
    ifrm.ariaHidden = "true";
    ifrm.srcdoc = "<body>"+files.map(u=>u.data).join("\n")+"</body>";
    ifrm.onload = (e => {
      document.body.style.opacity = 1;
    });
    document.body.appendChild(ifrm);
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
