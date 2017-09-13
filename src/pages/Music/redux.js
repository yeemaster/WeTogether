import {
    apiUrl
} from '../../util/ApiUrl.js'
import {
    FetchUtil
} from '../../util/FetchData.js'
import {
    createAction,
    handleActions
} from 'redux-actions'


//actions
const getMusicListStart = createAction('GET_MUSIC_LIST_START');
const getMusicListSuccess = createAction('GET_MUSIC_LIST_SUCCESS');
const getMusicListFail = createAction('GET_MUSIC_LIST_FAIL');


export function getMusicListInfo() {
    return (dispatch, getState) => {
        dispatch(getMusicListStart());
        FetchUtil.get(apiUrl.API_MUSICHOTLIST_URL)
            .then((data) => {
                dispatch(getMusicListSuccess({
                    musicListInfo: data
                }));
            }, (error) => {
                dispatch(getMusicListFail());
            })
    }
}

const getMusicSongsDetailStart = createAction('GET_SONGS_DETAIL_START');
const getMusicSongsDetaiSuccess = createAction('GET_SONGS_DETAL_SUCCESS');
const getMusicSongsDetaiFail = createAction('GET_SONGS_DETAIL_FAIL');

export function getMusicSongsDetail(id) {
    return (dispatch, getState) => {
        dispatch(getMusicSongPlayerDetailStart());
        Promise.all([FetchUtil.get(apiUrl.API_MUSICSONGPLAYER_URL + id), FetchUtil.get(apiUrl.API_MUSICLRY_URL + id)])
            .then((data) => {
                dispatch(getMusicSongPlayerDetailSuccess({
                    id: id,
                    musicSongsDetail: data[0],
                    musicLryContent: data[1]
                }));
            }, (error) => {
                dispatch(getMusicSongPlayerDetailFail());
            })
    }
}

export const getMusicSongPlayerPause = createAction('GET_SONGS_PLAYER_PAUSE');
export const getMusicSongPlayerStart = createAction('GET_SONGS_PLAYER_START');
export const getMusicSongPlayerReset = createAction('GET_SONGS_PLAYER_RESET');

const getMusicRecommendSongListStart = createAction('GET_MUSIC_RECOMMEND_SONG_LIST_START');
const getMusicRecommendSongListSuccess = createAction('GET_MUSIC_RECOMMEND_SONG_LIST_SUCCESS');
const getMusicRecommendSongListFail = createAction('GET_MUSIC_RECOMMEND_SONG_LIST_FAIL');

export function getMusicRecommendSongList() {
    return (dispatch, getState) => {
        dispatch(getMusicRecommendSongListStart());

        Promise.all([FetchUtil.get(apiUrl.API_MUSICALBUMLIST_URL), FetchUtil.get(apiUrl.API_MUSICGOLDLIST_URL)])
            .then((data) => {
                let tempData = data;
                dispatch(getMusicRecommendSongListSuccess({
                    musicAlbumList: tempData[0],
                    musicGoldList: tempData[1]
                }));
            }, (error) => {
                dispatch(getMusicRecommendSongListFail());
            })
    }
}

const getMusicAlbumDetailStart = createAction('GET_MUSIC_ALBUM_DETAIL_START');
const getMusicAlbumDetailSuccess = createAction('GET_MUSIC_ALBUM_DETAIL_SUCCESS');
const getMusicAlbumDetailFail = createAction('GET_MUSIC_ALBUM_DETAIL_FAIL');

export function getMusicAlbumDetail(id) {
    return (dispatch, getState) => {
        dispatch(getMusicAlbumDetailStart());
        FetchUtil.get(apiUrl.API_musicAlbumDetail_URL + id)
            .then((data) => {
                dispatch(getMusicAlbumDetailSuccess({
                    musicAlbumDetail: data
                }));
            }, (error) => {
                dispatch(getMusicAlbumDetailFail());
            })
    }
}

