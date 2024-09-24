# Frontend Developer Test

One of our hotel clients needs help improving a web application. This one manages the booking process. It already has an initial development but at THN we think it can be improved.

The project must meet the following objectives:
- Check-in and check-out dates must be today and tomorrow.
- When clicking on the "Modify" button, the "Summary" section information must be updated.
- When selecting one of the 3 hotel options, the "Summary" section information must be updated.
- When clicking on the "Save" button, the information must be saved locally. This means that when refreshing the browser, the data must be kept.
- When `promo_code` parameter is within the URL, a discount must be applied on the final price. E.g: `dummyurl.com?promo_code=10` applies a 10% discount on the Summary section

Nice to have:
The web application should be optimized for mobile devices and maintain the current development framework (Vue)

## Reminder:
The sky is the limit. Don't limit yourself to meet the requirements, you can take it a step further by improving the framework usage, project architecture, fixing bugs, etc. We are expecting you to deliver the project as you would deliver it in a real case scenario.

---

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn run dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
