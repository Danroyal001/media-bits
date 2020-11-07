import { createStore } from 'vuex'
// const vuexLocal = require('./vuexLocal.js');

window.loadFromOpenedFile = window.electronLoadFromOpenedFile || function(file){
  document
  return new Promise(resolve => {
    const jszip = new window.JSZip();
    return jszip.loadAsync(file).then(file2 => {
        file = file2
        console.log(file)
        Object.values(file.files)[0].async('string').then(str => {
        file = str;
        file = JSON.parse(`[${file}]`);
        file = new Uint8Array(file);
        file = (new TextDecoder('utf-8')).decode(file);
        file = JSON.parse(file);
        return resolve(file);
      })
    });
  });
}

window.convertProjectToFile = window.electronConvertProjectToFile || function(file){
  return new Promise(resolve => {
            file = JSON.stringify(file);
            file = (new TextEncoder('utf-8')).encode(file);
            file = file.toString();
            const d = new Date();
            const day = d.getDay();
            const month = d.getMonth();
            const year = d.getFullYear();
            const hour = d.getHours();
            const minutes = d.getMinutes();
            const seconds = d.getSeconds();
            const fileName = `${year}-${month}-${day}_${hour > 12 ? hour - 12 : hour}:${minutes}:${seconds}${hour > 12 ? 'pm' : 'am'}.mb`;
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

const $store = createStore({
  // plugins: [vuexLocal.default.plugin],
  state: {
    appName: 'Media-Bits™',
    focusedInputSource: 0,
    primaryHyperlinks: [
      {
        name: 'HOME',
        href: '/home'
      },
      {
        name: 'EDITOR',
        href: '/editor'
      },
      {
        name: 'SUBSRIBTION',
        href: '/subscribtion'
      },
      {
        name: 'DOWNLOAD',
        href: '/download'
      }
    ],
    fileSubmenuDropdown: [
      {
        title: "Open",
        onclick(){
          window.$store.dispatch('loadFile', {
            fileType: 'application/zip',
            multiple: false,
            callback: null,
            isText: false
          }).then(file => {

              window.loadFromOpenedFile(file).then(_file => {
              window.$store.commit('setInputSources', _file.inputSources);
              window.$store.commit('setOutputDestinations', _file.outputDestinations);
            }).catch(e => window.M.toast({
              html: `Unable to process file because it has invalid content:  <br /> ${e}`,
              classes: 'bold red rounded'
            }));
            
          }).catch(err => window.M.toast({
            html: `Unable to process file because it has invalid content:  <br /> ${err}`,
            classes: 'bold red rounded'
          }));
        }
    },
    {
        title: "Save to PC",
        onclick(){
          if (window.$store.state.inputSources.length < 1){
            window.M.toast({
              html: 'Nothing to save!',
              classes: 'bold red rounded'
            });
          } else {
            let file = {
              inputSources: window.$store.state.inputSources,
              outputDestinations: window.$store.state.outputDestinations
            };
            
            return window.convertProjectToFile(file).then(({blob, fileName}) => {
              let a = document.createElement('a');
              a.href = blob;
              a.download = fileName + '.zip';
              document.body.appendChild(a);
              a.click();
              URL.revokeObjectURL(a.href);
              const successString = `file saved with name: ${fileName}`;
              window.M.toast({
                html: successString,
                classes: 'bold teal z-depth-4 rounded'
             });
            }).catch(_err => window.M.toast({
              html: _err,
              classes: 'bold red z-depth-4 rounded'
           }));

            
            
          }
        }
    },
    {
      title: "Save to Cloud"
    }
    ],
    editorBtns: [
      {
          title: "ADD INPUT",
          onclick(){},
          class: "dropdown-trigger",
          dataTarget: 'add-input-dropdown-1',
          iconClass: 'fas fa-caret-down'
      },
      {
        title: "TOOLS",
        onclick(){},
        iconClass: 'fas fa-wrench',
        class: "modal-trigger",
        dataTarget: "tools-modal",
        href: "#tools-modal"
      },
      {
        title: "MORE",
        onclick(){},
        class: "modal-trigger",
        dataTarget: "more-modal",
        href: "#more-modal"
      }
    ],
    inputSources: [
      // {
      //   name: 'Aud 1100',
      //   type: 'audio file',
      //   position: 1,
      //   data: null,
      //   id: Math.random()
      // }
    ],
    outputDestinations: [],
    editorIsReady: false,
  },
  mutations: {
    setInputSources(state, sources){
      state.inputSources = sources;
    },
    setOutputDestinations(state, destinations){
      state.outputDestinations = destinations;
    },
    setFocusedInputSource(state, index){
      state.focusedInputSource = index;
    },
    editorIsReady(state){
      state.editorIsReady = true;
    },
    addInputSource(state, source){
      state.inputSources.push(source);
    },
    removeInputSource(state, id){
      const ind = state.inputSources.findIndex(source => source.id === id);
      state.inputSources.splice(ind, 1);
    }
  },
  actions: {
    loadFile(context, {fileType, allowMultiple, callback, isText}){
      return new Promise((resolve) => {
        const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = fileType || 'text/plain';
      fileInput.multiple = allowMultiple || false;
      fileInput.style.display = 'none';
      fileInput.style.height = '1px !important';
      window.fileInput = fileInput;
      document.body.appendChild(window.fileInput);
      fileInput.onchange = function(event){
        const file = event.target.files[0];
        const fr = new FileReader();
        fr.onload = function(){
          console.info(`${file.name} opened successfully`);
          if(callback){
            callback(fr.result);
          } else return resolve(fr.result);
        }
        fr.onprogress = function(){
          console.log(fr.readyState);
        }
        if(isText){
          fr.readAsText(file);
        }else{
          // send raw file object
          if(callback){
            callback(file);
          } else return resolve(file);
        }
      };
      fileInput.click();
      })
    }
  },
  modules: {
  }
});

window.$store = $store;

export default $store;


//

window.myString = `
self.onmessage = e => {
  self.postMessage(e.data)
}
`
window.myBlob = new Blob([window.myString], {
  type: 'application/javascript'
})

window.myURL = URL.createObjectURL(window.myBlob)

window.myWorker = new Worker(window.myURL)

window.myWorker.onmessage = e => console.log(e.data)