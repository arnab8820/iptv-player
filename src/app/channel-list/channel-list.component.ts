import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { parse, Playlist } from 'iptv-playlist-parser';
import { ApiserviceService } from '../services/apiservice.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit {
  @Input() playlistUrl;
  @Output() channelSelect = new EventEmitter<any>();
  filteredList: string[] = [];
  playlist: Playlist;
  allChannels: any[] = [];
  filteredChannels: any[] = [];
  constructor(private apiService: ApiserviceService, private storageService: StorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.playlistUrl && changes.playlistUrl.currentValue !== ""){
      this.populatePlaylist(changes.playlistUrl.currentValue);
      this.storageService.setPlaylistUrl(changes.playlistUrl.currentValue);
    }
  }

  ngOnInit(): void {
    if(this.storageService.getPlaylistUrl()){
      this.populatePlaylist(this.storageService.getPlaylistUrl());
    }
  }

  populatePlaylist(url){
    this.apiService.getData(url, {responseType: "application/mpegurl"}).subscribe((data: any)=>{
      const result = parse(data);
      this.playlist = result;
      this.allChannels = this.playlist.items;
      this.filteredChannels = this.playlist.items;
      console.log(result);
      this.filteredList = [];
      this.allChannels.map((item: any)=>{
        if(!this.filteredList.includes(item.group.title)){
          this.filteredList.push(item.group.title);
        }
      });
    });
  }

  handleClick(channel: any){
    this.channelSelect.emit(channel);
  }

  handleFilter(filter: any){
    console.log(filter.target.value);
    if(filter.target.value === 'all'){
      this.filteredChannels = this.allChannels;
    } else {
      this.filteredChannels = this.allChannels.filter(item=>item.group.title===filter.target.value);
    }
  }

}
