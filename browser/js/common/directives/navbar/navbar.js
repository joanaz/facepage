app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            scope.items = [{
                label: 'Dashboard',
                state: 'dashboard'
            }]

            // }, {
            //     label: 'Documentation',
            //     state: 'docs'
            // }, {
            //     label: 'Timeline',
            //     state: 'timeline'
            // }, {
            //     label: 'Members Only',
            //     state: 'membersOnly',
            //     auth: true
            // }];

            scope.timelineItems = [{
                label: 'Donald Trump',
                state: 'topicPage({id:"donald-trump"})'
            }, {
                label: 'Paris Attacks',
                state: 'topicPage({id:"paris-attacks"})'
            }];
            scope.summarizedTimelineItems = [{
                label: 'Donald Trump',
                state: 'summarizedTimeline({id:"donald-trump"})'
            }, {
                label: 'Paris Attacks',
                state: 'summarizedTimeline({id:"paris-attacks"})'
            }];

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});