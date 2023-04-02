import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
    state = {
        counter: 5,
    };

    increment = () => {
        // alert(this.state.counter);
        let counterNew = this.state.counter + 1;
        this.setState({
            counter: counterNew,
        });
    };
    decrement = () => {
        // alert(this.state.counter);
        let counterNew = this.state.counter - 1;
        this.setState({
            counter: counterNew,
        });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <h2>Count: {this.state.counter}</h2>
                    <p>
                        <button
                            className="btn btn-success btn-lg"
                            onClick={this.increment}
                        >
                            +
                        </button>
                        <button
                            className="btn btn-danger btn-lg ml-2"
                            onClick={this.decrement}
                        >
                            -
                        </button>
                    </p>
                </div>
            </div>
        );
    }
}

export default Counter;

if (document.getElementById("counter")) {
    ReactDOM.render(<Counter />, document.getElementById("counter"));
}
