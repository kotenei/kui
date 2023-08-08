const messages = {
  required: '该字段不能为空',
  email: '电子邮箱格式错误',
  url: 'url格式错误',
  date: '请输入一个有效日期',
  dateISO: '请输入一个有效日期（ISO）',
  mobile: '手机号码格式错误',
  phone: '电话号码格式错误',
  number: '请输入一个有效的数字',
  digits: '请输入正整数',
  minLength: '请输入一个长度不小于{0}个字符的值',
  maxLength: '请输入一个长度不大于{0}个字符的值',
  rangeLength: '请输入一个长度介于{0}到{1}个字符的值',
  min: '请输入一个大于或等于{0}的值',
  max: '请输入一个小于或等于{0}的值',
  range: '请输入一个介于{0}到{1}之间的数值',
  regex: '格式错误',
};

const methods = {
  required(value) {
    return (
      value !== undefined && value !== null && value !== false && String(value).trim().length > 0
    );
  },
  email(value) {
    return (
      !this.required(value) ||
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        value,
      )
    );
  },
  date(value) {
    return !this.required(value) || !/Invalid|NaN/.test(new Date(value).toString());
  },
  number(value) {
    return !this.required(value) || /^\-?(0|[1-9]\d*)(\.\d*)?$/.test(value);
  },
  url(value) {
    return (
      !this.required(value) ||
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value,
      )
    );
  },
  minLength(value, params) {
    const length = Array.isArray(value) ? value.length : String(value).length;
    return !this.required(value) || length >= params;
  },
  maxLength(value, params) {
    const length = Array.isArray(value) ? value.length : String(value).length;
    return !this.required(value) || length <= params;
  },
  rangeLength(value, params) {
    const length = Array.isArray(value) ? value.length : String(value).length;
    return !this.required(value) || (length >= params[0] && length <= params[1]);
  },
  min(value, params) {
    return !this.required(value) || value >= params;
  },
  max(value, params) {
    return !this.required(value) || value <= params;
  },
  range(value, params) {
    return !this.required(value) || (value >= params[0] && value <= params[1]);
  },
  regex(value, params) {
    const reg = new RegExp(params, 'igm');
    return !this.required(value) || reg.test(value);
  },
};

export default {
  methods,
  messages,
};
