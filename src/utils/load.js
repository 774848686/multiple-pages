export default function polyfillBySystem() {
    // 解决页面不刷新问题（安卓）
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            // 页面被挂起
        } else {
            window.location.reload();
        }
    });
    // 解决页面不刷新问题（苹果）
    let isPageHide = false;
    window.addEventListener('pageshow', function () {
        if (isPageHide) {
            window.location.reload();
        }
    });
    window.addEventListener('pagehide', function () {
        isPageHide = true;
    });
}
polyfillBySystem();