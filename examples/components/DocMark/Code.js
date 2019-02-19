import React from "react";
import PropTypes from "prop-types";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

class Code extends React.PureComponent {
    constructor(props) {
        super(props);
        this.setRef = this.setRef.bind(this);
    }

    setRef(el) {
        this.codeEl = el;
    }

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        hljs.highlightBlock(this.codeEl);
    }

    render() {
        return (
            <pre>
                <code
                    ref={this.setRef}
                    className={`language-${this.props.language}`}
                >
                    {this.props.value}
                </code>
            </pre>
        );
    }
}

Code.defaultProps = {
    language: ""
};

Code.propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
};

export default Code;
