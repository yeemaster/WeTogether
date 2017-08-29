// import React,{Component} from 'react'
// import {Provider} from 'react-redux'
// import configureStore from './store/configureStore.js'
// import AppWithNavigationState from './AppWithNavigationState.js'


// const store = configureStore();  

// export default class App extends Component{
// 	render(){
// 		return(
//            <Provider store={store}>
//              <AppWithNavigationState />
//            </Provider>
// 		)
// 	}
// }



import React,{Component} from 'react'
import {StyleSheet,View,Text} from 'react-native'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore.js'
import AppWithNavigationState from './AppWithNavigationState.js'
import Splash from './component/Splash.js'
import AppIntro from 'react-native-app-intro';


const store = configureStore();  

export default class App extends Component{

	constructor(props) {
	  super(props);
	  this.state = {
	  	 showSplash : true,
	  	 showIntro : true
	  };
	  this.hideSplashShow = this.hideSplashShow.bind(this);
	  this.onSkipBtnHandle = this.onSkipBtnHandle.bind(this);
	  this.doneBtnHandle = this.doneBtnHandle.bind(this);
	  this.onSlideChangeHandle = this.onSlideChangeHandle.bind(this);
      
	}

	hideSplashShow(){
	  this.setState({
	  	 showSplash : false
	  })
	}
	onSkipBtnHandle(index){
	    // Alert.alert('Skip');
	    console.log(index);
	    this.setState({
	  	   showIntro : false
	    })
	}
	doneBtnHandle(){
	    // Alert.alert('Done');
	    this.setState({
	  	   showIntro : false
	    })

	}
	nextBtnHandle(index){
	   // Alert.alert('Next');
	   console.log(index);
	}
	onSlideChangeHandle(index, total){
	   if(index == total - 1){
		    this.setState({
		  	   showIntro : false
		    })	   	
	   }
	}
 	

	render(){
		return(
		   this.state.showSplash ? 	
		       <Splash hideSplashShow={this.hideSplashShow} /> : 
		       (
			   	    this.state.showIntro ? 
			   	    (

						<AppIntro
						  onNextBtnClick={this.nextBtnHandle}
						  onDoneBtnClick={this.doneBtnHandle}
						  onSkipBtnClick={this.onSkipBtnHandle}
						  onSlideChange={this.onSlideChangeHandle}
						  doneBtnLabel='主页面'
						  skipBtnLabel='跳过'
						  showSkipButton={false}
						  showDoneButton={false}
						  showDots={false}
						>
						<View style={[styles.slide,{ backgroundColor: '#999' }]}>
						  <View level={10} style={styles.circle}><Text style={styles.text}>1</Text></View>
						</View>
						<View style={[styles.slide, { backgroundColor: '#eee' }]}>
						  <View level={10} style={styles.circle}><Text style={{fontSize:30,fontWeight:'bold',color:'#000'}}>2</Text></View>
						</View>
						<View style={[styles.slide,{ backgroundColor: '#999' }]}>
						  <View level={10} style={styles.circle}><Text style={styles.text}>3</Text></View>
						</View>
						<View style={[styles.slide, { backgroundColor: '#eee' }]}>
						  <View level={10} style={styles.circle}><Text style={{fontSize:30,fontWeight:'bold',color:'#000'}}>开始</Text></View>
						</View>
						</AppIntro>
			   	    ) : 
			   	    (
		               <Provider store={store}>
		                  <AppWithNavigationState />
		               </Provider> 
	                )
                )
		)
	}
}


const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  circle : {
  	 width : 80,
  	 height : 80,
  	 borderRadius : 40,
  	 borderWidth : 5,
  	 borderColor :'#000',
  	 borderStyle : 'solid',
  	 justifyContent : 'center',
  	 alignItems : 'center'
  }
});