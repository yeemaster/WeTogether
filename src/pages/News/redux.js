import {apiUrl} from '../../util/ApiUrl.js'
import {FetchUtil} from '../../util/FetchData.js'
import {createActions,createAction,handleActions,handleAction} from 'redux-actions'


//actions
const getThemesStart = createAction('GET_THEMES_START');
const getThemesSuccess = createAction('GET_THEMES_SUCCESS');
const getThemesFail = createAction('GET_THEMES_FAIL');

const getThemeListStart = createAction('GET_THEME_LIST_START');
const getThemeListSuccess = createAction('GET_THEME_LIST_SUCCESS');
const getThemeListFail = createAction('GET_THEME_LIST_FAIL');

export function getThemesInfo(){
  return (dispatch,getState) => {
    dispatch(getThemesStart());
  FetchUtil.get(apiUrl.API_THEMES_URL)
           .then((data)=>{
             // console.log(data);
                 dispatch(getThemesSuccess({themesListInfo : data}));
           },(error)=>{
             // console.log(error);
                 dispatch(getThemesFail());
           })
  }
}

export function getThemeListInfo(id,callback){
  return (dispatch,getState) => {
    dispatch(getThemeListStart(id));
  FetchUtil.get(apiUrl.API_THEME_URL + id)
           .then((data)=>{
             // console.log(data);
             // if(callback)
              // data.stories = callback(data.stories);
                 dispatch(getThemeListSuccess({id : id,themesListInfo : data}));
           },(error)=>{
             // console.log(error);
                 dispatch(getThemeListFail(id));
           })
  }
}

//reducers

const defaultState = {
   newsPageStatus : {
      isFetching : false
   },
   newPageThemesList : {
      data : {}
   },
   NewPageItemStatus : {
      isFetching : false
   },
   NewPageItemList : {
      data : {}
   },
   selectedNewsTab : null
}


// export const handleThemesListInfo = handleAction('GET_THEMES_START',
//  (state,action) => {
//    return {
//        ...state,
//        ...{
//            newsPageStatus : {
//               isFetching : true
//            }
//        }
//  }}
// ,defaultState);

export const handleThemesListInfo = handleActions({
  'GET_THEMES_START' : (state,action) => {return {
       ...state,
       ...{
          newsPageStatus : {
             isFetching : true
          }
       }
  }},
  'GET_THEMES_SUCCESS' : (state,action) => {return {
       ...state,
       ...{
         newsPageStatus : {
          isFetching : false
         },
         newPageThemesList : {
          fetchSuccess : true,
          data : action.payload.themesListInfo
         }
       }
  }},
  'GET_THEMES_FAIL' : (state,action) => ({
       ...state,
       ...{
          newsPageStatus : {
            isFetching : false
          },
          newPageThemesList : {
             fetchSuccess : false,
             data : state.newPageThemesList.data
          }
       }
  }),
  'GET_THEME_LIST_START' : (state,action) => {return {
       ...state,
       ...{
         NewPageItemStatus : {
              isFetching : true
         }
       }
  }},
  'GET_THEME_LIST_SUCCESS' : (state,action) => {
     return {
       ...state,
       ...{
         NewPageItemList : {
          data : {
             ...state.NewPageItemList.data,
               ...{[action.payload.id] : action.payload.themesListInfo}
          }
         },
         NewPageItemStatus : {
              isFetching : false
         }
       }
  }},
  'GET_THEME_LIST_FAIL' : (state,action) => ({
       ...state,
       ...{
         NewPageItemList : {
          data : state.NewPageItemList.data
         },
         NewPageItemStatus : {
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
// const getThemesStart = createAction('GET_THEMES_START');
// const getThemesSuccess = createAction('GET_THEMES_SUCCESS');
// const getThemesFail = createAction('GET_THEMES_FAIL');

// const getThemeListStart = createAction('GET_THEME_LIST_START');
// const getThemeListSuccess = createAction('GET_THEME_LIST_SUCCESS');
// const getThemeListFail = createAction('GET_THEME_LIST_FAIL');

// export function getThemesInfo(){
// 	return (dispatch,getState) => {
//     dispatch(getThemesStart());
//     dispatch(getThemesSuccess({themesListInfo : mockApi.apiUrl.API_THEMES_URL}));
// 	}
// }

// export function getThemeListInfo(id,callback){
// 	return (dispatch,getState) => {
//     dispatch(getThemeListStart(id));
//     dispatch(getThemeListSuccess({id : id,themesListInfo : mockApi.apiUrl.API_THEME_URL}));
//   }
// }

// //reducers

// const defaultState = {
//    newsPageStatus : {
//    	  isFetching : false
//    },
//    newPageThemesList : {
//    	  data : {}
//    },
//    NewPageItemStatus : {
//    	  isFetching : false
//    },
//    NewPageItemList : {
//    	  data : {}
//    },
//    selectedNewsTab : null
// }


// // export const handleThemesListInfo = handleAction('GET_THEMES_START',
// // 	(state,action) => {
// // 	  return {
// //        ...state,
// //        ...{
// //        	  newsPageStatus : {
// //        	  	 isFetching : true
// //        	  }
// //        }
// // 	}}
// // ,defaultState);

// export const handleThemesListInfo = handleActions({
// 	'GET_THEMES_START' : (state,action) => {return {
//        ...state,
//        ...{
//        	  newsPageStatus : {
//        	  	 isFetching : true
//        	  }
//        }
// 	}},
// 	'GET_THEMES_SUCCESS' : (state,action) => {return {
//        ...state,
//        ...{
//        	 newsPageStatus : {
//        	 	isFetching : false
//        	 },
//        	 newPageThemesList : {
//        	 	fetchSuccess : true,
//        	 	data : action.payload.themesListInfo
//        	 }
//        }
// 	}},
// 	'GET_THEMES_FAIL' : (state,action) => ({
//        ...state,
//        ...{
//        	  newsPageStatus : {
//        	  	isFetching : false
//        	  },
//        	  newPageThemesList : {
//        	  	 fetchSuccess : false,
//        	  	 data : state.newPageThemesList.data
//        	  }
//        }
// 	}),
// 	'GET_THEME_LIST_START' : (state,action) => {return {
//        ...state,
//        ...{
//        	 NewPageItemStatus : {
//               isFetching : true
//        	 }
//        }
// 	}},
// 	'GET_THEME_LIST_SUCCESS' : (state,action) => {
// 	   return {
//        ...state,
//        ...{
//        	 NewPageItemList : {
//        	 	data : {
//        	 	   ...state.NewPageItemList.data,
//                ...{[action.payload.id] : action.payload.themesListInfo}
//        	 	}
//        	 },
//        	 NewPageItemStatus : {
//             	isFetching : false
//        	 }
//        }
// 	}},
// 	'GET_THEME_LIST_FAIL' : (state,action) => ({
//        ...state,
//        ...{
//        	 NewPageItemList : {
//        	 	data : state.NewPageItemList.data
//        	 },
//        	 NewPageItemStatus : {
//             	isFetching : false
//        	 }
//        }
// 	})
// },defaultState);