const getMusicSongPlayerDetailStart = createAction('GET_SONGS_PLAYER_DETAIL_START');
const getMusicSongPlayerDetailSuccess = createAction('GET_SONGS_PLAYER_DETAIL_SUCCESS');
const getMusicSongPlayerDetailFail = createAction('GET_SONGS_PLAYER_DETAIL_FAIL');

export function getMusicSongPlayerDetail(id, cb) {
    return (dispatch, getState) => {
        dispatch(getMusicSongPlayerDetailStart());
        Promise.all([FetchUtil.get(apiUrl.API_MUSICSONGPLAYER_URL + id), FetchUtil.get(apiUrl.API_MUSICLRY_URL + id)])
            .then((data) => {
                console.log(data);
                dispatch(getMusicSongPlayerDetailSuccess({
                    id: id,
                    musicSongsDetail: data[0],
                    musicLryContent: data[1].error_code == '22001' ?
                        {"title": "\u65e0\u6b4c\u8bcd", "lrcContent": "[10:10:10]\u65e0\u6b4c\u8bcd\r\n[10:10.20]"}
                        : data[1]
                }))
                if (cb) cb(data[0], data[1]);
            }, (error) => {
                dispatch(getMusicSongPlayerDetailFail());
            })
    }
}



//reducers

const defaultState = {
    musicPageStatus: {
        isFetching: false
    },
    musicPageList: {
        data: [],
        fetchStatus: false
    },
    musicSongsDetailStatus: {
        isFetching: false
    },
    musicSongsDetailList: {
        data: {},
        lryData: {},
        fetchStatus: false
    },
    musicPlayer: {
        pause: true
    },
    musicRecommendStatus: {
        isFetching: false
    },
    musicRecommendList: {
        data: {
            musicAlbumList: [],
            musicGoldList: []
        },
        fetchStatus: false
    },
    musicRecommendSelect: {
        index: 0
    },
    musicAlbumDetail: {
        data: {},
        fetchStatus: false
    },
    musicAlbumDetailStatus: {
        isFetching: false
    }
}

