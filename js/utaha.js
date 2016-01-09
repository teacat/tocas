// Style HTML - Written by Nochum Sossonko, (nsossonko@hotmail.com)
function style_html(t,e){function i(){return this.pos=0,this.token="",this.current_mode="CONTENT",this.tags={parent:"parent1",parentcount:1,parent1:""},this.tag_type="",this.token_text=this.last_token=this.last_text=this.token_type="",this.Utils={whitespace:"\n\r	 ".split(""),single_token:"br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed".split(","),extra_liners:"head,body,/html".split(","),in_array:function(t,e){for(var i=0;i<e.length;i++)if(t===e[i])return!0;return!1}},this.get_content=function(){for(var t="",e=[],i=!1;"<"!==this.input.charAt(this.pos);){if(this.pos>=this.input.length)return e.length?e.join(""):["","TK_EOF"];if(t=this.input.charAt(this.pos),this.pos++,this.line_char_count++,this.Utils.in_array(t,this.Utils.whitespace))e.length&&(i=!0),this.line_char_count--;else{if(i){if(this.line_char_count>=this.max_char){e.push("\n");for(var n=0;n<this.indent_level;n++)e.push(this.indent_string);this.line_char_count=0}else e.push(" "),this.line_char_count++;i=!1}e.push(t)}}return e.length?e.join(""):""},this.get_contents_to=function(t){if(this.pos==this.input.length)return["","TK_EOF"];var e="",i=new RegExp("</"+t+"\\s*>","igm");i.lastIndex=this.pos;var n=i.exec(this.input),s=n?n.index:this.input.length;return this.pos<s&&(e=this.input.substring(this.pos,s),this.pos=s),e},this.record_tag=function(t){this.tags[t+"count"]?(this.tags[t+"count"]++,this.tags[t+this.tags[t+"count"]]=this.indent_level):(this.tags[t+"count"]=1,this.tags[t+this.tags[t+"count"]]=this.indent_level),this.tags[t+this.tags[t+"count"]+"parent"]=this.tags.parent,this.tags.parent=t+this.tags[t+"count"]},this.retrieve_tag=function(t){if(this.tags[t+"count"]){for(var e=this.tags.parent;e&&t+this.tags[t+"count"]!==e;)e=this.tags[e+"parent"];e&&(this.indent_level=this.tags[t+this.tags[t+"count"]],this.tags.parent=this.tags[e+"parent"]),delete this.tags[t+this.tags[t+"count"]+"parent"],delete this.tags[t+this.tags[t+"count"]],1==this.tags[t+"count"]?delete this.tags[t+"count"]:this.tags[t+"count"]--}},this.get_tag=function(){var t="",e=[],i=!1;do{if(this.pos>=this.input.length)return e.length?e.join(""):["","TK_EOF"];t=this.input.charAt(this.pos),this.pos++,this.line_char_count++,this.Utils.in_array(t,this.Utils.whitespace)?(i=!0,this.line_char_count--):(("'"===t||'"'===t)&&(e[1]&&"!"===e[1]||(t+=this.get_unformatted(t),i=!0)),"="===t&&(i=!1),e.length&&"="!==e[e.length-1]&&">"!==t&&i&&(this.line_char_count>=this.max_char?(this.print_newline(!1,e),this.line_char_count=0):(e.push(" "),this.line_char_count++),i=!1),e.push(t))}while(">"!==t);var n,s=e.join("");n=-1!=s.indexOf(" ")?s.indexOf(" "):s.indexOf(">");var h=s.substring(1,n).toLowerCase();if("/"===s.charAt(s.length-2)||this.Utils.in_array(h,this.Utils.single_token))this.tag_type="SINGLE";else if("script"===h)this.record_tag(h),this.tag_type="SCRIPT";else if("style"===h)this.record_tag(h),this.tag_type="STYLE";else if(this.Utils.in_array(h,unformatted)){var r=this.get_unformatted("</"+h+">",s);e.push(r),this.tag_type="SINGLE"}else if("!"===h.charAt(0))if(-1!=h.indexOf("[if")){if(-1!=s.indexOf("!IE")){var r=this.get_unformatted("-->",s);e.push(r)}this.tag_type="START"}else if(-1!=h.indexOf("[endif"))this.tag_type="END",this.unindent();else if(-1!=h.indexOf("[cdata[")){var r=this.get_unformatted("]]>",s);e.push(r),this.tag_type="SINGLE"}else{var r=this.get_unformatted("-->",s);e.push(r),this.tag_type="SINGLE"}else"/"===h.charAt(0)?(this.retrieve_tag(h.substring(1)),this.tag_type="END"):(this.record_tag(h),this.tag_type="START"),this.Utils.in_array(h,this.Utils.extra_liners)&&this.print_newline(!0,this.output);return e.join("")},this.get_unformatted=function(t,e){if(e&&-1!=e.indexOf(t))return"";var i="",n="",s=!0;do{if(this.pos>=this.input.length)return n;if(i=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(i,this.Utils.whitespace)){if(!s){this.line_char_count--;continue}if("\n"===i||"\r"===i){n+="\n",this.line_char_count=0;continue}}n+=i,this.line_char_count++,s=!0}while(-1==n.indexOf(t));return n},this.get_token=function(){var t;if("TK_TAG_SCRIPT"===this.last_token||"TK_TAG_STYLE"===this.last_token){var e=this.last_token.substr(7);return t=this.get_contents_to(e),"string"!=typeof t?t:[t,"TK_"+e]}if("CONTENT"===this.current_mode)return t=this.get_content(),"string"!=typeof t?t:[t,"TK_CONTENT"];if("TAG"===this.current_mode){if(t=this.get_tag(),"string"!=typeof t)return t;var i="TK_TAG_"+this.tag_type;return[t,i]}},this.get_full_indent=function(t){return t=this.indent_level+t||0,1>t?"":Array(t+1).join(this.indent_string)},this.printer=function(t,e,i,n,s){this.input=t||"",this.output=[],this.indent_character=e,this.indent_string="",this.indent_size=i,this.brace_style=s,this.indent_level=0,this.max_char=n,this.line_char_count=0;for(var h=0;h<this.indent_size;h++)this.indent_string+=this.indent_character;this.print_newline=function(t,e){if(this.line_char_count=0,e&&e.length){if(!t)for(;this.Utils.in_array(e[e.length-1],this.Utils.whitespace);)e.pop();e.push("\n");for(var i=0;i<this.indent_level;i++)e.push(this.indent_string)}},this.print_token=function(t){this.output.push(t)},this.indent=function(){this.indent_level++},this.unindent=function(){this.indent_level>0&&this.indent_level--}},this}var n,s,h,r,a;for(e=e||{},s=e.indent_size||4,h=e.indent_char||" ",a=e.brace_style||"collapse",r=0==e.max_char?1/0:e.max_char||70,unformatted=e.unformatted||["a"],n=new i,n.printer(t,h,s,r,a);;){var _=n.get_token();if(n.token_text=_[0],n.token_type=_[1],"TK_EOF"===n.token_type)break;switch(n.token_type){case"TK_TAG_START":n.print_newline(!1,n.output),n.print_token(n.token_text),n.indent(),n.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":n.print_newline(!1,n.output),n.print_token(n.token_text),n.current_mode="CONTENT";break;case"TK_TAG_END":if("TK_CONTENT"===n.last_token&&""===n.last_text){var o=n.token_text.match(/\w+/)[0],u=n.output[n.output.length-1].match(/<\s*(\w+)/);(null===u||u[1]!==o)&&n.print_newline(!0,n.output)}n.print_token(n.token_text),n.current_mode="CONTENT";break;case"TK_TAG_SINGLE":n.print_newline(!1,n.output),n.print_token(n.token_text),n.current_mode="CONTENT";break;case"TK_CONTENT":""!==n.token_text&&n.print_token(n.token_text),n.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(""!==n.token_text){n.output.push("\n");var l=n.token_text;if("TK_SCRIPT"==n.token_type)var c="function"==typeof js_beautify&&js_beautify;else if("TK_STYLE"==n.token_type)var c="function"==typeof css_beautify&&css_beautify;if("keep"==e.indent_scripts)var p=0;else if("separate"==e.indent_scripts)var p=-n.indent_level;else var p=1;var g=n.get_full_indent(p);if(c)l=c(l.replace(/^\s*/,g),e);else{var f=l.match(/^\s*/)[0],d=f.match(/[^\n\r]*$/)[0].split(n.indent_string).length-1,T=n.get_full_indent(p-d);l=l.replace(/^\s*/,g).replace(/\r\n|\r|\n/g,"\n"+T).replace(/\s*$/,"")}l&&(n.print_token(l),n.print_newline(!0,n.output))}n.current_mode="TAG"}n.last_token=n.token_type,n.last_text=n.token_text}return n.output.join("")}




/** Tidy html options */
var style_html_options = { 'indent_size' : 4 }




/**
 * Utaha
 */

var utaha = function(options)
{
    var options                  = options || {}
        options.exampleContainer = options.exampleContainer || '.example'
        options.previewContainer = options.previewContainer || '.preview'
        options.codeConrainer    = options.codeConrainer    || '.code'
        options.insertBeforeCode = options.insertBeforeCode || ''
        options.insertAfterCode  = options.insertAfterCode  || ''
        
        
        
        
    /** Get all the example containers first */
    var examples = document.querySelectorAll(options.exampleContainer);
    
    /** Now with each example container */
    for(var i = 0; i < examples.length; i++)
    {
        /** Get the preview container */
        var previewContainer = examples[i].querySelectorAll(options.previewContainer)[0]
    
        /** To the next example container if no preview container was found */
        if(previewContainer == 'undefined')
            continue
        
        /** Defined the source container, used to show the source code of the preview container */
        var sourceContainer = examples[i].querySelectorAll(options.codeConrainer)[0]
        /** Get the souce code of the preview container, and remove the unnecessary spaces */
        var sourceCode      = previewContainer.innerHTML.trim()
        /** Now tidy the html up */
        var sourceCode      = style_html(sourceCode, style_html_options)
        /** Create a code element for the highlight.js */
        var codeElement     = document.createElement("code")
        /** Get those class names which we want to marked */
        var importantPart   = sourceContainer.getAttribute('data-important-class')
        
        /** Apply the html class on the code element, because we are showing the HTML language code */
        codeElement.className = 'html';
        
        /** Append the code element into the source container */
        sourceContainer.appendChild(codeElement);
        
        sourceContainer.innerHTML = options.insertBeforeCode  + 
                                    sourceContainer.innerHTML + 
                                    options.insertAfterCode
        
        /** Now get the code element which is inside of the source container */
        var codeContainer = examples[i].querySelectorAll(options.codeConrainer + ' .html')[0]
        
        /** Now paste the source code into it */
        codeContainer.textContent = sourceCode
        
        /** Call the highlight function for the code container */
        hljs.highlightBlock(codeContainer)
        
        
        
        
        /**
         * Mark
         */
        
        if(typeof importantPart == 'undefined' || importantPart == null)
            continue
        
        /** Convert the string to the array with each comma */
        var importantPart = importantPart.split(', ')
        
        for(var thisPart in importantPart)
        {
            var thisPart     = importantPart[thisPart]
            /** Get all the tags which used to highlight the class names */
            var strings      = examples[i].querySelectorAll(options.codeConrainer + ' .html .hljs-string')
            var replacePart  = '<span class="hljs-important-class">' + thisPart + '</span>'
            
            
            /** Search the tags */
            for(var j = 0; j < strings.length; j++)
            {
                /** Skip this one if the word which we wanted to mark is not in this tag */
                if(strings[j].innerHTML.indexOf(thisPart) == -1)
                    continue
                
                /** Otherwise we replace it */
                strings[j].innerHTML = strings[j].innerHTML.replace(thisPart, replacePart)
            }
        }
    }
}