export default `import React, { Component, useState, useEffect } from 'react';
import { Form, FormItem, FormField, Input, Button, Select, SelectOption } from 'kui-react';

const PriceInput = (props) => {
  const { value, onChange } = props;
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState(['rmb']);

  useEffect(() => {
    const newNumber = parseInt(value || 0, 10);
    if (Number.isNaN(newNumber)) {
      setNumber(0);
    } else {
      setNumber(newNumber);
    }
  }, []);

  const onInputChange = (e) => {
    const newNumber = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(newNumber)) {
      return;
    }
    setNumber(newNumber);
    if (onChange) {
      onChange({
        price: newNumber,
        currency,
      });
    }
  };

  const onSelectChange = (values) => {
    console.log(values);
    setCurrency(values);
    if (onChange) {
      onChange({
        price: number,
        currency: values,
      });
    }
  };

  return (
    <div className="priceInput" style={{ display: 'flex' }}>
      <Input value={number} onChange={onInputChange} style={{ marginRight: 10 }} />
      <Select value={currency} onChange={onSelectChange} style={{ width: 100 }}>
        <SelectOption value="rmb">RMB</SelectOption>
        <SelectOption value="dollar">Dollar</SelectOption>
      </Select>
    </div>
  );
};

export default class Demo extends Component {
  checkPrice = (form, value, callback) => {
    if (value && value.price > 0) {
      callback();
    } else {
      callback('Price must be greater than zero!');
    }
  };
  render() {
    return (
      <div className="story-demo-form">
        <Form>
          <FormItem label="金额">
            <FormField name="price" validator={this.checkPrice}>
              <PriceInput />
            </FormField>
          </FormItem>
          <FormItem>
            <Button color="primary" type="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
`