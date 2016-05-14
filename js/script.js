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
    
    

    hljs.initHighlighting();

    
    setTimeout(function()
    {
        $('.hljs-tag').each(function(){
          if($(this).children().length == 0){
            $(this).css('word-spacing', '0px');
          }
        });
    }, 500)
    
    $(document).click(function(event) { 
    if(!$(event.target).closest('.dropdown').length) {
        if($('.dropdown').hasClass("active")) {
            $('.dropdown .menu').addClass('hidden')
            $('.dropdown .menu *').removeClass('animated fadeInLeft fadeInRight')
        }
    }        
})

    
    function quadrant(el)
    {
        var position    = el.getBoundingClientRect()
        var width = window.innerWidth
        var widthHalf = width / 2
        var height = window.innerHeight
        var heightHalf = height / 2
        
        

        if(position.left < widthHalf && position.top < heightHalf)
            return 2
        else if(position.left < widthHalf && position.top > heightHalf)
            return 3
        else if(position.left > widthHalf && position.top > heightHalf)
            return 4
        else if(position.left > widthHalf && position.top < heightHalf)
            return 1
        
        
    }
    
    

    
    $('.ts.dropdown .menu').addClass('hidden')
    
    
    
    $('.ts.dropdown .menu').on('click', function(e) {
        console.log(e)
  if (e.target !== this)
    return;
        $(this).parent().removeClass('active').addClass('hiding')
  
});
       
    
    
    
    
    $('.ts.dropdown.mobile.friendly').on('click', function(e)
    {console.log(e)
        if(e.toElement.className == 'menu')
            return;
        
        
        
        
       // $(this).find('.menu').css({'width': window.innerWidth, 'height': window.innerHeight})
       $(this).find('.menu').removeClass('hidden')
       $(this).addClass('active')
       
       
       
       
       //var a = $(this)
       //setTimeout(function()
       //{
       //    a.find('.menu .inner').addClass('animated slideInUp')
       //}, 600);
    })
    
    
    
    
    
    
    
    
    
    
    $('.ts.dropdown:not(.mobile.friendly)').on('click', function()
    {
        
        
        var pa = $(this)[0]
        
        
        if(quadrant(pa) == 2)
            $(this).removeClass('upward downward leftward rightward').addClass('downward rightward');
        
        if(quadrant(pa) == 3)
            $(this).removeClass('upward downward leftward rightward').addClass('upward rightward');
        
        if(quadrant(pa) == 1)
            $(this).removeClass('upward downward leftward rightward').addClass('downward leftward');
   
        if(quadrant(pa) == 4)
            $(this).removeClass('upward downward leftward rightward').addClass('upward leftward');
            
        
        $(this).find('.menu').children().css('opacity', '0')


        if($(this).hasClass('downward'))
        {
            $(this).find('.menu').children().each(function(index)
            {
                var thisOne = $(this)
    
                setTimeout(function()
                {
                    thisOne.show()
                    if(quadrant(pa) == 2 || quadrant(pa) == 3)
                        thisOne.addClass('animated fadeInLeft');
                    else if(quadrant(pa) == 1 || quadrant(pa) == 4)
                        thisOne.addClass('animated fadeInRight');
                }, 60 * index);
    
            })
        }

        
        if($(this).hasClass('upward'))
        {
            $($(this).find('.menu').children().get().reverse()).each(function(index)
            {
                var thisOne = $(this)
    
                setTimeout(function()
                {
                    thisOne.show()
                    if(quadrant(pa) == 2 || quadrant(pa) == 3)
                        thisOne.addClass('animated fadeInLeft');
                    else if(quadrant(pa) == 1 || quadrant(pa) == 4)
                        thisOne.addClass('animated fadeInRight');
                }, 80 * index);
    
            })
        }
        paa = $(this)

        setTimeout(function(){
            paa.find('.menu').removeClass('hidden')
            paa.addClass('active')
        }, 0)
        
        //$(this).find('.menu').removeClass('hidden')
        
        
        
    })
    
    
})