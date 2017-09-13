import {apiUrl} from '../../util/ApiUrl.js'
import {FetchUtil} from '../../util/FetchData.js'
import {createAction, handleActions} from 'redux-actions'

//actions
const gethomeOneListStart = createAction('GET_HOME_ONE_LIST_START');
const gethomeOneListSuccess = createAction('GET_HOME_ONE_LIST_SUCCESS');
const getHomeOneFail = createAction('GET_HOME_ONE_LIST_FAIL');

export function gethomeOneListInfo(time) {
    return (dispatch, getState) => {
        dispatch(gethomeOneListStart());
        FetchUtil.get(apiUrl.API_HOMEONE_URL + time)
            .then((data) => {
                dispatch(gethomeOneListSuccess({homeOneListInfo: data.data}));
            }, (error) => {
                dispatch(gethomeOneListFail());
            })
    }
}


//reducers
const defaultState = {
    homeOneStatus: {
        isFetching: false
    },
    homeOneList: {
        data: [],
        fetchStatus: false
    }
}

export const handlehomeOneListInfo = handleActions({
    'GET_HOME_ONE_LIST_START': (state, action) => {
        return {
            ...state,
            ...{
                homeOneStatus: {
                    isFetching: true
                }
            }
        }
    },
    'GET_HOME_ONE_LIST_SUCCESS': (state, action) => {
        return {
            ...state,
            ...{
                homeOneList: {
                    data: action.payload.homeOneListInfo,
                    fetchStatus: true
                },
                homeOneStatus: {
                    isFetching: false
                }
            }
        }
    },
    'GET_HOME_ONE_LIST_FAIL': (state, action) => ({
        ...state,
        ...{
            homeOneStatus: {
                isFetching: false
            }
        }
    })
}, defaultState);



// 主页mock数据调试

// import {apiUrl} from '../../util/ApiUrl.js'
// import {FetchUtil} from '../../util/FetchData.js'
// import {createActions,createAction,handleActions,handleAction} from 'redux-actions'
// import * as mockApi from '../../util/MockApi.js'


// //actions

// const gethomeOneListStart = createAction('GET_HOME_ONE_LIST_START');
// const gethomeOneListSuccess = createAction('GET_HOME_ONE_LIST_SUCCESS');
// const gethomeOneListFail = createAction('GET_HOME_ONE_LIST_FAIL');


// export function gethomeOneListInfo(){
//   return (dispatch,getState) => {
//     dispatch(gethomeOneListStart());
//     dispatch(gethomeOneListSuccess({homeOneListInfo : mockApi.apiUrl.API_HOMEONE_URL.data}));
//   }
// }


// //reducers

// const defaultState = {
//    homeOneStatus : {
//       isFetching : false
//    },
//    homeOneList : {
//       data : [],
//       fetchStatus : false
//    }
// }

// export const handlehomeOneListInfo = handleActions({
//   'GET_HOME_ONE_LIST_START' : (state,action) => {return {
//        ...state,
//        ...{
//          homeOneStatus : {
//             isFetching : true
//          }
//        }
//   }},
//   'GET_HOME_ONE_LIST_SUCCESS' : (state,action) => {
//      return {
//        ...state,
//        ...{
//          homeOneList : {
//             data :  action.payload.homeOneListInfo,
//             fetchStatus : true
//          },
//          homeOneStatus : {
//             isFetching : false
//          }
//        }
//   }},
//   'GET_HOME_ONE_LIST_FAIL' : (state,action) => ({
//        ...state,
//        ...{
//          homeOneStatus : {
//             isFetching : false
//          }
//        }
//   })
// },defaultState);