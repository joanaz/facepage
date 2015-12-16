app.config(function($stateProvider) {
  $stateProvider.state('summarizedTimeline', {
    url: '/summarized-timeline/:id',
    templateUrl: 'js/summarized-timeline/summarized-timeline.html',
    resolve: {
      summarizedArticles: ($stateParams, ArticlesFactory) => ArticlesFactory.getSummarizedArticles($stateParams.id).then(data => data.docs)
    },
    controller: ($scope, $stateParams, summarizedArticles) => {
      $scope.topic = $stateParams.id.split('-').join(' ').toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase())
      $scope.articles = summarizedArticles
    }
  });

});