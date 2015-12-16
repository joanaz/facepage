app.factory('ArticlesFactory', function($http) {
  return {
    getArticles: (id) => {
      if (id === "donald-trump") {
        return $http.get('DonaldTrump_20151110.json').then(res => res.data)
      } else if (id === "paris-attacks") {
        return $http.get('Paris_20151113.json').then(res => res.data)
      }
    },
    getSummarizedArticles: (id) => {
      if (id === "donald-trump") {
        return $http.get('summarizedTrump.json').then(res => res.data)
      } else if (id === "paris-attacks") {
        return $http.get('summarizedParis.json').then(res => res.data)
      }
    },
    getBrowsingHistory: () => $http.get('/api/history/').then(res => res.data)
  }
})