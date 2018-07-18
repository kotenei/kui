import React, { Component } from "react";
import { LazyLoad } from "main";

const style = {
    marginBottom: 10,
    border: "1px solid #eee",
    textAlign: "center",
    padding: 5
};

class LazyLoadView extends Component {
    render() {
        return (
            <div>
                <h1>LazyLoad 延迟加载</h1>
                <div className="k-example">
                    <LazyLoad height={400}>
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
                </div>
                <h1>API</h1>
                <table className="k-table k-table-hover k-table-striped">
                    <thead>
                        <tr>
                            <th>属性</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>width</td>
                            <td>容器宽度</td>
                            <td>number|string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>容器高度</td>
                            <td>number|string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>loading</td>
                            <td>预加载图片</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>error</td>
                            <td>加载失败图片</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onSuccess</td>
                            <td>加载成功回调函数</td>
                            <td>Function(value:object)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onError</td>
                            <td>加载失败回调函数</td>
                            <td>Function(value:object)</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LazyLoadView;
