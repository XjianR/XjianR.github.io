$(document).pjax("a[target!=_blank][rel!=group]", "#pjax-container", {fragment: "#pjax-container", timeout: 6e3});
$(window).on("popstate.pjax", function () {
    pjax();
});
$(document).on("pjax:start", function () {
    $(document).unbind("keyup")
});
$(document).on("pjax:complete", function () {
        pjax();
});

function pjax() {
    // gitalk();
    // eye_js();
    article_top_js();
    // busuanzi_js();
    // category_js();
    // opacity_js();
    motion_js();
    scrollspy_js();
    postdetails_js();
    // lean_analytics();
    // baidutuisong();
    initSidebarDimension();
    // lazyLoad();
    // donate();
    // hover_sidebar();
    // pjax_eye_change();
    // wrapImageWithFancyBox();
    // copy_code()
}
