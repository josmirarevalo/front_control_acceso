import React from 'react';

export default function InputFile(props){
  
  return(
    <input
      type="file"
      accept="image/*"
      name="img-loader-input"
      id="file-input"
      multiple
      {...props}
    />
  )
}