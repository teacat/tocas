<?php
if(!class_exists('TocasUIDocumention'))
{
    class TocasUIDocumention
    {
        private $html = '';
        
        function header($title, $description, $hideSidebar=false)
        {
            ob_start();
    
            include('tpl/header.tpl.php');
            
            return $this;
        }
        
        function pureHeader($title, $description)
        {
            ob_start();
    
            include('tpl/pure-header.tpl.php');
            
            return $this;
        }
        
        function headerGroup($header, $description)
        {
            include('tpl/header-group.tpl.php');
            
            return $this;
        }
        
        function groupStart($title, $description)
        {
            include('tpl/group-start.tpl.php');
            
            return $this;
        }
        
        function single($title, $description, $sourceCode, $highlight, $jsCode = null, $empty = false)
        {
            include('tpl/single.tpl.php');
            
            return $this;
        }
        
        function run($sourceCode)
        {
            include('tpl/run.tpl.php');
            
            return $this;
        }
        
        function groupEnd()
        {
            include('tpl/group-end.tpl.php');
            
            return $this;
        }
        
        function cards($array)
        {
            echo '<div class="four column doubling row">';
            
            foreach($array as $title => $data)
            {
                extract($data);
                
                include('tpl/single-card.tpl.php');
                
                if(isset($title)) unset($title);
                if(isset($wip)) unset($wip);
            }
            
            echo '</div>';
            
            return $this;
        }
        
        function pureFooter($path)
        {
            include('tpl/pure-footer.tpl.php');
            
            $html = $this->minify(ob_get_contents());
            
            ob_end_clean();
            ob_end_flush();
            
            echo $html;
            
    
            $path = __DIR__ . '/../' . $path;
            
            umask(0);
            
            file_put_contents($path, $html);
            
            chmod($path, 0777);
    
            return $this;
        }
        
        function footer($path)
        {
            include('tpl/footer.tpl.php');
            
            $html = $this->minify(ob_get_contents());
            
            ob_end_flush();
            ob_end_clean();
    
            $path = __DIR__ . '/../' . $path;
            
            umask(0);
            
            file_put_contents($path, $html);
            
            chmod($path, 0777);
    
            return $this;
        }
        
        function minify($html)
        { 
            $search  = ['/\>[^\S ]+/s',  // Strip whitespaces after tags, except space
                        '/[^\S ]+\</s',  // Strip whitespaces before tags, except space
                        '/(\s)+/s'];     // Shorten multiple whitespace sequences
                        
            $replace = ['>', '<', '\\1'];
    
            $html = preg_replace($search, $replace, $html);
            
            return $html;
        }
    }
}
?>