export const handleMusicInfo = handleActions({
    'GET_MUSIC_LIST_START': (state, action) => {
        return {
            ...state,
            ... {
                musicPageList: {
                    data: state.musicPageList.data,
                    fetchStatus: false
                },
                musicPageStatus: {
                    isFetching: true
                }
            }
        }
    },
    'GET_MUSIC_LIST_SUCCESS': (state, action) => {
        return {
            ...state,
            ... {
                musicPageList: {
                    data: action.payload.musicListInfo.song_list,
                    fetchStatus: true
                },
                musicPageStatus: {
                    isFetching: false
                }
            }
        }
    },
    'GET_MUSIC_LIST_FAIL': (state, action) => ({
        ...state,
        ... {
            musicPageList: {
                data: state.musicPageList.data,
                fetchStatus: false
            },
            musicPageStatus: {
                isFetching: false
            }
        }
    }),
    'GET_SONGS_DETAIL_START': (state, action) => {
        return {
            ...state,
            ... {
                musicSongsDetailList: {
                    data: state.musicSongsDetailList.data,
                    lryData: state.musicSongsDetailList.lryData,
                    fetchStatus: false
                },
                musicSongsDetailStatus: {
                    isFetching: true
                }
            }
        }
    },
    'GET_SONGS_DETAL_SUCCESS': (state, action) => {
        return {
            ...state,
            ... {
                musicSongsDetailList: {
                    data: {
                        ...state.musicSongsDetailList.data,
                        ... {
                            [action.payload.id]: action.payload.musicSongsDetail
                        }
                    },
                    lryData: {
                        ...state.musicSongsDetailList.lryData,
                        ...{
                            [action.payload.id]: action.payload.musicLryContent
                        }
                    },
                    fetchStatus: true,
                },
                musicSongsDetailStatus: {
                    isFetching: false
                }
            }
        }
    },
    'GET_SONGS_DETAIL_FAIL': (state, action) => ({
        ...state,
        ... {
            musicSongsDetailList: {
                data: state.musicSongsDetailList.data,
                lryData: state.musicSongsDetailList.lryData,
                fetchStatus: false
            },
            musicSongsDetailStatus: {
                isFetching: false
            }
        }
    }),
    'GET_SONGS_PLAYER_PAUSE': (state, action) => ({
        ...state,
        ...{
            musicPlayer: {
                pause: true
            }
        }
    }),
    'GET_SONGS_PLAYER_DETAIL_START': (state, action) => ({
        ...state,
        ... {
            musicSongsDetailList: {
                data: state.musicSongsDetailList.data,
                lryData: state.musicSongsDetailList.lryData,
                fetchStatus: false
            },
            musicPlayer: {
                pause: true
            },
            musicSongsDetailStatus: {
                isFetching: true
            }
        }
    }),
    'GET_SONGS_PLAYER_DETAIL_SUCCESS': (state, action) => ({
        ...state,
        ... {
            musicSongsDetailList: {
                data: {
                    ...state.musicSongsDetailList.data,
                    ... {
                        [action.payload.id]: action.payload.musicSongsDetail
                    }
                },
                lryData: {
                    ...state.musicSongsDetailList.lryData,
                    ...{
                        [action.payload.id]: action.payload.musicLryContent
                    }
                },
                fetchStatus: true,
            },
            musicPlayer: {
                pause: false
            },
            musicSongsDetailStatus: {
                isFetching: false
            }
        }

    }),
    'GET_SONGS_PLAYER_DETAIL_FAIL': (state, action) => ({
        ...state,
        ... {
            musicSongsDetailList: {
                data: state.musicSongsDetailList.data,
                lryData: state.musicSongsDetailList.lryData,
                fetchStatus: false
            },
            musicPlayer: {
                pause: true
            },
            musicSongsDetailStatus: {
                isFetching: false
            }
        }
    }),
    'GET_SONGS_PLAYER_START': (state, action) => ({
        ...state,
        ...{
            musicPlayer: {
                pause: false
            }
        }
    }),
    'GET_SONGS_PLAYER_RESET': (state, action) => ({
        ...state,
        ...{
            musicPlayer: {
                pause: true
            }
        }
    }),
    'GET_MUSIC_RECOMMEND_SONG_LIST_START': (state, action) => ({
        ...state,
        ... {
            musicRecommendList: {
                data: state.musicRecommendList.data,
                fetchStatus: false
            },
            musicRecommendStatus: {
                isFetching: true
            }
        }
    }),
    'GET_MUSIC_RECOMMEND_SONG_LIST_SUCCESS': (state, action) => ({
        ...state,
        ... {
            musicRecommendList: {
                data: {
                    musicAlbumList: action.payload.musicAlbumList,
                    musicGoldList: action.payload.musicGoldList
                },
                fetchStatus: true
            },
            musicRecommendStatus: {
                isFetching: false
            }
        }
    }),
    'GET_MUSIC_RECOMMEND_SONG_LIST_FAIL': (state, action) => ({
        ...state,
        ... {
            musicRecommendList: {
                data: state.musicRecommendList.data,
                fetchStatus: false
            },
            musicRecommendStatus: {
                isFetching: false
            }
        }
    }),
    'GET_MUSIC_ALBUM_DETAIL_START': (state, action) => ({
        ...state,
        ... {
            musicAlbumDetail: {
                data: state.musicAlbumDetail.data,
                fetchStatus: false
            },
            musicAlbumDetailStatus: {
                isFetching: true
            }
        }
    }),
    'GET_MUSIC_ALBUM_DETAIL_SUCCESS': (state, action) => ({
        ...state,
        ... {
            musicAlbumDetail: {
                data: action.payload.musicAlbumDetail,
                fetchStatus: true
            },
            musicAlbumDetailStatus: {
                isFetching: false
            }
        }
    }),
    'GET_MUSIC_ALBUM_DETAIL_FAIL': (state, action) => ({
        ...state,
        ... {
            musicAlbumDetail: {
                data: state.musicAlbumDetail.data,
                fetchStatus: false
            },
            musicAlbumDetailStatus: {
                isFetching: false
            }
        }
    })
}, defaultState);


//音乐页mock数据调试

