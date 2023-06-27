import React from "react";
import { useSelector} from 'react-redux';
import {CLASS_LIST} from '../consts';
import {useState} from 'react';

const getColor = (attributes, c) => {

    let isValid = true;
    Object.keys(c.reqs).forEach((key)=>{
        let attribute = attributes.find((a)=>a.name === key);
        if(attribute){
             if(attribute.value < c.reqs[key]){
                isValid = false;
                return;
            }
        }
    });
    if (isValid){
        return 'red';
    }
    return 'white';
}

export const CharClass=({characterIndex})=>{
    const [displayReqs, setDisplayReqs] = useState(null);
    const classchars =  Object.keys(CLASS_LIST).map((key)=>{
        return ({name: key,
                reqs: CLASS_LIST[key]});
    });
    const attributes = useSelector(state => state.characters[characterIndex].attributes);

    const handleClassClick=(c)=>{
        setDisplayReqs({
            name: c.name,
            reqs: Object.keys(c.reqs).map(
                (key)=>{return ({ skill: key, val: c.reqs[key]})}
            )
        })
    }

    return(
        <div>
            <h1>Classes</h1>
                <div>
                    {classchars.map((c) => {
                        return <div style={ {color:getColor(attributes, c)}} onClick={()=>handleClassClick(c)} >{c.name}</div>
                    })}
                </div>

            {displayReqs && <div style={{ marginRight: 10 }}>
                <h2>{displayReqs.name} reqs</h2>
                <div>
                {displayReqs.reqs.map((req) => {
                     return <div>{req.skill}: {req.val}</div>
                })}
                </div>
                <button onClick={()=>setDisplayReqs(null)} >Close</button>
            </div>}
        </div>
    );
}