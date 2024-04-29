import React from 'react'
import "./calcButton.css"

import PropTypes from "prop-types"


const CalcButton = (props) => {

  //render to page
  return <button onClick={props.handler} className={props.classNames}>{props.buttonText}</button>
}

CalcButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  classNames: PropTypes.string
}


export default CalcButton 