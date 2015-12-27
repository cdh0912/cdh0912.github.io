<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
	<head>
    	<meta charset="utf-8">
		<meta name="Author" content="Paper Leaf Design | www.paper-leaf.com" />
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    	<title>Alton | jQuery Scrolling Plugin</title>
		<meta name="theme-color" content="#db2525">
		<link rel="icon" href="assets/imgs/favicon.ico" type="image/png" />
		<link rel="icon" sizes="192x192" href="assets/imgs/favicon1.png"/>
		<!-- JS -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script type="text/javascript" src="assets/js/jquery.alton.js"></script>
		<script src="//use.typekit.net/nka7dai.js"></script>
		<script>try{Typekit.load();}catch(e){}</script>
		<link rel="stylesheet" href="assets/styles/standard.css">

	</head>

	 <body class="pageWrapper">
	 	<!-- Google Tag Manager -->
		<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-MM9WRV"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-MM9WRV');</script>
		<!-- End Google Tag Manager -->
		<section class="pane-container">
			<div class="pane paneOne">
				<div class="content-container">
					<div class="wrapper lightText">
						<div class="content left">
							<h1>Hi. I'm Alton. Let's be Friends.</h1>
							<h2>I'm a nifty jquery plugin for full page scrolling presentations on the web. Want to see what i can do? Scroll down!</h2>
						</div>
						<div class="image-container right">
							<img src="assets/imgs/logo.svg" />
						</div>
					</div>
				</div>
			</div>
			<div class="pane paneTwo">
				<div class="content-container" style="background-image: url(assets/imgs/blurred-bg.jpg); background-size: cover;">
					<div class="wrapper lightText">
						<div class="content right">
							<h1>100% Full-Screen Scrolling.</h1>

							<p>Make your web experience an impactful one with full-screen scrolling. Alton is great for presenting: galleries of work; features & benefits of software or services; or really anything else you can put your mind to.</p>
						</div>
						<div class="image-container left">
							<img src="assets/imgs/screen-graphic.svg" />
						</div>
					</div>
				</div>
			</div>
			<div class="pane paneThree">
				<div class="content-container">
					<div class="wrapper darkText">
						<div class="content left">
							<h1>Multiple Options Out Of The Box.</h1>
							<p>You can apply Alton to all parent containers, as we’ve done here. Plus, you can choose to only apply it to the hero section using <a href="/alton/heroscroll">HeroScroll</a>, or use a nifty feature we built in called <a href="/alton/bookend">Bookend</a> to allow for independent starting & finishing containers. Plus, the whole plugin is easy to implement, lightweight, and has fallbacks for mobile.</p>
						</div>
						<div class="image-container right">
							<img src="assets/imgs/options-graphic.svg" />
						</div>
					</div>
				</div>
			</div>
			<div class="pane paneFour">
				<div class="content-container">
					<div class="wrapper lightText">
						<div class="content center">
							<h1>Download Links</h1>
							<a href="https://github.com/paper-leaf/alton/" target="_blank">GitHub</a>
							<!-- Need Download Link -->
							<a href="https://github.com/paper-leaf/alton/releases/download/1.2.0/alton.compressed.zip">Download</a>
							<a href="http://paper-leaf.com" target="_blank">Paper Leaf</a>
							<div class="tutLinks">
								<a href="http://demo.paper-leaf.com/alton/heroscroll">
									← View HeroScroll Demo
								</a>
								<!-- Need Tutorial Link -->
								<a href="http://paper-leaf.com/alton-jquery-scroll-jacking-plugin">
									Back to Tutorial
								</a>
								<a href="http://demo.paper-leaf.com/alton/bookend">
									View Bookend Demo →
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    </body>

	<script>
		(function($) {
			$(document).ready(function() {
			    $(document).alton({
			        fullSlideContainer: 'pane-container',
			        singleSlideClass: 'pane',
			        useSlideNumbers: true,
			        slideNumbersBorderColor: '#fff',
			        slideNumbersColor: 'transparent',
			        bodyContainer: 'pageWrapper',
			    });
			});
		})(jQuery);
	</script>

	</body>
</html>
