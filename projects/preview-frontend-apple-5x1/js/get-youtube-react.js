var intervalMove;

var ModalYoutube = React.createClass({displayName: "ModalYoutube",
	render: function() {
		var styleModal = {
			display: this.props.show
		}
		var styleContainer = {
			position: 'relative',
			paddingBottom: '56.25%',
			height: '0',
			overflow: 'hidden', 
			maxWidth: '100%'
		}
		var styleIframe = {
			position: 'absolute', 
			top: '0', 
			left: '0', 
			width: '100%', 
			height: '100%'
		}
		var videoId = this.props.videoId
		if (videoId) {
			var srcVideo = "http://www.youtube.com/embed/" + videoId + "?autoplay=1"
		}else{
			var srcVideo = '';
		}
		return(
			React.createElement("div", {className: "modal", style: styleModal}, 
				React.createElement("div", {className: "wrapper-modal"}, 
					React.createElement("section", {className: "md-head"}, 
						React.createElement("h2", {className: " fl-left"}, "Videos de Youtube"), 
						React.createElement("a", {onClick: this.props.hideEvent, className: "close close-modal flat-x"})
					), 
					React.createElement("section", {className: "md-body", id: "md-body"}, 
						React.createElement("div", {style: styleContainer}, 
							React.createElement("iframe", {style: styleIframe, src: srcVideo, frameborder: "0", allowfullscreen: true})
						)
					)
				)
			)
		)
	}
});

var YoutubeVideos = React.createClass({displayName: "YoutubeVideos",
  render: function() {
  	var showModal = this.props.fnClick
    var createItem = function(itemText, index) {
      return (
		React.createElement("article", {className: "video-item", key: index + itemText, onClick: showModal.bind(this,itemText.snippet.resourceId.videoId)}, 
			React.createElement("div", {className: "container-thumbnail"}, 
				React.createElement("div", {className: "opacity-container"}, 
					React.createElement("span", {className: "date"}, moment(itemText.snippet.publishedAt).fromNow()), 
					React.createElement("i", {className: "flat-play-video"})
				), 
				React.createElement("img", {src: itemText.snippet.thumbnails.high.url, alt: ""})
			), 
			React.createElement("div", {className: "container-title"}, 
				React.createElement("span", null, itemText.snippet.title)
			)
		)
      )
    };
    return React.createElement("section", {id: "container-videos", className: "container-videos"}, this.props.items.map(createItem));
  }
});

var ContainerYoutubeVideos = React.createClass({displayName: "ContainerYoutubeVideos",
	getInitialState: function() {
		return {
			items:[], 
			activeApple:'tab active apple5x1-button-videos', 
			activeAndroid:'tab android5x1-button-videos', 
			visibleModal:'none',
			videoId:''
		};
	},
	componentDidMount: function() {
		$.get(this.props.source, function(response) {
			var ListVideosV3 = response.items;
			var ListVideos = []
			if (this.isMounted()) {
				for(var i in ListVideosV3){
					var title = ListVideosV3[i].snippet.title;
					if (title != 'Private video') {
						ListVideos.push(ListVideosV3[i])
					};
				}
				this.setState({items: ListVideos})
			};
		}.bind(this));
	},
	changeState: function(fromChannelVideos) {
		var url = '';
		if (fromChannelVideos=='apple') {
			url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLq8L3ZX4ovZlAmTNxs9nj-6dmkDgdNH5C&key=AIzaSyDaYys_1T19BUxhCfZUUQl7Lgn0W4AYfl0&order=date';
			this.setState({activeApple:'tab active apple5x1-button-videos', activeAndroid:'tab android5x1-button-videos'})
		} else if (fromChannelVideos=='android') {
			url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLF-irnHrSTfhuodLo0PDoIz0y52libOet&key=AIzaSyDaYys_1T19BUxhCfZUUQl7Lgn0W4AYfl0&order=date';
			this.setState({activeApple:'tab apple5x1-button-videos', activeAndroid:'tab active android5x1-button-videos'})
		}
		$.get(url, function(response) {
			var ListVideosV3 = response.items;
			var ListVideos = []
			if (this.isMounted()) {
				for(var i in ListVideosV3){
					var title = ListVideosV3[i].snippet.title;
					if (title != 'Private video') {
						ListVideos.push(ListVideosV3[i])
					};
				}
				this.setState({items: ListVideos})
			};
		}.bind(this));
	},
	destroyInterval: function() {
		clearInterval(intervalMove);
	},
	moveLeft: function() {
		var containerVideos = document.getElementById('container-videos');
		intervalMove = setInterval(function() {
			containerVideos.scrollLeft -= 1;
		}, 1);			
	},
	moveRight: function() {
		var containerVideos = document.getElementById('container-videos');
		intervalMove = setInterval(function() {
			containerVideos.scrollLeft += 1;
		}, 1);		
	},
	showModal: function(id) {
		this.setState({visibleModal: 'block', videoId:id})
	},
	closeModal: function(id) {
		this.setState({visibleModal: 'none', videoId:'none'})
	},
	render: function() {
		return (
			React.createElement("div", {className: "rows"}, 
				React.createElement("div", {className: "columns grid-4"}, 
					React.createElement("h2", {className: "title"}, React.createElement("i", {className: "flat-youtube"}), " ÚLTIMOS VIDEOS")
				), 
				React.createElement("div", {className: "columns grid-4"}, 
					React.createElement("a", {className: this.state.activeApple, onClick: this.changeState.bind(this,'apple')}, 
						React.createElement("div", {className: "indicator"}), 
						React.createElement("img", {src: "images/apple5x1-white.png", height: "30px", alt: ""})
					)
				), 
				React.createElement("div", {className: "columns grid-4"}, 
					React.createElement("a", {className: this.state.activeAndroid, onClick: this.changeState.bind(this,'android')}, 
						React.createElement("div", {className: "indicator"}), 
						React.createElement("img", {src: "images/android5x1-white.png", height: "40px", alt: ""})
					)					
				), 
				React.createElement("div", {className: "columns grid-12 wrapper"}, 
					React.createElement("section", {id: "left-videos-button", onMouseEnter: this.moveLeft, onMouseLeave: this.destroyInterval, className: "side left"}, React.createElement("i", {className: "flat-left"})), 
					React.createElement(YoutubeVideos, {items: this.state.items, fnClick: this.showModal}), 
					React.createElement("section", {id: "right-videos-button", onMouseEnter: this.moveRight, onMouseLeave: this.destroyInterval, className: "side right"}, React.createElement("i", {className: "flat-right"}))	
				), 
				React.createElement(ModalYoutube, {show: this.state.visibleModal, videoId: this.state.videoId, hideEvent: this.closeModal})		
			)
		);
	}
});

try{
	React.render(
		React.createElement(ContainerYoutubeVideos, {source: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLq8L3ZX4ovZlAmTNxs9nj-6dmkDgdNH5C&key=AIzaSyDaYys_1T19BUxhCfZUUQl7Lgn0W4AYfl0&order=date"}),
		document.getElementById('wrapper-videos-youtube')
	)
}catch(err){}