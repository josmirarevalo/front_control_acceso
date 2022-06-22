import React from "react";
import Select from "react-select";
import { FormGroup } from "@material-ui/core";

function SelectData(props){

  const handleChange = value => {
    props.onChange(props.field, value);
  };

  const handleBlur = () => {
    props.onBlur(props.field, true);
  };

  const applyTextField = (props.applyTextField===undefined||props.applyTextField===null?true:false);
  return (
    <FormGroup>
      {applyTextField ? <label className="text-bold">{props.textField} {props.isRequired ? '(*)' : ''}</label> : null}
      <Select
        isClearable={(props.isClearable===true?true:false)}
        isMulti={(props.isMulti===true?true:false)}
        name={props.fieldName}
        options={props.options}
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
        defaultValue={props.defaultValue}
        isDisabled={(props.isDisabled!==undefined&&props.isDisabled!==null?props.isDisabled:false)}        
      />
      {!!props.error && props.touched && (
        <div style={{ color: "red", marginTop: ".5rem" }}>
          {props.error}
        </div>
      )}
    </FormGroup>
  );
}

export default SelectData;