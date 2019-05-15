<!--浏览器搞笑标题-->
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    $('[rel="icon"]').attr('href', "/assets/img/warn.png");
    document.title = 'ヽ(●-`Д´-)ノ出BUG了~'+ OriginTitle;
    clearTimeout(titleTime);
  }
  else {
    $('[rel="icon"]').attr('href', "/assets/img/favicon_32.png");
    document.title = 'ヾ(Ő∀Ő3)ノ咦又好了~' + OriginTitle;
    titleTime = setTimeout(function () {
      document.title = OriginTitle;
    }, 2000);
  }
});
