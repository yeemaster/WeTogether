/**
 * navigation路由reducer处理
 */

import {NavigationActions} from 'react-navigation'
import {AppNavigator} from '../router.js'

export default function nav(state, action) {
    switch (action.type) {
        case 'NewsDetail' :
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'NewsDetail', params: action.payload}),
                state
            );
            break;
        case 'MusicContent' :
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'MusicContent', params: action.payload}),
                state
            );
            break;
        case 'MusicDetail' :
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'MusicDetail', params: action.payload}),
                state
            );
            break;
        case 'FilmDetail' :
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'FilmDetail', params: action.payload}),
                state
            );
            break;
        default :
            return AppNavigator.router.getStateForAction(action, state) || state;
            break;
    }
}
