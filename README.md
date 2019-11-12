# mediasmart

Project has 2 Node.js applications (client and api)

Client:
1. Created in React with Create React app (npx create-react-app my-app) 
2. App listens on port 3000 on localhost
3. Install aditional react-router-dom and prop-types packages
4. App is diveded into components
5. Uses react browser router for links with error page if url is unknown
6. Members page display a grid with 3 or 2 columns depending on the width of screen (responsive design)
7. Pagination is of 20 members, but can be changed from backend
8. On position 21 there is a Next page button that open in same tab the next page (based on page url param)
9. Request for members is done via fetch request

Backend:
1. Created with express generator (npx express-generator api)
2. App listens on port 5000 on localhost
3. Install additional node-fetch and node-cache packages
4. Client app is connected via http://localhost:5000/users route with page parameter
5. On backend it is a fetch request to http://work.mediasmart.io
6. After each page has been loaded, its content is cached for an hour
7. TTL (time to leave) can be changed from parameters
8. Each respones is uniquely saved base on a cacheId
9. Cache id is calculated via cache + page. So the content is unique on each page.

Restart apps after code changes:
1. Client React refreshes each time the file is changed.
2. On backend for development I used instead of npm start nodemon ./bin/www 
