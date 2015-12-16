app.config(function($stateProvider) {
  $stateProvider.state('topicPage', {
    url: '/topic/:id',
    templateUrl: 'js/topic-page/topic-page.html',
    resolve: {
      articles: ($stateParams, ArticlesFactory) =>
        ArticlesFactory.getArticles($stateParams.id).then(data => data.result.docs)
    },
    controller: ($scope, $stateParams, articles) => {
      $scope.topic = $stateParams.id.split('-').join(' ').toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase())
      $scope.articles = articles
      console.log($scope.articles[0])
        // var url = 'https://access.alchemyapi.com/calls/data/GetNews?apikey=85a98a7d4f237f6515c10162ccf221292680e804&return=enriched.url.title,enriched.url.url,enriched.url.author,enriched.url.publicationDate,enriched.url.entities,enriched.url.docSentiment,enriched.url.concepts,enriched.url.taxonomy&start=1442016000&end=1447200000&q.enriched.url.text=donald%20trump&count=1000&outputMode=json'

      // ArticlesFactory.getArticles().then(data => {
      //   $scope.articles = data.result.docs.reverse()
      //   console.log($scope.articles[0])
      //})
    }
  })
});