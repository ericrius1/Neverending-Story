var Timer;
var hasStarted = false;
    (function() {
      var marks = 300;
      var degreesPerMark = 360/300;
      
      function getTime() {
        return new Date().getTime();
      }
      
      Timer = function(options) {
        this.$el = $(options.el);
        this.$hand = this.$el.find('.hand');
        this.$overlay = this.$el.find('.overlay');
        this.time = (options.time || 60) * 1000;
      };
      
      Timer.prototype.tick = function() {
        var curTime = getTime();
        
        var elapsed = curTime-this.startTime;
        
        var timePct = elapsed/this.time;
        
        var marks = 300*timePct;
        
        var rotation = marks * degreesPerMark;
        
        // Move the hand
        this.$hand.css('-webkit-transform', 'rotate('+rotation+'deg)');
        
        // Shade the overlay
        if (timePct > 0.80) {
          var overlayOpacity = timePct - 0.5;
          
          this.$overlay.animate({
            opacity: overlayOpacity
          }, 1000);
        }
        
        if (timePct >= 1) {
          return this.stop();
        }
      };
      
      
      Timer.prototype.start = function() {
        this.startTime = getTime();
        this.interval = setInterval(this.tick.bind(this), 1000);
      };
      
      Timer.prototype.stop = function() {
        clearInterval(this.interval);
        
        this.$hand.css('-webkit-transform', 'rotate(0deg)');
        this.$overlay.fadeOut();
      };
      
    }());
  
  Template.stopwatch.start = function(){
    if(hasStarted){
      return;
    }
    //we have added element to dom
    if($('#watch').length > 0 &&  client.timer().clock){
      hasStarted = true;
       var timer = new Timer({
        el: $('#watch'),
        time: client.timer().clock
      });
      timer.start();
    }
    
  }