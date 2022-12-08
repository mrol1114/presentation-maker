import React, {useState} from "react";

function InputComponent(props: {additionalClass: string, value: string|number}): JSX.Element
{
    const [value, setValue] = useState("");

    return (
        <input className={props.additionalClass} value={value ? value : props.value} onChange={e => {setValue(e.target.value)}} type="text"/>
    );
}

export default InputComponent;