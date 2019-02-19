import React, { Component } from "react";
import { LazyLoad } from "kui-react";

const style = {
    marginBottom: 10,
    border: "1px solid #eee",
    textAlign: "center",
    padding: 5
};

export default class Example extends Component {
    render() {
        return (
            <LazyLoad height={400} loading="http://www.sucaijishi.com/uploadfile/2014/0524/20140524124239682.gif">
                <div style={style}>
                    <img data-src="http://pw.dreams-travel.com/pic/feizhou/1-10.jpg" />
                </div>
                <div style={style}>
                    <img data-src="http://i.weather.com.cn/images/trip/index/lytqkx/2013/05/29/8F198D28063B911072A7DB3821F80238.jpg" />
                </div>
                <div style={style}>
                    <img data-src="http://www.chinadaily.com.cn/m/shandong/images/attachement/jpg/site1/20090703/0013729e44e10bb801f547.jpg" />
                </div>
                <div style={style}>
                    <img data-src="http://www.898.travel/img/20100221/160354307624.jpg" />
                </div>
                <div style={style}>
                    <img data-src="http://a3.att.hudong.com/10/35/01000000000000119063576208810.jpg" />
                </div>
            </LazyLoad>
        );
    }
}
