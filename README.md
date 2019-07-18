Application URL:http://wiki-learn.herokuapp.com/

# About
WikiLearn is a service that users can use to create and share notes based on wikipedia pages. The curernt prototype shows a basic search functionality followed by a detail page.

Users can search for articles based on title/content and will see a list of results based on their queries. Clicking on one of the results will lead them to a page that show the summary of the page they clicked on. Future work would involve incorporating note-taking to the page and sharing the created notes.

We use the wikimedia API endpoint wrapped in a wrapper library [wikijs] as a our service. The wrapper provides core request handling functionality.
The current prototype uses the search(...) function that returns a paginated list of results that is then routed to the UI.

# API
### Search
A sample query would be of as follows:

```javascript
wiki().search("area 51") -> [Array]
```
This returns a list of page titles matched by the content of the query.
This is done when the user enters a query in the search bar in */search*
and clicks on the search button

### Summary
A summary query would be as follows [Assuming usre clicked on Area 51]
```javascript
wiki().page("Area 51").then(page => page.summary()) ->[String]
```

This returns a brief summary of the page.
This is done when the user clicks on a page title, the result is displayed in the */details* route

### Thumbnail
We also provide an api to retrieve thumbnails of images given the page has a thumbnail.

#### Endpoint and Request
```javascript
apiURL = 'https://en.wikipedia.org/w/api.php?action=query';

aiURLOptions = '&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600&pilicense=any&titles=';

fetch(this.apiURL + this.aiURLOptions + "Area 51")
    .then(resp => resp.json()).then(rj => rj.query.pages[0].thumbnail.source);
```
This happens in the background along with the summary to populate the /details page.
