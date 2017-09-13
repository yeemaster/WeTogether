import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Slider,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    Easing,
    ScrollView
} from 'react-native'

import Video from 'react-native-video'

let lyContent = {"title":"\u6210\u90fd","lrcContent":"[ti:\u6210\u90fd]\r\n[ar:\u8d75\u96f7]\r\n[al:\u65e0\u6cd5\u957f\u5927]\r\n[by:0]\r\n[offset:0]\r\n[00:01.34]\u6210\u90fd\r\n[00:02.09]\r\n[00:03.96]\u4f5c\u8bcd\uff1a\u8d75\u96f7\r\n[00:03.96]\u4f5c\u66f2\uff1a\u8d75\u96f7\r\n[00:05.99]\u7f16\u66f2\uff1a\u8d75\u96f7,\u559c\u5b50\r\n[00:09.04]\u6f14\u5531\uff1a\u8d75\u96f7\r\n[00:12.90]\r\n[00:17.65]\u8ba9\u6211\u6389\u4e0b\u773c\u6cea\u7684 \r\n[00:21.57]\u4e0d\u6b62\u6628\u591c\u7684\u9152\r\n[00:25.82]\u8ba9\u6211\u4f9d\u4f9d\u4e0d\u820d\u7684 \r\n[00:29.62]\u4e0d\u6b62\u4f60\u7684\u6e29\u67d4\r\n[00:33.78]\u4f59\u8def\u8fd8\u8981\u8d70\u591a\u4e45 \r\n[00:37.64]\u4f60\u6525\u7740\u6211\u7684\u624b\r\n[00:41.63]\u8ba9\u6211\u611f\u5230\u4e3a\u96be\u7684 \r\n[00:45.47]\u662f\u6323\u624e\u7684\u81ea\u7531\r\n[00:49.20]\r\n[00:51.90]\u5206\u522b\u603b\u662f\u5728\u4e5d\u6708 \r\n[00:55.38]\u56de\u5fc6\u662f\u601d\u5ff5\u7684\u6101\r\n[00:59.46]\u6df1\u79cb\u5ae9\u7eff\u7684\u5782\u67f3 \r\n[01:03.32]\u4eb2\u543b\u7740\u6211\u989d\u5934\r\n[01:07.31]\u5728\u90a3\u5ea7\u9634\u96e8\u7684\u5c0f\u57ce\u91cc \r\n[01:11.44]\u6211\u4ece\u672a\u5fd8\u8bb0\u4f60\r\n[01:15.56]\u6210\u90fd \u5e26\u4e0d\u8d70\u7684 \u53ea\u6709\u4f60\r\n[01:21.76]\r\n[01:22.81]\u548c\u6211\u5728\u6210\u90fd\u7684\u8857\u5934\u8d70\u4e00\u8d70 \r\n[01:31.25]\u76f4\u5230\u6240\u6709\u7684\u706f\u90fd\u7184\u706d\u4e86\u4e5f\u4e0d\u505c\u7559\r\n[01:38.88]\u4f60\u4f1a\u633d\u7740\u6211\u7684\u8863\u8896 \r\n[01:42.67]\u6211\u4f1a\u628a\u624b\u63e3\u8fdb\u88e4\u515c\r\n[01:46.56]\u8d70\u5230\u7389\u6797\u8def\u7684\u5c3d\u5934 \r\n[01:50.45]\u5750\u5728\u5c0f\u9152\u9986\u7684\u95e8\u53e3\r\n[01:55.65]\r\n[02:30.35]\u5206\u522b\u603b\u662f\u5728\u4e5d\u6708 \r\n[02:34.31]\u56de\u5fc6\u662f\u601d\u5ff5\u7684\u6101\r\n[02:38.17]\u6df1\u79cb\u5ae9\u7eff\u7684\u5782\u67f3 \r\n[02:42.48]\u4eb2\u543b\u7740\u6211\u989d\u5934\r\n[02:46.66]\u5728\u90a3\u5ea7\u9634\u96e8\u7684\u5c0f\u57ce\u91cc \r\n[02:50.34]\u6211\u4ece\u672a\u5fd8\u8bb0\u4f60\r\n[02:53.78]\u6210\u90fd \u5e26\u4e0d\u8d70\u7684 \u53ea\u6709\u4f60\r\n[03:00.95]\r\n[03:02.38]\u548c\u6211\u5728\u6210\u90fd\u7684\u8857\u5934\u8d70\u4e00\u8d70 \r\n[03:10.13]\u76f4\u5230\u6240\u6709\u7684\u706f\u90fd\u7184\u706d\u4e86\u4e5f\u4e0d\u505c\u7559\r\n[03:18.32]\u4f60\u4f1a\u633d\u7740\u6211\u7684\u8863\u8896 \r\n[03:21.99]\u6211\u4f1a\u628a\u624b\u63e3\u8fdb\u88e4\u515c\r\n[03:25.99]\u8d70\u5230\u7389\u6797\u8def\u7684\u5c3d\u5934 \r\n[03:29.79]\u5750\u5728\u5c0f\u9152\u9986\u7684\u95e8\u53e3\r\n[03:36.36]\r\n[03:38.40]\u548c\u6211\u5728\u6210\u90fd\u7684\u8857\u5934\u8d70\u4e00\u8d70 \r\n[03:46.45]\u76f4\u5230\u6240\u6709\u7684\u706f\u90fd\u7184\u706d\u4e86\u4e5f\u4e0d\u505c\u7559\r\n[03:54.27]\u548c\u6211\u5728\u6210\u90fd\u7684\u8857\u5934\u8d70\u4e00\u8d70 \r\n[04:02.30]\u76f4\u5230\u6240\u6709\u7684\u706f\u90fd\u7184\u706d\u4e86\u4e5f\u4e0d\u505c\u7559\r\n[04:10.29]\u4f60\u4f1a\u633d\u7740\u6211\u7684\u8863\u8896 \r\n[04:13.57]\u6211\u4f1a\u628a\u624b\u63e3\u8fdb\u88e4\u515c\r\n[04:17.56]\u8d70\u5230\u7389\u6797\u8def\u7684\u5c3d\u5934 \r\n[04:21.77]\u5750\u5728(\u8d70\u8fc7)\u5c0f\u9152\u9986\u7684\u95e8\u53e3\r\n[04:27.72]\r\n[04:36.02]\u548c\u6211\u5728\u6210\u90fd\u7684\u8857\u5934\u8d70\u4e00\u8d70 \r\n[04:43.67]\u76f4\u5230\u6240\u6709\u7684\u706f\u90fd\u7184\u706d\u4e86\u4e5f\u4e0d\u505c\u7559\r\n[04:51.93]"}


