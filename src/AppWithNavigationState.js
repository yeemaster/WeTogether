import React,{Component} from 'react'
import {connect} from 'react-redux'
import {AppNavigator} from './router.js'
import {addNavigationHelpers} from 'react-navigation'


// const AppWithNavigationState = ({dispatch,nav}) => {
// 	<AppNavigator navigation={addNavigationHelpers({dispatch,state:nav})} />
// }

// class AppWithNavigationState extends Component{
// 	render(){
// 		return(
//           <AppNavigator navigation={addNavigationHelpers({
//               dispatch : this.props.dispatch,
//               nav : this.props.nav
//           })} />
// 		)
// 	}
// }

// // AppWithNavigationState.propTypes = {
// // 	dispatch : PropTypes.func.isRequired,
// // 	nav : PropTypes.Object.isRequired
// // }



// const mapStateToProps = state => {
// 	return {nav : state.nav}
// }

// export default connect(mapStateToProps)(AppWithNavigationState);



export default AppWithNavigationState = connect(state => ({
  nav: state.nav,
}))(({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));