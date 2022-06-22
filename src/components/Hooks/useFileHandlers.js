import {useCallback, useEffect, useReducer, useRef} from 'react';

const api = {
  uploadFile() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 550)
    })
  },
}

const logUploadedFile = (num, color = 'green') => {
  const msg = `%c${num} de archivos subidos.`
  const style = `color:${color};font-weight:bold;`
}

// Constants
const LOADED = 'LOADED'
const INIT = 'INIT'
const PENDING = 'PENDING'
const FILES_UPLOADED = 'FILES_UPLOADED'
const UPLOAD_ERROR = 'UPLOAD_ERROR'

let initialState = {
  files: [],
  images: [],
  resizeFiles: [],
  base64files: [],
  pending: [],
  next: null,
  uploading: false,
  uploaded: {},
  status: 'idle',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return { ...state, files: [], images: [], base64files: [], status: INIT }
    case 'load':
      if(state.files.length>0) {
        state = initialState;
      }
      return { ...state, files: action.files, images: action.images, base64files: action.base64files, status: LOADED }
    case 'submit':
      return { ...state, uploading: true, pending: state.files, status: INIT }
    case 'next':
      return {
        ...state,
        next: action.next,
        status: PENDING,
      }
    case 'file-uploaded':
      return {
        ...state,
        next: null,
        pending: action.pending,
        uploaded: {
          ...state.uploaded,
          [action.prev.id]: action.prev.file,
        },
      }
    case 'files-uploaded':
      return { ...state, uploading: false, status: FILES_UPLOADED }
    case 'set-upload-error':
      return { ...state, uploadError: action.error, status: UPLOAD_ERROR }
    default:
      return state
  }
}

const useFileHandlers = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const reInit = ()=>{
    dispatch({ type: 'reset' });
  }

  const onSubmit = useCallback((e) => {
      e.preventDefault()
      if (state.files.length) {
        dispatch({ type: 'submit' })
      } else {
        window.alert("No hay archivos para subir.")
      }
    },
    [state.files.length],
  )

  const onChange = async (e) => {
    if (e.target.files.length) {
      const arrFiles = Array.from(e.target.files);
      const files = await Promise.all(arrFiles.map(async (file, index) => {
        //const src = window.URL.createObjectURL(file);
        let tempFile = null;
        let src = null;
        await getBase64(file).then(data => {
          src = data.result;
          tempFile = data.file;
        }).catch(error => console.error(error));
        return {file: tempFile, id: index, src};
      }));
        const images = await Promise.all(arrFiles.map(async (file, index) => {
            //const src = window.URL.createObjectURL(file);
          let tempFile = null;
          let src = null;
          await getBase64(file).then(data => {
            src = data.result;
            tempFile = data.file;
          }).catch(error => console.error(error))
          return {id: index, srcSet: src, media: '(max-width: 320px)', original: file.name, file: tempFile};
        }));

        const base64files = await Promise.all(arrFiles.map(async (file, index) => {
          let tempFile = null;
          let src = null;
          await getBase64(file).then(data => {
            src = data.result;
            tempFile = data.file;
          }).catch(error => console.error(error))
          return { file: tempFile, id: index, src }
        }));
        if(state.files.length>0) { // No parece que esta condicion pueda cumplirse
          state.files.forEach(file=>{
            files.push(file);
          });
          state.images.forEach(image=>{
            images.push(image);
          });
          state.base64files.forEach(base64file=>{
            base64files.push(base64file);
          });
        }
        console.log({files, images, base64files})
        dispatch({ type: 'load', files, images, base64files});
    }
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({file, result: reader.result});
      reader.onerror = error => reject(error);
    });
  };

  const loadFilesFromDB = (files_loading)=>{
    if (files_loading.length) {
      let files  = [];
      let images = [];
      files_loading.forEach(file => {
          urltoFile(file.image, file.filename, file.mime_type).then(fileReturned=>{
            files.push({ file: fileReturned, id: file.id, src: file.image });
          });
      });
      files_loading.forEach(file => {
          urltoFile(file.image, file.filename, file.mime_type).then(fileReturned=>{
              const src = window.URL.createObjectURL(fileReturned);
              images.push({ id: file.id, srcSet: src, media: '(max-width: 320px)', original: file.filename });
          });
      });
      // let filearray = [];
      // const base64filex = files_loading.map((file, index) => {
      //     filearray.push({ id: index, src: "", filename: file.filename, mimetype: file.mime_type });
      //     return filearray;
      // });

      const base64files = [];

      dispatch({ type: 'load', files, images, base64files});
    }
  }

  // Convierte un Base64 en un archivo
  const urltoFile = (url, filename, mimeType)=>{
    // TODO capturar error o controlar try catch
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){
          return new File([buf], filename,{type:mimeType});
        })
    );
  }

  // Sets the next file when it detects that its ready to go
  useEffect(() => {
    if (state.pending.length && state.next == null) {
      const next = state.pending[0]
      dispatch({ type: 'next', next })
    }
  }, [state.next, state.pending])

  const countRef = useRef(0)

  // Processes the next pending thumbnail when ready
  useEffect(() => {
    if (state.pending.length && state.next) {
      const { next } = state
      api
        .uploadFile(next)
        .then(() => {
          const prev = next
          logUploadedFile(++countRef.current)
          const pending = state.pending.slice(1)
          dispatch({ type: 'file-uploaded', prev, pending })
        })
        .catch((error) => {
          console.error(error)
          dispatch({ type: 'set-upload-error', error })
        })
    }
  }, [state])

  // Ends the upload process
  useEffect(() => {
    if (!state.pending.length && state.uploading) {
      dispatch({ type: 'files-uploaded' })
    }
  }, [state.pending.length, state.uploading])

  return {
    ...state,
    reInit,
    loadFilesFromDB,
    onSubmit,
    onChange,
  }
}

export default useFileHandlers