let size = {
  width : Dimensions.get('window').width,
  height: Dimensions.get('window').height
}


let musicImgAnimated;

const wsize = {
    width: Dimensions.get('window').width,
    height : Dimensions.get('window').height,
    slideWidth : Dimensions.get('window').width - 20
}

export default class MusicPlayer extends Component{

    constructor(props) {
      super(props);

      this.lyrObj = [];
      this.itemAry = [];
      this.rotateValue = new Animated.Value(0);
      this.state = {
         sliderValue : 0,
         songTime : 0,
         songInfo : {},
         songId : 0,
         currentTime : 0,
         playMode : 0,
         playModeImg: require('../../../resource/Image/Music/SingleTuneLoop.png'),
         playImg : require('../../../resource/Image/Music/Pause.png'),
         showPlayer : false,
         loadReady : false,
         currentIndex : 0
      };
    }

    rotateImgStart = false


    _onProgress(event){
       let currentTime = Math.floor(event.currentTime);
       if(currentTime >= this.state.songTime){
          switch(this.state.playMode){
             case 1: 
               this.nextAction(this.state.currentIndex + 1)
               break;
             case 2:
               this.nextAction(Math.floor(Math.random() * (this.state.songInfo.length)));
               break;
             default:
               this.setState({
                  sliderValue : 0,
                  currentTime : 0,
               });
               this.refs.video.seek(0);
               // this._onPausePress();
               // this.setState({
               //    sliderValue : 0,
               //    currentTime : 0,
               // });
               // this.refs.video.seek(0);
          }
       }else{
           this.setState({
               sliderValue : currentTime,
               currentTime : event.currentTime
           })
       }
    }

