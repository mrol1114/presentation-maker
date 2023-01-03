import React, {useEffect, useState} from "react";
import { dispatch } from "../../../actions/actions";
import * as functions from "../../../common/functions";

function InputComponent(props: {additionalClass: string, value: string|number}): JSX.Element
{
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(props.value.toString());
    }, [props.value]);

    const onChangeHandler = e => {
        const newValue: number = e.target.value && e.target.value >= 0 ? Number(e.target.value) : 0;
        setValue(newValue.toString());

        dispatch(functions.updateText, {fontSize: newValue});
    }

    return (
        <input className={props.additionalClass} value={value} onChange={onChangeHandler} type="text"/>
    );
}

export default InputComponent;