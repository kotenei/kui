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
    reg: "格式错误"
};

const methods = {
    required(value) {
        return (
            value != undefined &&
            value != null &&
            String(value).trim().length > 0
        );
    },
    email(value) {
        return (
            !this.required(value) ||
            /^(?:[a-z0-9]+[_\-+.]+)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(
                value
            )
        );
    },
    url(value) {
        return (
            !this.required(value) ||
            /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
                value
            )
        );
    },
    date(value) {
        return (
            !this.required(value) ||
            !/Invalid|NaN/.test(new Date(value).toString())
        );
    },
    dateISO(value) {
        return (
            !this.required(value) ||
            /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\s\d{1,2}[:]\d{1,2}[:]\d{1,2}\w$/.test(
                value
            )
        );
    },
    mobile(value) {
        //return !this.required(value) || /^((13[0-9])|(15[^4,\\D])|(18[0|1|2|5-9])|(17[0|7]))\d{8}$/.test(value);
        return !this.required(value) || /^1\d{10}$/.test(value);
    },
    phone(value) {
        return (
            !this.required(value) ||
            /^((0\d{2,3}\-)[1-9]\d{7}(\-\d{1,4})?)$/.test(value)
        );
    },
    number(value) {
        return (
            !this.required(value) ||
            /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
        );
    },
    digits(value) {
        return !this.required(value) || /^\d+$/.test(value);
    },
    minLength(value, params) {
        let length = Array.isArray(value) ? value.length : String(value).length;
        return !this.required(value) || length >= params;
    },
    maxLength(value, params) {
        let length = Array.isArray(value) ? value.length : String(value).length;
        return !this.required(value) || length <= params;
    },
    rangeLength(value, params) {
        let length = Array.isArray(value) ? value.length : String(value).length;
        return (
            !this.required(value) ||
            (length >= params[0] && length <= params[1])
        );
    },
    min(value, params) {
        return !this.required(value) || value >= params;
    },
    max(value, params) {
        return !this.required(value) || value <= params;
    },
    range(value, params) {
        return (
            !this.required(value) || (value >= params[0] && value <= params[1])
        );
    },
    reg(value, params) {
        let reg = new RegExp(params, "igm");
        return !this.required(value) || reg.test(value);
    }
};

export default {
    methods,
    messages
};
