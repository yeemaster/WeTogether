import {NavigationActions} from 'react-navigation'
import {AppNavigator} from '../router.js'


// const routerObject = AppNavigator.router.getActionForPathAndParams('NewsPage');
// const initialState = AppNavigator.router.getStateForAction(
//    AppNavigator.router.getActionForPathAndParams('NewsPage')
// )

// console.log(initialState);

// const initialNavState = {
//   index: 0,
//   routes: [
//     // { key: 'InitA', routeName: 'TabPage' },
//     { key: 'InitB', routeName: 'NewsDetail' }
//   ],
// };


// const initialNavState = AppNavigator.router.getStateForAction(
// 	AppNavigator.router.getActionForPathAndParams('TabPage'));


export default function nav(state,action){
	let nextState;
	switch(action.type){
		case 'NewsDetail' : 
		   return AppNavigator.router.getStateForAction(
	             NavigationActions.navigate({routeName : 'NewsDetail',params:action.payload}),
	             state
		   );
		   break;
		case 'MusicContent' : 
		   return AppNavigator.router.getStateForAction(
	             NavigationActions.navigate({routeName : 'MusicContent',params:action.payload}),
	             state
		   );
		   break;
		case 'MusicDetail' : 
		   return AppNavigator.router.getStateForAction(
	             NavigationActions.navigate({routeName : 'MusicDetail',params:action.payload}),
	             state
		   );
		   break;
		case 'FilmDetail' : 
		   return AppNavigator.router.getStateForAction(
	             NavigationActions.navigate({routeName : 'FilmDetail',params:action.payload}),
	             state
		   );
		   break;
		default :
	       return  AppNavigator.router.getStateForAction(action, state) || state;
	       break;
	}
}

// import {AppNavigator} from '../main.js';

// const initialState = AppNavigator.router.getStateForAction(
//    AppNavigator.router.getActionForPathAndParams('MainPage')
// )


// const recentlyVisitedRoutes = new Set();//防止連點，多次navigate，增加此判斷
// const nav = (state=initialState, action) => {
//     if (action.type === 'Navigation/NAVIGATE') {
//         if (recentlyVisitedRoutes.has(action.routeName)) {
//             return state;
//         }
//         recentlyVisitedRoutes.add(action.routeName);
//         setTimeout(() => {
//             recentlyVisitedRoutes.delete(action.routeName);
//         }, 400);
//     }
//     const newState = AppNavigator.router.getStateForAction(action, state);
//     return newState || state;
// };

// export default nav;  

// export default function nav(state={},action){
// 	return state;
// } 