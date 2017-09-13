/**
 * 根reducer
 */

import {combineReducers} from 'redux'
import nav from './routerReducer.js'
import {handleThemesListInfo } from '../pages/News/redux.js'
import {handleFilmsListInfo} from '../pages/Film/redux.js'
import {handleMusicInfo} from '../pages/Music/redux.js'
import {handlehomeOneListInfo} from '../pages/Home/redux.js'


export const rootReducer = combineReducers({
    nav,
    handleThemesListInfo,
    handleFilmsListInfo,
    handleMusicInfo,
    handlehomeOneListInfo
});