    _onLoad(event){
       console.log('加载完毕！');
       this.setState({
          loadReady : true
       })
    }

    _onPlayModePress(){
        let mode = 0;
        mode = this.state.playMode + 1;
        if(mode === 3){
            mode = 0;
        }
        this.loadPlayModeImg(mode);
    }

    _onPausePress(){
        let {handleMusicInfo,getMusicSongPlayerPause,getMusicSongPlayerStart,getMusicSongPlayerReset} = this.props;
        let that = this;

        if(handleMusicInfo.musicPlayer.pause){
           img=require('../../../resource/Image/Music/Play.png'); 
           getMusicSongPlayerStart();
        }else{
           img=require('../../../resource/Image/Music/Pause.png');
           getMusicSongPlayerPause();
        }

        this.rotateValue.stopAnimation()
    }
 
    loadPlayModeImg(mode){
        let img = require('../../../resource/Image/Music/SingleTuneLoop.png');
        switch(mode){
            case 1: img = require('../../../resource/Image/Music/ListLoop.png');break;
            case 2: img= require('../../../resource/Image/Music/Random.png');break;
            default : img = require('../../../resource/Image/Music/SingleTuneLoop.png');break;
        }

        this.setState({
            playModeImg : img,
            playMode :    mode
        })
    }

    loadSong(index){
         var that = this;

         let {handleMusicInfo,songsPlayerList,getMusicSongPlayerDetail} = this.props;
         if(index < songsPlayerList.length){
              let songItem = handleMusicInfo.musicSongsDetailList.data[songsPlayerList[index].song_id];
              if(songItem){
                that.setState({
                   songId : songsPlayerList[index].song_id, 
                   songInfo : songItem,
                   songTime : songItem.bitrate.file_duration
                }
              );
              that.dealLyrContent(handleMusicInfo.musicSongsDetailList.lryData[songsPlayerList[index].song_id]);
            }else{
              getMusicSongPlayerDetail(songsPlayerList[index].song_id,function(data,lryData){
                  
                  that.dealLyrContent(
                  lryData.error_code == '22001' ?  
                     {"title": "\u65e0\u6b4c\u8bcd","lrcContent": "[10:10:10]\u65e0\u6b4c\u8bcd\r\n[10:10.20]"}
                     : lryData);
                  that.setState({
                     songId : songsPlayerList[index].song_id,
                     songInfo : data,
                     songTime : data.bitrate.file_duration
                  });
              })
            }
         }
    }


   //上一曲
    prevAction = (index) =>{
        let {songsPlayerList} = this.props;

        this.setState({
           sliderValue : 0,
           currentTime : 0.0
        })

        if(index == -1){
            index = songsPlayerList.length - 1 // 如果是第一首就回到最后一首歌
        }

        this.setState({
            currentIndex:index  //更新数据
        })
        this.loadSong(index)  //加载数据
    }
    //下一曲
    nextAction = (index) =>{
        let {songsPlayerList} = this.props;

        this.setState({
           sliderValue : 0,
           currentTime : 0.0
        })

        if(index == songsPlayerList.length){
            index = 0 //如果是最后一首就回到第一首
        }
        this.setState({
            currentIndex:index,  //更新数据
        })
        this.loadSong(index)   //加载数据
    }


    rotateImg(){
            let that = this;
            let {handleMusicInfo} = this.props;
            console.log(handleMusicInfo.musicPlayer.pause);
            this.rotateValue.setValue(0);
            musicImgAnimated = Animated.timing(this.rotateValue,{
                toValue : 1,
                duration : 1000,
                easing : Easing.linear
            })
            musicImgAnimated.start(()=>{
              if(handleMusicInfo.musicPlayer.pause){
                 that.rotateImgStart = false;
              }else{
                 that.rotateImg();
              }
            });
    }

    componentDidMount(){
        this.loadSong(0);
    }

