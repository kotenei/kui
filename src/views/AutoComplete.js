import React, { Component } from "react";
import PropTypes from "prop-types";
import AutoComplete from "../components/AutoComplete";
import { data } from "../data";


class AutoCompleteView extends Component {
    render() {
        return (
            <div>
                <h1>AutoComplete 自动完成</h1>
                <div className="k-example">
                    <AutoComplete kSize="lg" data={data} /><br/><br/>
                    <AutoComplete kSize="lg" mode="multiple" data={data} />
                </div>
            </div>
        );
    }
}

export default AutoCompleteView;
