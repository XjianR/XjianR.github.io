var load_js_flag = (function (option){
        var flag = false;
        var cnt = 0;
        if(option){return function (){
            if(cnt>1){flag = true;}
            else{cnt = cnt +1;};
            return flag;
            }
        }else{
            return function(){
                return flag;
            }
        }
});
// $(document).pjax('.post-category a,.category-list .category-list-item a,.post-block .post-header a,.post-block .post-button.text-center a,.custom-logo-site-title a,.site-nav ul li a,.post-nav a','.pjax', { fragment: '.pjax', timeout: 8000});
$(document).pjax('a[target!="_blank"][rel!=group]', '#pjax-container', {timeout: 8000, fragment: '#pjax-container'});

$(document).on({
  'pjax:click': function() {
    $(".loading").css("display", "block");
    //点击链接时，需要触发的事件写到这里
   },
   'pjax:start': function() {
      //        //当开始获取请求时，需要触发的事件写在这里
   },
   'pjax:success': function() {
       regetpost();

       try{
           $.getScript("/js/src/Valine.min.js").done(function () {
           get_valine();
           $(".comments.v").css({opacity:1})
           });
           get_counter();
           fancybox();
           $.pjax.reload('.sidebar-inner', { fragment: '.sidebar-inner', timeout: 8000}).done(function (){get_detail();});
       } catch(e){
           $.getScript("/js/src/Valine.min.js").done(function(){
               console.log("loaded Valine.min.js");
               get_valine();
               console.log("get_valine");
               $(".comments.v").css({opacity:1});
           });
           get_valine();
           get_counter();
           fancybox();
           $.getScript("/js/src/jquery.pjax.js").done(function(){
               console.log("loaded jquery.pjax.js");
               $.getScript("/js/src/scrollspy.js?v=7.0.0").done(function(){
                   $.pjax.reload('.sidebar-inner', { fragment: '.sidebar-inner', timeout: 8000}).done(function (){get_detail();});
                   g_flag = true;
                   console.log(g_flag);
               });
           });
       }


   //                      //当请求完成后，需要触发的事件写在这里
   },
   'pjax:complete': function() {
       code_line_html();
       $(".loading").css("display", "none");
   },
   'pjax:error': function() {
       $(".loading").css("display", "none");
   }
});


function code_line_html(){
  code_line_length = document.querySelectorAll(".code .line").length;
  for(var i = 0; i < code_line_length; i ++){
    document.querySelectorAll(".code .line")[i].innerHTML = document.querySelectorAll(".code .line")[i].innerHTML.replace(new RegExp("!!&lt;!",'g'),"<").replace(new RegExp("!!&gt;!",'g'),">")
  }
};

function fancybox() {
    $("img").each(function () {
     //$(this).attr("data-fancybox", "gallery"); 直接给img添加data-fancybox会导致点击图片后图片消失
    var element = document.createElement("a");
    $(element).attr("data-fancybox", "gallery");
    $(element).attr("href", $(this).attr("src"));
    $(this).wrap(element);
 });
}
function  regetpost(){
$(".posts-expand .post-block").css({opacity:1});
$(".posts-expand .post-header").css({opacity:1});
$(".posts-expand .post-body").css({opacity:1});
$(".posts-collapse .post-block").css({opacity:1});
$(".posts-collapse .post-header").css({opacity:1});
$(".posts-collapse .post-body").css({opacity:1});
$(".posts-collapse .collection-title").css({opacity:1});
$(".post-block.category").css({opacity:1});
$(".post-block.archive").css({opacity:1});

}
function get_valine(){
  var GUEST = ['nick', 'mail', 'link'];
  var guest = 'nick,mail,link';
  guest = guest.split(',').filter(function(item) {
    return GUEST.indexOf(item) > -1;
  });
  new Valine({
        av: AV,
        el: '#comments' ,
        emoticon_url: '/assets/img/acfun_emoji',
        emoticon_list: ["扇子脸.png","不爽.png","偏头.png","傲气.png","兴奋.png","兴奋2.png","冰冻.png","凄凉.png","加油.png","反对.png","发火.png","发霉.png","可爱.png","吃惊.png","吹口哨.png","吹口哨2.png","哭泣.png","喜爱.png","喷水.png","嘲讽.png","嘲讽2.png","囧.png","大吼.png","大哭.png","害羞.png","得意.png","兴奋.png","悲伤.png","憋笑.png","托腮.png","抠鼻.png","擦汗.png","斜眼.png","无语.png","无语2.png","晕.png","期待.png","流汗.png","流汗2.png","焦虑.png","疑问.png","疑问2.png","白眼.png","真棒.png","真棒2.png","臭脸.png","舒服.png","蒙眼.png","虚无.png","评论.png","悲伤2.png","迷茫.png","难过.png","震惊.png"],
        appId: 'abUxiv84E6L451t6fA2mMlcU-gzGzoHsz',
        appKey: 'qxeelnWo44RN7AOKuOkYtD7R',
        placeholder: '(づ￣3￣)づ╭❤~来都来了，不留下一脚吗~留下您邮箱可收到回复提醒'
    });
}



