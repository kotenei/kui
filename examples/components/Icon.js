import React, { Component } from "react";
import { Icon } from "main";

const direction = [
    "stepbackward",
    "stepforward",
    "fastbackward",
    "fastforward",
    "shrink",
    "arrowsalt",
    "down",
    "up",
    "left",
    "right",
    "caretup",
    "caretdown",
    "caretleft",
    "caretright",
    "upcircle",
    "downcircle",
    "leftcircle",
    "rightcircle",
    "upcircleo",
    "downcircleo",
    "rightcircleo",
    "leftcircleo",
    "doubleright",
    "doubleleft",
    "verticleleft",
    "verticleright",
    "forward",
    "backward",
    "rollback",
    "enter",
    "retweet",
    "swap",
    "swapleft",
    "swapright",
    "arrowup",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "play",
    "playcircleo",
    "upsquare",
    "downsquare",
    "leftsquare",
    "rightsquare",
    "up-square-o",
    "down-square-o",
    "leftsquareo",
    "rightsquareo",
    "login",
    "logout",
    "menufold",
    "menuunfold"
];

const suggest = [
    "question",
    "questioncircleo",
    "questioncircle",
    "plus",
    "pluscircleo",
    "pluscircle",
    "pause",
    "pausecircleo",
    "pausecircle",
    "minus",
    "minuscircleo",
    "minuscircle",
    "plussquare",
    "plussquareo",
    "minussquare",
    "minussquareo",
    "info",
    "infocirlceo",
    "infocirlce",
    "exclamation",
    "exclamationcircleo",
    "exclamationcircle",
    "close",
    "closecircle",
    "closecircleo",
    "closesquare",
    "closesquareo",
    "check",
    "checkcircle",
    "checkcircleo",
    "checksquare",
    "checksquareo",
    "clockcircleo",
    "clockcircle"
];

const common = [
    "lock",
    "unlock",
    "areachart",
    "piechart",
    "barchart",
    "dotchart",
    "bars",
    "book",
    "calendar",
    "cloud",
    "clouddownload",
    "code",
    "codesquareo",
    "copy",
    "creditcard",
    "delete",
    "desktop",
    "download",
    "edit",
    "ellipsis",
    "file",
    "filetext",
    "unknowfile",
    "pdffile",
    "exclefile",
    "jpgfile",
    "pptfile",
    "addfile",
    "folder",
    "folderopen",
    "addfolder",
    "hdd",
    "frown",
    "frowno",
    "meh",
    "meho",
    "smile-circle",
    "smileo",
    "inbox",
    "laptop",
    "appstore-o",
    "appstore",
    "linechart",
    "link",
    "mail",
    "mobile",
    "notification",
    "paperclip",
    "picture",
    "poweroff",
    "reload",
    "search",
    "setting",
    "sharealt",
    "shoppingcar",
    "tablet",
    "tag",
    "tags",
    "tagso",
    "totop",
    "upload",
    "user",
    "videocamera",
    "home",
    "loading",
    "clouduploado",
    "clouddownloado",
    "cloudupload",
    "cloudo",
    "staro",
    "star",
    "hearto",
    "heart",
    "enviroment",
    "enviromento",
    "eye",
    "eyeo",
    "camera",
    "camerao",
    "save",
    "team",
    "solution",
    "phone",
    "filter",
    "exception",
    "export",
    "customerservice",
    "qrcode",
    "scan",
    "like",
    "likeo",
    "dislike",
    "dislikeo",
    "message",
    "paycircle",
    "paycircleo",
    "calculator",
    "pushpin",
    "pushpino",
    "bulb",
    "select",
    "switcher",
    "rocket",
    "bell",
    "disconnect",
    "database",
    "compass",
    "barcode",
    "hourglass",
    "key",
    "flag",
    "layout",
    "printer",
    "sound",
    "usb",
    "skin",
    "tool",
    "sync",
    "wifi",
    "car",
    "schedule",
    "adduser",
    "deleteuser",
    "addusergroup",
    "deleteusergroup",
    "man",
    "woman",
    "shop",
    "gift",
    "idcard",
    "medicinebox",
    "redenvelopes",
    "coffee",
    "copyright",
    "trademark",
    "safety",
    "wallet",
    "bank",
    "trophy",
    "contacts",
    "global",
    "shake",
    "api",
    "fork"
];

const brand = [
    "android",
    "androido",
    "apple",
    "appleo",
    "windows",
    "windowso",
    "ie",
    "chrome",
    "github",
    "aliwangwang",
    "aliwangwango",
    "dingding",
    "dingdingo"
];

class IconView extends Component {
    getItem(props) {
        return (
            <li key={props.index}>
                <Icon {...props} />
                <span>{props.type}</span>
            </li>
        );
    }
    renderDirection() {
        let items = [];
        direction.forEach((icon, index) => {
            items.push(
                this.getItem({
                    type: icon,
                    index
                })
            );
        });
        return items;
    }
    renderSuggest() {
        let items = [];
        suggest.forEach((icon, index) => {
            items.push(
                this.getItem({
                    type: icon,
                    index
                })
            );
        });
        return items;
    }
    renderCommon() {
        let items = [];
        common.forEach((icon, index) => {
            items.push(
                this.getItem({
                    type: icon,
                    index
                })
            );
        });
        return items;
    }
    renderBrand() {
        let items = [];
        brand.forEach((icon, index) => {
            items.push(
                this.getItem({
                    type: icon,
                    index
                })
            );
        });
        return items;
    }
    render() {
        return (
            <div>
                <h1>Icon 图标</h1>
                <h3>方向性图标</h3>
                {/* <ul className="icon-list">{this.renderDirection()}</ul>
                <h3>提示建议性图标</h3>
                <ul className="icon-list">{this.renderSuggest()}</ul>
                <h3>网站通用图标</h3>
                <ul className="icon-list">{this.renderCommon()}</ul>
                <h3>品牌和标识</h3>
                <ul className="icon-list">{this.renderBrand()}</ul> */}
                <div style={{width:36,height:36}}>
                <Icon>
                <path d="M700.60432 80.576q10.848-10.848 18.272-7.424t7.424 18.272l0 841.152q0 14.848-7.424 18.272t-18.272-7.424l-405.728-405.728q-5.152-5.152-7.424-10.848l0 387.424q0 14.848-10.848 25.728t-25.728 10.848l-73.152 0q-14.848 0-25.728-10.848t-10.848-25.728l0-804.576q0-14.848 10.848-25.728t25.728-10.848l73.152 0q14.848 0 25.728 10.848t10.848 25.728l0 387.424q2.272-6.272 7.424-10.848z" p-id="739"/>
                </Icon>
                </div>

                <h1>API</h1>
                <table className="k-example-table k-example-table-hover k-example-table-striped">
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
                            <td>type</td>
                            <td>图标类型</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>spin</td>
                            <td>是否旋转</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default IconView;
