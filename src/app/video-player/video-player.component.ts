import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Hls from 'hls.js';

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

  hls = new Hls();
  nowPlayingMetadata: any;
  nowPlayingAudioList: any[] = [];
  nowPlayingAudio: any;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.channel.currentValue && changes.channel.currentValue.url){
      if(this.hls){
        this.hls.destroy();
        this.hls = new Hls();
        this.hls.attachMedia(this.player.nativeElement);
        this.hls.on(Hls.Events.MEDIA_ATTACHED, ()=>{
          // console.log("video element attached");
          this.hls.loadSource(changes.channel.currentValue.url);
          this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data)=>{
            // console.log(data);  
          });    
        });
      }
      this.nowPlayingMetadata = changes.channel.currentValue;
      
        // this.player.nativeElement.stop()
        // this.nowPlayingAudioList = data.audioTracks;
        // this.player.nativeElement.play();
      
    }
  }

  ngOnInit(): void {
    //Media element attached callback
    

    //Manifest parsed callback
    

    // Error handling
    this.hls.on(Hls.Events.ERROR, (event, data)=>{
      console.log("Error: ", data);
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          this.hls.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          // Nothing to do. HLS streams recover automatically
          break;
        default:
          // this.hls.destroy();
          // this.hls = new Hls;
          // this.hls.attachMedia(this.player.nativeElement);
          // this.hls.loadSource(this.nowPlayingMetadata.url)
          break;
      }
    })
  }

  ngAfterViewInit(): void {
    this.hls.attachMedia(this.player.nativeElement);
  }
}
