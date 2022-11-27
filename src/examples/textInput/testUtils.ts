import { ComponentTestHelper } from '../../ComponentTestHelper'
import { TypeOptions } from '../../ComponentTestHelper.d'

/** Create a new class inheriting from COmponentTestHelper for the component youre wanting to test.
 * This will contain all sub compoennts that need to be tested as well
 */
export class TextInputTestHelper extends ComponentTestHelper {
  // Create a property for the input element that we want to test. We pass in the
  // builder function that will be responsible for selecting the component in the dom
  readonly input = new ComponentTestHelper(builder =>
    builder.byTestId('input').withinContainer(this)
  )

  // Create a property for the label element that we want to test. Same as above
  readonly label = new ComponentTestHelper(builder =>
    builder.byTestId('label').withinContainer(this)
  )

  // use the constructor to define the container component that all tested components fall under using the
  // same builder methodology above
  constructor() {
    super(builder => builder.byTestId('container'))
  }

  // expose a method to provide the ability to type values into the input
  async type(value: string, options?: TypeOptions): Promise<void> {
    await this.input.type(value, options)
  }

  // expose a method for clearing the input
  async clear(): Promise<void> {
    await this.input.clear()
  }

  // expose a method for checking if the input field is disabled
  async expectToBeDisabled(): Promise<void> {
    expect(await this.input.get()).toBeDisabled()
  }

  // you get the point
  async expectToBeEnabled(): Promise<void> {
    expect(await this.input.get()).toBeEnabled()
  }

  // ...
  async expectToHaveFocus(): Promise<void> {
    expect(await this.input.get()).toHaveFocus()
  }

  // ...
  async expectToHaveValue(value: string | number | null): Promise<void> {
    expect(await this.input.get()).toHaveValue(value)
  }

  // ... I feel these are all pretty self explanatory (which is the point)
  async expectToBeValid(): Promise<void> {
    expect(await this.input.get()).toHaveAttribute('aria-invalid', 'false')
  }

  // ...
  async expectToBeInvalid(): Promise<void> {
    expect(await this.input.get()).toHaveAttribute('aria-invalid', 'true')
  }

  // ...
  async expectToHaveLabel(label: string): Promise<void> {
    expect(await this.label.get()).toHaveValue(label)
  }
}
