import React,{Component} from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	ListView,
	Image,
	Dimensions
} from 'react-native'

import Video from 'react-native-video'
import VideoPlayer from '../../../component/VideoPlayer.js'

import PageLoading from '../../../component/PageLoading.js'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getfilmDetailData} from '../redux.js'
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view'
import HtmlShowView from '../../../component/HtmlShowView.js'


let size = {
  width : Dimensions.get('window').width,
  height : Dimensions.get('window').height
}


const FilmInfoBlock = ({handleFilmsListInfo}) => {
	let {MovieDetailModel} = handleFilmsListInfo;
     console.log(handleFilmsListInfo);
    return(
       <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{padding:10,borderStyle:'solid',borderBottomWidth:1,borderBottomColor:'#999'}}>
	       	  <Text>影片:  {MovieDetailModel.nm}<Text style={{color:'red'}}>  {MovieDetailModel.sc}分</Text></Text>
	       	  <Text>类型:  {MovieDetailModel.cat}</Text>
	       	  <Text>导演:  {MovieDetailModel.dir}</Text>
	       	  <Text>演员:  {MovieDetailModel.star}</Text>
       	  </View>
       	  <View style={{marginHorizontal:10,marginTop:10,marginBottom:50}}>
       	     <Text style={{paddingBottom:10}}>简介:</Text>
			 <HtmlShowView 
			    content={MovieDetailModel.dra}
			 />
       	  </View>
       </ScrollView>
    )
}

class CommentInfoBlock extends Component{ 
    constructor(props) {
      super(props);
    
      this.state = {};
    }

    _renderRow(RowData){
    	return (
           <View style={{height:80,flex:1,flexDirection:'row'}}>
           	   <View style={{width:40,height:40}}><Image style={{width:30,height:30}} source={{uri:RowData.avatarurl}}/></View>
           	   <View style={{flex:1,height:40,flexDirection:'column'}}>
           	   	   <View style={{height:30,flexDirection:'column'}}>
           	   	   	   <Text style={{flex:1,fontSize:10}}>{RowData.nickName}</Text>
           	   	   	   <Text style={{flex:1,fontSize:10,color:'#999'}}>{RowData.time}</Text>
           	   	   </View>
           	   	   <View style={{height:50}}>
           	   	   	   <Text style={{fontSize:12}}  numberOfLines={3}>{RowData.content}</Text>
           	   	   </View>
           	   </View>
           </View>
        )
    }

	render(){
		let {CommentResponseModel} = this.props.handleFilmsListInfo;
		let ds = new ListView.DataSource({
			rowHasChanged : (r1,r2)=>r1!==r2
		});

		let dataSource = ds.cloneWithRows(CommentResponseModel.cmts);
		
		return(
	       <ScrollView showsVerticalScrollIndicator={false} style={{height:300,marginHorizontal:10,marginTop:10,marginBottom:50}}>
              <ListView 
                  dataSource={dataSource}
                  renderRow={this._renderRow.bind(this)}
              />
	       </ScrollView>
		)
	}
}
class FilmDetail extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
		    rate: 1,
		    volume: 1,
		    muted: false,
		    resizeMode: 'contain',
		    duration: 0.0,
		    currentTime: 0.0,
		    controls: false,
		    paused: true,
		    skin: 'custom',
		    ignoreSilentSwitch: null,
		    isBuffering: false,
	  };
      this.onLoad = this.onLoad.bind(this);
      this.onProgress = this.onProgress.bind(this);
      this.onBuffer = this.onBuffer.bind(this);	
	}

	onLoad(data) {
	  console.log('On load fired!');
	  this.setState({duration: data.duration});
	}

	onProgress(data) {
	  this.setState({currentTime: data.currentTime});
	}

	onBuffer({ isBuffering }: { isBuffering: boolean }) {
	  this.setState({ isBuffering });
	}

	getCurrentTimePercentage() {
	   if (this.state.currentTime > 0) {
	      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
	   } else {
	      return 0;
	   }
	}

	componentWillMount(){
		let {getfilmDetailData,navigation} = this.props;
		console.log(navigation.state.params.id);
		getfilmDetailData(navigation.state.params.id);
	}

	render(){
	    let {handleFilmsListInfo,navigation} = this.props;

	    const flexCompleted = this.getCurrentTimePercentage() * 100;
	    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        console.log(handleFilmsListInfo);
// uri:handleFilmsListInfo.filmDetailData.data[navigation.state.params.id].data.MovieDetailModel.vd}
        let filmDetailWrap = (!handleFilmsListInfo.filmDetailStatus.isFetching && handleFilmsListInfo.filmDetailData.fetchStatus && handleFilmsListInfo.filmDetailData.data[navigation.state.params.id]) ?
        (
			<View style={styles.container}>

				<VideoPlayer
					endWithThumbnail
					// thumbnail={require('../resource/image/job1.jpg')}
					// video={require('../resource/mp4/broadchurch.mp4')}
					videoWidth={size.width}
					videoHeight={size.height/3}
					// duration={30}
					thumbnail={{uri:handleFilmsListInfo.filmDetailData.data[navigation.state.params.id].data.MovieDetailModel.img}}
					video={{uri:handleFilmsListInfo.filmDetailData.data[navigation.state.params.id].data.MovieDetailModel.vd}}
					duration={handleFilmsListInfo.filmDetailData.data[navigation.state.params.id].data.MovieDetailModel.dur}
				/>

	            <ScrollableTabView
		              renderTabBar={() => <DefaultTabBar />}
		              style={{marginTop:10}}
		              tabBarUnderlineStyle={{height:2,backgroundColor:'#FF0000'}}
		              tabBarBackgroundColor='#FFFFFF'
		              tabBarActiveTextColor='#FF0000'
		              tabBarTextStyle={{fontSize: 14}}
		              >
		              <View tabLabel='视频信息'><FilmInfoBlock handleFilmsListInfo={handleFilmsListInfo.filmDetailData.data[navigation.state.params.id].data}/></View>
		              <View tabLabel='评论'><CommentInfoBlock handleFilmsListInfo={handleFilmsListInfo.filmDetailData.data[navigation.state.params.id].data}/></View>
		        </ScrollableTabView>
			</View>
        ) : <PageLoading />
        
		return filmDetailWrap;
	}
}

// 样式
var styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor:'#fff'
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    top: 200,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
});

const mapActionCreators = (dispatch) => {
  return {
     getfilmDetailData : bindActionCreators(getfilmDetailData,dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
     handleFilmsListInfo : state.handleFilmsListInfo
  }
}

export default connect(mapStateToProps,mapActionCreators)(FilmDetail);