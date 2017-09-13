import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  ListView,
  TouchableHighlight,
  Modal
} from 'react-native'

import ViewPager from 'react-native-viewpager'
import Lightbox  from 'react-native-lightbox'
import Icon from 'react-native-vector-icons/Ionicons'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {gethomeOneListInfo} from '../redux.js'

import PageLoading from '../../../component/PageLoading.js'
import {AlertUtil} from '../../../util/AlertUtil.js'

const size = {
   width : Dimensions.get('window').width,
   height : Dimensions.get('window').height
}



const ListItem = ({data}) => {
  return (
        <View style={{width:size.width-20,marginHorizontal:10,backgroundColor:'#fff'}}>
          <View style={[{borderWidth:1,borderColor:'#999',borderStyle:'solid',padding:10},{backgroundColor : data.content_bgcolor ? data.content_bgcolor : '#fff'}]}>
                <Lightbox underlayColor={data.content_bgcolor ? data.content_bgcolor : '#000'}>
                  <Image source={{uri:data.hp_img_url}} style={{width:size.width-40,height:180}}/>
                </Lightbox>   
                <View style={{flexDirection:'row',justifyContent : 'space-between'}}>
                    <Text style={{fontSize: 12,color:'#999'}}>{data.hp_title}</Text>
                    <Text style={{fontSize: 12,color:'#999'}}>{data.hp_author}</Text>
                </View>
                <View style={{marginVertical:10}}>
                    <Text>{data.hp_content}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <Text style={{fontSize: 12,color:'#999'}}>{data.maketime.slice(0,11)}</Text>
                </View>
          </View>
        </View>
  )
}


class HomePage extends Component{

  static navigationOptions = {
      title : '首页',
      tabBarLabel : '首页',
      tabBarIcon : ({focused,tintColor}) => (<Icon name={focused ? 'ios-boat' : 'ios-boat-outline'} size={26} style={{color:tintColor}} />)
  }


  constructor(props) {
      super(props);
      let now = new Date();

      this.state = {
          nowMonthDay : '' + now.getFullYear() + '-' + ((now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0'+(now.getMonth() + 1))
      }
  }

  componentDidMount(){
       const {handlehomeOneListInfo,navigation,gethomeOneListInfo} = this.props;
       gethomeOneListInfo(this.state.nowMonthDay);
  }


  _renderPage(pagedata,pageID){
        return(
            <ListItem data={pagedata} />
        )
  }


  render(){

    const {handlehomeOneListInfo,navigation,gethomeOneListInfo} = this.props;
   
    console.log(handlehomeOneListInfo);


    let ds =  new ViewPager.DataSource({
       rowHasChanged : (r1,r2)=>(r1!==r2)
    });
    let dataSource = ds.cloneWithPages([]);

    if(handlehomeOneListInfo.homeOneList && handlehomeOneListInfo.homeOneList.data){
        dataSource = ds.cloneWithPages(handlehomeOneListInfo.homeOneList.data);
    }


    return(
      (!handlehomeOneListInfo.homeOneStatus && handlehomeOneListInfo.homeOneList.data) ? <PageLoading /> : (
            <View style={styles.container} showsVerticalScrollIndicator={false}>

              <View style={{justifyContent:'center',alignItems:'center',marginVertical: 20}}>
                 <Text style={{fontSize : 16}}>{('' + new Date()).slice(0,15)}</Text>
              </View>

              <ViewPager
                style={{backgroundColor:'red',width:size.width,height: size.height, justifyContent : 'center', alignItems: 'center'}}
                dataSource={dataSource}
                renderPage={this._renderPage}
                renderPageIndicator={false}
              />

            </View>
      )
    )
  }
}


const styles = StyleSheet.create({
  container : {
      flex : 1,
      backgroundColor: '#fff'
  },
  imageStyle : {
      width : size.width,
      height : 200 
  }
})



const mapActionCreators = (dispatch) => {
  return {
     gethomeOneListInfo : bindActionCreators(gethomeOneListInfo,dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
     handlehomeOneListInfo : state.handlehomeOneListInfo
  }
}

export default connect(mapStateToProps,mapActionCreators)(HomePage);

