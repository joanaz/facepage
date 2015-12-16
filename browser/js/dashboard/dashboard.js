app.config(function($stateProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'js/dashboard/dashboard.html',
    resolve: {
      browsingHistory: (ArticlesFactory) => ArticlesFactory.getBrowsingHistory()
    },
    controller: ($scope, browsingHistory) => {
      $scope.recommendedArticles = [{
        image: "http://www.slate.com/content/dam/slate/blogs/moneybox/2015/08/16/donald_trump_on_immigration_build_border_fence_make_mexico_pay_for_it/483208412-real-estate-tycoon-donald-trump-flashes-the-thumbs-up.jpg.CROP.promo-xlarge2.jpg",
        title: "Donald Trump counters condemnation with a warning",
        author: "By Eric Bradner, CNN",
        summary: "Washington (CNN)Donald Trump's tweet on Tuesday dangling the idea of an independent run for president sent a clear warning to the Republican establishment: Attack at your own peril.",
        url: "http://www.cnn.com/2015/12/09/politics/donald-trump-republican-party-warning/"
      }, {
        image: "http://media.breitbart.com/media/2015/12/McCaul-Getty-640x480.jpg",
        title: "Homeland Security Chairman Michael McCaul: Hillary Clinton ‘Responsible’ for Islamic State",
        author: "CHARLIE SPIERING",
        summary: "“I would say that she and the president are responsible for ISIS rearing its ugly head,” McCaul said, during a Christian Science Monitor breakfast with reporters in Washington D.C. this morning.",
        url: "http://www.breitbart.com/big-government/2015/12/09/homeland-security-chairman-michael-mccaul-hillary-clinton-responsible-islamic-state/"
      }, {
        image: "http://static01.nyt.com/images/2015/12/09/us/trump/trump-master675.jpg",
        title: "Donald Trump Deflects Withering Fire on Muslim Plan",
        author: "MAGGIE HABERMAN",
        summary: "Repudiated across much of the political spectrum but defended on conservative talk radio, Donald J. Trump on Tuesday stood by his call to block all Muslims from entering the United States. He cast it as a temporary move in response to terrorism and invoked President Franklin D. Roosevelt’s authorization of the detention of Japanese, German and Italian immigrants during World War II as precedent.",
        url: "http://www.nytimes.com/2015/12/09/us/politics/donald-trump-muslims.html?_r=0"
      }, {
        image: "http://i2.cdn.turner.com/cnnnext/dam/assets/151114135354-14-paris-attacks-1114---restricted-exlarge-169.jpg",
        title: "Paris attacks: 'I would have killed him,' Bataclan bomber's father says",
        author: "By Sandrine Amiel, Don Melvin and Catherine E. Shoichet, CNN",
        summary: "Paris (CNN)A shaken father told reporters Wednesday that he never knew his son had returned to France after a stint in Syria.",
        url: "http://www.breitbart.com/big-government/2015/12/09/homeland-security-chairman-michael-mccaul-hillary-clinton-responsible-islamic-state/"
      }]

      $scope.browsingHistory = browsingHistory

    }
  });
});