function showTime(Counter) {
  var entries = [];
  var $visitors = $('.leancloud_visitors');

  $visitors.each(function() {
    entries.push( $(this).attr('id').trim() );
  });

  Counter('get', '/classes/Counter', { where: JSON.stringify({ url: { '$in': entries } }) })
    .done(function({ results }) {
      var COUNT_CONTAINER_REF = '.leancloud-visitors-count';

      if (results.length === 0) {
        $visitors.find(COUNT_CONTAINER_REF).text(0);
        return;
      }

      for (var i = 0; i < results.length; i++) {
        var item = results[i];
        var url = item.url;
        var time = item.time;
        var element = document.getElementById(url);

        $(element).find(COUNT_CONTAINER_REF).text(time);
      }
      for (var i = 0; i < entries.length; i++) {
        var url = entries[i];
        var element = document.getElementById(url);
        var countSpan = $(element).find(COUNT_CONTAINER_REF);
        if (countSpan.text() == '') {
          countSpan.text(0);
        }
      }
    })
    .fail(function ({ responseJSON }) {
      console.log('LeanCloud Counter Error: ' + responseJSON.code + ' ' + responseJSON.error);
    });
}


function do_showTime(){
  $.get('https://app-router.leancloud.cn/2/route?appId=' + 'PRRghlgkRhHxn9xL9wxMrNRc-gzGzoHsz')
    .done(function({ api_server }) {
      var Counter = function(method, url, data) {
        return $.ajax({
          method: method,
          url: 'https://' + api_server + '/1.1' + url,
          headers: {
            'X-LC-Id': 'PRRghlgkRhHxn9xL9wxMrNRc-gzGzoHsz',
            'X-LC-Key': '6CgIH9zamw9v4J2JHxnloUO5',
            'Content-Type': 'application/json',
          },
          data: data
        });
      };

        if ($('.post-title-link').length >= 1) {
          showTime(Counter);
        }

    });
};


function addCount(Counter) {
  var $visitors = $('.leancloud_visitors');
  var url = $visitors.attr('id').trim();
  var title = $visitors.attr('data-flag-title').trim();

  Counter('get', '/classes/Counter', { where: JSON.stringify({ url }) })
    .done(function({ results }) {
      if (results.length > 0) {
        var counter = results[0];

        Counter('put', '/classes/Counter/' + counter.objectId, JSON.stringify({ time: { '__op': 'Increment', 'amount': 1 } }))

          .done(function() {
            var $element = $(document.getElementById(url));
            $element.find('.leancloud-visitors-count').text(counter.time + 1);
          })

          .fail(function ({ responseJSON }) {
            console.log('Failed to save Visitor num, with error message: ' + responseJSON.error);
          })
      } else {

          var $element = $(document.getElementById(url));
          $element.find('.leancloud-visitors-count').text('Counter not initialized! More info at console err msg.');
          console.error('ATTENTION! LeanCloud counter has security bug, see how to solve it here: https://github.com/theme-next/hexo-leancloud-counter-security. \n However, you can still use LeanCloud without security, by setting `security` option to `false`.');

      }
    })
    .fail(function ({ responseJSON }) {
      console.log('LeanCloud Counter Error: ' + responseJSON.code + ' ' + responseJSON.error);
    });
}

