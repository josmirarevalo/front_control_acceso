import React, {Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputFile from './InputFile';
import { ImageByProcessDeleteAction } from '../../store/actions/ImageByProcess.actions';

require('dotenv').config();

export default function InputFilesList(props){

    // Redux
    const dispatch = useDispatch();

    const deleteFile = (id) => {
        //e.preventDefault();
        dispatch(ImageByProcessDeleteAction(id))
    };

    return (
        <Fragment>
            <div className="file">
                <label id="file-input">Seleccione archivos</label>
                <InputFile onChange={props.onChange}/>
            </div>
            <div>
                {props.files.map(({ file, src, id }, index) => {
                    return <div
                        style={{
                            opacity: props.uploaded[id] ? 0.2 : 1,
                        }}
                        key={`thumb${index}`}
                        className="thumbnail-wrapper"
                    >
                        <img className="thumbnail" src={src || `${process.env.REACT_APP_IMAGES_URL}/${file.filename}`} alt=""/>            
                        {/* <label className="text-bold">{file.description}</label>                         */}
                        <label className="text-bold">{file.description}</label>                        
                        <div className={'ml-auto'}><button className="btn btn-danger" onClick={()=>{ deleteFile(id) }}><i className="icon-trash"/></button></div>
                        
                    </div>
                })}
            </div>
        </Fragment>
    )
}