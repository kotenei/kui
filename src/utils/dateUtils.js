export const dates = {
    en: {
        days: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        monthsShort: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        year: "Year",
        month: "Month",
        day: "Day",
        today: "Today",
        week: "Week",
        now: "Now"
    },
    "zh-cn": {
        days: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六"
        ],
        daysShort: ["日", "一", "二", "三", "四", "五", "六"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六"],
        months: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
        ],
        monthsShort: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
        ],
        year: "年",
        month: "月",
        day: "日",
        today: "今天",
        week: "周",
        now: "此刻"
    }
};

export const getWeek = (date = new Date(), dowOffset = 0) => {
    let newYear = new Date(date.getFullYear(), 0, 1);
    let day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = day >= 0 ? day : day + 7;
    let daynum =
        Math.floor(
            (date.getTime() -
                newYear.getTime() -
                (date.getTimezoneOffset() - newYear.getTimezoneOffset()) *
                    60000) /
                86400000
        ) + 1;
    let weeknum;
    //if the year starts before the middle of a week
    if (day < 4) {
        weeknum = Math.floor((daynum + day - 1) / 7) + 1;
        if (weeknum > 52) {
            let nYear = new Date(date.getFullYear() + 1, 0, 1);
            let nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
                  the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    } else {
        weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
};

export const getDiffMonth = (startDate, endDate) => {
    let startYear = startDate.getFullYear(),
        startMonth = startDate.getMonth(),
        endYear = endDate.getFullYear(),
        endMonth = endDate.getMonth();
    return (endYear - startYear) * 12 + (endMonth - startMonth);
};

export const getDiffDay = (startDate, endDate) => {
    let diff = endDate.getTime() - startDate.getTime();
    return Math.floor(diff / (1000 * 3600 * 24));
};

export const getFirstDay = date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDay = date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getWeekFormat = (date, format) => {
    while (date && format && new RegExp("(w+)", "ig").test(format)) {
        format = format.replace(RegExp.$1, getWeek(date));
    }
    return format;
};
