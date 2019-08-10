import { Injectable } from '@angular/core';
const wiki = require('wikijs').default;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor() {}

  URL_SUMMARY_SERVICE = 'https://en.wikipedia.org/w/api.php?action=query';
  OPTIONS_FOR_SUMMARY = '&format=json&origin=*&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600&pilicense=any&titles=';

  HOST_NER_LOCAL = "";
  HOST_NER_REMOTE = "";
  nerChoice = this.HOST_NER_LOCAL;

  URL_NER_SERVICE = this.nerChoice+"/entities";

  HOST_BACKEND_LOCAL = "http://localhost:8080";
  HOST_BACKEND_REMOTE = "";

  backendChoice = this.HOST_BACKEND_LOCAL;

  URL_FIND_PAGE=this.backendChoice+"/api/pages/search?q=";
  URL_CREATE_PAGE=this.backendChoice+"/api/pages";
  URL_CREATE_TAGS;
  URL_GET_TAGS;


  URL_NOTIFICATIONS;

  URL_LIKE_ACTION = this.backendChoice+"/api/users";

  URL_DISLIKE_ACTION = this.backendChoice+"/api/users";


  URL_CREATE_NOTE;
  URL_GET_NOTE;
  URL_EDIT_NOTE;
  URL_DELETE_NOTE;

  PAGE_ID = -1;
  PAGE_BASE_LIKES = -1;
  PAGE_BASE_DISLIKES = -1;


  getReturnData(){return {"id":this.PAGE_ID,"likes":this.PAGE_BASE_LIKES,"dislikes":this.PAGE_BASE_DISLIKES};}

  //PAGES==========================
  findPageExists(title){

    return fetch(this.URL_FIND_PAGE+title)
      .then(response=>response.text())
      .then(response=>{
      if(response.length>0){
        //exists in db
        var jresponse = JSON.parse(response);
        console.log(jresponse);
        this.PAGE_ID = jresponse["id"];
        this.PAGE_BASE_LIKES = jresponse["numberOfLikes"];
        this.PAGE_BASE_DISLIKES = jresponse["numberOfDisLikes"];
        return this.getReturnData();
      }
      else {
        return fetch(this.URL_CREATE_PAGE,{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "title":title,
            "numberOfLikes":0,
            "numberOfDisLikes":0,
            "numberOfViews":1
            })
        }).then(response=>response.json()).then(response=>{

          console.log(response);
          this.PAGE_ID = response["id"];
          this.PAGE_BASE_LIKES = response["numberOfLikes"];
          this.PAGE_BASE_DISLIKES = response["numberOfDisLikes"];
          return this.getReturnData();
          }

        )

      }
    })






  }



  postLike(userId,pageId){

    return fetch(this.URL_LIKE_ACTION+"/"+userId+"/like/"+pageId,{
      method:"PUT",
      mode:"cors",
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response=>response.json());
  }




  postDislike(userId,pageId){

    return fetch(this.URL_DISLIKE_ACTION+"/"+userId+"/dislike/"+pageId,{
      method:"PUT",
      mode:"cors",
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response=>response.json());

  }



  getSummary(title){
    return wiki().page(title).then(page=>page.summary())
  }

  getPageImageURL(title){
    return fetch(this.URL_SUMMARY_SERVICE + this.OPTIONS_FOR_SUMMARY + title)
      .then(resp => resp.json()).then(rj =>
      {
        if(rj.query.pages[0].thumbnail!=null)
        {
        return rj.query.pages[0].thumbnail.source}
      return null});

  }

  getEntities(title,summary){

    return fetch(this.URL_NER_SERVICE,{
      method:"POST",
      mode:"cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "url":title,
        "content":summary})
    }).then(response=>response.json())
  }




}
