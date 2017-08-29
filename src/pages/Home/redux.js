import {apiUrl} from '../../util/ApiUrl.js'
import {FetchUtil} from '../../util/FetchData.js'
import {createActions,createAction,handleActions,handleAction} from 'redux-actions'

//actions

const getHomeOneListStart = createAction('GET_HOME_ONE_LIST_START');
const getHomeOneListSuccess = createAction('GET_HOME_ONE_LIST_SUCCESS');
const getHomeOneFail = createAction('GET_HOME_ONE_LIST_FAIL');



export function getHomeOneListInfo(time){
  return (dispatch,getState) => {
    dispatch(getHomeOneListStart());
    FetchUtil.get(apiUrl.API_HOMEONE_URL + time)
           .then((data)=>{
                 dispatch(getHomeOneListSuccess({HomeOneListInfo : data.data}));
           },(error)=>{
                 dispatch(getHomeOneListFail());
           })
  }
}

//reducers

const defaultState = {
   HomeOneStatus : {
      isFetching : false
   },
   HomeOneList : {
      data : [],
      fetchStatus : false
   }
}

export const handleHomeOneListInfo = handleActions({
  'GET_HOME_ONE_LIST_START' : (state,action) => {return {
       ...state,
       ...{
         HomeOneStatus : {
            isFetching : true
         }
       }
  }},
  'GET_HOME_ONE_LIST_SUCCESS' : (state,action) => {
     return {
       ...state,
       ...{
         HomeOneList : {
            data :  action.payload.HomeOneListInfo,
            fetchStatus : true
         },
         HomeOneStatus : {
            isFetching : false
         }
       }
  }},
  'GET_HOME_ONE_LIST_FAIL' : (state,action) => ({
       ...state,
       ...{
         HomeOneStatus : {
            isFetching : false
         }
       }
  })
},defaultState);



// import {apiUrl} from '../../util/ApiUrl.js'
// import {FetchUtil} from '../../util/FetchData.js'
// import {createActions,createAction,handleActions,handleAction} from 'redux-actions'
// import * as mockApi from '../../util/MockApi.js'


// //actions

// const getHomeOneListStart = createAction('GET_HOME_ONE_LIST_START');
// const getHomeOneListSuccess = createAction('GET_HOME_ONE_LIST_SUCCESS');
// const getHomeOneListFail = createAction('GET_HOME_ONE_LIST_FAIL');



// export function getHomeOneListInfo(){
//   return (dispatch,getState) => {
//     dispatch(getHomeOneListStart());
//     dispatch(getHomeOneListSuccess({HomeOneListInfo : mockApi.apiUrl.API_HOMEONE_URL.data}));
//   }
// }


// //reducers

// const defaultState = {
//    HomeOneStatus : {
//       isFetching : false
//    },
//    HomeOneList : {
//       data : [],
//       fetchStatus : false
//    }
// }

// export const handleHomeOneListInfo = handleActions({
//   'GET_HOME_ONE_LIST_START' : (state,action) => {return {
//        ...state,
//        ...{
//          HomeOneStatus : {
//             isFetching : true
//          }
//        }
//   }},
//   'GET_HOME_ONE_LIST_SUCCESS' : (state,action) => {
//      return {
//        ...state,
//        ...{
//          HomeOneList : {
//             data :  action.payload.HomeOneListInfo,
//             fetchStatus : true
//          },
//          HomeOneStatus : {
//             isFetching : false
//          }
//        }
//   }},
//   'GET_HOME_ONE_LIST_FAIL' : (state,action) => ({
//        ...state,
//        ...{
//          HomeOneStatus : {
//             isFetching : false
//          }
//        }
//   })
// },defaultState);