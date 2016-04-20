<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<link href="//fonts.googleapis.com/earlyaccess/notosanstc.css" rel="stylesheet" type="text/css">
<link href='//fonts.googleapis.com/css?family=Ubuntu+Mono' rel='stylesheet' type='text/css'>
<link href="../css/style.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.0.0/styles/tomorrow.min.css">
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.0.0/highlight.min.js"></script>
<script src='../js/utaha.js'></script>
<script src='../js/script.js'></script>
<title><?= $title; ?> - Tocas UI</title>
<body>
    
    <div class="ts big fluid info gridded jumbotron">
        <div class="ts container">
            <nav class="ts secondary relaxed inverted menu">
                <a class="item" href="index.html">
                    <img class="ts small image" src="../img/logo.png" style="margin-top: -.9em">
                </a>
                <a class="item" href="main.html">
                    <i class="fa fa-file"></i> 主要說明
                </a>
                <a class="item" href="collections.html">
                    <i class="fa fa-th"></i> 
                    聚合型
                </a>
                <a class="item" href="elements.html">
                    <i class="fa fa-cogs"></i> 
                    普通元素
                </a>
                <a class="item" href="modules.html">
                    <i class="fa fa-th-large"></i> 
                    模塊
                </a>
                <a class="item" href="views.html">
                    <i class="fa fa-eye"></i> 
                    外觀型
                </a>
                <div class="right menu">
                    <a class="item" target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LLEXZL6CRMC6L">
                        <i class="fa fa-paypal"></i>
                        贊助
                    </a>
                    <a class="item">
                        <i class="fa fa-github"></i>
                        Github
                    </a>
                    <a class="item">下載</a>
                </div>
            </nav>
        
            <h1 class="ts header">
                <?= $title; ?>
                <div class="sub header"><?= $description; ?></div>
            </h1>
        </div>
    </div>
    
    <div class="ts container">
        <br>
        <div class="ts stackable relaxed grid">
            <div class="four wide computer column sixteen wide tablet labelside"></div>
            <div class="twelve wide computer sixteen wide tablet sixteen wide mobile column">