// import {apiUrl} from '../../util/ApiUrl.js'
// import * as mockApi from '../../util/MockApi.js'

// import {
//   FetchUtil
// } from '../../util/FetchData.js'
// import {
//   createActions,
//   createAction,
//   handleActions,
//   handleAction
// } from 'redux-actions'

// //actions

// const getMusicListStart = createAction('GET_MUSIC_LIST_START');
// const getMusicListSuccess = createAction('GET_MUSIC_LIST_SUCCESS');
// const getMusicListFail = createAction('GET_MUSIC_LIST_FAIL');


// export function getMusicListInfo() {
//   return (dispatch, getState) => {
//     dispatch(getMusicListStart());
//     dispatch(getMusicListSuccess({
//           musicListInfo: mockApi.apiUrl.API_MUSICHOTLIST_URL
//         }));
//   }
// }


// const getMusicSongsDetailStart = createAction('GET_SONGS_DETAIL_START');
// const getMusicSongsDetaiSuccess = createAction('GET_SONGS_DETAL_SUCCESS');
// const getMusicSongsDetaiFail = createAction('GET_SONGS_DETAIL_FAIL');

// export function getMusicSongsDetail(id) {
//   return (dispatch, getState) => {
//     dispatch(getMusicSongPlayerDetailStart());
//     dispatch(getMusicSongPlayerDetailSuccess({
//       id: id,
//       musicSongsDetail: mockApi.apiUrl.API_MUSICSONGPLAYER_URL,
//       musicLryContent : mockApi.apiUrl.API_MUSICLRY_URL
//     }));
//   }
// }


// export const getMusicSongPlayerPause = createAction('GET_SONGS_PLAYER_PAUSE');
// export const getMusicSongPlayerStart = createAction('GET_SONGS_PLAYER_START');
// export const getMusicSongPlayerReset = createAction('GET_SONGS_PLAYER_RESET');

// const getMusicRecommendSongListStart = createAction('GET_MUSIC_RECOMMEND_SONG_LIST_START');
// const getMusicRecommendSongListSuccess = createAction('GET_MUSIC_RECOMMEND_SONG_LIST_SUCCESS');
// const getMusicRecommendSongListFail = createAction('GET_MUSIC_RECOMMEND_SONG_LIST_FAIL');

// export function getMusicRecommendSongList() {
//   return (dispatch, getState) => {
//     dispatch(getMusicRecommendSongListStart());
//     dispatch(getMusicRecommendSongListSuccess({
//       musicAlbumList : mockApi.apiUrl.API_MUSICALBUMLIST_URL,
//       musicGoldList : mockApi.apiUrl.API_MUSICGOLDLIST_URL
//     }));
//   }
// }


// const getMusicAlbumDetailStart = createAction('GET_MUSIC_ALBUM_DETAIL_START');
// const getMusicAlbumDetailSuccess = createAction('GET_MUSIC_ALBUM_DETAIL_SUCCESS');
// const getMusicAlbumDetailFail = createAction('GET_MUSIC_ALBUM_DETAIL_FAIL');

// export function getMusicAlbumDetail(id) {
//   return (dispatch, getState) => {
//     dispatch(getMusicAlbumDetailStart());
//     dispatch(getMusicAlbumDetailSuccess({
//       musicAlbumDetail: mockApi.apiUrl.API_musicAlbumDetail_URL
//     }));
//   }
// }


// const getMusicSongPlayerDetailStart = createAction('GET_SONGS_PLAYER_DETAIL_START');
// const getMusicSongPlayerDetailSuccess = createAction('GET_SONGS_PLAYER_DETAIL_SUCCESS');
// const getMusicSongPlayerDetailFail = createAction('GET_SONGS_PLAYER_DETAIL_FAIL');

// export function getMusicSongPlayerDetail(id,cb) {
//   return (dispatch, getState) => {
//     dispatch(getMusicSongPlayerDetailStart());

//     console.log('getMusic');
//     console.log(mockApi.apiUrl.API_MUSICLRY_URL);

