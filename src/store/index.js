import { createStore } from 'vuex'

const $store = createStore({
  state: {
    appName: 'Media-Bits',
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
        name: 'CONTACT US',
        href: '/contact'
      }
    ],
    fileSubmenuDropdown: [
      {
        title: "Open",
        onclick(){
          window.$store.dispatch('loadFile', {
            fileType: 'text/mb',
            multiple: false,
            callback: null
          }).then(file => {
            file = JSON.parse(`[${file}]`);
            file = new Uint8Array(file);
            file = (new TextDecoder('utf-8')).decode(file);
            file = JSON.parse(file);
            window.$store.commit('setInputSources', file.inputSources);
            window.$store.commit('setOutputDestinations', file.outputDestinations);
          }).catch(err => alert(`Unable to process file because it has invalid content:\n${err}`));
        }
    },
    {
        title: "Save / download",
        onclick(){
          let file = {
            inputSources: window.$store.state.inputSources,
            outputDestinations: window.$store.state.outputDestinations
          };
          file = JSON.stringify(file);
          file = (new TextEncoder('utf-8')).encode(file);
          file = file.toString();
          let fileName = 'Test-File.mb';
          let blob = new Blob([file], {
            type: 'text/plain'
          });
          blob = URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = blob;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(a.href);
          const successString = `file saved with name: ${fileName}`;
          alert(successString);
          console.info(successString);
        }
    }
    ],
    editorBtns: [
      {
          title: "ADD INPUT",
          onclick(){},
          class: "dropdown-trigger",
          dataTarget: 'add-input-dropdown-1'
      }
    ],
    inputSources: [
      {
        name: 'Aud 1100',
        type: 'audio',
        position: 1
      },
      {
        name: 'Vid 1100',
        type: 'video',
        position: 2
      }
    ],
    outputDestinations: []
  },
  mutations: {
    setInputSources(state, sources){
      state.inputSources = sources;
    },
    setOutputDestinations(state, destinations){
      state.outputDestinations = destinations;
    }
  },
  actions: {
    loadFile(context, {fileType, allowMultiple, callback}){
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
        // console.log(file);
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
        fr.readAsText(file);
      };
      fileInput.click();
      })
    }
  },
  modules: {
  }
});

window.VideoFileInput = class VideoFileInput {
  constructor(file) {
    if (!(this instanceof VideoFileInput)) {
      return new VideoFileInput(file);
    }
    this.file = file;
    return this;
  }
  toString() { return "(Protected) [Object VideoFileInput]"; }
}

window.$store = $store;

export default $store;
