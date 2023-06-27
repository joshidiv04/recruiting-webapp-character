import React from "react";
import {useDispatch, useSelector} from 'react-redux';

export const Attributes=({characterIndex})=>{

    const dispatch = useDispatch();
    const attributes = useSelector(state => state.characters[characterIndex].attributes);

    const handleIncrementAttribute=(characterIndex, attributeIndex)=>{
        dispatch({type:'INCREMENT_ATTRIBUTE', payload:{characterIndex:characterIndex, attributeIndex:attributeIndex}});
    }

    const handleDecrementAttribute=(characterIndex, attributeIndex)=>{
        dispatch({type:'DECREMENT_ATTRIBUTE', payload:{characterIndex:characterIndex, attributeIndex:attributeIndex}});
    }

    return (
        <div className="attributes">
            <h3>Attributes</h3>
            {
                attributes.map((attribute, index)=>{
                    return (
                        <div key={index}>
                            <span>{attribute.name}: {attribute.value}</span>
                            <span> (modifier: {attribute.mod})</span>
                            <button onClick={()=>handleIncrementAttribute(characterIndex, index)}>+</button>
                            <button onClick={()=>handleDecrementAttribute(characterIndex, index)}>-</button>
                        </div>
                    )
                })
            }
        </div>
    )
}