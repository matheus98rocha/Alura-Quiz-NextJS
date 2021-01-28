import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const InputStyled = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 0;
  margin-bottom: 25px;
  ::placeholder{
    color: #fff;
  }
`
// eslint-disable-next-line react/prop-types
function Input ({ onChange, placeholder, ...props }) {
  return (
      <InputStyled
      onChange={onChange}
      placeholder={placeholder}
      {...props}
      ></InputStyled>
  )
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valur: PropTypes.string
}

export default Input
