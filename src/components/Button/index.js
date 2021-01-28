import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
  min-width: 250px;
  background-color: ${({ theme }) => {
    return theme.colors.secondary
  }};
  color: #fff;
  font-family: 'Lato', sans-serif;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
  cursor: pointer;
`

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired
}

export default Button
