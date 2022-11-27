import * as React from 'react'
import { render } from '../../'
import { TextInputTestHelper } from './testUtils'
import { TextInput } from './textInput'

// Just a few examples. Feel free to experiment a bit

describe('TextInput', () => {
  // Create a new instance of the TextInputTestHelper. No need to pass a builder
  // becuase we already hard coded in the test id for this component test helper
  const field = new TextInputTestHelper()

  it('renders', async () => {
    const { container } = render(<TextInput />)

    expect(container).toBeInTheDocument()
  })

  describe('Input', () => {
    it('can input text', async () => {
      render(<TextInput />)

      // notice we are using the custom functions we created in TextInputTestHelper
      field.type('hello')

      field.expectToHaveValue('hello')
    })
  })

  describe('Label', () => {
    it('renders', async () => {
      render(<TextInput />)

      field.label.expectToBeInTheDocument()
    })

    it('has correct value', async () => {
      render(<TextInput />)

      field.expectToHaveLabel('Some text')
    })
  })
})