function do_addCount() {
  $.get('https://app-router.leancloud.cn/2/route?appId=' + 'PRRghlgkRhHxn9xL9wxMrNRc-gzGzoHsz')
    .done(function({ api_server }) {
      var Counter = function(method, url, data) {
        return $.ajax({
          method: method,
          url: 'https://' + api_server + '/1.1' + url,
          headers: {
            'X-LC-Id': 'PRRghlgkRhHxn9xL9wxMrNRc-gzGzoHsz',
            'X-LC-Key': '6CgIH9zamw9v4J2JHxnloUO5',
            'Content-Type': 'application/json',
          },
          data: data
        });
      };

        addCount(Counter);

    });
};

function get_counter(){
    if ($('.leancloud_visitors').length == 1) {
    do_addCount();
  } else if ($('.post-title-link').length > 1) {
    do_showTime();
  }
}


function initScrollSpy() {
    var tocSelector = '.post-toc';
    var $tocElement = $(tocSelector);
    var activeCurrentSelector = '.active-current';

    function removeCurrentActiveClass() {
      $(tocSelector + ' ' + activeCurrentSelector)
        .removeClass(activeCurrentSelector.substring(1));
    }

    $tocElement
      .on('activate.bs.scrollspy', function() {
        var $currentActiveElement = $(tocSelector + ' .active').last();

        removeCurrentActiveClass();
        $currentActiveElement.addClass('active-current');

        $tocElement.scrollTop($currentActiveElement.offset().top - $tocElement.offset().top + $tocElement.scrollTop() - ($tocElement.height() / 2));
      })
      .on('clear.bs.scrollspy', removeCurrentActiveClass);

    $('body').scrollspy({ target: tocSelector });
}


function post_detail() {
  initScrollSpy();
  var html = $('html');
  var TAB_ANIMATE_DURATION = 200;
  var hasVelocity = $.isFunction(html.velocity);

  $('.sidebar-nav li').on('click', function() {
    var item = $(this);
    var activeTabClassName = 'sidebar-nav-active';
    var activePanelClassName = 'sidebar-panel-active';
    if (item.hasClass(activeTabClassName)) {
      return;
    }

    var currentTarget = $('.' + activePanelClassName);
    var target = $('.' + item.data('target'));

    hasVelocity
      ? currentTarget.velocity('transition.slideUpOut', TAB_ANIMATE_DURATION, function() {
        target
          .velocity('stop')
          .velocity('transition.slideDownIn', TAB_ANIMATE_DURATION)
          .addClass(activePanelClassName);
      })
      : currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, function() {
        currentTarget.hide();
        target
          .stop()
          .css({'opacity': 0, 'display': 'block'})
          .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, function() {
            currentTarget.removeClass(activePanelClassName);
            target.addClass(activePanelClassName);
          });
      });

    item.siblings().removeClass(activeTabClassName);
    item.addClass(activeTabClassName);
  });
  $('.post-toc a').on('click', function(e) {
    e.preventDefault();
    var targetSelector = NexT.utils.escapeSelector(this.getAttribute('href'));
    var offset = $(targetSelector).offset().top;

    hasVelocity
      ? html.velocity('stop').velocity('scroll', {
        offset  : offset + 'px',
        mobileHA: false
      })
      : $('html, body').stop().animate({
        scrollTop: offset
      }, 500);
  });

  var $tocContent = $('.post-toc-content');
  var display = CONFIG.page.sidebar;
  if (typeof display !== 'boolean') {
    var isSidebarCouldDisplay = CONFIG.sidebar.display === 'post'
     || CONFIG.sidebar.display === 'always';
    var hasTOC = $tocContent.length > 0 && $tocContent.html().trim().length > 0;
    display = isSidebarCouldDisplay && hasTOC;
  }
  if (display) {
    CONFIG.motion.enable
      ? NexT.motion.middleWares.sidebar = function() {
        NexT.utils.displaySidebar();
      }
      : NexT.utils.displaySidebar();
  }

}

function get_detail(){
    if ($('.leancloud_visitors').length == 1) {
    post_detail();
  }
}

