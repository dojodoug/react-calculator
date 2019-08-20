import React from 'react';
import './App.scss';
import Toggle from "./components/Toggle";
import * as math from 'mathjs';

class CalculatorDisplay extends React.Component {
  render() {
    const { value, ...props } = this.props;

    return (
      <div {...props} className="calculator-display">
        {value}
      </div>
    )
  }
}

export default class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      	theme: "yellow",
	      	displayValue: "0"
	    };
	    this.toggleTheme = this.toggleTheme.bind(this);
	}

	clearDisplay() {
		this.setState({
			displayValue: "0"
		});
	}

	readInput(num) {
		const { displayValue } = this.state;
		this.setState({
			displayValue: displayValue === "0" ? String(num) : displayValue + num
		});
	}

	readDecimal() {
		const { displayValue } = this.state;
		if (displayValue.indexOf(".") === -1) {
			this.setState({
				displayValue: displayValue + "."
			});
		}
	}

	readPlusMinus() {
		const { displayValue } = this.state;
		this.setState({
			displayValue: displayValue.charAt(0) === "-" ? displayValue.substr(1) : "-" + displayValue 
		});
	}

	readPercent() {
		const { displayValue } = this.state;
		const value = parseFloat(displayValue);
		this.setState({
			displayValue: String(value / 100)
		});
	}

	readOperator(operator) {
		const { displayValue } = this.state;
		if (displayValue.indexOf(operator) === -1) {
			this.setState({
				displayValue: displayValue + operator
			});
		}
	}

	showResults() {
		const { displayValue } = this.state;
		let result = math.evaluate(displayValue); 
		if (result % 1 !== 0) {
			result = parseFloat(Math.round(result * 100) / 100).toFixed(2);
		}
		this.setState({
			displayValue: result
		});
		/* For now resetting the displayValue using setTimeout until I have more
		   time to correctly reset the displayValue after the calculation */
		setTimeout(function(){
             this.setState({
             	displayValue: "0"
             });
        }.bind(this),3000);
	}

	toggleTheme() {
	    const theme = this.state.theme === "yellow" ? "red" : "yellow";
	    document.documentElement.classList.add("color-theme-in-transition");
	    this.setState({ theme });
	    document.documentElement.setAttribute("data-theme", theme);
	    window.setTimeout(() => {
	      document.documentElement.classList.remove("color-theme-in-transition");
	    }, 1000);
	}

	render() {
		const { displayValue } = this.state;

	  	return (
		  	<div id="wrapper">
			  	<div id="app">
				  	<div className="calculator">
				  		<CalculatorDisplay value={displayValue}/>
				  		<div className="calculator-keypad">
				  			<div className="input-buttons">
				  				<div className="function-buttons">
				  					<button className="calculator-btn btn-clear" onClick={() => this.clearDisplay()}>AC</button>
				  					<button className="calculator-btn btn-clear" onClick={() => this.readPlusMinus()}>±</button>
				  					<button className="calculator-btn btn-percent" onClick={() => this.readPercent()}>%</button>
				  				</div>
				  				<div className="number-buttons">
				  					<button className="calculator-btn btn-0" onClick={() => this.readInput(0)}>0</button>
				  					<button className="calculator-btn btn-decimal" onClick={() => this.readDecimal()}>.</button>
				  					<button className="calculator-btn btn-1" onClick={() => this.readInput(1)}>1</button>
				  					<button className="calculator-btn btn-2" onClick={() => this.readInput(2)}>2</button>
				  					<button className="calculator-btn btn-3" onClick={() => this.readInput(3)}>3</button>
				  					<button className="calculator-btn btn-4" onClick={() => this.readInput(4)}>4</button>
				  					<button className="calculator-btn btn-5" onClick={() => this.readInput(5)}>5</button>
				  					<button className="calculator-btn btn-6" onClick={() => this.readInput(6)}>6</button>
				  					<button className="calculator-btn btn-7" onClick={() => this.readInput(7)}>7</button>
				  					<button className="calculator-btn btn-8" onClick={() => this.readInput(8)}>8</button>
				  					<button className="calculator-btn btn-9" onClick={() => this.readInput(9)}>9</button>
				  				</div>
				  			</div>
				  			<div className="operator-buttons">
			  					<button className="calculator-btn btn-divide" onClick={() => this.readOperator("/")}>÷</button>
			  					<button className="calculator-btn btn-multiply" onClick={() => this.readOperator("*")}>x</button>
			  					<button className="calculator-btn btn-subtract" onClick={() => this.readOperator("-")}>-</button>
			  					<button className="calculator-btn btn-add" onClick={() => this.readOperator("+")}>+</button>
			  					<button className="calculator-btn btn-equal" onClick={() => this.showResults("=")}>=</button>
				  			</div>
				  		</div>
				  	</div>

				  	<Toggle toggleTheme={this.toggleTheme} />

			  	</div>
			</div>
	    )
	}
}