//     dispatch(getMusicSongPlayerDetailSuccess({
//       id: id,
//       musicSongsDetail: mockApi.apiUrl.API_MUSICSONGPLAYER_URL,
//       musicLryContent : mockApi.apiUrl.API_MUSICLRY_URL
//     })); 

//     if(cb){
//        cb(mockApi.apiUrl.API_MUSICSONGPLAYER_URL,mockApi.apiUrl.API_MUSICLRY_URL)
//     }
//   }
// }

// //reducers

// const defaultState = {
//   musicPageStatus: {
//     isFetching: false
//   },
//   musicPageList: {
//     data: [],
//     fetchStatus: false
//   },
//   musicSongsDetailStatus: {
//     isFetching: false
//   },
//   musicSongsDetailList: {
//     data: {},
//     lryData: {},
//     fetchStatus: false
//   },
//   musicPlayer: {
//     pause : true
//   },
//   musicRecommendStatus : {
//     isFetching : false
//   },
//   musicRecommendList : {
//       data : {
//           musicAlbumList : [],
//           musicGoldList : []
//       },
//       fetchStatus : false
//   },
//   musicRecommendSelect :  {
//      index : 0
//   },
//   musicAlbumDetail : {
//      data : {},
//      fetchStatus : false
//   },
//   musicAlbumDetailStatus :  {
//      isFetching : false
//   }
// }

// export const handleMusicInfo = handleActions({
//   'GET_MUSIC_LIST_START': (state, action) => {
//     return {
//       ...state,
//       ... {
//         musicPageList: {
//             data: state.musicPageList.data,
//             fetchStatus: false
//         },
//         musicPageStatus: {
//           isFetching: true
//         }
//       }
//     }
//   },
//   'GET_MUSIC_LIST_SUCCESS': (state, action) => {
//     return {
//       ...state,
//       ... {
//         musicPageList: {
//           data: action.payload.musicListInfo.song_list,
//           fetchStatus: true
//         },
//         musicPageStatus: {
//           isFetching: false
//         }
//       }
//     }
//   },
//   'GET_MUSIC_LIST_FAIL': (state, action) => ({
//     ...state,
//     ... {
//       musicPageList: {
//           data: state.musicPageList.data,
//           fetchStatus: false
//       },
//       musicPageStatus: {
//         isFetching: false
//       }
//     }
//   }),
//   'GET_SONGS_DETAIL_START': (state, action) => {
//     return {
//       ...state,
//       ... {
//         musicSongsDetailList: {
//           data: state.musicSongsDetailList.data,
//           lryData : state.musicSongsDetailList.lryData,
//           fetchStatus : false
//         },
//         musicSongsDetailStatus: {
//           isFetching: true
//         }
//       }
//     }
//   },
//   'GET_SONGS_DETAL_SUCCESS': (state, action) => {
//     return {
//       ...state,
//       ... {
//         musicSongsDetailList: {
//           data: {
//             ...state.musicSongsDetailList.data,
//             ... {
//               [action.payload.id]: action.payload.musicSongsDetail
//             }
//           },
//           lryData : {
//             ...state.musicSongsDetailList.lryData,
//             ...{
//                [action.payload.id]: action.payload.musicLryContent
//             }
//           },
//           fetchStatus: true,
//         },
//         musicSongsDetailStatus: {
//           isFetching: false
//         }
//       }
//     }
//   },
//   'GET_SONGS_DETAIL_FAIL': (state, action) => ({
//     ...state,
//     ... {
//       musicSongsDetailList: {
//         data: state.musicSongsDetailList.data,
//         lryData : state.musicSongsDetailList.lryData,
//         fetchStatus : false
//       },
//       musicSongsDetailStatus: {
//         isFetching: false
//       }
//     }
//   }),
//   'GET_SONGS_PLAYER_PAUSE' : (state,action) => ({
//      ...state,
//      ...{
//          musicPlayer: {
//           pause : true
//         }     
//      }
//   }),
//   'GET_SONGS_PLAYER_DETAIL_START' : (state,action) => ({
//       ...state,
//       ... {
//         musicSongsDetailList: {
//           data: state.musicSongsDetailList.data,
//           lryData : state.musicSongsDetailList.lryData,
//           fetchStatus : false
//         },
//         musicPlayer : {
//            pause : true
//         },
//         musicSongsDetailStatus: {
//           isFetching: true
//         }
//       }
//   }),
//   'GET_SONGS_PLAYER_DETAIL_SUCCESS' : (state,action) => ({
//       ...state,
//       ... {
//         musicSongsDetailList: {
//           data: {
//             ...state.musicSongsDetailList.data,
//             ... {
//                [action.payload.id]: action.payload.musicSongsDetail
//             }
//           },
//           lryData : {
//             ...state.musicSongsDetailList.lryData,
//             ...{
//                [action.payload.id]: action.payload.musicLryContent
//             }
//           },
//           fetchStatus: true,
//         },
//         musicPlayer : {
//            pause : false
//         },
//         musicSongsDetailStatus: {
//           isFetching: false
//         }
//       }

