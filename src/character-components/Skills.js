import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";

const getModVal = (attributeModifier, attributes) => {
    const attribute = attributes.find((a) => a.name === attributeModifier);
    return attribute.mod;
}

export const Skills = ({characterIndex}) => {
    const [skillPointsUsed, setSkillPointsUsed] = useState(0);
    const  skills  = useSelector((state) => state.characters)[characterIndex].skills;
    const  attributes  = useSelector((state) => state.characters)[characterIndex].attributes;

    const skillPointsTotal = 10+ 4 * attributes.find((a) => a.name === "Intelligence")?.mod || 0 //recheck this logic

    const dispatch = useDispatch();
    const handleOnClick = (operation, characterIndex, skillIndex)=>{
        if(operation === "INCREMENT_SKILL"){
            if(skillPointsTotal - skillPointsUsed >0){
                setSkillPointsUsed(skillPointsUsed+1)
                dispatch({ type: operation, payload: { characterIndex, skillIndex } })
            }
        }
        else{
            setSkillPointsUsed(skillPointsUsed-1)
            dispatch({ type: operation, payload: { characterIndex, skillIndex } })
        }

    }
    return (
        <div>
            <h1>Skills</h1>
            <div>Total skill points available: {skillPointsTotal}</div>
            <div>Total skill points spent: {skillPointsUsed}</div>
            {skills?.map(({name, attributeModifier, value}, skillIndex)=>(

                <div key ={name+skillIndex}>
                    <label> {name}:{value} </label>
                    <label> (Modifier: {attributeModifier}) {getModVal(attributeModifier, attributes)} </label>
                    <button onClick={() => handleOnClick("INCREMENT_SKILL", characterIndex, skillIndex)}>+</button>
                    <button onClick={() => handleOnClick("DECREMENT_SKILL",characterIndex, skillIndex )}>-</button>
                    <label> Total :{value + getModVal(attributeModifier, attributes) }</label> {/* redo this logic */}

                </div>))}
        </div>)

}