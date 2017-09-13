import React,{Component} from 'react'
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	TouchableOpacity
} from 'react-native'

var size={
	width : Dimensions.get('window').width,
	height : Dimensions.get('window').height
}


import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PageLoading from '../../../component/PageLoading.js'
import {
	getMusicSongsDetail,
	getMusicSongPlayerPause,
	getMusicSongPlayerStart,
	getMusicSongPlayerReset,
	getMusicSongPlayerDetail
} from '../redux.js'
import MusicPlayer from '../MusicPlayer/index.js'
import {formatTime} from '../../../util/tools.js'

class MusicSongsItem extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {

	  };
	}

	_changePlayerStatus(){
		let {handleMusicInfo,getMusicSongPlayerPause,getMusicSongPlayerStart,getMusicSongPlayerReset} = this.props;
        console.log('123');

		if(handleMusicInfo.musicPlayer.pause){
             getMusicSongPlayerStart();
		}else{
			 getMusicSongPlayerPause();
		}
	}

	render(){
		let {handleMusicInfo,navigation} = this.props;
		let songsItem = this.props.handleMusicInfo.musicSongsDetailList.data[navigation.state.params.id];

        let videoPlayerBtn = handleMusicInfo.musicPlayer.pause ? require('../../../resource/Image/Music/Pause.png') : require('../../../resource/Image/Music/Play.png');

		return(
          <View style={{marginTop:-20,height:80,width:size.width/10*9,backgroundColor:'#fff',borderWidth:1,borderColor:'#999'}}>
          	  <View style={{flexDirection:'row',height:60,alignItems:'center'}}>
          	  	  <View style={{flexDirection:'row',paddingHorizontal:10,flex:4}}>
          	  	     <Image source={{uri:songsItem.songinfo.pic_small}} style={{width:40,height:40}}/>
          	  	  	 <View style={{justifyContent :  'space-around',paddingLeft:10}}>
          	  	  	    <Text>{songsItem.songinfo.title}</Text>
          	  	  	    <Text>{songsItem.songinfo.author}</Text>
          	  	  	 </View>
          	  	  </View>
          	  	  <View style={{flex:1,width:50,height:60,justifyContent:'center',alignItems:'center'}}>
          	  	  	  <TouchableOpacity onPress={this._changePlayerStatus.bind(this)} style={{width:30,height:30}}>
          	  	  	      <Image source={videoPlayerBtn} style={{width:30,height:30}}/>
          	  	  	  </TouchableOpacity>
          	  	  </View>
          	  </View>
          	  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          	  	  <Text style={{paddingLeft:20}}>专辑:{songsItem.songinfo.album_title}</Text>
          	  	  <Text style={{paddingRight:20,color:'#999'}}>{formatTime(songsItem.bitrate.file_duration)}</Text>
          	  </View>
          </View>	
		)
	}
}

class MusicContent extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentWillMount(){
       let {getMusicSongsDetail,navigation} = this.props;

       getMusicSongsDetail(navigation.state.params.id);
	}

	render(){
		let {handleMusicInfo,navigation} = this.props;
		let songsItem = this.props.handleMusicInfo.musicSongsDetailList.data[navigation.state.params.id];

        let songsInfo = null;
        
        console.log('content');
        console.log(handleMusicInfo);

        let MusicMain = handleMusicInfo.musicSongsDetailStatus.isFetching ?
        <PageLoading /> :
        (handleMusicInfo.musicSongsDetailList && handleMusicInfo.musicSongsDetailList.fetchStatus && handleMusicInfo.musicSongsDetailList.data[navigation.state.params.id]) ?
		<ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:'#fff'}}>
		    <View style={{flex:1,alignItems:'center',backgroundColor:'#fff'}}>
				   <Image source={{uri:handleMusicInfo.musicSongsDetailList.data[navigation.state.params.id].songinfo.pic_big}} style={{height:size.height/3*1,width:size.width}}/>
				   <MusicSongsItem {...this.props}/>
				   <View style={{alignItems:'flex-start',justifyContent:'center',width:size.width,height:50,paddingLeft:20,borderBottomWidth:1,borderStyle:'solid',borderColor:'#999'}}>
				   	    <Text>文</Text>
				   </View>
				   <View style={{width:size.width-40,alignItems:'center',paddingTop:20}}>
				        <Text>
				        	三月，醉一场青春的流年。慢步在三月的春光里，走走停停，看花开嫣然，看春雨绵绵，感受春风拂面，春天，就是青春的流年。青春，是人生中最美的风景。青春，是一场花开的遇见；青春，是一场痛并快乐着的旅行；青春，是一场轰轰烈烈的比赛；青春，是一场鲜衣奴马的争荣岁月；青春，是一场风花雪月的光阴。
				        </Text>
				   </View>
		    </View>
          	<MusicPlayer {...this.props} songsPlayerList={[{'song_id': songsItem.songinfo.song_id}]} position={{top:40,right:10}}/>
		</ScrollView>  : <View><Text>暂无数据</Text></View>

		return MusicMain;
	}
}



const mapActionCreators = (dispatch) => {
  return {
     getMusicSongsDetail : bindActionCreators(getMusicSongsDetail,dispatch),
     getMusicSongPlayerPause : bindActionCreators(getMusicSongPlayerPause,dispatch),
     getMusicSongPlayerStart : bindActionCreators(getMusicSongPlayerStart,dispatch),
     getMusicSongPlayerReset : bindActionCreators(getMusicSongPlayerReset,dispatch),
     getMusicSongPlayerDetail : bindActionCreators(getMusicSongPlayerDetail,dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
     handleMusicInfo : state.handleMusicInfo
  }
}

export default connect(mapStateToProps,mapActionCreators)(MusicContent);