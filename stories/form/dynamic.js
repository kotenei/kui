import React, { Component } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Form, FormItem, FormField, Input, Button, Row, Col } from 'kui-react';

export default class Demo extends Component {
  id = 1;
  state = {
    keys: [this.id],
  };
  onAdd = () => {
    this.id++;
    this.setState({
      keys: [...this.state.keys, this.id],
    });
  };
  render() {
    return (
      <div className="story-demo-form">
        <Form>
          {this.state.keys.map((item) => {
            return (
              <FormItem key={item} required label={`field ${item}`}>
                <Row align="middle">
                  <Col>
                    <FormField name={item} rules={[{ type: 'required' }]}>
                      <Input />
                    </FormField>
                  </Col>
                  <Col>
                    {this.state.keys.length > 1 && (
                      <AiOutlineClose
                        style={{ cursor: 'pointer', marginLeft: 10 }}
                        onClick={() => {
                          this.setState({
                            keys: this.state.keys.filter((k) => k !== item),
                          });
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </FormItem>
            );
          })}
          <FormItem>
            <br />
            <Button color="primary" type="submit">
              提交
            </Button>
            <Button color="primary" onClick={this.onAdd}>
              新增
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
