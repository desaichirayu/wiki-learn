### Application URL: 
http://wiki-learn.herokuapp.com/

# About
WikiLearn is an application that users can use to create and share notes based on wikipedia pages. The curernt prototype shows a basic search functionality followed by a detail page.

Users can search for articles based on title/content and will see a list of results based on their queries. Clicking on one of the results will lead them to a page that show the summary of the page they clicked on. Future work would involve incorporating note-taking to the page and sharing the created notes.

# API
We use the wikimedia API endpoint wrapped in a wrapper library [wikijs] as well as REST calls to the wikimedia API to fetch data. The wrapper provides core request handling functionality and utilty functions for tasks like parsing wikipedia content.
The current prototype uses the search(...) function that returns list of results that is then routed to the UI. It also uses a REST call to the metawiki API to retrive the page thumbnail image url.
## Search
The search criteria we use is the content of a wiki page including its title.
A sample query would be of as follows:

```javascript
wiki().search("area 51") -> [Array]
```
This returns a list of page titles matched by the content of the query like:
```javascript
["Area 51", "Area 51 (film)", "Area 51 (2005 video game)",...]
```
This is done when the user enters a query in the search bar on the homepage
and clicks on the search button

## Search Results
Upon pressing the search button the search results are queried from the api and displayed as a list in the */search* route. The API by default returns list of 50 most relevent wikipedia page titles as shown above.

## Detail Results
### Summary
A summary query would be as follows [Assuming user clicked on Area 51]
```javascript
wiki().page("Area 51").then(page => page.summary()) ->[String]
```
This returns a brief summary of the page like: 
```javascipt
"Area 51 is the common name of a highly classified..."
```
This is done when the user clicks on a page title, the result is displayed in the */details* route

### Thumbnail
We also make a REST call to wikimedia API to retrieve thumbnails of images if the page has a thumbnail.

#### Endpoint and Request
```javascript
apiURL = 'https://en.wikipedia.org/w/api.php?action=query';

aiURLOptions = '&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600&pilicense=any&titles=';

fetch(this.apiURL + this.aiURLOptions + "Area 51")
    .then(resp => resp.json()).then(rj => rj.query.pages[0].thumbnail.source);
```
This returns a query result which contains the thumbnail url as shown below:
```javascript
{
    "batchcomplete": true,
    "query": {
        "pages": [
            {
                "pageid": 2321,
                "ns": 0,
                "title": "Area 51",
                "thumbnail": {
                    "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wfm_area_51_landsat_geocover_2000.jpg/476px-Wfm_area_51_landsat_geocover_2000.jpg",
                    "width": 476,
                    "height": 600
                },
                "terms": {
                    "alias": [
                        "Area 51 (Nev.)",
                        "Nevada Area 51",
                        "Homey Airport"
                    ],
                    "description": [
                        "classified U.S. Military Base situated in Groom Lake, Nevada"
                    ],
                    "label": [
                        "Area 51"
                    ]
                }
            }
        ]
    }
}
```
This happens in the background along with the summary to populate the */details* page.


### Installation Instructions:

### Client :: https://github.com/desaichirayu/wiki-learn/releases/tag/1.1
* run ```npm install```
* replace urls in constants/index.js file with local urls
* run ```ng serve```

### Server:: https://github.com/shiredude95/wiki-learn-server/tree/v0.1
* run ```mvn clean install```
* make sure to install mysql and ensure it is running.
* change application.properties to point to local db
* run ```mvn sprint:boot run```

### NLP TAG Service :: https://github.com/shiredude95/entity-service/tree/v1.0
* run ```pip install -r requirements.txt```
* run ```python server.py```





