import { createStore } from 'vuex'
// const vuexLocal = require('./vuexLocal.js');

(window as any).loadFromOpenedFile = (file: any) => {
  // document
  return new Promise((resolve, reject) => {
    const jszip = new (window as any).JSZip();
    return jszip.loadAsync(file).then((file2: any) => {
        file = file2;
        // console.log(file)
        (Object?.values((file as any).files)[0] as any).async('string').then((str: any) => {
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

const convertProjectToFile = (file: string | Uint8Array | undefined) => {
  return new Promise(resolve => {
            file = JSON.stringify(file);
            file = (new TextEncoder()).encode(file);
            file = file.toString();
            const d = new Date();
            const day = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            const hour = d.getHours();
            const minutes = d.getMinutes();
            const seconds = d.getSeconds();
            const fileName = `${year}-${month}-${day}_${hour > 12 ? hour - 12 : hour}-${minutes}-${seconds}${hour > 12 ? 'pm' : 'am'}.mb`; 
            const jszip = new (window as any).JSZip();
            jszip.file(fileName, file);
            jszip.generateAsync({
              type:'blob',
              compressionOptions: {
                level: 10
              }
            }).then((blob: any) => {
              blob = URL.createObjectURL(blob);
              resolve({blob, fileName});
            })
            // let blob = new Blob([file], {
              // type: 'text/plain'
            // });
  });
}

(window as any).convertProjectToFile = convertProjectToFile;

const $store = createStore({
  // plugins: [vuexLocal.default.plugin],
  state: {
    appName: 'Media-Bits',
    // ™
    currentUser: null,
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
        name: 'DOWNLOAD',
        href: '/download'
      },
      {
        name: 'SUBSRIBTION',
        href: '/subscribtion'
      }
    ],
    secondaryHyperlinks: [
      {
        name: "Contact Us",
        href: "/contact"
      },
      {
        name: "Documentation",
        href: "/documentation"
      },
      {
        name: "Tutorial Videos",
        href: "/tutorial-videos"
      },
      {
        name: "Media-Bits Blog",
        href: "/blog"
      },
      {
        name: "Media-Bits Forum",
        href: "/forum"
      }
    ],
    year: `${(new Date()).getFullYear()}`,
    fileSubmenuDropdown: [
      {
        title: "Open",
        onclick(){
          const loader = document.querySelector('#global-loader-modal');
          (window as any).$store.dispatch('loadFile', {
            fileType: 'application/zip',
            multiple: false,
            callback: null,
            isText: false
          }).then((file: any) => {
              (loader as any).M_Modal.open();

              return (window as any).loadFromOpenedFile(file).then((_file: { inputSources: any; outputDestinations: any; }) => {
                (window as any).$store.commit('setInputSources', []);
                (window as any).$store.commit('setOutputDestinations', []);
                (window as any).$store.commit('setInputSources', _file.inputSources);
                (window as any).$store.commit('setOutputDestinations', _file.outputDestinations);
                (loader as any).M_Modal.close();
                return true;
            }).catch(() => {
              (document.querySelector('#global-loader-modal') as any).M_Modal.close();

              (window as any).M.toast({
              html: `Unable to process file because it has invalid content`,
              classes: 'bold red rounded'
            });
          });
            
          }).catch(() => {
              (document.querySelector('#global-loader-modal') as any).M_Modal.close();
              
              (window as any).M.toast({
              html: `Unable to process file because it has invalid content`,
              classes: 'bold red rounded'
            });
          });
        }
    },
    {
      title: "Import from Cloud",
      onclick(){}
    },
    {
        title: "Save to PC",
        onclick(){
          if ((window as any).$store.state.inputSources.length < 1){
            (window as any).M.toast({
              html: 'Nothing to save!',
              classes: 'bold red rounded'
            });
          } else {
            let file = {
              inputSources: (window as any).$store.state.inputSources.filter((source: { type: string | string[]; }) => !source.type.includes('live')),
              outputDestinations: (window as any).$store.state.outputDestinations
            };
            
            return (window as any).convertProjectToFile(file).then((options: { fileName: any; blob: any; }) => {

              const fileName = options.fileName;
              const blob = options.blob

              let a = document.createElement('a');
              a.href = blob;
              a.download = fileName + '.zip';
              document.body.appendChild(a);
              a.click();
              URL.revokeObjectURL(a.href);
              const successString = `file saved with name: ${fileName}`;
              (window as any).M.toast({
                html: successString,
                classes: 'bold teal z-depth-4 rounded'
             });
             return (window as any).$store.commit('setCurrentProjectIsSaved', true);

            }).catch((except: any) => (window as any).M.toast({
              html: `Unable to Save for the following reason: ${except}`,
              classes: 'bold red z-depth-4 rounded'
           }));

            
            
          }
        }
    },
    {
      title: "Save to Cloud"
    }
    ],
    globalLoaderText: "Loading...",
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
      }
    ],
    currentProjectIsSaved: true,
    inputSources: [],
    outputDestinations: [],
    editorIsReady: false,
    isProjecting: false,
    isRecording: false
  },
  mutations: {
    setIsRecording(state, trueOrFalse){
      (state as any).isRecording = trueOrFalse
    },
    setIsProjecting(state, trueOrFalse){
      (state as any).isProjecting = trueOrFalse;
    },
    setCurrentProjectIsSaved(state, isSaved){
      (state as any).currentProjectIsSaved = isSaved;
    },
    setInputSources(state: any, sources){
      (state as any).inputSources = sources;
    },
    setOutputDestinations(state, destinations){
      (state as any).outputDestinations = destinations;
    },
    setFocusedInputSource(state, index){
      (state as any).focusedInputSource = index;
    },
    editorIsReady(state){
      (state as any).editorIsReady = true;
    },
    addInputSource(state, source){
      (state as any).inputSources.push(source);
    },
    removeInputSource(state, id){
      const ind = (state as any).inputSources.findIndex((source: { id: any; }) => source.id === id);
      (state as any).inputSources.splice(ind, 1);
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
      (window as any).fileInput = fileInput;
      document.body.appendChild((window as any).fileInput);
      fileInput.onchange = function(event){
        const file = (event?.target as any).files[0];
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

(window as any).$store = $store;

export default $store;


//

(window as any).myString = `
self.onmessage = e => {
  self.postMessage(e.data)
}
`;

(window as any).myBlob = new Blob([(window as any).myString], {
  type: 'application/javascript'
});

(window as any).myURL = URL.createObjectURL((window as any).myBlob);

(window as any).myWorker = new Worker((window as any).myURL);

(window as any).myWorker.onmessage = (e: { data: any; }) => console.log(e.data);