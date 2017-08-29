import React,{Component} from 'react'

import {
	  View,
	  StyleSheet,
	  Text,
    ListView,
    Image,
    Dimensions,
    TouchableOpacity,
    InteractionManager
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import ScrollableTabView,{DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'
import LoadMoreData from '../../../component/LoadMoreData.js'
import {AlertUtil} from '../../../util/AlertUtil.js'

import {apiUrl} from '../../../util/ApiUrl.js'
import {FetchUtil} from '../../../util/FetchData.js'
import PageLoading from '../../../component/PageLoading.js'

import {getThemesInfo,getThemeListInfo} from '../redux.js'

let size = {
	width : Dimensions.get('window').width,
	height: Dimensions.get('window').height
}

const NewsItem = ({navigation,newsTabItemContent}) => {
	return(
       <TouchableOpacity 
            onPress={() => navigation.dispatch({ type: 'NewsDetail',payload:{id:newsTabItemContent.id}})}
            style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:2,borderWidth:1,borderColor:'#999',height:70,width:size.width-20,flexDirection:'row'}}>
         <View style={{flex:1,justifyContent:'center',height:70,paddingLeft:10}}>
            <Text style={{height:35,fontSize:14}}>{newsTabItemContent.title}</Text>
         </View>
         <View style={{width:60,height:70,justifyContent:'center',alignItems:'center'}}>
            { 
              newsTabItemContent.images ?   
              <Image source={{uri:newsTabItemContent.images[0].replace('http:','https:')}} style={{width:50,height:50}} /> : null
            }
         </View>
       </TouchableOpacity>
	)
}

class NewsList extends Component{
  
	constructor(props) {
	  super(props);
	}

	_renderRow(rowData, sectionID, rowID){
       return(
          <NewsItem navigation={this.props.navigation} newsTabItemContent={rowData} />
       )
	}

	_renderFooter(){
       const {handleThemesListInfo} = this.props;     
       return(
          <LoadMoreData isMoreData={handleThemesListInfo.NewPageItemStatus.isFetching} />
       )
	}

	_onEndReached(){
       // console.log('ok');
	}


  componentDidMount(){
     let {newsTabItemContent,getThemeListInfo} = this.props; 

     getThemeListInfo(newsTabItemContent.id);
  }

	render(){

    const {handleThemesListInfo,navigation,newsTabItemContent} = this.props;

    let ds = new ListView.DataSource({
       rowHasChanged : (r1,r2)=>(r1!==r2)
    });
    let dataSource = ds.cloneWithRows([]);
    
    if(handleThemesListInfo.NewPageItemList && handleThemesListInfo.NewPageItemList.data[newsTabItemContent.id]){
        dataSource = ds.cloneWithRows(handleThemesListInfo.NewPageItemList.data[newsTabItemContent.id].stories);    
    }

		return(
          <ListView
             dataSource={dataSource}
             renderRow={this._renderRow.bind(this)}
             renderFooter={this._renderFooter.bind(this)}
             onEndReached={this._onEndReached}
             onEndReachedThreshold={30}
             initialListSize={2}
             enableEmptySections={true}
          />
		)
	}
}

class NewsPage extends Component{

  static  navigationOptions = {
      title : '资讯',
      tabBarLabel : '资讯',
      tabBarIcon : ({focused,tintColor}) => (<Icon name={focused ? 'ios-planet' : 'ios-planet-outline'} size={26} style={{color:tintColor}} />)
  }

	constructor(props) {
	    super(props);
	
	    this.state = {};
	}

  componentWillMount(){
      const {getThemesInfo} = this.props;
      getThemesInfo();
  }

	render(){ 

      const {handleThemesListInfo,navigation,getThemeListInfo} = this.props;

      let news = handleThemesListInfo.newsPageStatus.isFetching ? 
                 <PageLoading />  :
                 handleThemesListInfo.newPageThemesList.fetchSuccess ? 
                  <ScrollableTabView
                      renderTabBar={()=><ScrollableTabBar />}
                      tabBarUnderlineStyle={{height:2,backgroundColor:'#FF0000'}}
                      tabBarBackgroundColor='#FFFFFF'
                      tabBarActiveTextColor='#FF0000'
                      tabBarTextStyle={{fontSize: 14}}
                   >
                      {
                         handleThemesListInfo.newPageThemesList.data.others.map((val,key)=>{
                            return (
                            <View tabLabel={val.name} key={val.id}>
                                   <NewsList navigation={navigation}  newsTabItemContent={val} getThemeListInfo={getThemeListInfo} handleThemesListInfo={handleThemesListInfo}/>
                            </View>
                            )
                         })
                      }
                   </ScrollableTabView>  :
                  <View><Text>暂无数据</Text></View>
	    
      return news;
	}
}


const mapActionCreators = (dispatch) => {
  return {
     getThemesInfo : bindActionCreators(getThemesInfo,dispatch),
     getThemeListInfo : bindActionCreators(getThemeListInfo,dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
     handleThemesListInfo : state.handleThemesListInfo
  }
}

export default connect(mapStateToProps,mapActionCreators)(NewsPage);


