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
import {
        getMusicListInfo,
        getMusicRecommendSongList,
        getMusicSongPlayerPause,
        getMusicSongPlayerStart,
        getMusicSongPlayerReset,
        getMusicSongPlayerDetail
} from '../redux.js'


import LoadMoreData from '../../../component/LoadMoreData.js'
import PageLoading from '../../../component/PageLoading.js'
import MusicPlayer from '../MusicPlayer/index.js'
import {AlertUtil} from '../../../util/AlertUtil.js'

const size = {
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height
}

const imgWidth = Math.floor((size.width - 30) / 3);

const GridItem = ({data,index,navigation}) => {
    const isMid = (index+1) % 3 === 2;
    return (
       <TouchableOpacity key={index} style={[{width:imgWidth,height:(imgWidth+30),marginBottom:5},{marginHorizontal:isMid ? 5 : 0}]} onPress={()=>{navigation.dispatch({type:'MusicDetail',payload:{albumid:data.album_id}})}}>
          <Image source={{uri:data.pic_small}}
                 style={{width:imgWidth,height:imgWidth}}
         >
            <Text style={{backgroundColor:'transparent',color:'#fff'}}>点播{Math.floor(Math.random()*1000)}次</Text>
         </Image>
         <Text numberOfLines={1} style={{fontSize:14,marginTop:3,color:'#999'}}>{data.title}</Text>
       </TouchableOpacity>
    )
}

const Grid = ({gridData,navigation}) => {
    return (
      <View style={{borderBottomWidth:5,borderStyle:'solid',borderColor:'#eee'}}>

         <View style={{flexDirection:'row',width:size.width,flexWrap:'wrap',justifyContent:'center'}}>
            {gridData.map((data,index)=>{
                return(
                  <GridItem data={data} index={index} key={index} navigation={navigation}/>
                )
            })}   
         </View>

         <TouchableOpacity style={{height:40,borderTopWidth:1,borderStyle:'solid',borderColor:'#eee',justifyContent:'center',alignItems:'center'}} onPress={()=>AlertUtil('抱歉，功能暂未开放')}>
            <Text style={{fontSize:14}}>更多歌单</Text>
         </TouchableOpacity>

      </View>
    )
}

class RecommendPage extends Component{
    
    constructor(props) {
      super(props);
      let ds = new ListView.DataSource({
         rowHasChanged : (r1,r2) => {return r1 !== r2}
      })
    
      this.state = {
         dataSource : ds.cloneWithRows([1,2,4,5,6,7,8,9])
      };
    }

    _clickToMusicDetailContent(id){
       let {navigation} = this.props;
       navigation.dispatch({ type: 'MusicContent',payload:{id: id}})
    }

    _renderRow(rowData, sectionID, rowID){
       return(
          <View style={{flexDirection:'row',height:60,alignItems:'center',marginHorizontal:5}}>
             <TouchableOpacity onPress={this._clickToMusicDetailContent.bind(this,rowData.song_id)}>
                 <Image style={{width:40,height:40}} source={{uri:rowData.pic_small}} />
             </TouchableOpacity>

             <TouchableOpacity style={{flex:1,height:40,marginLeft:5}} onPress={this._clickToMusicDetailContent.bind(this,rowData.song_id)}>
                <Text style={{fontSize:12,height:20,lineHeight:16}}>{rowData.title}</Text>
                <Text style={{color:'#999',height:20,fontSize:12,lineHeight:22}}>{rowData.author}</Text>
             </TouchableOpacity>
             
             <View style={{width:20,height:60,justifyContent:'center'}}>
                 <Text style={{fontSize:20,height:60,lineHeight:55}}>...</Text>
             </View>
          </View>
       )
    }

    _renderSeparator(sectionID,rowID){
       return( 
           <View key={sectionID+rowID} style={{width:size.width,height:1,backgroundColor:'#999'}}></View>
       )
    }

    _renderFooter(){
         let {handleMusicInfo} = this.props;     
         return(
            <LoadMoreData isMoreData={handleMusicInfo.MusicRecommendStatus.isFetching} />
         )
    }

    _onEndReached(){
         // console.log('ok');
    }

    componentDidMount(){
       let {getMusicRecommendSongList} = this.props;
       getMusicRecommendSongList();
    }

    componentWillUnmount(){
       console.log('lala');
    }


