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
            callback: null,
            isText: true
          }).then(file => {
            file = JSON.parse(`[${file}]`);
            file = new Uint8Array(file);
            file = (new TextDecoder('utf-8')).decode(file);
            file = JSON.parse(file);
            window.$store.commit('setInputSources', file.inputSources);
            window.$store.commit('setOutputDestinations', file.outputDestinations);
          }).catch(err => window.M.toast({
            html: `Unable to process file because it has invalid content:  <br /> ${err}`,
            classes: 'red rounded'
          }));
        }
    },
    {
        title: "Save / download",
        onclick(){
          if (window.$store.state.inputSources.length < 1){
            window.M.toast({
              html: 'nothing to save',
              classes: 'teal rounded'
            });
          } else {
            let file = {
              inputSources: window.$store.state.inputSources,
              outputDestinations: window.$store.state.outputDestinations
            };
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
            window.M.toast({
              html: successString,
              classes: 'teal z-depth-4 rounded'
            })
            console.info(successString);
          }
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
      // {
      //   name: 'Aud 1100',
      //   type: 'audio file',
      //   position: 1,
      //   data: null,
      //   id: Math.random()
      // }
    ],
    outputDestinations: []
  },
  mutations: {
    setInputSources(state, sources){
      state.inputSources = sources;
    },
    setOutputDestinations(state, destinations){
      state.outputDestinations = destinations;
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
          // fr.readAsBinaryString(file);
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

// begin video file input
window.VideoFileInput = class VideoFileInput {
  constructor(file) {
    if (!(this instanceof VideoFileInput)) {
      return new VideoFileInput(file);
    }
    this.file = file;
    return this;
  }
  toString() {
    return "(Protected) [Object VideoFileInput]";
  }
  toJSON(){
    const $this = this;
    return {
      file: $this.file
    }
  }
}
// end video file input

// Begin Audio file Input
window.AudioFileInput = class AudioFileInput {
  constructor(file) {
    if (!(this instanceof AudioFileInput)) {
      return new AudioFileInput(file);
    }
    this.file = file;
    return this;
  }
  toString() {
    return "(Protected) [Object AudioFileInput]";
  }
  toJSON(){
    const $this = this;
    return {
      file: $this.file
    }
  }
}
// End Audio File Input

window.$store = $store;

export default $store;
