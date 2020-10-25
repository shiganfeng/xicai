//过滤特殊字符
export function  stripscript(str)  {
    var  pattern  =  new  RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var  rs  =  "";
    for  (var  i  =  0;  i  <  str.length;  i++)  {
        rs  =  rs  +  str.substr(i,  1).replace(pattern,  '');
    }
    return  rs;
}

//验证邮箱
export function validateEmail(value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    // if (!reg.test(value)) {
    //     return true
    // } else {
    //     return false
    // }
    return !reg.test(value) ? true : false
}

//验证密码字母+数字6-20位
export function validateMyPassword(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
    return !reg.test(value) ? true : false
}

//验证验证码字母或数字6位
export function validateMyCode(value) {
    let reg = /^[a-z0-9]{6}$/
    return !reg.test(value) ? true : false
}

export function validatetel(value) {
    let reg = /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/;
    return !reg.test(value) ? true : false
}

//没有用export default时，文件import需要{}，可以同时声明多个export