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
    editorBtns: [
      {
          title: "OPEN FILE",
          onclick(){
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'text/plain';
            fileInput.multiple = false;
            fileInput.style.display = 'none';
            fileInput.style.height = '1px !important';
            window.fileInput = fileInput;
            document.body.appendChild(window.fileInput);
            fileInput.onchange = function(event){
              const file = event.target.files[0];
              console.info(`File ${file.name} opened successfully`);
              console.log(file);
              const fr = new FileReader();
              fr.onload = function(){
                console.log(fr.result);
              }
              fr.onprogress = function(){
                console.log(fr.readyState);
              }
              fr.readAsText(file);
            };
            fileInput.click();
          }
      },
      {
          title: "SAVE",
          onclick(){}
      },
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
      //   type: 'audio',
      //   position: 1
      // },
      // {
      //   name: 'Vid 1100',
      //   type: 'video',
      //   position: 2
      // }
    ]
  },
  mutations: {
  },
  actions: {
    loadFile(){
    }
  },
  modules: {
  }
});

class VideoFileInput {
  constructor(file) {
    if (!(this instanceof VideoFileInput)) {
      return new VideoFileInput(file);
    }
    this.file = file;
    return this;
  }
  toString() { return "(Protected) [Object VideoFileInput]"; }
}
window.VideoFileInput = VideoFileInput;

window.$store = $store;

export default $store;
