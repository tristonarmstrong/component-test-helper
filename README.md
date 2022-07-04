# Component-Test-Helper

The Component Test Helper is a package intended to make React Jest testing far more declaritive

### Badges

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![current version](https://img.shields.io/npm/v/storybook-addon-next.svg)](https://www.npmjs.com/package/storybook-addon-next)

<div id="top"></div>

### Externals

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<br/>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a solution to React frontend testing written by @RyanClementsHax, turned into npm
package by me. Yes, with permission, as an exercise for me. This package provides a class, ComponentTestHelper, to be used in Jest React frontend testing use cases. This class allows
the developer to abstract a lot of the tedious, duplicated, testing that often occurs
when attempting to test the frontend, into reusable functions contained within the bounds of a given components "test helper".

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get the package included in your project, follow these steps

### Installation

using [npm]():

```bash
npm i --save-dev component-test-helper
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

### import ComponentTestHelper into test file

```typescript
import ComponentTestHelper from 'component-test-helper'
```

### define instance for the component to test in the test file

```typescript
// with a builder
const inputField = new ComponentTestHelper(builder =>
  builder.byTestId('inputFieldContainer')
)

// with a custom ComponentTestHelper - builder only necessary if a custructor wasn't supplied
const inputField = new InputFieldTestHelper(builder =>
  builder.byTestId('inputFieldContainer')
)

// custom with supplied constructor
const inputField = new InputFieldTestHelper()
```

### define custom ComponentTestHelper in another file

```typescript
export class InputFieldTestHelper extends ComponentTestHelper {
  // define child components to test
  readonly input = new ComponentTestHelper(builder =>
    builder.byTestId('inputField')
  )

  // create constructor if you want to hard code the selector for the builder
  constructor() {
    super(builder => builder.byTestId('inputFieldContainer'))
  }

  // define methods for acting and expecting on components
  async expectToHaveValue(value: string | number | null): Promise<void> {
    expect(await this.input.get()).toHaveValue(value)
  }
}
```

_Check out the [examples](https://github.com/Tarmstrong95/component-test-helper/tree/main/src/examples) folder for more details_

<p align="right">(<a href="#top">back to top</a>)</p>

<hr>

See the [open issues](https://github.com/Tarmstrong95/component-test-helper/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Triston - [@Triston08227721](https://twitter.com/Triston08227721) - triston95strong@gmail.com

Project Link: [https://github.com/Tarmstrong95/component-test-helper](https://github.com/Tarmstrong95/component-test-helper)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

[<img src="https://avatars.githubusercontent.com/u/20916810?v=4" alt="Markdown Monster icon" width=90/>](https://github.com/RyanClementsHax)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Tarmstrong95/component-test-helper.svg?style=for-the-badge
[contributors-url]: https://github.com/Tarmstrong95/component-test-helper/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Tarmstrong95/component-test-helper.svg?style=for-the-badge
[forks-url]: https://github.com/Tarmstrong95/component-test-helper/network/members
[stars-shield]: https://img.shields.io/github/stars/Tarmstrong95/component-test-helper.svg?style=for-the-badge
[stars-url]: https://github.com/Tarmstrong95/component-test-helper/stargazers
[issues-shield]: https://img.shields.io/github/issues/Tarmstrong95/component-test-helper.svg?style=for-the-badge
[issues-url]: https://github.com/Tarmstrong95/component-test-helper/issues
[license-shield]: https://img.shields.io/github/license/Tarmstrong95/component-test-helper.svg?style=for-the-badge
[license-url]: https://github.com/Tarmstrong95/component-test-helper/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/triston95strong
