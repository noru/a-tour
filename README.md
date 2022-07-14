# Zero Dependencies One Liner Feature Tutorial Helper

User Onboarding, Product Walkthrough, Feature Guide, whatever you call it, is annoying but PM likes it.

## Not Very Ready

This thing is working in progress. Everything may change during the development. Use it at your own discretion.

## 👉[Demo](https://noru.github.io/a-tour)👈

## Install

```
npm i a-tour
```

## Usage 

```typescript
    new aTour({
      id: 'my-guide', // multiple guide supported
      steps: [
        {
          target: '#app > div > div.page-header',
          hint: 'This is an awesome page header',
          title: 'My page header',
        },
      ],
    }).start()
```

## API

- new ATour(options) // options has following properties
  - id: string // an identifier
  - container: HTMLElement | string | (() => HTMLElement)  // a HTML node, a selector or a function that returns a html node
  - steps: Step[]   // properties as below
    - target: string      // a css selector targeting the element you want to highlight
    - title: string
    - hint: string
    - clickTargetAsNext?: boolean // enable mouse event on target and click it as "next" button
    - delay?: number // a delay in milliseconds, in case the target element is not yet visible on DOM for reason like, data loading or invoking a modal
    - noPrev?: boolean // disable "prev" button for this step

- instance.start()    // starts the guide
- instance.stop()    // quite the guide programmatically

## TODO

- ~~handle scroll~~
- ~~multiple guides~~
- hint arrow
- ~~hyper link in hint~~