    formatSecondTime(time){
        let timeMin = Math.floor(time / 60);
        let timeSec = time % 60;
        let min = timeMin < 10 ? '0' + timeMin : timeMin;
        let sec = timeSec < 10 ? '0' + timeSec : timeSec;
        return min + ':' + sec;
    }

    _playerShowButtonClick(){
      
          this.setState({
             showPlayer : !this.state.showPlayer
          })
    }

    // 歌词
    renderLryItem() {
        let lryPaddingTop = 0;

        if(this.state.showPlayer){
          this.itemAry = [];
          for (var i = 0; i < this.lyrObj.length; i++) {
              var item = this.lyrObj[i].txt
              if ( (i + 1) < this.lyrObj.length && this.lyrObj[i+1].total >= this.state.currentTime.toFixed(2) &&  this.lyrObj[i].total < this.state.currentTime.toFixed(2)
                   || ( (i + 1) == this.lyrObj.length &&  this.lyrObj[i].total < this.state.currentTime.toFixed(2))) {
                  //正在唱的歌词
                  this.itemAry.push(
                      <View  key={i}  style={{paddingTop: lryPaddingTop, height:25,width:size.width,backgroundColor:'rgba(255,255,255,0.0)'}}>
                           <Text style={{ color: 'red',textAlign:'center',fontSize:20}}>{item}</Text>
                      </View>
                  );
                  _scrollView.scrollTo({x: 0,y:(25 * i),animated:false});
              }
              else {
                  //所有歌词
                  this.itemAry.push(
                      <View  key={i}  style={{paddingTop: lryPaddingTop, height:25,width:size.width, backgroundColor:'rgba(255,255,255,0.0)'}}>
                           <Text style={{ color: '#fff' ,textAlign:'center'}}>{item}</Text>
                      </View>

                  )
              }
          }          
        }
    }

    componentDidUpdate(){
       this.renderLryItem();
    }


    dealLyrContent(lrcContent){
      let that = this;
      let lry = lrcContent.lrcContent;
      let lryAry = lry.split('\n')   //按照换行符切数组
      lryAry.forEach(function (val, index) {
          var obj = {}   //用于存放时间
          val = val.replace(/(^\s*)|(\s*$)/g, '')    //正则,去除前后空格
          let indeofLastTime = val.indexOf(']')  // ]的下标
          let timeStr = val.substring(1, indeofLastTime) //把时间切出来 0:04.19
          let minSec = ''
          let timeMsIndex = timeStr.indexOf('.')  // .的下标
          if (timeMsIndex !== -1) {
              //存在毫秒 0:04.19
              minSec = timeStr.substring(1, val.indexOf('.'))  // 0:04.
              obj.ms = parseInt(timeStr.substring(timeMsIndex + 1, indeofLastTime))  //毫秒值 19
          } else {
              //不存在毫秒 0:04
              minSec = timeStr
              obj.ms = 0
          }
          let curTime = minSec.split(':')  // [0,04]
          obj.min = parseInt(curTime[0])   //分钟 0
          obj.sec = parseInt(curTime[1])   //秒钟 04
          obj.txt = val.substring(indeofLastTime + 1, val.length) //歌词文本: 留下唇印的嘴
          obj.txt = obj.txt.replace(/(^\s*)|(\s*$)/g, '')
          obj.dis = false
          obj.total = obj.min * 60 + obj.sec + obj.ms / 100   //总时间
          if (obj.txt.length > 0) {
              that.lyrObj.push(obj)
          }      
      });
    }

