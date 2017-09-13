import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AppNavigator} from './router.js'
import {addNavigationHelpers} from 'react-navigation'

//包装react-navigation和redux的高阶组件
export default AppWithNavigationState = connect(state => ({
    nav: state.nav,
}))(({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
));