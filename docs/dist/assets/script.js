// Generated by CoffeeScript 2.3.1
(function() {
  $(() => {
    var Selector;
    Selector = {
      SOURCE_BTN: 'section > h2 > button.ts.button:first-of-type',
      RESPONSIVE_BTN: 'section > h2 > button.ts.button:nth-of-type(2)',
      SECTION_HEADER: 'section > h2 > a'
    };
    $(Selector.SECTION_HEADER).hover(function() {
      return $(this).text('#').addClass('hovered');
    }, function() {
      return $(this).text('').removeClass('hovered');
    });
    $(Selector.SOURCE_BTN).on('click', function() {
      var $codeBlock, $exampleBlock, $exampleSection;
      $exampleSection = $(this).parent().nextAll('.ts.segments').first();
      $exampleBlock = $exampleSection.find('.ts.segment').first();
      $codeBlock = $exampleSection.find('.ts.segment').last();
      $(this).toggleClass('active');
      if ($exampleSection.data('showing')) {
        $exampleSection.data('showing', false);
        $exampleBlock.addClass('fitted basic');
        $codeBlock.attr('hidden', 'hidden');
        return;
      }
      $exampleSection.data('showing', true);
      $exampleBlock.removeClass('fitted basic');
      return $codeBlock.removeAttr('hidden');
    });
    return $(Selector.RESPONSIVE_BTN).on('click', function() {
      var $exampleBlock, $exampleSection, $iframe, $responsiveBlock, body, html;
      $exampleSection = $(this).parent().nextAll('.ts.segments').first();
      $exampleBlock = $exampleSection.find('.ts.segment').first();
      $responsiveBlock = $exampleSection.find('.ts.segment').eq(1);
      $iframe = $responsiveBlock.find('iframe');
      html = $exampleBlock.html();
      body = `<meta charset="UTF-8">\n<meta name="viewport" content="max-width=767, initial-scale=1">\n<link rel="stylesheet" href="../../assets/styles/tocas.css">\n<link rel="stylesheet" href="../../assets/highlight.css">\n<link rel="stylesheet" href="../../assets/images/style.css">\n<style type="text/css">\n    body{\n        margin: 0;\n    }\n</style>\n${html}`;
      $(this).toggleClass('active');
      if ($exampleSection.data('responsiving') === void 0) {
        $iframe.get(0).style.height = '0px';
        $iframe.contents().find('body').html(body);
      }
      if ($exampleSection.data('responsiving')) {
        $exampleSection.data('responsiving', false);
        $exampleBlock.removeAttr('hidden');
        $responsiveBlock.attr('hidden', 'hidden');
        return;
      }
      return setTimeout(() => {
        $exampleSection.data('responsiving', true);
        $exampleBlock.attr('hidden', 'hidden');
        $responsiveBlock.removeAttr('hidden');
        return setTimeout(() => {
          return $iframe.get(0).style.height = $iframe.get(0).contentWindow.document.body.scrollHeight + 'px';
        }, 1);
      }, 10);
    });
  });

}).call(this);
