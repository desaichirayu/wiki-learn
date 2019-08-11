import {Injectable} from '@angular/core';
import {not} from 'rxjs/internal-compatibility';
import {async} from 'q';
import * as constants from '../constants';
const wiki = require('wikijs').default;

const serverUrl = constants.SERVER_URL;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor() {
  }

  URL_SUMMARY_SERVICE = 'https://en.wikipedia.org/w/api.php?action=query';
  OPTIONS_FOR_SUMMARY = '&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600&pilicense=any&titles=';

  HOST_NER_LOCAL = 'http://localhost:5000';
  HOST_NER_REMOTE = 'https://rocky-ocean-10939.herokuapp.com';
  nerChoice = this.HOST_NER_REMOTE;

  URL_NER_SERVICE = this.nerChoice + '/entities';

  HOST_BACKEND_LOCAL = 'http://localhost:8080';
  HOST_BACKEND_REMOTE = serverUrl;

  backendChoice = this.HOST_BACKEND_REMOTE;

  URL_FIND_PAGE = this.backendChoice + '/api/pages/search?q=';
  URL_CREATE_PAGE = this.backendChoice + '/api/pages';


  URL_CREATE_TAGS = this.backendChoice + '/api/pages/{pid}/tags';
  URL_GET_TAGS = this.backendChoice + '/api/pages/{pid}/tags';


  URL_LIKE_ACTION = this.backendChoice + '/api/users/{uid}/like/{pid}';
  URL_DISLIKE_ACTION = this.backendChoice + '/api/users/{uid}/dislike/{pid}';


  URL_CREATE_NOTE = this.backendChoice + '/api/notes/pages/{pid}/users/{uid}/create';
  URL_GET_NOTE=this.backendChoice+'/api/pages/{pid}/notes';
  URL_EDIT_NOTE=this.backendChoice+"/api/notes/{nid}";
  URL_DELETE_NOTE=this.backendChoice+"/api/notes/{nid}";

  PAGE_ID = -1;
  PAGE_BASE_LIKES = -1;
  PAGE_BASE_DISLIKES = -1;
  PAGE_TAGS = [];


  getReturnData() {
    return {'id': this.PAGE_ID, 'likes': this.PAGE_BASE_LIKES, 'dislikes': this.PAGE_BASE_DISLIKES, 'entities': this.PAGE_TAGS};
  }

  //PAGES==========================
  findPageExists(title, summary) {

    return fetch(this.URL_FIND_PAGE + title)
      .then(response => response.text())
      .then(response => {
        if (response.length > 0) {
          //exists in db
          var jresponse = JSON.parse(response);
          console.log(jresponse);
          this.PAGE_ID = jresponse['id'];
          this.PAGE_BASE_LIKES = jresponse['numberOfLikes'];
          this.PAGE_BASE_DISLIKES = jresponse['numberOfDisLikes'];



          return this.getEntitiesFromDB(this.PAGE_ID).then(
            response => {
              console.log(response);
              this.PAGE_TAGS = response;
              return this.getReturnData();
            }
          );
        } else {
          return fetch(this.URL_CREATE_PAGE, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'title': title,
              'numberOfLikes': 0,
              'numberOfDisLikes': 0,
              'numberOfViews': 1
            })
          }).then(response => response.json()).then(response => {

              console.log(response);
              this.PAGE_ID = response['id'];
              this.PAGE_BASE_LIKES = response['numberOfLikes'];
              this.PAGE_BASE_DISLIKES = response['numberOfDisLikes'];
              return this.getEntitiesFromRemote(title, summary).then(()=> {

                return this.getEntitiesFromDB(this.PAGE_ID).then(
                  response => {
                    this.PAGE_TAGS = response;
                    return this.getReturnData();
                  });
                }


              );
            }
          );

        }
      });

  }


  getNotes(pid){

    return fetch(this.URL_GET_NOTE.replace("{pid}",pid),{
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response=>response.json());

  }

  postLike(userId, pageId) {

    return fetch(this.URL_LIKE_ACTION.replace('{uid}', userId).replace('{pid}', pageId), {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json());
  }


  postDislike(userId, pageId) {


    return fetch(this.URL_DISLIKE_ACTION.replace('{uid}', userId).replace('{pid}', pageId), {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json());

  }


  getSummary(title) {
    return wiki().page(title).then(page => page.summary());
  }

  getPageImageURL(title) {
    return fetch(this.URL_SUMMARY_SERVICE + this.OPTIONS_FOR_SUMMARY + title)
      .then(resp => resp.json()).then(rj => {
        if (rj.query.pages[0].thumbnail != null) {
          return rj.query.pages[0].thumbnail.source;
        }
        return null;
      });

  }


  entityHelper(entityString) {

    var en = entityString.split('::');
    return {'name': en[0], 'type': en[1], 'nametype': en[0] + '::' + en[1]};

  }


  getEntitiesFromDB(pageId) {
    return fetch(this.URL_GET_TAGS.replace('{pid}', pageId), {
      method: 'GET',
      mode: 'cors',
    }).then(response => response.json()).then(
      response => {
        return response;
      }
    );
  }

  getEntitiesFromRemote(title, summary) {

    return fetch(this.URL_NER_SERVICE, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'url': title,
        'content': summary
      })
    }).then(response => response.json()).then(
      async (response) => {
        var responses  = response['entities'].map(e => this.entityHelper(e));
        await responses.map(response=>this.createEntity(this.PAGE_ID, response));
        return ;
      }
    );
  }

  async createEntity(pid, entity) {
    console.log(entity);
    fetch(this.URL_CREATE_TAGS.replace('{pid}', pid), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity)
    }).then(response => response.json()).then(
      response => {
        return response;
      }
    );

  }

  postNote(uid, pid, content) {
    return fetch(this.URL_CREATE_NOTE.replace('{pid}', pid).replace('{uid}', uid), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'content': content,
        'created':new Date(),
        'numberOfLikes':0,
        'numberOfDisLikes':0
      })
    }).then(response => response.json());

  }



  deleteNote(nid){
    return fetch(this.URL_DELETE_NOTE.replace("{nid}",nid),{
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    });

  }


  updateNote(nid,note){

    return fetch(this.URL_EDIT_NOTE.replace("{nid}",nid),{
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(note)
    }).then(response=>response.json());

  }


  getRecentPages(){
    return fetch(serverUrl + '/api/pages/recent').then(response => response.json());
  }

}
