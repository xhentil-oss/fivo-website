// cPanel / Phusion Passenger startup shim.
//
// Passenger loads the startup file with CommonJS semantics, but our server is
// an ES module with top-level await. This CJS file dynamically imports it, which
// works from Node 20+. Set this file as the "Application startup file" in
// cPanel → Setup Node.js App. server.js calls app.listen(); Passenger intercepts
// it and binds to the correct socket, so PORT does not need to be set manually.
import('./server.js').catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
