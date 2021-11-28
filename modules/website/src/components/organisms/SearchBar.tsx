import React, { useState } from "react";

import TextInput from "../atoms/TextInput";

interface SearchBarProps{
    label: string;
    placeholder: string;
    onSubmit: (query: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
    const [query, setQuery] = useState<string>("");
    return (
      <div style={{padding: 10, display: "flex", flexDirection: "column"}}> 
      <label >{props.label} </label>
      <div style={{display: "flex", flexDirection: "row", maxWidth: "500px"}}>
      <TextInput style={{width: '400px'} } placeholder={props.placeholder} value={query} setValue={setQuery}/>
      <button type="submit" onClick={() => props.onSubmit(query || "")}>Submit</button>
      </div>
      </div>)
  }
  