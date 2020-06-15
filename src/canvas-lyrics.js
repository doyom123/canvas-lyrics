class CanvasLyrics {
  constructor(player, context, lyrics, width, height) {
    this.player = player;
    this.ctx = context;
    this.lyrics = lyrics;
    this.idx = 0;
    this.widx = 0;
    this.width = width;
    this.height = height;
    this.displayed = false;

    // Check if video element
    if(this.player.nodeName === "VIDEO") {
      console.log("hi");
    }
    // Check if audio alement
    else if (this.player.nodeName === "AUDIO") {
      console.log("audiotype");
    }

    // Check if youtube player
    else if (this.player instanceof YT.Player) {
      console.log("ytplayer");

      // add player state change
    }
    this.ctx.font = "24pt Helvetica";
    this.timer = setInterval(this.update.bind(this), 10);
  }
  
  currentTime() {
    return this.player.currentTime;
  }
  update() {
    console.log('update');
    if(this.type === 'ytplayer') {
      var currTime = this.player.getCurrentTime();
    } else {
      var currTime = this.player.currentTime;
    }
    // var currTime = this.player.getCurrentTime();
    // Display and advance to next word
    if(this.displayed == true &&
         currTime >= this.lyrics[this.idx].words[this.widx] && 
       this.widx < this.lyrics[this.idx].words.length)
    {
        this.clearDisplay();
      this.displayText(this.widx);
      this.widx++;
    }
    // Clear display && advance to next lyric idx
    // Reset word idx to 0
    else if(
        this.displayed == true &&
      currTime >= this.lyrics[this.idx].end) 
   {
        this.clearDisplay();
      this.widx = 0;
      this.displayed = false;
      if(this.idx + 1 < this.lyrics.length)
          this.idx++;
        this.currLine = this.lyrics[this.idx].text;
    }
    // Display lyric line
      else if(
        this.displayed == false &&
        currTime >= this.lyrics[this.idx].start &&
        currTime < this.lyrics[this.idx].end) 
    {
      this.displayed = true;
      this.displayText(-1);
    } 
    // requestAnimationFrame(this.update.bind(this));
  }
  
  displayText(widx) {
    var space = this.ctx.measureText(" ").width;
    var height = this.ctx.measureText("M").width * 1.5;

    // var fs = '#d62d20';
    // var fs = "#FFFFFF";
    var fs = "black"
    // var fs = "#162447";

    var x = 0;
    var y = (this.height*1.6 - height*this.lyrics[this.idx].text.length) / 2;
    var w = 0;
    var display = "scroll";
    // Display Type
    if(typeof lyrics[this.idx].display !== 'undefined') {
      display = lyrics[this.idx].display;
    }
    this.ctx.shadowOffsetX = 1.5;
    this.ctx.shadowOffsetY = 1.5;

    this.ctx.shadowBlur = 3;
    this.ctx.shadowColor = "white";

    if(display == 'scroll') {
      for(let i = 0; i < this.lyrics[this.idx].text.length; i++) {
        // Center line text horizontally
        var lineWidth = this.ctx.measureText(this.lyrics[this.idx].text[i]).width;
        x = (this.width - lineWidth)/2;

        // Center vertically
        
        let line = this.lyrics[this.idx].text[i];
        let splt = line.split(" ");
        let limit = Math.min(widx+1, splt.length);
        for(var j = 0; w < widx+1; j++) {
          this.ctx.fillStyle = fs;
          this.ctx.fillText(splt[j], x, y);
          x += this.ctx.measureText(splt[j]).width + space;
          w++;
          if(j+1 >= splt.length) { 
            j++;
            break;
          }
        }

        for(; j < splt.length; j++) {
          this.ctx.fillStyle = "#0634a400";
          // this.ctx.fillStyle = "black";
          this.ctx.fillText(splt[j], x, y);
          x += this.ctx.measureText(splt[j]).width + space;
          w++;
        }
        y += height
      }      
    }
    else if(display == 'roll') {
      for(let i = 0; i < this.lyrics[this.idx].text.length; i++) {
      // Center line text horizontally
      var lineWidth = this.ctx.measureText(this.lyrics[this.idx].text[i]).width;
      x = (this.width - lineWidth)/2;
      
      let line = this.lyrics[this.idx].text[i];
      let splt = line.split(" ");
      
      for(let j = 0; j < splt.length; j++) {
        if(w == widx) {
          this.ctx.fillStyle = fs;
        } else {
          this.ctx.fillStyle = "#0634a400"; 
          // this.ctx.fillStyle = "black"; 
        }
        this.ctx.fillText(splt[j], x, y);
        x += this.ctx.measureText(splt[j]).width + space;
        w++
      }
      y += height
    }
    }
  }

  clearDisplay() {
      this.ctx.clearRect(0, 0, this.width, this.height);
  }

  reset() {
    this.idx = 0;
    this.displayed = false;
    this.clearDisplay();
    this.widx = 0;
    // var m = this.player.getCurrentTime();
    if(this.type === 'ytplayer') {
      var m = this.player.getCurrentTime();
    } else {
      var m = this.player.currentTime;
    }
    for(let i = 0; i < this.lyrics.length; i++) {
      if(m > this.lyrics[i].end && i+1 < this.lyrics.length) {
        this.idx++;
      }
    }
  }

};