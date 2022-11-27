import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type TypeOptions } from './ComponentTestHelper.d'
import { Selector } from './Selector'
import { SelectorBuilder } from './SelectorBuilder'

export class ComponentTestHelper<
  TRootElement extends HTMLElement = HTMLElement,
  TSelectedElement extends HTMLElement = TRootElement
> {
  protected readonly selector: Selector<TRootElement, TSelectedElement>

  constructor(
    configureSelector: (
      selectorBuilder: SelectorBuilder<TRootElement, TSelectedElement>
    ) => SelectorBuilder<TRootElement, TSelectedElement>
  ) {
    this.selector = configureSelector(
      Selector.createBuilder<TRootElement, TSelectedElement>()
    ).build()
  }

  async get(): Promise<TRootElement> {
    return await this.selector.get()
  }

  async getAll(): Promise<TRootElement[]> {
    return await this.selector.getAll()
  }

  async query(): Promise<TRootElement | null> {
    return await this.selector.query()
  }

  async queryAll(): Promise<TRootElement[]> {
    return await this.selector.queryAll()
  }

  async find(): Promise<TRootElement> {
    return await this.selector.find()
  }

  async findAll(): Promise<TRootElement[]> {
    return await this.selector.findAll()
  }

  /** Clears the value of this element */
  async clear(): Promise<void> {
    await userEvent.clear(await this.get())
  }

  async type(value: string, options?: TypeOptions): Promise<void> {
    if (!value) return

    const el = await this.get()
    if (options?.realistic) {
      await userEvent.type(el, value)
      return
    }

    await userEvent.click(el)
    fireEvent.change(el, {
      target: {
        name: (el as unknown as HTMLInputElement).name,
        value: (el as unknown as HTMLInputElement).value + value
      }
    })
  }

  async click(): Promise<void> {
    await userEvent.click(await this.get())
  }

  async expectToBeInTheDocument(): Promise<void> {
    expect(await this.find()).toBeInTheDocument()
  }

  async expectNotToBeInTheDocument(): Promise<void> {
    expect(await this.query()).not.toBeInTheDocument()
  }
}
