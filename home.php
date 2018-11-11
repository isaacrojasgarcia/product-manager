<?php
	include_once 'dbconfig.php';
	if(!$user->is_loggedin())
	{
		$user->redirect('index.php');
	}
	$user_id = $_SESSION['user_session'];
	$stmt = $DB_con->prepare("SELECT * FROM users WHERE user_id=:user_id");
	$stmt->execute(array(":user_id"=>$user_id));
	$userRow=$stmt->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="myApp">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" type="text/css"  />
		<link rel="stylesheet" href="css/style.css" type="text/css"  />
		<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />

		<title>Angular Shop - <?php print($userRow['user_name']); ?></title>
	</head>

	<body>

		<div class="header">
			<div class="left">
		    	<div class="blog-masthead">
		          <nav class="blog-nav">
		            <a class="blog-nav-item active" href="#product">Products</a>
		            <a class="blog-nav-item active" href="#category">Categories</a>
		          </nav>			
      			</div>
		    </div>

		    <div class="right">
		    	<label><a href="logout.php?logout=true"><?php print('User: '.$userRow['user_name']); ?></i> | logout</a></label>
		    </div>
		</div>

		<!--
		<div class="blog-masthead">
	        <div class="container">
	          <nav class="blog-nav">
	            <a class="blog-nav-item active" href="#product">Products</a>
	            <a class="blog-nav-item active" href="#category">Categories</a>
	          </nav>
	        </div>
      	</div>
      	-->

	    <div class="container">
	        <div class="page-content">
	          <div ng-view="" id="ng-view"></div>
	        </div>
	    </div>

		<!-- JavaScript Libraries -->
	    <script src="js/angular.min.js"></script>
	    <script src="js/ui-bootstrap-tpls-0.11.2.min.js"></script>
	    <script src="js/angular-route.min.js"></script>
	    <script src="js/angular-animate.min.js"></script>

	    <!-- AngularJS custom codes -->
	    <script src="app/app.js"></script>
	    <script src="app/data.js"></script>
	    <script src="app/directives.js"></script>
	    <script src="app/productsCtrl.js"></script>
	   	<script src="app/categoriesCtrl.js"></script>


	    <!-- Bootstrap Libraries -->
	    <script src="js/jquery.min.js"></script>
	    <script src="js/bootstrap.min.js"></script>
	    <script src="js/underscore.min.js"></script>
	</body>
</html>