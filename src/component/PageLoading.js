import React,{Component} from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';

class PageLoading extends Component {
   render(){
     return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',marginTop:50}}>
            <ActivityIndicator color='#999' size='large'/>
        </View>
      )
   }
}

export default PageLoading;