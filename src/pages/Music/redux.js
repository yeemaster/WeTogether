import {
  apiUrl
} from '../../util/ApiUrl.js'
import {
  FetchUtil
} from '../../util/FetchData.js'
import {
  createActions,
  createAction,
  handleActions,
  handleAction
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
          MusicListInfo: data
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
    Promise.all([FetchUtil.get(apiUrl.API_MUSICSONGPLAYER_URL + id),FetchUtil.get(apiUrl.API_MUSICLRY_URL+id)])
      .then((data) => {
        // console.log(data);
        dispatch(getMusicSongPlayerDetailSuccess({
          id: id,
          MusicSongsDetail: data[0],
          MusicLryContent : data[1]
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

    Promise.all([FetchUtil.get(apiUrl.API_MUSICALBUMLIST_URL),FetchUtil.get(apiUrl.API_MUSICGOLDLIST_URL)])
    .then((data)=>{
        // console.log(data);
        let tempData = data;

        dispatch(getMusicRecommendSongListSuccess({
          MusicAlbumList : tempData[0],
          MusicGoldList : tempData[1]
        }));
    },(error)=>{
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
    FetchUtil.get(apiUrl.API_MUSICALBUMDETAIL_URL + id)
      .then((data) => {
        dispatch(getMusicAlbumDetailSuccess({
          MusicAlbumDetail: data
        }));
      }, (error) => {
        dispatch(getMusicAlbumDetailFail());
      })
  }
}



const getMusicSongPlayerDetailStart = createAction('GET_SONGS_PLAYER_DETAIL_START');
const getMusicSongPlayerDetailSuccess = createAction('GET_SONGS_PLAYER_DETAIL_SUCCESS');
const getMusicSongPlayerDetailFail = createAction('GET_SONGS_PLAYER_DETAIL_FAIL');

export function getMusicSongPlayerDetail(id,cb) {
  return (dispatch, getState) => {
    dispatch(getMusicSongPlayerDetailStart());
    Promise.all([FetchUtil.get(apiUrl.API_MUSICSONGPLAYER_URL + id),FetchUtil.get(apiUrl.API_MUSICLRY_URL+id)])
      .then((data) => {
        console.log(data);
        dispatch(getMusicSongPlayerDetailSuccess({
          id: id,
          MusicSongsDetail: data[0],
          MusicLryContent : data[1].error_code == '22001' ?  
            {"title": "\u65e0\u6b4c\u8bcd","lrcContent": "[10:10:10]\u65e0\u6b4c\u8bcd\r\n[10:10.20]"}
            : data[1]
        })) 
        if(cb) cb(data[0],data[1]);
      }, (error) => {
        dispatch(getMusicSongPlayerDetailFail());
      })
  }
}

//reducers

const defaultState = {
  MusicPageStatus: {
    isFetching: false
  },
  MusicPageList: {
    data: [],
    fetchStatus: false
  },
  MusicSongsDetailStatus: {
    isFetching: false
  },
  MusicSongsDetailList: {
    data: {},
    lryData: {},
    fetchStatus: false
  },
  MusicPlayer: {
    pause : true
  },
  MusicRecommendStatus : {
    isFetching : false
  },
  MusicRecommendList : {
      data : {
          MusicAlbumList : [],
          MusicGoldList : []
      },
      fetchStatus : false
  },
  MusicRecommendSelect :  {
     index : 0
  },
  MusicAlbumDetail : {
     data : {},
     fetchStatus : false
  },
  MusicAlbumDetailStatus :  {
     isFetching : false
  }
}

export const handleMusicInfo = handleActions({
  'GET_MUSIC_LIST_START': (state, action) => {
    return {
      ...state,
      ... {
        MusicPageList: {
            data: state.MusicPageList.data,
            fetchStatus: false
        },
        MusicPageStatus: {
          isFetching: true
        }
      }
    }
  },
  'GET_MUSIC_LIST_SUCCESS': (state, action) => {
    return {
      ...state,
      ... {
        MusicPageList: {
          data: action.payload.MusicListInfo.song_list,
          fetchStatus: true
        },
        MusicPageStatus: {
          isFetching: false
        }
      }
    }
  },
  'GET_MUSIC_LIST_FAIL': (state, action) => ({
    ...state,
    ... {
      MusicPageList: {
          data: state.MusicPageList.data,
          fetchStatus: false
      },
      MusicPageStatus: {
        isFetching: false
      }
    }
  }),
  'GET_SONGS_DETAIL_START': (state, action) => {
    return {
      ...state,
      ... {
        MusicSongsDetailList: {
          data: state.MusicSongsDetailList.data,
          lryData : state.MusicSongsDetailList.lryData,
          fetchStatus : false
        },
        MusicSongsDetailStatus: {
          isFetching: true
        }
      }
    }
  },
  'GET_SONGS_DETAL_SUCCESS': (state, action) => {
    return {
      ...state,
      ... {
        MusicSongsDetailList: {
          data: {
            ...state.MusicSongsDetailList.data,
            ... {
              [action.payload.id]: action.payload.MusicSongsDetail
            }
          },
          lryData : {
            ...state.MusicSongsDetailList.lryData,
            ...{
               [action.payload.id]: action.payload.MusicLryContent
            }
          },
          fetchStatus: true,
        },
        MusicSongsDetailStatus: {
          isFetching: false
        }
      }
    }
  },
  'GET_SONGS_DETAIL_FAIL': (state, action) => ({
    ...state,
    ... {
      MusicSongsDetailList: {
        data: state.MusicSongsDetailList.data,
        lryData : state.MusicSongsDetailList.lryData,
        fetchStatus : false
      },
      MusicSongsDetailStatus: {
        isFetching: false
      }
    }
  }),
  'GET_SONGS_PLAYER_PAUSE' : (state,action) => ({
     ...state,
     ...{
         MusicPlayer: {
          pause : true
        }     
     }
  }),
  'GET_SONGS_PLAYER_DETAIL_START' : (state,action) => ({
      ...state,
      ... {
        MusicSongsDetailList: {
          data: state.MusicSongsDetailList.data,
          lryData : state.MusicSongsDetailList.lryData,
          fetchStatus : false
        },
        MusicPlayer : {
           pause : true
        },
        MusicSongsDetailStatus: {
          isFetching: true
        }
      }
  }),
  'GET_SONGS_PLAYER_DETAIL_SUCCESS' : (state,action) => ({
      ...state,
      ... {
        MusicSongsDetailList: {
          data: {
            ...state.MusicSongsDetailList.data,
            ... {
               [action.payload.id]: action.payload.MusicSongsDetail
            }
          },
          lryData : {
            ...state.MusicSongsDetailList.lryData,
            ...{
               [action.payload.id]: action.payload.MusicLryContent
            }
          },
          fetchStatus: true,
        },
        MusicPlayer : {
           pause : false
        },
        MusicSongsDetailStatus: {
          isFetching: false
        }
      }

  }),
  'GET_SONGS_PLAYER_DETAIL_FAIL' : (state,action) => ({
      ...state,
      ... {
        MusicSongsDetailList: {
          data: state.MusicSongsDetailList.data,
          lryData : state.MusicSongsDetailList.lryData,
          fetchStatus : false
        },
        MusicPlayer : {
           pause : true
        },
        MusicSongsDetailStatus: {
          isFetching: false
        }
      }
  }),
  'GET_SONGS_PLAYER_START' : (state,action) => ({
     ...state,
     ...{
         MusicPlayer: {
          pause : false
        }     
     }
  }),
  'GET_SONGS_PLAYER_RESET' : (state,action) => ({
     ...state,
     ...{
         MusicPlayer: {
          pause : true
        }     
     }
  }),
  'GET_MUSIC_RECOMMEND_SONG_LIST_START' : (state,action) => ({
      ...state,
      ... {
        MusicRecommendList: {
          data: state.MusicRecommendList.data,
          fetchStatus : false
        },
        MusicRecommendStatus: {
          isFetching: true
        }
      }
  }),
  'GET_MUSIC_RECOMMEND_SONG_LIST_SUCCESS' : (state,action) => ({
      ...state,
      ... {
        MusicRecommendList: {
          data: {
            MusicAlbumList : action.payload.MusicAlbumList,
            MusicGoldList : action.payload.MusicGoldList
          },
          fetchStatus : true
        },
        MusicRecommendStatus: {
          isFetching: false
        }
      }      
  }),
  'GET_MUSIC_RECOMMEND_SONG_LIST_FAIL' : (state,action) => ({
      ...state,
      ... {
        MusicRecommendList: {
          data: state.MusicRecommendList.data,
          fetchStatus : false
        },
        MusicRecommendStatus: {
          isFetching: false
        }
      } 
  }),
  'GET_MUSIC_ALBUM_DETAIL_START' : (state,action) => ({
      ...state,
      ... {
        MusicAlbumDetail: {
          data: state.MusicAlbumDetail.data,
          fetchStatus : false
        },
        MusicAlbumDetailStatus: {
          isFetching: true
        }
      }
  }),
  'GET_MUSIC_ALBUM_DETAIL_SUCCESS' : (state,action) => ({
    ...state,
    ... {
      MusicAlbumDetail: {
        data: action.payload.MusicAlbumDetail,
        fetchStatus : true
      },
      MusicAlbumDetailStatus: {
        isFetching: false
      }
    }
  }),
  'GET_MUSIC_ALBUM_DETAIL_FAIL' : (state,action) => ({
    ...state,
    ... {
      MusicAlbumDetail: {
        data: state.MusicAlbumDetail.data,
        fetchStatus : false
      },
      MusicAlbumDetailStatus: {
        isFetching: false
      }
    }
  })
}, defaultState);

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
//           MusicListInfo: mockApi.apiUrl.API_MUSICHOTLIST_URL
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
//       MusicSongsDetail: mockApi.apiUrl.API_MUSICSONGPLAYER_URL,
//       MusicLryContent : mockApi.apiUrl.API_MUSICLRY_URL
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
//       MusicAlbumList : mockApi.apiUrl.API_MUSICALBUMLIST_URL,
//       MusicGoldList : mockApi.apiUrl.API_MUSICGOLDLIST_URL
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
//       MusicAlbumDetail: mockApi.apiUrl.API_MUSICALBUMDETAIL_URL
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
//       MusicSongsDetail: mockApi.apiUrl.API_MUSICSONGPLAYER_URL,
//       MusicLryContent : mockApi.apiUrl.API_MUSICLRY_URL
//     })); 

//     if(cb){
//        cb(mockApi.apiUrl.API_MUSICSONGPLAYER_URL,mockApi.apiUrl.API_MUSICLRY_URL)
//     }
//   }
// }

// //reducers

// const defaultState = {
//   MusicPageStatus: {
//     isFetching: false
//   },
//   MusicPageList: {
//     data: [],
//     fetchStatus: false
//   },
//   MusicSongsDetailStatus: {
//     isFetching: false
//   },
//   MusicSongsDetailList: {
//     data: {},
//     lryData: {},
//     fetchStatus: false
//   },
//   MusicPlayer: {
//     pause : true
//   },
//   MusicRecommendStatus : {
//     isFetching : false
//   },
//   MusicRecommendList : {
//       data : {
//           MusicAlbumList : [],
//           MusicGoldList : []
//       },
//       fetchStatus : false
//   },
//   MusicRecommendSelect :  {
//      index : 0
//   },
//   MusicAlbumDetail : {
//      data : {},
//      fetchStatus : false
//   },
//   MusicAlbumDetailStatus :  {
//      isFetching : false
//   }
// }

// export const handleMusicInfo = handleActions({
//   'GET_MUSIC_LIST_START': (state, action) => {
//     return {
//       ...state,
//       ... {
//         MusicPageList: {
//             data: state.MusicPageList.data,
//             fetchStatus: false
//         },
//         MusicPageStatus: {
//           isFetching: true
//         }
//       }
//     }
//   },
//   'GET_MUSIC_LIST_SUCCESS': (state, action) => {
//     return {
//       ...state,
//       ... {
//         MusicPageList: {
//           data: action.payload.MusicListInfo.song_list,
//           fetchStatus: true
//         },
//         MusicPageStatus: {
//           isFetching: false
//         }
//       }
//     }
//   },
//   'GET_MUSIC_LIST_FAIL': (state, action) => ({
//     ...state,
//     ... {
//       MusicPageList: {
//           data: state.MusicPageList.data,
//           fetchStatus: false
//       },
//       MusicPageStatus: {
//         isFetching: false
//       }
//     }
//   }),
//   'GET_SONGS_DETAIL_START': (state, action) => {
//     return {
//       ...state,
//       ... {
//         MusicSongsDetailList: {
//           data: state.MusicSongsDetailList.data,
//           lryData : state.MusicSongsDetailList.lryData,
//           fetchStatus : false
//         },
//         MusicSongsDetailStatus: {
//           isFetching: true
//         }
//       }
//     }
//   },
//   'GET_SONGS_DETAL_SUCCESS': (state, action) => {
//     return {
//       ...state,
//       ... {
//         MusicSongsDetailList: {
//           data: {
//             ...state.MusicSongsDetailList.data,
//             ... {
//               [action.payload.id]: action.payload.MusicSongsDetail
//             }
//           },
//           lryData : {
//             ...state.MusicSongsDetailList.lryData,
//             ...{
//                [action.payload.id]: action.payload.MusicLryContent
//             }
//           },
//           fetchStatus: true,
//         },
//         MusicSongsDetailStatus: {
//           isFetching: false
//         }
//       }
//     }
//   },
//   'GET_SONGS_DETAIL_FAIL': (state, action) => ({
//     ...state,
//     ... {
//       MusicSongsDetailList: {
//         data: state.MusicSongsDetailList.data,
//         lryData : state.MusicSongsDetailList.lryData,
//         fetchStatus : false
//       },
//       MusicSongsDetailStatus: {
//         isFetching: false
//       }
//     }
//   }),
//   'GET_SONGS_PLAYER_PAUSE' : (state,action) => ({
//      ...state,
//      ...{
//          MusicPlayer: {
//           pause : true
//         }     
//      }
//   }),
//   'GET_SONGS_PLAYER_DETAIL_START' : (state,action) => ({
//       ...state,
//       ... {
//         MusicSongsDetailList: {
//           data: state.MusicSongsDetailList.data,
//           lryData : state.MusicSongsDetailList.lryData,
//           fetchStatus : false
//         },
//         MusicPlayer : {
//            pause : true
//         },
//         MusicSongsDetailStatus: {
//           isFetching: true
//         }
//       }
//   }),
//   'GET_SONGS_PLAYER_DETAIL_SUCCESS' : (state,action) => ({
//       ...state,
//       ... {
//         MusicSongsDetailList: {
//           data: {
//             ...state.MusicSongsDetailList.data,
//             ... {
//                [action.payload.id]: action.payload.MusicSongsDetail
//             }
//           },
//           lryData : {
//             ...state.MusicSongsDetailList.lryData,
//             ...{
//                [action.payload.id]: action.payload.MusicLryContent
//             }
//           },
//           fetchStatus: true,
//         },
//         MusicPlayer : {
//            pause : false
//         },
//         MusicSongsDetailStatus: {
//           isFetching: false
//         }
//       }

//   }),
//   'GET_SONGS_PLAYER_DETAIL_FAIL' : (state,action) => ({
//       ...state,
//       ... {
//         MusicSongsDetailList: {
//           data: state.MusicSongsDetailList.data,
//           lryData : state.MusicSongsDetailList.lryData,
//           fetchStatus : false
//         },
//         MusicPlayer : {
//            pause : true
//         },
//         MusicSongsDetailStatus: {
//           isFetching: false
//         }
//       }
//   }),
//   'GET_SONGS_PLAYER_START' : (state,action) => ({
//      ...state,
//      ...{
//          MusicPlayer: {
//           pause : false
//         }     
//      }
//   }),
//   'GET_SONGS_PLAYER_RESET' : (state,action) => ({
//      ...state,
//      ...{
//          MusicPlayer: {
//           pause : true
//         }     
//      }
//   }),
//   'GET_MUSIC_RECOMMEND_SONG_LIST_START' : (state,action) => ({
//       ...state,
//       ... {
//         MusicRecommendList: {
//           data: state.MusicRecommendList.data,
//           fetchStatus : false
//         },
//         MusicRecommendStatus: {
//           isFetching: true
//         }
//       }
//   }),
//   'GET_MUSIC_RECOMMEND_SONG_LIST_SUCCESS' : (state,action) => ({
//       ...state,
//       ... {
//         MusicRecommendList: {
//           data: {
//             MusicAlbumList : action.payload.MusicAlbumList,
//             MusicGoldList : action.payload.MusicGoldList
//           },
//           fetchStatus : true
//         },
//         MusicRecommendStatus: {
//           isFetching: false
//         }
//       }      
//   }),
//   'GET_MUSIC_RECOMMEND_SONG_LIST_FAIL' : (state,action) => ({
//       ...state,
//       ... {
//         MusicRecommendList: {
//           data: state.MusicRecommendList.data,
//           fetchStatus : false
//         },
//         MusicRecommendStatus: {
//           isFetching: false
//         }
//       } 
//   }),
//   'GET_MUSIC_ALBUM_DETAIL_START' : (state,action) => ({
//       ...state,
//       ... {
//         MusicAlbumDetail: {
//           data: state.MusicAlbumDetail.data,
//           fetchStatus : false
//         },
//         MusicAlbumDetailStatus: {
//           isFetching: true
//         }
//       }
//   }),
//   'GET_MUSIC_ALBUM_DETAIL_SUCCESS' : (state,action) => ({
//     ...state,
//     ... {
//       MusicAlbumDetail: {
//         data: action.payload.MusicAlbumDetail,
//         fetchStatus : true
//       },
//       MusicAlbumDetailStatus: {
//         isFetching: false
//       }
//     }
//   }),
//   'GET_MUSIC_ALBUM_DETAIL_FAIL' : (state,action) => ({
//     ...state,
//     ... {
//       MusicAlbumDetail: {
//         data: state.MusicAlbumDetail.data,
//         fetchStatus : false
//       },
//       MusicAlbumDetailStatus: {
//         isFetching: false
//       }
//     }
//   })
// }, defaultState);