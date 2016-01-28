/**
 * Created by vpsmith on 9/29/2015.
 */
app.controller('StateCountryController', ['$scope', function($scope, stateCountryService) {

        $scope.selectedStateCountry = null;
        $scope.stateCountries = stateCountryService.get();

        $scope.format = function(aStateCountry) {
            return aStateCountry.description + ', ' + aStateCountry.countryCode;
        };
    }
    ]);
