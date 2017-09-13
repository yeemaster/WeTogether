import {apiUrl} from '../../util/ApiUrl.js'
import {FetchUtil} from '../../util/FetchData.js'
import {createActions, createAction, handleActions, handleAction} from 'redux-actions'

//actions

const getFilmListStart = createAction('GET_FILM_LIST_START');
const getFilmListSuccess = createAction('GET_FILM_LIST_SUCCESS');
const getFilmListFail = createAction('GET_FILM_LIST_FAIL');

export function getFilmListInfo() {
    return (dispatch, getState) => {
        dispatch(getFilmListStart());
        FetchUtil.get(apiUrl.API_FILMLIST_URL)
            .then((data) => {
                dispatch(getFilmListSuccess({filmsListInfo: data.data.movies}));
            }, (error) => {
                dispatch(getFilmListFail());
            })
    }
}

const getfilmDetailDataStart = createAction('GET_FILM_DETAIL_DATA_START');
const getfilmDetailDataSuccess = createAction('GET_FILM_DETAIL_DATA_SUCCESS');
const getfilmDetailDataFail = createAction('GET_FILM_DETAIL_DATA_FAIL');

export function getfilmDetailData(id) {
    return (dispatch, getState) => {
        dispatch(getfilmDetailDataStart());
        FetchUtil.get(`${apiUrl.API_FILMDETAIL_URL}${id}.json`)
            .then((data) => {
                dispatch(getfilmDetailDataSuccess({id: id, filmDetailData: data}));
            }, (error) => {
                console.log(error);
                dispatch(getfilmDetailDataFail());
            })
    }
}


//reducers
const defaultState = {
    filmPageStatus: {
        isFetching: false
    },
    filmPageList: {
        data: [],
        fetchStatus: false
    },
    filmDetailData: {
        data: {},
        fetchStatus: false
    },
    filmDetailStatus: {
        isFetching: false
    }
}

export const handleFilmsListInfo = handleActions({
    'GET_FILM_LIST_START': (state, action) => {
        return {
            ...state,
            ...{
                filmPageStatus: {
                    isFetching: true
                }
            }
        }
    },
    'GET_FILM_LIST_SUCCESS': (state, action) => {
        return {
            ...state,
            ...{
                filmPageList: {
                    data: state.filmPageList.data.concat(action.payload.filmsListInfo),
                    fetchStatus: true
                },
                filmPageStatus: {
                    isFetching: false
                }
            }
        }
    },
    'GET_FILM_LIST_FAIL': (state, action) => ({
        ...state,
        ...{
            filmPageStatus: {
                isFetching: false
            }
        }
    }),
    'GET_FILM_DETAIL_DATA_START': (state, action) => ({
        ...state,
        ...{
            filmDetailStatus: {
                isFetching: true
            }
        }
    }),
    'GET_FILM_DETAIL_DATA_SUCCESS': (state, action) => ({
        ...state,
        ...{
            filmDetailData: {
                data: {
                    ...state.filmDetailData.data,
                    [action.payload.id]: action.payload.filmDetailData
                },
                fetchStatus: true
            },
            filmDetailStatus: {
                isFetching: false
            }
        }
    }),
    'GET_FILM_DETAIL_DATA_FAIL': (state, action) => ({
        ...state,
        ...{
            filmDetailStatus: {
                isFetching: false
            }
        }
    })
}, defaultState);


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
//     dispatch(getFilmListSuccess({filmsListInfo : mockApi.apiUrl.API_FILMLIST_URL.data.movies}));
//   }
// }


// const getfilmDetailDataStart = createAction('GET_FILM_DETAIL_DATA_START');
// const getfilmDetailDataSuccess = createAction('GET_FILM_DETAIL_DATA_SUCCESS');
// const getfilmDetailDataFail = createAction('GET_FILM_DETAIL_DATA_FAIL');


// export function getfilmDetailData(id){
//   return (dispatch,getState) => {
//     dispatch(getfilmDetailDataStart());
//     dispatch(getfilmDetailDataSuccess({id: id,filmDetailData :  mockApi.apiUrl.API_FILMDETAIL_URL}));

//   }
// }


// //reducers

// const defaultState = {
//    filmPageStatus : {
//       isFetching : false
//    },
//    filmPageList : {
//       data : [],
//       fetchStatus : false
//    },
//    filmDetailData : {
//       data : {},
//       fetchStatus : false
//    },
//    filmDetailStatus : {
//       isFetching : false
//    }
// }

// export const handleFilmsListInfo = handleActions({
//   'GET_FILM_LIST_START' : (state,action) => {return {
//        ...state,
//        ...{
//          filmPageStatus : {
//             isFetching : true
//          }
//        }
//   }},
//   'GET_FILM_LIST_SUCCESS' : (state,action) => {
//      return {
//        ...state,
//        ...{
//          filmPageList : {
//             data : state.filmPageList.data.concat(action.payload.filmsListInfo),
//             fetchStatus : true
//          },
//          filmPageStatus : {
//             isFetching : false
//          }
//        }
//   }},
//   'GET_FILM_LIST_FAIL' : (state,action) => ({
//        ...state,
//        ...{
//          filmPageStatus : {
//             isFetching : false
//          }
//        }
//   }),
//   'GET_FILM_DETAIL_DATA_START' : (state,action) => ({
//        ...state,
//        ...{
//          filmDetailStatus : {
//             isFetching : true
//          }
//        }
//   }),
//   'GET_FILM_DETAIL_DATA_SUCCESS' : (state,action) => ({
//        ...state,
//        ...{
//          filmDetailData : {
//             data : {
//               ...state.filmDetailData.data,
//               [action.payload.id]: action.payload.filmDetailData
//             },
//             fetchStatus : true
//          },
//          filmDetailStatus : {
//             isFetching : false
//          }
//        }
//   }),
//   'GET_FILM_DETAIL_DATA_FAIL' : (state,action) => ({
//        ...state,
//        ...{
//          filmDetailStatus : {
//             isFetching : false
//          }
//        }   
//   })
// },defaultState);