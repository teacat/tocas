$(function()
{
    $('.group').each(function()
    {

            var title = $(this).find('.title').contents().filter(function() 
            { 
                return !!$.trim( this.innerHTML || this.data ); 
            })
            .first().text().trim()
            
            
            $('.labelside').append('<label class="left label">' + title + '</label><ul class="left ul"></ul>')
        
            
        

        $(this).find('.type').each(function()
        {
            var id = $(this).contents().filter(function() 
            { 
                return !!$.trim( this.innerHTML || this.data ); 
            })
            .first().text().trim()
            
            $(this).attr('id', id)
            
            $('.labelside ul').last().append('<li><a href="#' + id + '">' + id + '</a></li>')
        })
        
        
        
        
    })
    
    
    utaha({'insertAfterCode': '<div class="ts bottom right attached label">原始碼</div>'})
    
    
    
    hljs.initHighlightingOnLoad();
    
})