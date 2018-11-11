<?php
    require '.././libs/Slim/Slim.php';
    require_once 'dbHelper.php';

    \Slim\Slim::registerAutoloader();
    $app = new \Slim\Slim();
    $app = \Slim\Slim::getInstance();
    $db = new dbHelper();


    // Products
    $app->get('/product', function() { 
        global $db;
        $rows = $db->select("product","id,title,description,image,category_id",array());
        echoResponse(200, $rows);
    });

    $app->post('/product', function() use ($app) { 
        $data = json_decode($app->request->getBody());
        $mandatory = array('name');
        global $db;
        $rows = $db->insert("product", $data, $mandatory);
        if($rows["status"]=="success")
            $rows["message"] = "Product added successfully.";
        echoResponse(200, $rows);
    });

    $app->put('/product/:id', function($id) use ($app) { 
        $data = json_decode($app->request->getBody());
        $condition = array('id'=>$id);
        $mandatory = array();
        global $db;
        $rows = $db->update("product", $data, $condition, $mandatory);
        if($rows["status"]=="success")
            $rows["message"] = "Product information updated successfully.";
        echoResponse(200, $rows);
    });

    $app->delete('/product/:id', function($id) { 
        global $db;
        $rows = $db->delete("product", array('id'=>$id));
        if($rows["status"]=="success")
            $rows["message"] = "Product removed successfully.";
        echoResponse(200, $rows);
    });
	
	// Categories
    $app->get('/category', function() { 
        global $db;
        $rows = $db->select("category","id,name",array());
        echoResponse(200, $rows);
    });

    $app->post('/category', function() use ($app) { 
        $data = json_decode($app->request->getBody());
        $mandatory = array('name');
        global $db;
        $rows = $db->insert("category", $data, $mandatory);
        if($rows["status"]=="success")
            $rows["message"] = "category added successfully.";
        echoResponse(200, $rows);
    });

    $app->put('/category/:id', function($id) use ($app) { 
        $data = json_decode($app->request->getBody());
        $condition = array('id'=>$id);
        $mandatory = array();
        global $db;
        $rows = $db->update("category", $data, $condition, $mandatory);
        if($rows["status"]=="success")
            $rows["message"] = "category information updated successfully.";
        echoResponse(200, $rows);
    });

    $app->delete('/category/:id', function($id) { 
        global $db;
        $rows = $db->delete("category", array('id'=>$id));
        if($rows["status"]=="success")
            $rows["message"] = "category removed successfully.";
        echoResponse(200, $rows);
    });

    function echoResponse($status_code, $response) {
        global $app;
        $app->status($status_code);
        $app->contentType('application/json');
        echo json_encode($response,JSON_NUMERIC_CHECK);
    }

    $app->run();
?>