// begin window.__workerFromString
window.__workerFromString = string => {
  const __myWorker = new Worker(URL.createObjectURL(new Blob([string], {
  type: 'application/javascript'
})));
return  __myWorker;
}
// end window.__workerFromString


// begin local::__arrayBufferToBase64
const __arrayBufferToBase64 = buffer => {
  const retval = btoa([].reduce.call(new Uint8Array(buffer),(p,c) => p+String.fromCharCode(c),''))
  // should be // const retval = window.btoa(String.fromCharCode(...(new Uint8Array(buffer))));
return retval;
}
// end local::__arrayBufferToBase64

// begin window.__arrayBufferToBase64
window.__arrayBufferToBase64 = buffer =>
  new Promise((resolve, reject) => {
    const worker = window.__workerFromString(`
var $self - self;
$self.onmessage = function(message){
  var convertArrayBufferToBase64 = ${__arrayBufferToBase64.toString()}
  var base64 = convertArrayBufferToBase64(message.data);
  $self.postMessage(base64);
}
`);
    worker.onmessage = e => {
      resolve(e.data);
      return worker.terminate();
    }
    worker.onerror = err => reject(err);
    worker.postMessage(buffer);
  });
// end window.__arrayBufferToBase64

//

// begin local::__base64ToArrayBuffer
const __base64ToArrayBuffer = base64 => {
  const retval = btoa([].reduce.call(new Uint8Array(base64),(p,c) => p+String.fromCharCode(c),''))
return retval;
}
// end local::__base64ToArrayBuffer

// begin window.__base64ToArrayBuffer
window.__base64ToArrayBuffer = base64 =>
  new Promise((resolve, reject) => {
    const worker = window.__workerFromString(`
var $self - self;
$self.onmessage = function(message){
  var convertArrayBufferToBase64 = ${__base64ToArrayBuffer.toString()}
  var buffer = convertArrayBufferToBase64(message.data);
  $self.postMessage(buffer);
}
`);
    worker.onmessage = e => {
      resolve(e.data);
      return worker.terminate();
    }
    worker.onerror = err => reject(err);
    worker.postMessage(base64);
  });
// end window.__base64ToArrayBuffer

