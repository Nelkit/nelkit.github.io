var intervalMove;

var ModalYoutube = React.createClass({
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
			<div className="modal" style={styleModal}>
				<div className="wrapper-modal">
					<section className="md-head">
						<h2 className=" fl-left">Videos de Youtube</h2>
						<a onClick={this.props.hideEvent} className="close close-modal flat-x"></a>
					</section>
					<section className="md-body" id="md-body">
						<div style={styleContainer}>
							<iframe style={styleIframe} src={srcVideo} frameborder="0" allowfullscreen></iframe>
						</div>
					</section>
				</div>
			</div>
		)
	}
});

var YoutubeVideos = React.createClass({
  render: function() {
  	var showModal = this.props.fnClick
    var createItem = function(itemText, index) {
      return (
		<article className="video-item" key={index + itemText} onClick={showModal.bind(this,itemText.snippet.resourceId.videoId)}>
			<div className="container-thumbnail">
				<div className="opacity-container"> 
					<span className="date">{moment(itemText.snippet.publishedAt).fromNow()}</span>
					<i className="flat-play-video"></i>
				</div>
				<img src={itemText.snippet.thumbnails.high.url} alt=""/>
			</div>
			<div className="container-title">
				<span>{itemText.snippet.title}</span>
			</div>
		</article>
      )
    };
    return <section id="container-videos" className="container-videos">{this.props.items.map(createItem)}</section>;
  }
});

var ContainerYoutubeVideos = React.createClass({
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
			<div className="rows">
				<div className="columns grid-4">
					<h2 className="title"><i className="flat-youtube"></i> ÚLTIMOS VIDEOS</h2>
				</div>
				<div className="columns grid-4">
					<a className={this.state.activeApple} onClick={this.changeState.bind(this,'apple')}>
						<div className="indicator"></div>
						<img src="images/apple5x1-white.png" height="30px" alt=""/>
					</a>
				</div>
				<div className="columns grid-4">
					<a className={this.state.activeAndroid} onClick={this.changeState.bind(this,'android')}>
						<div className="indicator"></div>
						<img src="images/android5x1-white.png" height="40px" alt=""/>
					</a>					
				</div>
				<div className="columns grid-12 wrapper">
					<section id="left-videos-button" onMouseEnter={this.moveLeft} onMouseLeave={this.destroyInterval} className="side left"><i className="flat-left"></i></section>
					<YoutubeVideos items={this.state.items} fnClick={this.showModal} />
					<section id="right-videos-button" onMouseEnter={this.moveRight} onMouseLeave={this.destroyInterval} className="side right"><i className="flat-right"></i></section>	
				</div>
				<ModalYoutube show={this.state.visibleModal} videoId={this.state.videoId} hideEvent={this.closeModal}/>		
			</div>
		);
	}
});

try{
	React.render(
		<ContainerYoutubeVideos source="https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLq8L3ZX4ovZlAmTNxs9nj-6dmkDgdNH5C&key=AIzaSyDaYys_1T19BUxhCfZUUQl7Lgn0W4AYfl0&order=date" />,
		document.getElementById('wrapper-videos-youtube')
	)
}catch(err){}