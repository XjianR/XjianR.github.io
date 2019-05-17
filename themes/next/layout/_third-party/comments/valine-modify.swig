{% if theme.valine_modify.enable and theme.valine_modify.appid and theme.valine_modify.appkey %}
  <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
  <script src="/js/src/Valine.min.js" data-no-instant></script>

  <script type="text/javascript">
    var GUEST = ['nick','mail','link'];
    var guest = '{{ theme.valine.guest_info }}';
    guest = guest.split(',').filter(item=>{
      return GUEST.indexOf(item)>-1;
    });
    new Valine({
        av: AV,
        el: '#comments' ,
        emoticon_url: '/assets/img/acfun_emoji',
        emoticon_list: ["扇子脸.png","不爽.png","偏头.png","傲气.png","兴奋.png","兴奋2.png","冰冻.png","凄凉.png","加油.png","反对.png","发火.png","发霉.png","可爱.png","吃惊.png","吹口哨.png","吹口哨2.png","哭泣.png","喜爱.png","喷水.png","嘲讽.png","嘲讽2.png","囧.png","大吼.png","大哭.png","害羞.png","得意.png","兴奋.png","悲伤.png","憋笑.png","托腮.png","抠鼻.png","擦汗.png","斜眼.png","无语.png","无语2.png","晕.png","期待.png","流汗.png","流汗2.png","焦虑.png","疑问.png","疑问2.png","白眼.png","真棒.png","真棒2.png","臭脸.png","舒服.png","蒙眼.png","虚无.png","评论.png","悲伤2.png","迷茫.png","难过.png","震惊.png"],
        appId: '{{ theme.valine_modify.appid }}',
        appKey: '{{ theme.valine_modify.appkey }}',
        placeholder: '{{ theme.valine_modify.placeholder }}',
    });
  </script>
{% endif %}
