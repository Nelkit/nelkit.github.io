jQuery(document).ready(function($) {
	
	/*Configuracion del boton responsivo de la web */
		var buttonMenu = document.getElementById('button-menu');
		var mainMenu = document.getElementById('main-menu');
		var buttonSearch = document.getElementById('button-search')
		var buttonProfile = document.getElementById('button-profile')
		var accumulator = 0;

		buttonMenu.addEventListener('click', function () {
			var icon = buttonMenu.getElementsByTagName("span");
			accumulator = accumulator+1;
			mod = accumulator%2;
			if (mod===1) {
				buttonSearch.style.display = "block"
				buttonProfile.style.display = "block"
				icon[0].className = 'menu-x'
				mainMenu.className = 'menu visible';				
			}else{
				buttonSearch.style.display = "none"
				buttonProfile.style.display = "none"
				icon[0].className = 'menu-lines'
				mainMenu.className = 'menu oculto';		
			}	
		})
	/*Termina Configuracion del boton responsivo de la web */
	/*Configuracion botones sociales de articulos */
	var ix = 0;
	$( window ).scroll(function() {
		var scrollTop = document.body.scrollTop 
		try{
			if (window.matchMedia('(min-width:600px)').matches) {
				var floatingShare = document.getElementById('article-share-container')
				var imageMain = $('.container-image-fig');
				ix = ix + 1;
		  		imageMain.css({
		  			marginTop: (scrollTop)+'px'
		  		});
			  	if (scrollTop>=680) {
			  		floatingShare.style.position = "fixed"
			  		floatingShare.style.top = "66px"
			  	}else{
			  		floatingShare.style.position = "absolute"
			  		floatingShare.style.top = "10px"		  		
			  	}
		  	};
		}catch(err){}
	});
	/*Termina Configuracion botones sociales de articulos */

	/*Configuracion del cargado de mas articulos */
	try{
		var loadMore = document.getElementById('load-more');
		var containerLoadedArticles = document.getElementById('container-loaded-articles');
		loadMore.addEventListener('click',function() {
			for (var i = 1; i <= 8; i++) {
				containerLoadedArticles.innerHTML += '<a href="#article-secondary" class="article-loaded"><div class="image-container"><img src="images/1.jpg" height="200px" alt="">		</div><div class="descrip-container"><div class="category-container"><ul><li style="background:#234562">APPLE</li><li style="background:#123123">LO ULTIMO</li></ul></div><span class="date">hace 23 minutos</span><h3 class="title">Apple consigue patente para escritura</h3><p class="overview">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p><div class="bar-bottom"><img src="images/avatar.jpg" class="author-img" alt=""><div class="author-info"><span>Escrito por: </span><span class="author-name"> Hola miuasn </span></div><button class="inline flat-share share"></button></div></div>	</a>'; 
			};
		})
	}catch(err){}
	/*Termina Configuracion del cargado de mas articulos */

	/*Configuracion de los botones de cargado articulos 
	Por "Tendencia, Recomendado, Muy Utiles, Etc" */
	try{
		var containerTypeFeed = document.getElementById('container-type-feed')
		var trending = document.getElementById('trending')
		var recommended = document.getElementById('recommended')
		var useful = document.getElementById('useful')
		var incredible = document.getElementById('incredible')
		var outrageous = document.getElementById('outrageous')

		var getFeedArticles = function(url) {
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'html'
			})
			.success(function(response, status) {
				try{
					containerTypeFeed.innerHTML = '';
					containerTypeFeed.innerHTML = response;
				}catch(err){}
			})
		}

		getFeedArticles('templates-type-feed/trending.html')

		trending.addEventListener('click', function() {
			this.className = ' active trending tab'
			recommended.className = ' recomendado tab'
			useful.className = ' util tab'
			incredible.className = ' increible tab'
			outrageous.className = ' indignante tab'
			getFeedArticles('templates-type-feed/trending.html')
		})
		recommended.addEventListener('click', function() {
			this.className = ' active recomendado tab'
			trending.className = ' trending tab'
			useful.className = ' util tab'
			incredible.className = ' increible tab'
			outrageous.className = ' indignante tab'
			getFeedArticles('templates-type-feed/recommended.html')
		})
		useful.addEventListener('click', function() {
			this.className = ' active util tab'
			trending.className = ' trending tab'
			recommended.className = ' recomendado tab'
			incredible.className = ' increible tab'
			outrageous.className = ' indignante tab'
			getFeedArticles('templates-type-feed/useful.html')
		})
		incredible.addEventListener('click', function() {
			this.className = ' active increible tab'
			trending.className = ' trending tab'
			recommended.className = ' recomendado tab'
			useful.className = ' util tab'
			outrageous.className = ' indignante tab'
			getFeedArticles('templates-type-feed/incredible.html')
		})
		outrageous.addEventListener('click', function() {
			this.className = ' active indignante tab'
			trending.className = ' trending tab'
			recommended.className = ' recomendado tab'
			useful.className = ' util tab'
			incredible.className = ' increible tab'
			getFeedArticles('templates-type-feed/outrageous.html')
		})
	}catch(err){}
	/*Termina Configuracion de los botones de cargado articulos 
	Por "Tendencia, Recomendado, Muy Utiles, Etc" */

	/*Configuracion del Modal de Login*/
		var htmlLoadedContainer = document.getElementById('html-loaded-container');
		var buttonProfile = document.getElementById('button-profile')

		var getFormLogin = function(url) {
			$.ajax({
				url: 'templates-login/' + url,
				type: 'GET',
				dataType: 'html'
			})
			.success(function(response, status) {
				htmlLoadedContainer.innerHTML = response;

				var loadAccess = document.getElementById('load-access')
				var loadRegister = document.getElementById('load-register')
				var loadForgot = document.getElementById('load-forgot')
				var closeModallogin = document.getElementById('close-login')
				
				loadAccess.addEventListener('click',function() {
					getFormLogin('login-form.html');
				})
				
				loadRegister.addEventListener('click',function() {
					getFormLogin('register-form.html');
				})
				
				loadForgot.addEventListener('click',function() {
					getFormLogin('forgot-form.html');
				})

				closeModallogin.addEventListener('click',function() {
					htmlLoadedContainer.innerHTML = ''
				})
			})
		}

		buttonProfile.addEventListener('click',function() {
			getFormLogin('login-form.html');
		});
	/*Termina Configuracion del Modal de Login*/

	/*Configuracion del Modal de busqueda*/
		var buttonSearch = document.getElementById('button-search')
		var body = document.body;
		var getFormSearch = function(url) {
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'html'
			})
			.success(function(response, status) {
				htmlLoadedContainer.innerHTML = response;

				var buttonHideSearch = document.getElementById('button-hide-search');
				buttonHideSearch.addEventListener('click',function() {
					htmlLoadedContainer.innerHTML = '';
					body.style.overflow = 'auto';
				});
				body.style.overflow = 'hidden'
			});
		}
		buttonSearch.addEventListener('click',function() {
			getFormSearch('search.html');
		})
	/*Termina Configuracion del Modal de busqueda*/
	/*Configuracion reproductor de podcast*/
		var containerFloatingPlayer = document.getElementById('container-floating-player');
		var openFloatingPlayer = document.getElementById('open-play-floating');
		var playerPodcastSidebar = document.getElementById('player-podcast');
		var getPlayerFloating = function(url) {
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'html'
			})
			.success(function(response, status) {
				containerFloatingPlayer.innerHTML = response;
				var closeFloatingPlayer = document.getElementById('close-floating-player')

				closeFloatingPlayer.addEventListener('click', function() {
					containerFloatingPlayer.innerHTML = '';
					playerPodcastSidebar.style.display = 'block';
				})
			});
		}
		try{
			openFloatingPlayer.addEventListener('click',function() {
				getPlayerFloating('player.html');
				playerPodcastSidebar.style.display = 'none';
			})
		}catch(err){}
	/*Termina Configuracion reproductor de podcast*/

});