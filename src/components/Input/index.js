import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const InputStyled = styled.input`
  border: 1px solid ${({ theme }) => { return theme.colors.primary }};
  border-radius: 5px;
  padding: 10px;
  min-width: 250px;
  background: none;
  color: #fff;

  ::placeholder{
    color: #fff;
  }
`
// eslint-disable-next-line react/prop-types
function Input ({ onChange, placeholder, ...props }) {
  return (
    <div>
      <InputStyled
      onChange={onChange}
      placeholder={placeholder}
      {...props}
      ></InputStyled>
    </div>
  )
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valur: PropTypes.string
}

export default Input
