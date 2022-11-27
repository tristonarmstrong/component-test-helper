import {
  ByRoleMatcher,
  ByRoleOptions,
  Matcher,
  SelectorMatcherOptions,
  MatcherOptions
} from '@testing-library/react'
import { ComponentTestHelper } from '.'
import {
  type ContainerGetter,
  type SelectionMap,
  type BoundAttribute,
  type ByBoundAttributeSelection,
  type Selection
} from './ComponentTestHelper.d'
import { Selector } from './Selector'

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
    if (!this.#selection) {
      throw new Error(
        'Must have at least one selection when building a selector (e.g. builder.byRole(...))'
      )
    }

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
