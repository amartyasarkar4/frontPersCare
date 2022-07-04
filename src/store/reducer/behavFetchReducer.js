import * as ActionTypes from "../action/ActionTypes";

const initialState={
    allBehaviors:[],
    loading:false,
    operation:"Fetching Behaviors"
}

export const FetchBehavReducer=(state=initialState,action)=>{
    switch(action.type){
        case ActionTypes.FETCH_BEHAV_START:
            return{
                ...state,
                loading:true
            }
        case ActionTypes.FETCH_BEHAV_SUCCESS:
            return{
                ...state,
                loading:false,
                allBehaviors:action.Allcategs
            }
        case ActionTypes.FETCH_BAHAV_FAIL:
            return{
                ...state,
                loading:false,
            }
        default:
            return state;
    }
}