//   }),
//   'GET_SONGS_PLAYER_DETAIL_FAIL' : (state,action) => ({
//       ...state,
//       ... {
//         musicSongsDetailList: {
//           data: state.musicSongsDetailList.data,
//           lryData : state.musicSongsDetailList.lryData,
//           fetchStatus : false
//         },
//         musicPlayer : {
//            pause : true
//         },
//         musicSongsDetailStatus: {
//           isFetching: false
//         }
//       }
//   }),
//   'GET_SONGS_PLAYER_START' : (state,action) => ({
//      ...state,
//      ...{
//          musicPlayer: {
//           pause : false
//         }     
//      }
//   }),
//   'GET_SONGS_PLAYER_RESET' : (state,action) => ({
//      ...state,
//      ...{
//          musicPlayer: {
//           pause : true
//         }     
//      }
//   }),
//   'GET_MUSIC_RECOMMEND_SONG_LIST_START' : (state,action) => ({
//       ...state,
//       ... {
//         musicRecommendList: {
//           data: state.musicRecommendList.data,
//           fetchStatus : false
//         },
//         musicRecommendStatus: {
//           isFetching: true
//         }
//       }
//   }),
//   'GET_MUSIC_RECOMMEND_SONG_LIST_SUCCESS' : (state,action) => ({
//       ...state,
//       ... {
//         musicRecommendList: {
//           data: {
//             musicAlbumList : action.payload.musicAlbumList,
//             musicGoldList : action.payload.musicGoldList
//           },
//           fetchStatus : true
//         },
//         musicRecommendStatus: {
//           isFetching: false
//         }
//       }      
//   }),
//   'GET_MUSIC_RECOMMEND_SONG_LIST_FAIL' : (state,action) => ({
//       ...state,
//       ... {
//         musicRecommendList: {
//           data: state.musicRecommendList.data,
//           fetchStatus : false
//         },
//         musicRecommendStatus: {
//           isFetching: false
//         }
//       } 
//   }),
//   'GET_MUSIC_ALBUM_DETAIL_START' : (state,action) => ({
//       ...state,
//       ... {
//         musicAlbumDetail: {
//           data: state.musicAlbumDetail.data,
//           fetchStatus : false
//         },
//         musicAlbumDetailStatus: {
//           isFetching: true
//         }
//       }
//   }),
//   'GET_MUSIC_ALBUM_DETAIL_SUCCESS' : (state,action) => ({
//     ...state,
//     ... {
//       musicAlbumDetail: {
//         data: action.payload.musicAlbumDetail,
//         fetchStatus : true
//       },
//       musicAlbumDetailStatus: {
//         isFetching: false
//       }
//     }
//   }),
//   'GET_MUSIC_ALBUM_DETAIL_FAIL' : (state,action) => ({
//     ...state,
//     ... {
//       musicAlbumDetail: {
//         data: state.musicAlbumDetail.data,
//         fetchStatus : false
//       },
//       musicAlbumDetailStatus: {
//         isFetching: false
//       }
//     }
//   })
// }, defaultState);