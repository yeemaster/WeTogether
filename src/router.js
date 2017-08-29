import React,{Component} from 'react'
import {
	View,
	Text,
	Button
} from 'react-native'
import {StackNavigator,TabNavigator,TabBarBottom, addNavigationHelpers} from 'react-navigation'
import {connect} from 'react-redux'

import Splash from './component/Splash.js'

import HomePage from './pages/Home/HomePage/index.js'
import FilmPage from './pages/Film/FilmPage/index.js'
import FilmDetail from './pages/Film/FilmDetail/index.js'

import BlogPage from './pages/Blog/BlogPage/index.js'
import BlogDetail from './pages/Blog/BlogDetail/index.js'

import MusicPage from './pages/Music/MusicPage/index.js'
import MusicContent from './pages/Music/MusicContent/index.js'
import MusicDetail from './pages/Music/MusicDetail/index.js'
import MusicPlayer from './pages/Music/MusicPlayer/index.js'

import NewsDetail from './pages/News/NewsDetail/index.js'
import NewsPage from './pages/News/NewsPage/index.js'


const TabPage = TabNavigator({
		HomePage : {
			screen : HomePage
		},
	    MusicPage : {
            screen : MusicPage
		},			
		FilmPage : {
            screen : FilmPage
		},		
		NewsPage : {
			screen : NewsPage
		}
	},
    {
    	tabBarComponent : TabBarBottom,
    	tabBarPosition : 'bottom',
    	swipeEnabled : false,
    	animationEnabled : false,
    	lazy : true,
    	tabBarOptions : {
    		activeTintColor : '#000',
    		inactiveTintColor : '#999',
    		showLabel : false,
    		style : {
    			backgroundColor : '#fff'
    		},
    		labelStyle : {
    			fontSize : 12
    		},
    		indicatorStyle:{
    			height: 0
    		},
    		iconStyle : {

    		}
    	}
    }
);

export const AppNavigator = StackNavigator(
	{
		TabPage : {screen : TabPage},
		NewsDetail : {screen : NewsDetail},
		MusicContent : {screen : MusicContent},
		MusicDetail : {screen : MusicDetail},
		FilmDetail : {screen: FilmDetail}
	},
	{
		initialRouteName: 'TabPage',
		navigationOptions : {
			headerTintColor : '#999'
		},
		mode : 'card'
	}
);



// export default class Main extends Component{
// 	constructor(props) {
// 	  super(props);
// 	  this.state = {
// 	  	 showSplash : true
// 	  };
// 	  this.hideSplashShow = this.hideSplashShow.bind(this);
// 	}

// 	hideSplashShow(){
// 	  this.setState({
// 	  	 showSplash : false
// 	  })
// 	}

// 	render(){
// 		return(
//            <View style={{flex: 1}}>
//               {
//                  // this.state.showSplash ? 
//                  // <Splash hideSplashShow={this.hideSplashShow} /> : 
//                  <Navigators />              
//              }
//            </View>
// 		)
// 	}
// }

