import {apiUrl} from '../../util/ApiUrl.js'
import {FetchUtil} from '../../util/FetchData.js'
import {createActions,createAction,handleActions,handleAction} from 'redux-actions'

//actions

const getFilmListStart = createAction('GET_FILM_LIST_START');
const getFilmListSuccess = createAction('GET_FILM_LIST_SUCCESS');
const getFilmListFail = createAction('GET_FILM_LIST_FAIL');



export function getFilmListInfo(){
  return (dispatch,getState) => {
    dispatch(getFilmListStart());
    FetchUtil.get(apiUrl.API_FILMLIST_URL)
           .then((data)=>{
                 dispatch(getFilmListSuccess({FilmsListInfo : data.data.movies}));
           },(error)=>{
                 dispatch(getFilmListFail());
           })
  }
}


const getFilmDetailDataStart = createAction('GET_FILM_DETAIL_DATA_START');
const getFilmDetailDataSuccess = createAction('GET_FILM_DETAIL_DATA_SUCCESS');
const getFilmDetailDataFail = createAction('GET_FILM_DETAIL_DATA_FAIL');



export function getFilmDetailData(id){
  return (dispatch,getState) => {
    dispatch(getFilmDetailDataStart());
    FetchUtil.get(`${apiUrl.API_FILMDETAIL_URL}${id}.json`)
           .then((data)=>{
                 // console.log(data);
                 dispatch(getFilmDetailDataSuccess({id: id,FilmDetailData : data}));
           },(error)=>{
                 console.log(error);
                 dispatch(getFilmDetailDataFail());
           })
  }
}


//reducers

const defaultState = {
   FilmPageStatus : {
      isFetching : false
   },
   FilmPageList : {
      data : [],
      fetchStatus : false
   },
   FilmDetailData : {
      data : {},
      fetchStatus : false
   },
   FilmDetailStatus : {
      isFetching : false
   }
}

export const handleFilmsListInfo = handleActions({
  'GET_FILM_LIST_START' : (state,action) => {return {
       ...state,
       ...{
         FilmPageStatus : {
            isFetching : true
         }
       }
  }},
  'GET_FILM_LIST_SUCCESS' : (state,action) => {
     return {
       ...state,
       ...{
         FilmPageList : {
            data : state.FilmPageList.data.concat(action.payload.FilmsListInfo),
            fetchStatus : true
         },
         FilmPageStatus : {
            isFetching : false
         }
       }
  }},
  'GET_FILM_LIST_FAIL' : (state,action) => ({
       ...state,
       ...{
         FilmPageStatus : {
            isFetching : false
         }
       }
  }),
  'GET_FILM_DETAIL_DATA_START' : (state,action) => ({
       ...state,
       ...{
         FilmDetailStatus : {
            isFetching : true
         }
       }
  }),
  'GET_FILM_DETAIL_DATA_SUCCESS' : (state,action) => ({
       ...state,
       ...{
         FilmDetailData : {
            data : {
              ...state.FilmDetailData.data,
              [action.payload.id]: action.payload.FilmDetailData
            },
            fetchStatus : true
         },
         FilmDetailStatus : {
            isFetching : false
         }
       }
  }),
  'GET_FILM_DETAIL_DATA_FAIL' : (state,action) => ({
       ...state,
       ...{
         FilmDetailStatus : {
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

// const getFilmListStart = createAction('GET_FILM_LIST_START');
// const getFilmListSuccess = createAction('GET_FILM_LIST_SUCCESS');
// const getFilmListFail = createAction('GET_FILM_LIST_FAIL');



// export function getFilmListInfo(){
//   return (dispatch,getState) => {
//     dispatch(getFilmListStart());
//     // console.log(mockApi.apiUrl);
//     dispatch(getFilmListSuccess({FilmsListInfo : mockApi.apiUrl.API_FILMLIST_URL.data.movies}));
//   }
// }


// const getFilmDetailDataStart = createAction('GET_FILM_DETAIL_DATA_START');
// const getFilmDetailDataSuccess = createAction('GET_FILM_DETAIL_DATA_SUCCESS');
// const getFilmDetailDataFail = createAction('GET_FILM_DETAIL_DATA_FAIL');



// export function getFilmDetailData(id){
//   return (dispatch,getState) => {
//     dispatch(getFilmDetailDataStart());
//     dispatch(getFilmDetailDataSuccess({id: id,FilmDetailData :  mockApi.apiUrl.API_FILMDETAIL_URL}));

//   }
// }


// //reducers

// const defaultState = {
//    FilmPageStatus : {
//       isFetching : false
//    },
//    FilmPageList : {
//       data : [],
//       fetchStatus : false
//    },
//    FilmDetailData : {
//       data : {},
//       fetchStatus : false
//    },
//    FilmDetailStatus : {
//       isFetching : false
//    }
// }

// export const handleFilmsListInfo = handleActions({
//   'GET_FILM_LIST_START' : (state,action) => {return {
//        ...state,
//        ...{
//          FilmPageStatus : {
//             isFetching : true
//          }
//        }
//   }},
//   'GET_FILM_LIST_SUCCESS' : (state,action) => {
//      return {
//        ...state,
//        ...{
//          FilmPageList : {
//             data : state.FilmPageList.data.concat(action.payload.FilmsListInfo),
//             fetchStatus : true
//          },
//          FilmPageStatus : {
//             isFetching : false
//          }
//        }
//   }},
//   'GET_FILM_LIST_FAIL' : (state,action) => ({
//        ...state,
//        ...{
//          FilmPageStatus : {
//             isFetching : false
//          }
//        }
//   }),
//   'GET_FILM_DETAIL_DATA_START' : (state,action) => ({
//        ...state,
//        ...{
//          FilmDetailStatus : {
//             isFetching : true
//          }
//        }
//   }),
//   'GET_FILM_DETAIL_DATA_SUCCESS' : (state,action) => ({
//        ...state,
//        ...{
//          FilmDetailData : {
//             data : {
//               ...state.FilmDetailData.data,
//               [action.payload.id]: action.payload.FilmDetailData
//             },
//             fetchStatus : true
//          },
//          FilmDetailStatus : {
//             isFetching : false
//          }
//        }
//   }),
//   'GET_FILM_DETAIL_DATA_FAIL' : (state,action) => ({
//        ...state,
//        ...{
//          FilmDetailStatus : {
//             isFetching : false
//          }
//        }   
//   })
// },defaultState);