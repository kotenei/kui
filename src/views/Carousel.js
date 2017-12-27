import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../components/Carousel';

const Panel = Carousel.Panel;

class CarouselView extends Component {
    render() {
        return (
            <div>
                <h1>Carousel 走马灯</h1>
                <div className="k-example">
                    <Carousel>
                        <Panel>1111111111111111111111111111111111111111111111111111111asfdasfdsassssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaa</Panel>
                        <Panel>2</Panel>
                        <Panel>3</Panel>
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default CarouselView;