import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getPlaylistUrl(){
    return window.localStorage['lastPlaylist'];
  }

  setPlaylistUrl(url: string){
    window.localStorage['lastPlaylist'] = url;
  }
}
