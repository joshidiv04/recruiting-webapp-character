const charactersInitialState = {
    characters: []
};
const characterReducer = (state = charactersInitialState, action) => {
    switch (action.type) {
        case "ADD_CHARACTER":{
            return {
                ...state,
                characters: [...state.characters, action.payload.character]
            }
        }
        case 'INCREMENT_ATTRIBUTE':{
            const characterIndex = action.payload.characterIndex;
            const attributes = [...state.characters[characterIndex].attributes];
            const attribute = attributes[action.payload.attributeIndex];
            let total = state.characters[characterIndex].attributes.reduce((total, attribute) => {
                return total + attribute.value;
            }, 0);
            //remove this logic
            if(total <70){
                attribute.value = attribute.value + 1;
                attribute.mod = Math.floor((attribute.value - 10) / 2);
            }
            else{
                alert("You have reached the maximum number of attribute points");
            }
            return {
                ...state,
                characters: state.characters.map((c, index)=>{
                    if(characterIndex===index){

                        return {
                            ...c,
                            attributes: attributes,
                        }
                    }
                    return c;

                })

            };
        }
        case 'DECREMENT_ATTRIBUTE':{
            let characterIndex = action.payload.characterIndex;
            const attributes = [...state.characters[characterIndex].attributes];
            const attribute = attributes[action.payload.attributeIndex];
            attribute.value = attribute.value - 1;
            attribute.mod = Math.floor((attribute.value - 10) / 2);
            return {
                ...state,
                characters: state.characters.map((c, index)=>{
                    if(characterIndex===index){
                        return {
                            ...c,
                            attributes: attributes,
                        }
                    }
                    return c;

                })

            };
        }
        case 'INCREMENT_SKILL':{
            let characterIndex = action.payload.characterIndex;
            const skills =[...state.characters[characterIndex].skills];
            const skill = skills[action.payload.skillIndex];
            skill.value = skill.value + 1;
            return {
                ...state,
                characters: state.characters.map((c, index)=>{
                    if(characterIndex===index){
                        return {
                            ...c,
                            skills: skills,
                        }
                    }
                    return c;

                })

            };
        }
        case 'DECREMENT_SKILL':{
            let characterIndex = action.payload.characterIndex;
            const skills =[...state.characters[characterIndex].skills];
            const skill = skills[action.payload.skillIndex];
            skill.value = skill.value - 1;
            return {
                ...state,
                characters: state.characters.map((c, index)=>{
                    if(characterIndex===index){
                        return {
                            ...c,
                            skills: skills,

                        }
                    }
                    return c;

                })

            };
        }
        default:
            return state;
    }
}
export default characterReducer;