import React,{Component} from 'react'

import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView
} from 'react-native'

export default class BlogDetail extends Component{
    render() {
      var datas = this.props.datas;
      return (
        <ScrollView style={styles.container}>
          <View>
            <Text style={{fontSize:20,textAlign:'center',lineHeight:30}}>{datas.infoTitle}</Text>
            <Text style={{color:'#999',textAlign:'center',marginTop:15}}>关键字：{datas.info}</Text>
            <Text style={{color:'#999',textAlign:'center',marginTop:10}}>发布日期：{datas.date}</Text>
            <View style={{height: 180}}>
              <Image style={styles.largeImage} source={{uri: datas.logo}}/>
            </View>
            <Text style={{color:'#999',lineHeight:25}}>       {datas.content}</Text>
          </View>
        </ScrollView>
      );
    } 
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginBottom: 80,
  },
  largeImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    marginTop: 25,
    marginBottom: 35,
  },
});