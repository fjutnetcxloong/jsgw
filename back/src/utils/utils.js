// 常用工具函数
// 格式化时间
// 格式化时间
function getTime(n) {
    const dateTime = new Date(n);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const date = dateTime.getDate();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes() > 9 ? dateTime.getMinutes() : '0' + dateTime.getMinutes() + '';
    const second = dateTime.getSeconds() > 9 ? dateTime.getSeconds() : '0' + dateTime.getSeconds() + '';
    return `${year} - ${month} - ${date} - ${hour} : ${minute} : ${second}`
}
//toast提示语
function toast(message, status) {
    $('.toast').toast("show")
    $('.toast-body').text(message);
    if(status === 1){
        $('.toast').on('hidden.bs.toast', function () {
            location.reload()
        })
    }
}