    render(){
        let {handleMusicInfo} = this.props;
        let playStatusImg = require('../../../resource/Image/Music/Play.png'); 

        // if(!handleMusicInfo.musicPlayer.pause && !this.rotateImgStart){
        //      this.rotateImgStart = true;
        //      this.rotateImg();
        //   }
        
        console.log('rr-render');
        console.log(this.state.songInfo.bitrate);

        let rotateImgDegree = this.rotateValue.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','360deg']
        })


        if(handleMusicInfo.musicPlayer.pause){
           playStatusImg=require('../../../resource/Image/Music/Pause.png'); 
        }else{
           playStatusImg=require('../../../resource/Image/Music/Play.png');
        }

        // console.log(this.state.songInfo.bitrate);

        if(this.state.songInfo.bitrate){
            return(
              <View style={{position:'absolute',top:this.props.position.top,right:this.props.position.right}}>  
                  <Video
                      source={{uri:this.state.songInfo.bitrate.file_link}}
                      // source={require('../../../resource/MP3/taohua.mp3')}
                      ref='video'
                      volume={1.0}
                      paused={handleMusicInfo.musicPlayer.pause}
                      onProgress={(e) => this._onProgress(e)}
                      onLoad={(e) => this._onLoad(e)}
                      playInBackground={true}
                  />

                {

                  this.state.showPlayer ?
                   (
                   <Modal 
                      animationTyoe='slide'
                      transparent={true}
                      onRequestClose={()=>{return null}}
                      visible={true}
                   >
                    <TouchableOpacity style={[{flex:1,backgroundColor:'rgba(0,0,0,0.7)'}]} onPress={this._playerShowButtonClick.bind(this)}>        
                        <View style={{position:'absolute',top:100,left:0,width:wsize.width,height:150,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{textAlign:'center'}}>{this.state.songInfo.songinfo.title}</Text>
                            <View style={{flexDirection:'row',marginHorizontal:10,alignItems:'center',justifyContent:'flex-start'}} >
                                <Slider 
                                  ref='slider'
                                  style={{flex:1,marginTop:10}}
                                  value={this.state.sliderValue}
                                  maximumValue={this.state.songTime}
                                  step={1}
                                  minimumTrackTintColor='#FFDB42'
                                  onValueChange={(value)=>{
                                     this.setState({
                                        currentTime : value
                                     })
                                  }}
                                  onSlidingComplete={(value)=>{
                                     this.refs.video.seek(value)
                                  }}
                                  />
                                  <Text style={{paddingTop:10,fontSize:14}}>{this.formatSecondTime(parseInt(this.state.currentTime))}</Text>
                                  <TouchableOpacity onPress={this._onPlayModePress.bind(this)} style={{paddingTop:8}}>
                                     <Image source={this.state.playModeImg} style={{width:20,height:20}}/>
                                  </TouchableOpacity>
                             </View>
                             <Text style={{textAlign:'center',fontSize:12}}>{this.state.songInfo.songinfo.author}</Text>

                             <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                 <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>this.prevAction(this.state.currentIndex - 1)}>
                                    <Image source={require('../../../resource/Image/Music/PrevBtn.png')}
                                           style={{width:30,height:30}} />
                                 </TouchableOpacity>
                                 <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={this._onPausePress.bind(this)}>
                                    <Image source={playStatusImg}
                                           style={{width:30,height:30}} />
                                 </TouchableOpacity>
                                 <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>this.nextAction(this.state.currentIndex + 1)}>
                                    <Image source={require('../../../resource/Image/Music/NextBtn.png')}
                                           style={{width:30,height:30}} />
                                 </TouchableOpacity>
                             </View>
                        </View>


                         <Animated.Image source={require('../../../resource/Image/Music/RubberBobbin.png')} style={{position:'absolute',top:70,left:20,width:60,height:60,justifyContent:'center',alignItems:'center',transform:[{rotate:rotateImgDegree}]}}>
                             <Image source={require('../../../resource/Image/Music/RubberBobbinDefault.jpg')} style={{width:40,height:40,borderRadius:20}} />
                         </Animated.Image>


                        <View style={{height:258,alignItems:'center',marginTop:350}}>
                                <ScrollView showsVerticalScrollIndicator={false} ref={(scrollView) => { _scrollView = scrollView}}
                                >
                                   {this.itemAry}
                                </ScrollView>
                        </View>
                    </TouchableOpacity> 
                  </Modal>
                )
                :
                (
                  <View style={{width:50,height:50}}>
                      <TouchableOpacity onPress={this._playerShowButtonClick.bind(this)}>
                         <Image source={require('../../../resource/Image/Music/ting.png')} style={{width:50,height:50}} />
                      </TouchableOpacity>
                  </View> 
                )
              }
              </View>
            )
        }else{
            return (<View></View>)
        }
    }
}