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

window.convertProjectToFile = window.electronConvertProjectToFile || function(file){
  return new Promise(resolve => {
            file = JSON.stringify(file);
            //file = (new TextEncoder('utf-8')).encode(file);
            //file = file.toString();
            const d = new Date();
            const day = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            const hour = d.getHours();
            const minutes = d.getMinutes();
            const seconds = d.getSeconds();
            const fileName = `${year}-${month + ' november'}-${day}_${hour > 12 ? hour - 12 : hour}-${minutes}-${seconds}${hour > 12 ? 'pm' : 'am'}.mbits`; 
            const jszip = new window.JSZip();
            jszip.file(fileName, file);
            jszip.generateAsync({
              type:'blob',
              compressionOptions: {
                level: 10
              }
            }).then(blob => {
              blob = URL.createObjectURL(blob);
              resolve({blob, fileName});
            })
            // let blob = new Blob([file], {
              // type: 'text/plain'
            // });
  });
}
 
window.loadFromOpenedFile = window.electronLoadFromOpenedFile || function(file){
  // document
  return new Promise((resolve, reject) => {
    const jszip = new window.JSZip();
    return jszip.loadAsync(file).then(file2 => {
        file = file2
        Object.values(file.files)[0].async('string').then(str => {
        file = str;
        try {
          //file = JSON.parse(`[${file}]`);
          file = JSON.parse(`${file}`);
        } catch (exception){
          return reject(exception);
        }
        //file = new Uint8Array(file);
        //file = (new TextDecoder('utf-8')).decode(file);
        //file = JSON.parse(file);
        return resolve(file);
      })
    });
  });
}
//refactor
window.loadFromOpenedFile = window.electronLoadFromOpenedFile || function(file){
  return new Promise((resolve, reject) => {
    const jszip = new window.JSZip();
    return jszip.loadAsync(file).then(file2 => {
        file = file2
        // console.log(file)
        Object.values(file.files)[0].async('string').then(str => {
        file = str;
        try {
          file = JSON.parse(`[${file}]`);
        } catch (exception){
          return reject(exception);
        }
        file = new Uint8Array(file);
        file = (new TextDecoder('utf-8')).decode(file);
        file = JSON.parse(file);
        return resolve(file);
      })
    });
  });
}