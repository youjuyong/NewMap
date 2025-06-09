
import { UserReducePropsType } from "../../../type/reducer_types";
const LOGIN   = "userInfo/LOGIN"   as const;
const CRLEAR = "userInfo/DELETE" as const;

export const user_login = ( props : UserReducePropsType ) => (
    
    {
           type : LOGIN
      , payload : { 
                    id : props.id
                  , token : props.token
                  , expireIn : props.token
                  , nickName : props.nickName
                  , masterYn : props.masterYn
                  , connected_at : props.connected_at
                  } 
    }
)

export const user_clear = () => ({ type : CRLEAR })

type userStateType = {
      id : string | null,
connected_at : string | null 
       token ?: string | null, 
    expireIn ?: number | null, 
    nickName ?: string | null, 
    masterYn ?: string | null,
};
const initalState : userStateType = {
       id : null,
        token : null,
    expireIn : null, 
     nickName : null,
     masterYn : null,
   connected_at : null
};

type UserActionType = 
    | ReturnType<typeof user_login> | ReturnType<typeof user_clear>;


export default function userReducer( state : userStateType = initalState
    , action : UserActionType ) {

        switch ( action.type ) {
            case  LOGIN :
                return { 
                           id : action.payload.id, 
                        token : action.payload.token, 
                     expireIn : action.payload.token, 
                     nickName : action.payload.nickName, 
                     masterYn : action.payload.masterYn, 
                 connected_at : action.payload.connected_at
                       };
            case CRLEAR :
                return {
                              id : null,
                           token : null,
                        expireIn : null, 
                        nickName : null,
                        masterYn : null,
                    connected_at : null
                        };            
            default : return state;
        }
}

