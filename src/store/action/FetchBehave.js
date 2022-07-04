import * as ActionTypes from "./ActionTypes";
import axios from "axios";

export const FetchBehav=()=>{
    return dispatch=>{
        dispatch(FetchBehavStart());
        fetch("/allBehaves",{
            headers:{
                'Content-Type':'application/json'
            },
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            dispatch(FetchBehavSuccess(result.categs));
        })
        .catch((e)=>{
            console.log(e);
            dispatch(FetchBehavFail(e));
        })
    }

}
const FetchBehavStart=()=>{
    return{
        type:ActionTypes.FETCH_BEHAV_START
    }
}
const FetchBehavSuccess=(categs)=>{
    console.log(categs);
    return{
        type:ActionTypes.FETCH_BEHAV_SUCCESS,
        Allcategs:categs
    }
}
const FetchBehavFail=(e)=>{
    console.log(e);
    return{
        type:ActionTypes.FETCH_BAHAV_FAIL
    }
}