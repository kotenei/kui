export default `import React, { Component } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Breadcrumb, BreadcrumbItem } from 'kui-react';

export default class Demo extends Component {
  render() {
    return (
      <div className="story-demo-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem href="/" icon={<AiOutlineHome />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="/Breadcrumb">Breadcrumb</BreadcrumbItem>
          <BreadcrumbItem>Page</BreadcrumbItem>
        </Breadcrumb>
      </div>
    );
  }
}
`