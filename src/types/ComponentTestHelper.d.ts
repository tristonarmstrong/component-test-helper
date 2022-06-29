import {
  ByRoleMatcher,
  ByRoleOptions,
  Matcher,
  SelectorMatcherOptions,
  MatcherOptions
} from '@testing-library/react'

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

export type SelectionMap<
  TRootElement extends HTMLElement = HTMLElement,
  TSelectedElement extends HTMLElement = TRootElement
> = (el: TSelectedElement | null) => TRootElement | null

export type ContainerGetter = () => HTMLElement | Promise<HTMLElement>

export type Selection = Selection & {
  id: string
  options: Record<string, string>
  query: string
}
