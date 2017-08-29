import React, {Component} from 'React'
import {
	StyleSheet,
	Dimensions,
	Platform,
	View,
	Image
} from 'react-native'
import HTMLView from 'react-native-htmlview'
// import _ from 'lodash';

const colors = ['#E74C3C', '#C0392B', '#1ABC9C',
	'#16A085', '#2ECC71', '#27AE60', '#3498DB',
	'#2980B9', '#9B59B6', '#8E44AD', '#34495E',
	'#2C3E50', '#E67E22',
	'#D35400', '#7F8C8D'];

function randomBg(){
  return colors[Math.ceil(Math.random()*colors.length-1)]
}

const {width, height} = Dimensions.get('window');
const defaultMaxImageWidth = width - 30 - 20;
const regs = {
	http: {
		topic: /^https?:\/\/cnodejs\.org\/topic\/\w*/,
		user: /^https?:\/\/cnodejs\.org\/user\/\w*/
	},
	gif: /.*\.gif$/
};


function parseImgUrl(url) {
	if (/^\/\/.*/.test(url)) {
		url = 'https:' + url
	}
	return url
}


export default class HtmlShowView extends Component{
    
    static propTypes = {
    	navigator: React.PropTypes.object,
    	imgStyle: React.PropTypes.object
    };

    static defaultProps = {
    	maxImageWidth : defaultMaxImageWidth
    };

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}


	// _onImageLoadEnd(uri, imageId) {
	// 	const {maxImageWidth} = this.props;
	// 	Image.getSize && Image.getSize(uri, (w, h)=> {
	// 		if (w >= maxImageWidth) {
	// 			h = (maxImageWidth / w) * h;
	// 			w = maxImageWidth;
	// 		}
	// 		this._images[imageId] && this._images[imageId].setNativeProps({
	// 			style: {
	// 				width: w,
	// 				height: h
	// 			}
	// 		});
	// 	});
	// }


	// _renderNode(node, index, parent, type) {
	// 	const name = node.name;
	// 	const imgStyle = this.props.imgStyle || styles.img;

	// 	if (node.type == 'block' && type == 'block') {
	// 		if (name == 'img') {
	// 			const uri = parseImgUrl(node.attribs.src);
	// 			if (regs.gif.test(uri)) return null;
	// 			const imageId = _.uniqueId('image_');
	// 			return (
	// 				<Image
	// 					key={imageId}
	// 					ref={view=>this._images[imageId]=view}
	// 					source={{uri:uri}}
	// 					style={imgStyle}
	// 					onLoadEnd={this._onImageLoadEnd.bind(this, uri, imageId)}
	// 				/>
	// 			)
	// 		}
	// 	}
	// }
	// 
	
	_renderNode(node, index) {
	  if (node.name == 'img') {

	    let uri =  node.attribs.src;
	    console.log(uri);
	    return (
			<Image
			    key={index}
				source={{uri:uri}}
				style={styles.img}
			/>    );
	  }
	}

	render(){
		let chhtml = this.props.content.replace(/src=\"\/\//g,`src="https://`);
		// console.log(chhtml);
		return(
           <HTMLView 
              value={chhtml}
              renderNode={this._renderNode.bind(this)}
           />
		);
	}
}


const styles = StyleSheet.create({
	img: {
		width: defaultMaxImageWidth,
		height: defaultMaxImageWidth,
		resizeMode: Image.resizeMode.cover,
		borderRadius: 5,
		margin: 10
	}
});