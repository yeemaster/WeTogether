import React,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  ListView,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PageLoading from '../../../component/PageLoading.js'
import MusicPlayer from '../MusicPlayer/index.js'
import {
     getMusicAlbumDetail,
     getMusicSongPlayerPause,
     getMusicSongPlayerStart,
     getMusicSongPlayerReset,
     getMusicSongPlayerDetail
 } from '../redux.js'
import LoadMoreData from '../../../component/LoadMoreData.js'


const size = {
  width : Dimensions.get('window').width,
  height : Dimensions.get('window').height
}

class SonsDetailPage extends Component{
  render(){
    let {albumInfo} = this.props.handleMusicInfo.musicAlbumDetail.data;
    return(
           <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#fff',padding:15}}><Text>{albumInfo.info}</Text></ScrollView>
    )
  }
}

class SongsListPage extends Component{
   constructor(props) {
     super(props);
     
     let ds = new ListView.DataSource({
        rowHasChanged : (r1,r2) => {return r1 !== r2}
     })
     this.state = {
        dataSource : ds.cloneWithRows([1,2,3,4,5,6,6,7,7,7,7,7])
     };
   }

   _renderRow(rowData, sectionID, rowID){
      let {navigation} = this.props;
      return(
          <TouchableOpacity style={{flexDirection:'row',height:60,alignItems:'center',paddingHorizontal:10,borderBottomWidth:1,borderColor:'#999',borderStyle:'solid'}} onPress={
            ()=>{
               // navigation.dispatch({ type: 'MusicContent',payload:{id:rowData.song_id}})
            }}>
             <Image style={{width:40,height:40}} source={{uri:rowData.pic_small}} />
             <View style={{flex:1,height:40,marginLeft:5}}>
                <Text style={{fontSize:12,height:20,lineHeight:16}}>{rowData.title}</Text>
                <Text style={{color:'#999',height:20,fontSize:12,lineHeight:22}}>{rowData.author}</Text>
             </View>
             <View style={{width:30,height:40,justifyContent:'center'}}>
                 <Text style={{width:30,fontSize:20,height:40,lineHeight:28,textAlign:'left'}}>...</Text>
             </View>             
          </TouchableOpacity>
      )
   }

    _renderFooter(){
         let {handleMusicInfo} = this.props;     
         return(
            <LoadMoreData isMoreData={handleMusicInfo.musicAlbumDetailStatus.isFetching} />
         )
    }

   render(){
        let {songlist} = this.props.handleMusicInfo.musicAlbumDetail.data;

        let ds = new ListView.DataSource({
           rowHasChanged : (r1,r2)=>(r1!==r2)
        });
        let dataSource = ds.cloneWithRows(songlist);
     

      return(
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={{height:40,paddingHorizontal:10,flexDirection:'row',alignItems:'center',justifyContent : 'space-between',borderBottomWidth:1,borderBottomColor:'#999',borderStyle:'solid'}}>
               <Text style={{color:'#000'}}>全部播放</Text>
               <Image source={require('../../../resource/Image/Music/Pause.png')} style={{width:16,height:16}} />
          </TouchableOpacity>
          <ListView
             dataSource={dataSource}
             renderRow={this._renderRow.bind(this)}
             renderFooter={this._renderFooter.bind(this)}
             enableEmptySections={true}
             style={{backgroundColor:'#fff'}}
          />
        </ScrollView>
      )
   }
}

class MusicDetail extends Component{
  
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentWillMount(){
     let {getMusicAlbumDetail,navigation} = this.props;
     console.log(navigation.state.params.albumid);
     getMusicAlbumDetail(navigation.state.params.albumid);
  }

  render(){
     let {handleMusicInfo} = this.props;
     console.log(handleMusicInfo);

     let musicDetailWrap = (!handleMusicInfo.musicAlbumDetailStatus.isFetching && handleMusicInfo.musicAlbumDetail.fetchStatus) ? (
          <View style={{flex:1,backgroundColor:'#fff'}}>
              
              <Image style={{height:size.height/3,width:size.width,justifyContent:'flex-end'}} source={{uri: handleMusicInfo.musicAlbumDetail.data.albumInfo.pic_big}}>
                <View style={{backgroundColor:'rgba(0,0,0,0.5)',height:50,width:size.width,alignItems:'center',justifyContent:'center'}}>
                   <Text style={{backgroundColor:'transparent',color:'#fff',marginVertical:10,fontSize:16}}>{handleMusicInfo.musicAlbumDetail.data.albumInfo.title}</Text>
                </View> 
              </Image>

              <ScrollableTabView
                  renderTabBar={() => <DefaultTabBar />}
                  style={{marginTop:10}}
                  tabBarUnderlineStyle={{height:2,backgroundColor:'#FF0000'}}
                  tabBarBackgroundColor='#FFFFFF'
                  tabBarActiveTextColor='#FF0000'
                  tabBarTextStyle={{fontSize: 14}}
              >
                  <View tabLabel='歌单'><SongsListPage {...this.props}/></View>
                  <View tabLabel='故事'><SonsDetailPage {...this.props} /></View>
              </ScrollableTabView>
              

              <MusicPlayer {...this.props} songsPlayerList={handleMusicInfo.musicAlbumDetail.data.songlist} position={{top:40,right:10}}/>

          </View>  
     ) : <PageLoading />;

    return musicDetailWrap;
  }
}

const styles = StyleSheet.create({

})


const mapActionCreators = (dispatch) => {
  return {
     getMusicAlbumDetail : bindActionCreators(getMusicAlbumDetail,dispatch),
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

export default connect(mapStateToProps,mapActionCreators)(MusicDetail);

