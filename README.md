# Zero Dependencies One Liner Feature Tutorial Helper

User Onboarding, Product Walkthrough, Feature Guide, whatever you call it, is annoying but PM likes it.

## Not Very Ready


## Install

```
npm i a-tour
```

## Usage 

```typescript
    new aTour({
      steps: [
        {
          target: '#app > div > div.page-header',
          hint: 'This is an awesome page header',
          title: 'My page header',
        },
      ],
    }).start()

```

- handle scroll
- hint arrow
- multiple guides