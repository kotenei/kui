const messages = {
    required: "该字段不能为空",
    email: "电子邮箱格式错误",
    url: "url格式错误",
    date: "请输入一个有效日期",
    dateISO: "请输入一个有效日期（ISO）",
    mobile: "手机号码格式错误",
    phone: "电话号码格式错误",
    number: "请输入一个有效的数字",
    digits: "请输入正整数",
    minLength: "请输入一个长度不小于{0}个字符的值",
    maxLength: "请输入一个长度不大于{0}个字符的值",
    rangeLength: "请输入一个长度介于{0}到{1}个字符的值",
    min: "请输入一个大于或等于{0}的值",
    max: "请输入一个小于或等于{0}的值",
    range: "请输入一个介于{0}到{1}之间的数值",
    equalTo: "请再输入一个相同的值",
    remote: "远程验证失败",
    reg: "格式错误"
};

const methods = {
    required(value) {
        return (
            value != undefined &&
            value != null &&
            String(value).trim().length > 0
        );
    }
};

export default {
    methods,
    messages
};
