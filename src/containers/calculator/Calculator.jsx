import React, { useReducer } from 'react'
import { CalculatorButton } from "../../components/"
import buttonsReducer from '../../reducers/ButtonsReducer';
import "./calculator.css"

const Calculator = () => {
  //global state
  const [input, dispatch] = useReducer(buttonsReducer, initialState);
  //style classes
  let notZeroNumClassNames = "btn short-btn btn-num"
  let zeroNumClassNames = "btn long-btn btn-num btn-zero"
  let modButtonClassNames = "btn short-btn btn-mod"
  let opButtonClassNames = "btn short-btn btn-op"
  //button handlers
  //number click handler
  function onNumberClick(num) {
    dispatch({
      type: "number",
      numberKey: num
    })
  }
  //decimal click handler
  function onDecimalClick() {
    dispatch({
      type: "decimal"
    })
  }
  //non number click handler
  function onOperationClick(op) {
    dispatch({
      type: "operation",
      operationType: op
    })
  }
  //number modifier click handler
  function onModifierClick(mod) {
    dispatch({
      type: "modifier",
      modifierType: mod,
    })
  }
  //equal sign click handler
  function onEqualClick() {
    dispatch({
      type: "evaluate"
    })
  }

  return (
    <div className="calculator-container">
      <div className='calculator-body'>
        <div className="calculator-display-section">
          {input.current ?? 0}
        </div>
        <div className="calculator-buttons-section">
          <CalculatorButton buttonText={input.isAllClear ? "AC" : "CE"} handler={() => onModifierClick("clear")} classNames={modButtonClassNames} />
          <CalculatorButton buttonText="+/-" handler={() => onModifierClick("sign")} classNames={modButtonClassNames} />
          <CalculatorButton buttonText="%" handler={() => onModifierClick("percent")} classNames={modButtonClassNames} />
          <CalculatorButton buttonText='/' handler={() => onOperationClick("divide")} classNames={opButtonClassNames} />
          <CalculatorButton buttonText="7" handler={() => onNumberClick(7)} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText="8" handler={() => onNumberClick(8)} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText="9" handler={() => onNumberClick(9)} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText='x' handler={() => onOperationClick("multiply")} classNames={opButtonClassNames} />
          <CalculatorButton buttonText="4" handler={() => onNumberClick(4)} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText="5" handler={() => onNumberClick(5)} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText="6" handler={() => onNumberClick(6)} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText='-' handler={() => onOperationClick("subtract")} classNames={opButtonClassNames} />
          <CalculatorButton buttonText="1" handler={() => onNumberClick(1)} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText="2" handler={() => onNumberClick(2)} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText="3" handler={() => onNumberClick(3)} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText='+' handler={() => onOperationClick("add")} classNames={opButtonClassNames} />
          <CalculatorButton buttonText="0" handler={() => onNumberClick(0)} classNames={zeroNumClassNames} />
          <CalculatorButton buttonText="." handler={() => onDecimalClick()} classNames={notZeroNumClassNames} />
          <CalculatorButton buttonText='=' handler={() => onEqualClick()} classNames={opButtonClassNames} />
        </div>
      </div>
    </div>
  )
}

let initialState = {
  current: null,
  pending: null,
  op: null,
  isAllClear: true,
  isCurrentResult: false
}

export default Calculator