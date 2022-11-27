import {
  within,
  waitForOptions as waitForOptionsType
} from '@testing-library/react'
import { SelectorBuilder } from './SelectorBuilder'
import {
  type ContainerGetter,
  type SelectionMap,
  type QueryExecutionType,
  type Selection
} from './ComponentTestHelper.d'

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

  async get(): Promise<TRootElement> {
    return (await this.execQuery('get')) as TRootElement
  }

  async getAll(): Promise<TRootElement[]> {
    return (await this.execQuery('getAll')) as TRootElement[]
  }

  async find(waitForOptions?: waitForOptionsType): Promise<TRootElement> {
    return (await this.execQuery('find', waitForOptions)) as TRootElement
  }

  async findAll(waitForOptions?: waitForOptionsType): Promise<TRootElement[]> {
    return (await this.execQuery('findAll', waitForOptions)) as TRootElement[]
  }

  async query(): Promise<TRootElement | null> {
    return (await this.execQuery('query')) as TRootElement | null
  }

  async queryAll(): Promise<TRootElement[]> {
    return (await this.execQuery('queryAll')) as TRootElement[]
  }

  private async execQuery(
    type: QueryExecutionType,
    waitForOptions?: waitForOptionsType
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

    if (!this.#map) {
      return result as TRootElement[] | TRootElement | null
    }

    return Array.isArray(result)
      ? (result.map(this.#map) as TRootElement[])
      : this.#map(result)
  }
}
