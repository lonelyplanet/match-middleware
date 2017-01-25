# match-middleware
An express middleware for working with React Router.

### How to use it...
```js
import match from "match-middleware";
import { renderToString } from "react-dom/server";
import { RouterContext } from "react-router";
import routes from "./routes";

router.get("/foo", match(routes), (req, res, next) => {
  res.send(renderToString(<RouterContext {...req.props} />));
});
```

### Run the tests...
```shell
npm run test
npm run test:ci # Watch mode
```
