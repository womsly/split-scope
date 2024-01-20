import React from 'react'
import classes from './Button.module.scss'
import PropTypes from 'prop-types'

function Button(props) {
  if (props.newClass) 
  {
    return <button 
              className={props.newClass + " " + classes.baseBtn} 
              onClick={props.clickEvent} 
              type={props.type}>
                {props.text}
              </button>
  } else {
    return <button 
              className={classes.baseBtn} 
              onClick={props.clickEvent} 
              type={props.type}>
                {props.text}
              </button>
  }
}

Button.propTypes = {
  text: PropTypes.string,
  clickEvent: PropTypes.func,
  newClass: PropTypes.string,
  type: PropTypes.string
}

export default Button;