import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './services/apiservice.service';
import { parse, Playlist } from 'iptv-playlist-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  playlistUrl: string = "";
  selectedChannel: any = {};

  constructor(private apiService: ApiserviceService){}

  ngOnInit(){
    
  }

  addPlaylist(url: string){
    this.playlistUrl = url;
  }

  handleChannelSelect(channel: any){
    this.selectedChannel = channel;
  }
}
