const initState={
    creator:"Amartya Sarkar deploper",
    data:54,
    loading:false
}
export const anreducer=(state=initState,action)=>{
    if(action.type=="ADD-DATA"){
        return{
            ...state,
            data:state.data+action.payload
        }
    }
    return state;
}