import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {MediaPlayerClass, MediaPlayer} from 'dashjs';
import videojs from 'video.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: [
    './video-player.component.scss'
  ]
})
export class VideoPlayerComponent implements OnInit {
  @Input() channel;
  @ViewChild('player') player: any;
  videoPlayer: videojs.Player;

  options: any = {
    fluid: false,
    aspectRatio: "16:9",
    height: "100%",
    autoplay: true,
    sources: []
  }
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.channel.currentValue && changes.channel.currentValue.url){
      this.options.sources[0] = {src: this.channel.url, type: 'application/x-mpegURL'};
      this.renderVideoPlayer();
    }
  }

  ngOnInit(): void {
    // this.mediaPlayer = MediaPlayer().create();
    // this.mediaPlayer.getDebug().setLogToBrowserConsole(true);
    // console.log("init player class");
    // this.mediaPlayer.initialize(this.player.nativeElement, this.videoUrl, true);
    // if(this.channel && this.channel.url){
    //   this.options.sources.push({src: this.channel.url, type: 'application/x-mpegURL'})
    // }
  }

  ngAfterViewInit(): void {
    if(this.channel && this.channel.url){
      this.videoPlayer = videojs(this.player.nativeElement, this.options, function onPlayerReady(){
        console.log('onPlayerReady', this);      
      });
    }
    
  }

  renderVideoPlayer(){
    if(!this.videoPlayer){
      this.videoPlayer = videojs(this.player.nativeElement, this.options, function onPlayerReady(){
        console.log('onPlayerReady', this);      
      });
    } else {
      this.videoPlayer.src(this.channel.url);
    }
    // const palyer = this.videoPlayer.player();
    
    // console.log(palyer);
    // palyer.selectSource(this.options.sources)
  }
  

}
