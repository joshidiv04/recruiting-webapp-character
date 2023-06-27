import React from "react";
import {Attributes} from "./Attributes";
import {Skills} from './Skills';
import {CharClass} from './CharClass';
import "../App.css";

export const Character=({characterIndex})=>{
    return (
        <div className="character">
            <Attributes characterIndex={characterIndex} />
            <CharClass characterIndex={characterIndex}/>
            <Skills characterIndex={characterIndex}/>
        </div>
    )
}
