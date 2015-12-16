app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/home.html',
    controller: ($scope) => {
      $scope.slides = [{
        image: "http://www.lungyilin.com/myportfolio/wp-content/uploads/2014/08/bbc_world_news_1.jpg",
        text: "yolo"
      }, {
        image: "http://cdn.ahcox.com/wp-ahcox.com/wp-content/uploads/2014/10/P1127242-1920x540-banner-top.jpg",
        text: "yo"
      }, {
        image: "http://www.tatryskiclub.com/styles/default/images/bgd2.jpg",
        text: "lo"
      }]
    }
  });
});