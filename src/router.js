import React, {Component} from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

//配置主页
import HomePage from './pages/Home/HomePage/index.js'

//影视相关页面
import FilmPage from './pages/Film/FilmPage/index.js'
import FilmDetail from './pages/Film/FilmDetail/index.js'

//博客相关页面
//import BlogPage from './pages/Blog/BlogPage/index.js'
//import BlogDetail from './pages/Blog/BlogDetail/index.js'

//音乐相关页面
import MusicPage from './pages/Music/MusicPage/index.js'
import MusicContent from './pages/Music/MusicContent/index.js'
import MusicDetail from './pages/Music/MusicDetail/index.js'

//资讯相关页面
import NewsDetail from './pages/News/NewsDetail/index.js'
import NewsPage from './pages/News/NewsPage/index.js'

//配置tabbar
const TabPage = TabNavigator({
        HomePage: {
            screen: HomePage
        },
        MusicPage: {
            screen: MusicPage
        },
        FilmPage: {
            screen: FilmPage
        },
        NewsPage: {
            screen: NewsPage
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: '#999',
            showLabel: false,
            style: {
                backgroundColor: '#fff'
            },
            labelStyle: {
                fontSize: 12
            },
            indicatorStyle: {
                height: 0
            },
            iconStyle: {}
        }
    }
);

//配置页面路由
export const AppNavigator = StackNavigator(
    {
        TabPage: {screen: TabPage},
        NewsDetail: {screen: NewsDetail},
        MusicContent: {screen: MusicContent},
        MusicDetail: {screen: MusicDetail},
        FilmDetail: {screen: FilmDetail}
    },
    {
        initialRouteName: 'TabPage',
        navigationOptions: {
            headerTintColor: '#999'
        },
        mode: 'card'
    }
);


