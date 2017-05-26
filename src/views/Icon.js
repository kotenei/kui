import React, { Component } from 'react';
import Icon from '../components/Icon';


const direction = ['stepbackward', 'stepforward', 'fastbackward', 'fastforward', 'shrink', 'arrowsalt', 'down', 'up', 'left', 'right', 'caretup', 'caretdown', 'caretleft', 'caretright', 'upcircle', 'downcircle', 'leftcircle', 'rightcircle', 'upcircleo', 'downcircleo', 'rightcircleo', 'leftcircleo', 'doubleright', 'doubleleft', 'verticleleft', 'verticleright', 'forward', 'backward', 'rollback', 'enter', 'retweet', 'swap', 'swapleft', 'swapright', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'play', 'playcircleo', 'upsquare', 'downsquare', 'leftsquare', 'rightsquare', 'up-square-o', 'down-square-o', 'leftsquareo', 'rightsquareo', 'login', 'logout', 'menufold', 'menuunfold'];

const suggest = ['question', 'questioncircleo', 'questioncircle', 'plus', 'pluscircleo', 'pluscircle', 'pause', 'pausecircleo', 'pausecircle', 'minus', 'minuscircleo', 'minuscircle', 'plussquare', 'plussquareo', 'minussquare', 'minussquareo', 'info', 'infocirlceo', 'infocirlce', 'exclamation', 'exclamationcircleo', 'exclamationcircle', 'close', 'closecircle', 'closecircleo', 'closesquare', 'closesquareo', 'check', 'checkcircle', 'checkcircleo', 'checksquare', 'checksquareo', 'clockcircleo', 'clockcircle'];

const common = ['lock', 'unlock', 'areachart', 'piechart', 'barchart', 'dotchart', 'bars', 'book', 'calendar', 'cloud', 'clouddownload', 'code', 'codesquareo', 'copy', 'creditcard', 'delete', 'desktop', 'download', 'edit', 'ellipsis', 'file', 'filetext', 'unknowfile', 'pdffile', 'exclefile', 'jpgfile', 'pptfile', 'addfile', 'folder', 'folderopen', 'addfolder', 'hdd', 'frown', 'frowno', 'meh', 'meho', 'smile-circle', 'smileo', 'inbox', 'laptop', 'appstore-o', 'appstore', 'linechart', 'link', 'mail', 'mobile', 'notification', 'paperclip', 'picture', 'poweroff', 'reload', 'search', 'setting', 'sharealt', 'shoppingcar', 'tablet', 'tag', 'tags', 'tagso', 'totop', 'upload', 'user', 'videocamera', 'home', 'loading', 'clouduploado', 'clouddownloado', 'cloudupload', 'cloudo', 'staro', 'star', 'hearto', 'heart', 'enviroment', 'enviromento', 'eye', 'eyeo', 'camera', 'camerao', 'save', 'team', 'solution', 'phone', 'filter', 'exception', 'export', 'customerservice', 'qrcode', 'scan', 'like', 'likeo', 'dislike', 'dislikeo', 'message', 'paycircle', 'paycircleo', 'calculator', 'pushpin', 'pushpino', 'bulb', 'select', 'switcher', 'rocket', 'bell', 'disconnect', 'database', 'compass', 'barcode', 'hourglass', 'key', 'flag', 'layout', 'printer', 'sound', 'usb', 'skin', 'tool', 'sync', 'wifi', 'car', 'schedule', 'adduser', 'deleteuser', 'addusergroup', 'deleteusergroup', 'man', 'woman', 'shop', 'gift', 'idcard', 'medicinebox', 'redenvelopes', 'coffee', 'copyright', 'trademark', 'safety', 'wallet', 'bank', 'trophy', 'contacts', 'global', 'shake', 'api', 'fork'];


const brand = ['android','androido','apple','appleo','windows','windowso','ie','chrome','github','aliwangwang','aliwangwango','dingding','dingdingo'];

class IconView extends Component {
    getItem(props) {
        return (
            <li>
                <Icon {...props} />
                <span>{props.type}</span>
            </li>
        )
    }
    renderDirection() {
        let items = [];
        direction.forEach(icon => {
            items.push(this.getItem({
                type: icon
            }))
        })
        return items;
    }
    renderSuggest() {
        let items = [];
        suggest.forEach(icon => {
            items.push(this.getItem({
                type: icon
            }))
        })
        return items;
    }
    renderCommon() {
        let items = [];
        common.forEach(icon => {
            items.push(this.getItem({
                type: icon
            }))
        })
        return items;
    }
    renderBrand() {
        let items = [];
        brand.forEach(icon => {
            items.push(this.getItem({
                type: icon
            }))
        })
        return items;
    }
    render() {
        return (
            <div>
                <h1>Icon 图标</h1>
                <h3>方向性图标</h3>
                <ul className="icon-list">
                    {this.renderDirection()}
                </ul>
                <h3>提示建议性图标</h3>
                <ul className="icon-list">
                    {this.renderSuggest()}
                </ul>
                <h3>网站通用图标</h3>
                <ul className="icon-list">
                    {this.renderCommon()}
                </ul>
                <h3>品牌和标识</h3>
                <ul className="icon-list">
                    {this.renderBrand()}
                </ul>

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
        )
    }
}

export default IconView;