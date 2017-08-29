import React,{Component} from 'react'
import {
	View,
	Text,
	Dimensions,
	Animated,
	Easing,
	StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

var size = {
	width : Dimensions.get('window').width,
	height : Dimensions.get('window').height
}

var AnimationIcon = Animated.createAnimatedComponent(Icon);

export default class Splash extends Component{
   
   constructor(props) {
     super(props);
   
     this.state = {
     	opacityData : new Animated.Value(1),
     	transformData : new Animated.Value(1) 
     };
   }

   componentDidMount(){

   	  Animated.timing(this.state.opacityData,{
   	  	 toValue : 0,
   	  	 duration : 1200,
   	  	 delay : 2200,
   	  	 ease : Easing.elastic(2)
   	  }).start();

   	  Animated.timing(this.state.transformData,{
   	  	toValue : 50,
   	  	duration : 1200,
   	  	delay : 2000,
   	  	ease : Easing.elastic(1)
   	  }).start();

   	  this.timer = setTimeout(()=>{
   	  	this.props.hideSplashShow();
   	  },2500);
   }

   componentWillUnmount(){
   	  clearTimeout(this.timer);
   }

   render(){
   	  return(
        <Animated.View style={[styles.splashWrap,{opacity:this.state.opacityData}]}>
           <AnimationIcon style={[styles.splashIcon,{transform:[{scale:this.state.transformData}]}]}name={'ios-boat'} size={25} />      
        </Animated.View>
   	  )
   }
}

const styles = StyleSheet.create({
	splashWrap : {
		position : 'absolute',
		top : 0,
		left : 0,
		width : size.width,
		height : size.height,
		justifyContent : 'center',
		alignItems : 'center',
		backgroundColor : 'white'
	},
	splashIcon : {
        position : 'relative',
        fontSize : 80,
        color: '#000',
        left : 0,
        bottom : 20
	}
})
