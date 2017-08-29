
import React,{Component} from 'react'
import {
	ActivityIndicator,
	View,
	Text,
	StyleSheet
} from 'react-native'

export default class LoadMoreData extends Component{
   render(){
   	  const {isMoreData} = this.props;
   	  const tip = isMoreData ?  '正在加载数据..' : '- 没有更多的数据了 -' ;

   	  return(
         <View style={styles.loadContainer}>
            {isMoreData ? <ActivityIndicator /> : null}
            <Text style={styles.tips}>{tip}</Text>   	
         </View>
   	  )
   }
}

LoadMoreData.propTypes = {
	isMoreData : React.PropTypes.bool
}

LoadMoreData.defaultProps = {
	isMoreData : false
}

const styles = StyleSheet.create({
   loadContainer : {
      height : 40,
      justifyContent: 'center',
      alignItems : 'center',
      flexDirection : 'row'
   },
   tips : {
   	  fontSize : 14,
   	  color : 'gray'
   }
})