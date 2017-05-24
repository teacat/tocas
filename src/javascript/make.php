<?php
$files = ['tocas', 'checkbox', 'sidebar'];
$raw   = '';

foreach($files as $file)
    $raw .= file_get_contents("$file.coffee") . "\n";

file_put_contents('./../tocas.dev.coffee', $raw);
exec('coffee -b -c  ./../tocas.dev.coffee');
exec('uglifyjs --compress --mangle -o ./../tocas.dev.min.js -- ./../tocas.dev.js');
?>