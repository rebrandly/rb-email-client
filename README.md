# How to use
[![npm version](https://badge.fury.io/js/rb-email-client.svg)](https://badge.fury.io/js/rb-email-client)

```js
var RbEmailClient = require('rb-email-client').default;
var rbEmailClient = new RbEmailClient();

rbEmailClient.sendEmail(templateEmail = 'welcome', to = 'user@gmail.com', parameters = {}, from = 'marketing@rebrandly.com')
  .then(console.log)
  .catch(console.error);
```
