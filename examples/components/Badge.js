import React, { Component } from "react";
import PropTypes from "prop-types";
import { Badge } from "main";

class BadgeView extends Component {
  render() {
    return (
      <div>
        <h1>Badge 徽章</h1>
        <div className="k-example">
          <Badge count={11} overflowCount={10} />
          <Badge kStyle="primary" count={101} overflowCount={99} />
          <Badge kStyle="info" count={10} />
          <Badge kStyle="success" count={10} />
          <Badge kStyle="warning" count={10} />
          <Badge kStyle="danger" count={10} />
        </div>
        <div className="k-example">
          <Badge dot={true} kStyle="danger">
            <a
              href="javascript:void(0);"
              style={{
                width: 42,
                height: 42,
                borderRadius: 4,
                background: "#eee",
                display: "inline-block"
              }}
            />
          </Badge>
          &nbsp;&nbsp;
          <Badge count={11} overflowCount={10}>
            <a
              href="javascript:void(0);"
              style={{
                width: 42,
                height: 42,
                borderRadius: 4,
                background: "#eee",
                display: "inline-block"
              }}
            />
          </Badge>
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
              <td>count</td>
              <td>
                展示数字，大于overflowCount时显示'overflowCount+',为0时隐藏
              </td>
              <td>number</td>
              <td>0</td>
            </tr>
            <tr>
              <td>overflowCount</td>
              <td>展示封顶的数字值</td>
              <td>number</td>
              <td>99</td>
            </tr>
            <tr>
              <td>dot</td>
              <td>不展示数字，只有一个小点</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>kStyle</td>
              <td>
                风格，可选值 'primary' 'info' 'success' 'warning' 'danger'
              </td>
              <td>string</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default BadgeView;
