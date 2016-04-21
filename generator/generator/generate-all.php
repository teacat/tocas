<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');

foreach(glob("../modules/*.php") as $filename)
    include(__DIR__ . '/' . $filename);
foreach(glob("../views/*.php") as $filename)
    include(__DIR__ . '/' . $filename);
foreach(glob("../collections/*.php") as $filename)
    include(__DIR__ . '/' . $filename);
foreach(glob("../elements/*.php") as $filename)
    include(__DIR__ . '/' . $filename);
foreach(glob("../*.php") as $filename)
    include(__DIR__ . '/' . $filename);

?>