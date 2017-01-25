import { match as reactRouterMatch } from "react-router";

export default function match(routes) {
  return (req, res, next) => {
    const request = req;

    if (!routes) return next(new Error("No routes passed to the matchMiddle middleware."));

    return reactRouterMatch({ routes, location: req.url }, (err, redirectLocation, props) => {
      if (err) {
        next(err);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (props) {
        request.props = props;
        next();
      } else {
        next("route");
      }
    });
  };
}