    render(){
        let {handleMusicInfo,navigation} = this.props;

        let ds = new ListView.DataSource({
           rowHasChanged : (r1,r2)=>(r1!==r2)
        });
        let dataSource = ds.cloneWithRows([]);
        let recommendSongs = [];
        
        if(handleMusicInfo.MusicRecommendList && handleMusicInfo.MusicRecommendList.fetchStatus){
            dataSource = ds.cloneWithRows(handleMusicInfo.MusicRecommendList.data.MusicGoldList.song_list);  
            recommendSongs = handleMusicInfo.MusicRecommendList.data.MusicAlbumList.albumlist;
        }        

        let recommendPageMain =  handleMusicInfo.MusicRecommendStatus.isFetching ? (<PageLoading />)
                   : 
            (
                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#fff'}}>
                 <Text style={{marginVertical:10,backgroundColor:'#fff',fontSize:14,marginHorizontal:10}}>热门专辑</Text>
                 <Grid gridData={recommendSongs} navigation={navigation}/>
                 <Text style={{marginVertical:10,backgroundColor:'#fff',fontSize:14,marginHorizontal:10}}>推荐歌曲</Text>
                
                 <ListView
                   dataSource={dataSource}
                   renderRow={this._renderRow.bind(this)}
                   renderFooter={this._renderFooter.bind(this)}
                   renderSeparator={this._renderSeparator}
                   onEndReached={this._onEndReached}
                   onEndReachedThreshold={30}
                   initialListSize={2}
                   enableEmptySections={true}
                   style={{marginHorizontal:10}}
                 />

                </ScrollView>
            );

        return recommendPageMain;
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

      // console.log(rowData);

      return(
          <TouchableOpacity style={{flexDirection:'row',height:60,alignItems:'center',marginHorizontal:5,borderBottomWidth:1,borderStyle:'solid',borderColor:'#eee'}} onPress={
            () => navigation.dispatch({ type: 'MusicContent',payload:{id:rowData.song_id}})
          }>
             <Text style={{fontSize:14,height:40,width:30,textAlign:'center',lineHeight:40}}>{parseInt(rowID)+1}</Text>
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
       const {handleMusicInfo} = this.props;     
       return(
          <LoadMoreData isMoreData={handleMusicInfo.MusicPageStatus.isFetching} />
       )
  }

  _onEndReached(){
       // console.log('ok');
  }


   componentWillMount(){
      let {getMusicListInfo} = this.props;
      getMusicListInfo();
   }

   render(){

        const {handleMusicInfo,navigation} = this.props;

        let ds = new ListView.DataSource({
           rowHasChanged : (r1,r2)=>(r1!==r2)
        });
        let dataSource = ds.cloneWithRows([]);
        
        if(handleMusicInfo.MusicPageList && handleMusicInfo.MusicPageList.fetchStatus){
            dataSource = ds.cloneWithRows(handleMusicInfo.MusicPageList.data);    
        }

        // console.log(handleMusicInfo.MusicPageList);

      return(
         <ListView
             dataSource={dataSource}
             renderRow={this._renderRow.bind(this)}
             renderFooter={this._renderFooter.bind(this)}
             onEndReached={this._onEndReached}
             onEndReachedThreshold={30}
             initialListSize={1}
             enableEmptySections={true}
         />
      )
   }
}


class MusicPage extends Component{

    static navigationOptions = {
      title : '音乐',
      tabBarLabel : '音乐',
      tabBarIcon : ({focused,tintColor}) => (<Icon name={focused ? 'ios-musical-notes' : 'ios-musical-notes-outline'} size={26} style={{color:tintColor}} />)
    }

    constructor(props) {
      super(props);
    
      this.state = {};
    }

    render(){
        
        let {handleMusicInfo} = this.props;
        let songid = '',songsItem=null,musicPlayerWrap=null;


        if(handleMusicInfo.MusicRecommendList && 
           handleMusicInfo.MusicRecommendList.fetchStatus &&
           handleMusicInfo.MusicRecommendList.data.MusicGoldList.song_list.length){
          
              musicPlayerWrap = (
                     <View>
                       {
                          // <View>
                          //    <MusicPlayer {...this.props} songsPlayerList={handleMusicInfo.MusicRecommendList.data.MusicGoldList.song_list}/>
                          // </View>
                       }
                     </View>
              )
        }    

        return(
          <View style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollableTabView
                  renderTabBar={() => <DefaultTabBar />}
                  style={{marginTop:10}}
                  tabBarUnderlineStyle={{height:2,backgroundColor:'#FF0000'}}
                  tabBarBackgroundColor='#FFFFFF'
                  tabBarActiveTextColor='#FF0000'
                  tabBarTextStyle={{fontSize: 14}}
            >

              <View tabLabel='推荐'><RecommendPage {...this.props}/></View>
              <View tabLabel='经典'><SongsListPage {...this.props} /></View>
            </ScrollableTabView>

            
            {musicPlayerWrap}

          </View>
        )
    }
}

const styles = StyleSheet.create({

})

const mapActionCreators = (dispatch) => {
  return {
     getMusicListInfo : bindActionCreators(getMusicListInfo,dispatch),
     getMusicRecommendSongList : bindActionCreators(getMusicRecommendSongList,dispatch),
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

export default connect(mapStateToProps,mapActionCreators)(MusicPage);
