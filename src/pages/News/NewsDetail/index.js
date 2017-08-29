import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  WebView,
  ActivityIndicator
} from 'react-native'

import {apiUrl} from '../../../util/ApiUrl.js' 

export default class NewsDetail extends Component{
   constructor(props) {
     super(props);
   
     this.state = {

     };
   }

   render(){
      let targetUrl = apiUrl.API_NEWDETAIL_WEBURL + this.props.navigation.state.params.id;

   	  return(
         <WebView
            ref={(ref)=>{this.webView=ref}}
            style={{flex:1}}
            source={{uri:targetUrl}}
            javaScriptEnabled 
            domStorageEnabled 
            startInLoadingState 
            scalesPageToFit 
            decelerationRate='normal'
            onShouldStartLoadWithRequest={()=>{
            	const shouldStartLoad = true;
            	return shouldStartLoad;
            }}
            // onNavigationStateChange={}
            renderLoading={()=>{
            	return(
                   <View style={{flex:1,paddingTop:20}}>
                      <ActivityIndicator color='#999'/>
                   </View>
            	)
            }}
         />
   	  )
   }
}