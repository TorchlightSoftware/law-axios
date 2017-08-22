# Law Axios

Law adapter for exposing a REST service.  Uses axios under the covers.

# Usage

```
const PORT = 3000
const rest = require('law-axios')
const {expect} = require('chai')

const api = rest({
  json: true,
  domain: `http://0.0.0.0:${PORT}`,
})

api('GET /theanswer', {q: 'to life, the universe, and everything'})
  .then(theanswer => expect(theanswer).to.equal(42))
```
