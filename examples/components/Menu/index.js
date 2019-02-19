import React, { Component } from "react";
import Horizontal from "./Horizontal";
import Inline from "./Inline";
import Vertical from "./Vertical";
import InlineCollapsed from "./InlineCollapsed";
import DocMark from "../DocMark";
import docs from "./docs";

class MenuView extends Component {
    render() {
        return (
            <div>
                <h1>Menu 菜单</h1>
                <h3>水平导航菜单</h3>
                <div className="k-example">
                    <Horizontal />
                    <DocMark source={docs.Horizontal} />
                </div>
                <h3>垂直菜单，子菜单内嵌在菜单区域。</h3>
                <div className="k-example">
                    <Inline />
                    <DocMark source={docs.Inline} />
                </div>
                <h3>垂直菜单，子菜单是弹出的形式。</h3>
                <div className="k-example">
                    <Vertical />
                    <DocMark source={docs.Vertical} />
                </div>
                <h3>折叠菜单</h3>
                <div className="k-example">
                    <InlineCollapsed />
                    <DocMark source={docs.InlineCollapsed} />
                </div>
                <h1>API</h1>
                <h3>Menus</h3>
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
                            <td>defaultOpenIds</td>
                            <td>初始展开SubMenu菜单项id数组</td>
                            <td>string[]</td>
                            <td />
                        </tr>
                        <tr>
                            <td>defaultSelectedIds</td>
                            <td>初始选中菜单项id数组</td>
                            <td>string[]</td>
                            <td />
                        </tr>
                        <tr>
                            <td>inlineIndent</td>
                            <td>inline 模式的菜单缩进宽度</td>
                            <td>number</td>
                            <td>24</td>
                        </tr>
                        <tr>
                            <td>mode</td>
                            <td>
                                菜单模式，可选 'inline' 'vertical' 'horizontal'
                                'inlineCollapsed'
                            </td>
                            <td>string</td>
                            <td>'inline'</td>
                        </tr>
                        <tr>
                            <td>selectedIds</td>
                            <td>选中菜单项id数组</td>
                            <td>string[]</td>
                            <td />
                        </tr>
                        <tr>
                            <td>selectable</td>
                            <td>菜单是否可选中</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>multiple</td>
                            <td>是否可多选</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onSelect</td>
                            <td>选中项的回调函数</td>
                            <td>Function(e:event, ids:string[])</td>
                            <td />
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>Menus.Item</h3>
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
                            <td>id</td>
                            <td>唯一标识</td>
                            <td>string</td>
                            <td />
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>Menus.SubMenu</h3>
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
                            <td>id</td>
                            <td>唯一标识</td>
                            <td>string</td>
                            <td />
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>子菜单项值</td>
                            <td>string|ReactNode</td>
                            <td />
                        </tr>
                        <tr>
                            <td>children</td>
                            <td>子菜单菜单项</td>
                            <td>Array&lt;MenuItem|SubMenu&gt;</td>
                            <td />
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MenuView;
