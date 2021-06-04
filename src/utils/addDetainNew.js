import Store from './Store';
export const addDetainNew = () => {
    // 判断是否需要pushState
    return new Promise(resolve => {
        inPushDetainState().then(isPushAble => {
            let detainSessionStoreKey = 'Load.addDetainNew';
            // 需要则pushState，并存储当前的链接到sessionStorage中
            if (isPushAble) {
                window.history.pushState('tpage', 'page-2', location.hash+'&random='+Math.random());
                Store.setSession(detainSessionStoreKey, location.href);
            }
            // 判断当前链接是否是已经push了state的链接，如果是则添加popstate事件处理程序
            if (Store.getSession(detainSessionStoreKey) === location.href) {
                window.onpopstate = function toDetainLink(ev) {
                    if (ev.state === null && history.state === null) {
                        Store.delSession(detainSessionStoreKey);
                        resolve()
                    }
                }
            }
        });
    })
}
export function inPushDetainState() {
    return new Promise(resolve => {
        const isdeten = true;
        resolve(isdeten)
    })
}