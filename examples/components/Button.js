import React from "react";
import { Button } from "main";
import { NavLink } from "react-router-dom";

const ButtonGroup = Button.Group;

class ButtonView extends React.Component {
    render() {
        return (
            <div>
                <h1>Button 按钮</h1>
                <h3>Flat Button</h3>
                <div className="k-example">
                    <Button kStyle="primary">default</Button>&nbsp;&nbsp;
                    <Button kStyle="primary">primary</Button>&nbsp;&nbsp;
                    <Button kStyle="info">info</Button>&nbsp;&nbsp;
                    <Button kStyle="success">success</Button>&nbsp;&nbsp;
                    <Button kStyle="warning">warning</Button>&nbsp;&nbsp;
                    <Button kStyle="danger">danger</Button>&nbsp;&nbsp;
                    <Button disabled>disabled</Button>
                </div>
                <h3>Raised Button</h3>
                <div className="k-example">
                    <Button raised>default</Button>&nbsp;&nbsp;
                    <Button kStyle="primary" raised>
                        primary
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="info" raised>
                        info
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="success" raised>
                        success
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="warning" raised>
                        warning
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="danger" raised >
                        danger
                    </Button>&nbsp;&nbsp;
                    <Button raised disabled>disabled</Button>
                </div>
                <h3>Floating Action Button</h3>
                <div className="k-example">
                    <Button fab>+</Button>&nbsp;&nbsp;
                    <Button kStyle="primary" fab>
                        +
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="info" fab>
                        +
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="success" fab>
                        +
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="warning" fab>
                        +
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="danger" fab>
                        +
                    </Button>&nbsp;&nbsp;
                    <Button disabled fab>
                        +
                    </Button>
                </div>
                <h3>Size</h3>
                <div className="k-example">
                    <Button kStyle="primary" raised kSize="xs">
                        xs button
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="primary" raised kSize="sm">
                        sm button
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="primary" raised>
                        default
                    </Button>&nbsp;&nbsp;
                    <Button kStyle="primary" raised kSize="lg">
                        lg button
                    </Button>&nbsp;&nbsp;
                </div>
                <h3>Button Group</h3>
                <div className="k-example">
                    <ButtonGroup>
                        <Button kStyle="primary" raised>
                            L
                        </Button>
                        <Button kStyle="primary" raised>
                            M
                        </Button>
                        <Button kStyle="primary" raised>
                            R
                        </Button>
                    </ButtonGroup>
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
                            <td>type</td>
                            <td>按钮类型，可选值 'button' 'submit' 'reset'</td>
                            <td>string</td>
                            <td>'button'</td>
                        </tr>
                        <tr>
                            <td>kStyle</td>
                            <td>
                                风格，可选值 'default' 'primary' 'info'
                                'success' 'warning' 'danger'
                            </td>
                            <td>string</td>
                            <td>'default'</td>
                        </tr>
                        <tr>
                            <td>kSize</td>
                            <td>大小，可选值 'xs' 'sm' 'lg' </td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>icon</td>
                            <td>
                                图标，<NavLink
                                    to="/Icon"
                                    activeClassName="selected"
                                >
                                    参考图标页
                                </NavLink>
                            </td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>raised</td>
                            <td>是否raised按钮</td>
                            <td>boolean</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>fab</td>
                            <td>是否fab按钮</td>
                            <td>boolean</td>
                            <td>—</td>
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

export default ButtonView;
