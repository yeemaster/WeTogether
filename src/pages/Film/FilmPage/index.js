import React,{Component} from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
  TouchableHighlight,
	ListView,
	Image,
	Dimensions,
  ScrollView
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'

import LoadMoreData from '../../../component/LoadMoreData.js'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getFilmListInfo} from '../redux.js'

let size = {
  width : Dimensions.get('window').width,
  height : Dimensions.get('window').height
}

const ListItem = ({movieData,navigation}) => {
	return (
       <TouchableOpacity style={{marginBottom:10,flexDirection:'row',height:145,backgroundColor:'#fff'}} onPress={()=>{navigation.dispatch({type:'FilmDetail',payload:{id:movieData.id}})}}>
          <View style={{height:145,width:110,justifyContent:'center',alignItems:'center'}}>
            <Image source={{uri:movieData.img}} style={{height:130,width:95}} />
          </View>
          <View style={{flex:1,justifyContent:'space-around'}}>
              <View>
                <Text numberOfLines={1} style={{fontSize:14,marginBottom:3}}>{movieData.nm}</Text>
                <Text numberOfLines={1} style={{fontSize:14,marginBottom:3}}>导演:{movieData.dir}</Text>
                <Text numberOfLines={1} style={{fontSize:14,marginBottom:3}}>{movieData.star}</Text>
              </View>
              <View>
                <Text numberOfLines={1} style={{fontSize:14,color:'#999'}}>{movieData.rt}</Text>
              </View>
          </View>
          <View style={{height:145,width:110,justifyContent:'center',alignItems:'center'}}>
             <View style={{width:90,height:35,backgroundColor:'#ff0000',borderRadius:3,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff'}}>查看详情</Text></View>
          </View>
       </TouchableOpacity>
	)
}

const SwiperItem = ({key,value,navigation}) => {
  return(
       <TouchableHighlight style={{flex:1}} onPress={()=>{navigation.dispatch({type:'FilmDetail',payload:{id:value.id}})}}>
         <Image source={{uri:value.img}} style={{flex:1,width:null,height:null,resizeMode:'cover'}} />
       </TouchableHighlight>
  )
}

const renderPagination = (index,total,context) => {
  return(
    <View style={{position:'absolute',bottom:20,right:10,width:30,height:30,borderRadius:15,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
         <Text>{index+1}/{total}</Text>
    </View>
  )
}  


class FilmPage extends Component{

    static navigationOptions = {
      title : '视频',
      tabBarLabel : '视频',
      tabBarIcon : ({focused,tintColor}) => (<Icon name={focused ? 'ios-film' : 'ios-film-outline'} size={26} style={{color:tintColor}} />)
    }

  	constructor(props) {
  		super(props);
          
          let ds = new ListView.DataSource({
          	rowHasChanged : (r1,r2) => {return r1 !== r2;}
          })
  		this.state = {
              dataSource : ds.cloneWithRows([1,2,3,3,3,3,3,3])
  		};
  	}

    componentWillMount(){

      const {handleFilmsListInfo,navigation,getFilmListInfo} = this.props;
      getFilmListInfo();
    }


    _renderRow(rowData){
       let {navigation} = this.props;
       return(
          <ListItem movieData={rowData} navigation={navigation}/>
       )
    }

    _renderFooter(){
       let {handleFilmsListInfo} = this.props;
       return(
          <LoadMoreData isMoreData={handleFilmsListInfo.filmPageStatus.isFetching} />
       )
    }

    _onEndReached(){
       console.log('ok');
    }

	render(){
    const {handleFilmsListInfo,navigation,getFilmListInfo} = this.props;

    let ds = new ListView.DataSource({
       rowHasChanged : (r1,r2)=>(r1!==r2)
    });
    let dataSource = ds.cloneWithRows([]);
    let hotFilmData = [],SwiperData = [],hotFilmView = null;
    
    if(handleFilmsListInfo.filmPageList && handleFilmsListInfo.filmPageList.data){

        dataSource = ds.cloneWithRows(handleFilmsListInfo.filmPageList.data);

        hotFilmData = [...handleFilmsListInfo.filmPageList.data].reverse().slice(0,10);
        SwiperData =  handleFilmsListInfo.filmPageList.data.slice(0,4);
        hotFilmView = hotFilmData.map((value,key)=>{
           return (
               <TouchableOpacity style={{width:75,height:115,marginRight:10}} key={key} onPress={()=>{navigation.dispatch({type:'FilmDetail',payload:{id:value.id}})}}>
                   <Image source={{uri:value.img}} style={{width:75,height:115}} />
               </TouchableOpacity>
           )
        })
        SwiperView = SwiperData.map((value,key)=>{
            return(
                <View style={{flex:1}} key={key} >
                    <SwiperItem value={value} navigation={navigation}/>
                </View>
            )
        })
    }    

    return(
      <ScrollView showsVerticalScrollIndicator={false}>

           <View style={{height:180,width:size.width}}>
           {
                SwiperData.length ? (
                <Swiper height={180}
                        loop={true}
                        showButtons={false}
                        autoplayTimeout={3}
                        autoPlay={true}
                        index={0}
                        renderPagination={renderPagination}
                       >
                   {SwiperView}
                </Swiper> 
                ) : null
            }             
           </View>

           <View style={{marginVertical:10,marginLeft:5,paddingLeft:5,borderColor:'#999',borderLeftWidth:3,borderStyle:'solid'}}><Text>热门影片</Text></View>
           
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingVertical : 10,borderStyle : 'solid',borderTopWidth : 1,borderBottomWidth : 1,borderColor : '#fff',paddingLeft:10}}>
                {hotFilmView}
           </ScrollView>
     
           <View style={{marginVertical:10,marginLeft:5,paddingLeft:5,borderColor:'#999',borderLeftWidth:3,borderStyle:'solid'}}><Text>影片列表</Text></View>
           
           <ListView 
              initialListSize={2}
              dataSource={dataSource}
              renderRow={this._renderRow.bind(this)}
              renderFooter={this._renderFooter.bind(this)}
              onEndReached={this._onEndReached.bind(this)}
              onEndReachedThresHold={30}
              enableEmptySections={true}
           />
      </ScrollView>
		)
	}
}

// 样式
var styles = StyleSheet.create({

});


const mapActionCreators = (dispatch) => {
  return {
     getFilmListInfo : bindActionCreators(getFilmListInfo,dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
     handleFilmsListInfo : state.handleFilmsListInfo
  }
}

export default connect(mapStateToProps,mapActionCreators)(FilmPage);