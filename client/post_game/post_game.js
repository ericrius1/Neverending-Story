Template.post_game.show = function() {
  return client.game() && client.game().gameOver;
};

// Template.welcomePage.rendered = function () {
//     addTwitterWidget();
// };
 
// function addTwitterWidget() {
//     !function (d, s, id) {
//         var js, fjs = d.getElementsByTagName(s)[0], 
//             p = /^http:/.test(d.location) ? 'http' : 'https';
//         if (!d.getElementById(id)) {
//             js = d.createElement(s);
//             js.id = id;
//             js.src = p + '://platform.twitter.com/widgets.js';
//             fjs.parentNode.insertBefore(js, fjs);
//         }
//     }(document, 'script', 'twitter-wjs');
// };