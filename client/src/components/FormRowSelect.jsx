import React from "react";

const FormRowSelect = ({name, lableText, list, defaultValue, onChange}) => {
    return(
       <div className="form-row">
        <label htmlFor={name} className='form-label'>
          {lableText || name}
        </label>
        <select
         name={name}
         id={name}
         className='form-select'
         defaultValue={defaultValue}
         onChange={onChange}>
          {list.map((itemValue) =>{
            return (
             <option key={itemValue } value={itemValue}>
               {itemValue}
             </option>
            );
          })}
        </select>
       </div>
    );

};
export default FormRowSelect;