import * as React from 'react'

type TextInputPropsType = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>

export const TextInput: React.FC<TextInputPropsType> = props => (
  <div data-testid="container">
    <p data-testid="label">Some text</p>
    <input data-testid="input" {...props} />
  </div>
)
