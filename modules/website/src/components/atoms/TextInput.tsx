import React from 'react';

interface TextInputProps {
    placeholder: string;
    value: string | undefined;
    setValue: (newValue: string) => void;
    style: Record<string, string>;
}

export default function TextInput(props: TextInputProps) {
    return (
        <input style={props.style} type="text" value={props.value} onChange={(e) => props.setValue(e.target.value)} placeholder={props.placeholder}/>
    )
}