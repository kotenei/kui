import React, { Component } from "react";
import Basic from "./Basic";
import GroupHead from "./GroupHead";
import Stripe from "./Stripe";
import FixedHead from "./FixedHead";
import FixedColumn from "./FixedColumns";
import FixedHeadColumns from "./FixedHeadColumns";
import Checkbox from "./Checkbox";
import ExpandedRow from "./ExpandedRow";
import Filter from './Filter';
import Sorter from './Sorter';
import Pager from './Pager';
import Remote from './Remote';
import { NavLink } from "react-router-dom";



class TableView extends Component {
    render() {
        return (
            <div>
                <h1>Table 表格</h1>
                <h3>基本用法</h3>
                <div className="k-example">
                    <Basic />
                </div>
                <br />
                <h3>多级表头</h3>
                <div className="k-example">
                    <GroupHead />
                </div>
                <br />
                <h3>带斑马纹表格</h3>
                <div className="k-example">
                    <Stripe />
                </div>
                <br />
                <h3>带边框线表格</h3>
                <div className="k-example">
                    <Stripe />
                </div>
                <br />
                <h3>固定表头</h3>
                <div className="k-example">
                    <FixedHead />
                </div>
                <br />
                <h3>固定列</h3>
                <div className="k-example">
                    <FixedColumn />
                </div>
                <br />
                <h3>固定表头和列</h3>
                <div className="k-example">
                    <FixedHeadColumns />
                </div>
                <br />
                <h3>多选</h3>
                <div className="k-example">
                    <Checkbox />
                </div>
                <br />
                <h3>展开行</h3>
                <div className="k-example">
                    <ExpandedRow />
                </div>
                <br />
                <h3>过滤</h3>
                <div className="k-example">
                    <Filter/>
                </div>
                <br />
                <h3>排序</h3>
                <div className="k-example">
                    <Sorter/>
                </div>
                <br />
                <h3>分页</h3>
                <div className="k-example">
                    <Pager/>
                </div>
                <br />
                <h3>远程加载数据</h3>
                <div className="k-example">
                    <Remote/>
                </div>
                <h1>API</h1>
                <h3>Table</h3>
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
                            <td>bordered</td>
                            <td>是否显示边框</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>checkbox</td>
                            <td>是否显示复选框</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>checkedIds</td>
                            <td>已选中行，控制属性</td>
                            <td>string[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>数据源</td>
                            <td>object[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>defaultCheckedIds</td>
                            <td>初始化时默认选中行</td>
                            <td>string[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>defaultExpandedRowIds</td>
                            <td>初始化时默认展开行</td>
                            <td>string[]</td>
                            <td>[]</td>
                        </tr>
                        <tr>
                            <td>disabledCheckIds</td>
                            <td>禁止选中行编号</td>
                            <td>string[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>expandedRowIds</td>
                            <td>展开的行，控制属性</td>
                            <td>string[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>expandedRowRender</td>
                            <td>额外的展开行</td>
                            <td>Function(record:object)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>高度</td>
                            <td>number</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>loading</td>
                            <td>是否加载中</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>pagination</td>
                            <td>
                                分页设置，具体参数查看{" "}
                                <a href="/#/Pagination">分页</a> 组件
                            </td>
                            <td>object</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>rowClassName</td>
                            <td>表格行类名</td>
                            <td>Function(record, index):string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>stripe</td>
                            <td>是否为斑马纹 table</td>
                            <td>boolean</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>onCheck</td>
                            <td>选中行触发</td>
                            <td>Function(ids:string[])</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>分页、过滤和排序时触发</td>
                            <td>
                                Function(pagination:object,filter:object,sorter:object)
                            </td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onExpand</td>
                            <td>点击展开图标时触发</td>
                            <td>Function(ids:string[])</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <h3>Table.TableColumn</h3>
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
                            <td>align</td>
                            <td>对齐方式，可选 'left' 'center' 'right'</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>dataIndex</td>
                            <td>列数据在数据项中对应的key</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>filterIcon</td>
                            <td>筛选图标</td>
                            <td>Function(filtered:boolean):ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>filterMultiple</td>
                            <td>筛选是否多选</td>
                            <td>boolean</td>
                            <td>true</td>
                        </tr>
                        <tr>
                            <td>filters</td>
                            <td>筛选菜单项</td>
                            <td>object[]</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>fixed</td>
                            <td>
                                列是否固定，可选 true(等效于 left) 'left'
                                'right'
                            </td>
                            <td>boolean|string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>render</td>
                            <td>
                                生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据
                            </td>
                            <td>Function(value:any,record:object)</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>sorter</td>
                            <td>
                                排序函数，本地排序使用一个函数(参考{" "}
                                <a
                                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
                                    target="_black;"
                                >
                                    Array.sort
                                </a>
                                的 compareFunction)，需要服务端排序可设为 true
                            </td>
                            <td>Function|boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>列头显示文字</td>
                            <td>string|ReactNode</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td>列宽度</td>
                            <td>number</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>onFilter</td>
                            <td>本地模式下，确定筛选的运行函数</td>
                            <td>Function</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableView;
