/* eslint-disable jest/no-standalone-expect */
import { screen, within } from 'tests/testUtils'

import {
  ByRoleMatcher,
  ByRoleOptions,
  fireEvent,
  Matcher,
  MatcherOptions,
  SelectorMatcherOptions,
  waitForOptions
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export type QueryExecutionType =
  | 'get'
  | 'getAll'
  | 'find'
  | 'findAll'
  | 'query'
  | 'queryAll'

export type RoleQueryType = 'ByRole'

export interface ByRoleSelection {
  readonly query: RoleQueryType
  readonly id: ByRoleMatcher
  readonly options?: ByRoleOptions
}

export type TextSelectionQueryType = 'ByText' | 'ByLabelText'

export interface ByTextSelection {
  readonly query: TextSelectionQueryType
  readonly id: Matcher
  readonly options?: SelectorMatcherOptions
}

export type BoundAttribute =
  | 'LabelText'
  | 'AltText'
  | 'DisplayValue'
  | 'TestId'
  | 'PlaceholderText'
  | 'Title'

export type BoundAttributeQueryType = `By${BoundAttribute}`

export interface ByBoundAttributeSelection {
  readonly query: BoundAttributeQueryType
  readonly id: Matcher
  readonly options?: MatcherOptions
}

export type Selection =
  | ByRoleSelection
  | ByTextSelection
  | ByBoundAttributeSelection

export interface TypeOptions {
  realistic?: boolean
}

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

  async get() {
    return await this.selector.get()
  }

  async getAll() {
    return await this.selector.getAll()
  }

  async query() {
    return await this.selector.query()
  }

  async queryAll() {
    return await this.selector.queryAll()
  }

  async find() {
    return await this.selector.find()
  }

  async findAll() {
    return await this.selector.findAll()
  }

  async clear() {
    await userEvent.clear(await this.get())
  }

  async type(value: string, options?: TypeOptions) {
    if (!value) return

    const el = await this.get()
    if (options?.realistic) {
      await userEvent.type(el, value)
    } else {
      await userEvent.click(el)
      fireEvent.change(el, {
        target: {
          name: (el as unknown as HTMLInputElement).name,
          value: (el as unknown as HTMLInputElement).value + value
        }
      })
    }
  }

  async click() {
    await userEvent.click(await this.get())
  }

  async expectToBeInTheDocument() {
    expect(await this.find()).toBeInTheDocument()
  }

  async expectNotToBeInTheDocument() {
    expect(await this.query()).not.toBeInTheDocument()
  }
}

export type SelectionMap<
  TRootElement extends HTMLElement = HTMLElement,
  TSelectedElement extends HTMLElement = TRootElement
> = (el: TSelectedElement | null) => TRootElement | null

export type ContainerGetter = () => HTMLElement | Promise<HTMLElement>

export class Selector<
  TRootElement extends HTMLElement = HTMLElement,
  TSelectedElement extends HTMLElement = TRootElement
> {
  readonly selection: Selection
  #getContainer?: ContainerGetter
  #map?: SelectionMap<TRootElement, TSelectedElement>

  constructor(
    selection: Selection,
    getContainer?: ContainerGetter,
    map?: SelectionMap<TRootElement, TSelectedElement>
  ) {
    this.selection = selection
    this.#getContainer = getContainer
    this.#map = map
  }

  static createBuilder<
    TRootElement extends HTMLElement = HTMLElement,
    TSelectedElement extends HTMLElement = TRootElement
  >() {
    return new SelectorBuilder<TRootElement, TSelectedElement>()
  }

  async get() {
    return (await this.execQuery('get')) as TRootElement
  }

  async getAll() {
    return (await this.execQuery('getAll')) as TRootElement[]
  }

  async find(waitForOptions?: waitForOptions) {
    return (await this.execQuery('find', waitForOptions)) as TRootElement
  }

  async findAll(waitForOptions?: waitForOptions) {
    return (await this.execQuery('findAll', waitForOptions)) as TRootElement[]
  }

  async query() {
    return (await this.execQuery('query')) as TRootElement | null
  }

  async queryAll() {
    return (await this.execQuery('queryAll')) as TRootElement[]
  }

  private async execQuery(
    type: QueryExecutionType,
    waitForOptions?: waitForOptions
  ): Promise<TRootElement[] | TRootElement | null> {
    const methodName = `${type}${this.selection.query}`
    const args = [this.selection.id, this.selection.options, waitForOptions]

    const scopedQueries = this.#getContainer
      ? within(await this.#getContainer())
      : screen
    // there is no good way to properly type this
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = (await scopedQueries[methodName](...args)) as
      | TSelectedElement[]
      | TSelectedElement
      | null

    if (this.#map) {
      return Array.isArray(result)
        ? (result.map(this.#map) as TRootElement[])
        : this.#map(result)
    } else {
      return result as TRootElement[] | TRootElement | null
    }
  }
}

export class SelectorBuilder<
  TRootElement extends HTMLElement = HTMLElement,
  TSelectedElement extends HTMLElement = TRootElement
> {
  #selection?: Selection
  #getContainer?: ContainerGetter
  #map?: SelectionMap<TRootElement, TSelectedElement>

  byRole(role: ByRoleMatcher, options?: ByRoleOptions): this {
    this.#selection = { query: 'ByRole', id: role, options }
    return this
  }

  byText(id: Matcher, options?: SelectorMatcherOptions): this {
    this.#selection = { query: 'ByText', id, options }
    return this
  }

  byLabelText(id: Matcher, options?: SelectorMatcherOptions): this {
    this.#selection = { query: 'ByLabelText', id, options }
    return this
  }

  byAltText(id: Matcher, options?: MatcherOptions): this {
    this.#selection = this.byBoundAttribute('AltText', id, options)
    return this
  }

  byDisplayValue(id: Matcher, options?: MatcherOptions): this {
    this.#selection = this.byBoundAttribute('AltText', id, options)
    return this
  }

  byTestId(id: Matcher, options?: MatcherOptions): this {
    this.#selection = this.byBoundAttribute('TestId', id, options)
    return this
  }

  byPlaceholderText(id: Matcher, options?: MatcherOptions): this {
    this.#selection = this.byBoundAttribute('PlaceholderText', id, options)
    return this
  }

  byTitle(id: Matcher, options?: MatcherOptions): this {
    this.#selection = this.byBoundAttribute('Title', id, options)
    return this
  }

  withMapping(map: SelectionMap<TRootElement, TSelectedElement>): this {
    this.#map = map
    return this
  }

  withinContainer(container: ContainerGetter | ComponentTestHelper): this {
    this.#getContainer =
      typeof container === 'function'
        ? container
        : async () => await container.get()
    return this
  }

  build(): Selector<TRootElement, TSelectedElement> {
    if (!this.#selection)
      throw new Error(
        'Must have at least one selection when building a selector (e.g. builder.byRole(...))'
      )

    return new Selector<TRootElement, TSelectedElement>(
      this.#selection,
      this.#getContainer,
      this.#map
    )
  }

  private byBoundAttribute(
    attribute: BoundAttribute,
    id: Matcher,
    options?: MatcherOptions
  ): ByBoundAttributeSelection {
    return {
      query: `By${attribute}`,
      id,
      options
    }
  }
}

export type UnmappableSelectorBuilder = Omit<SelectorBuilder, 'withMapping'>
