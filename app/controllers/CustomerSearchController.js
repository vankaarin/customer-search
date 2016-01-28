/**
 * Created by vpsmith on 9/29/2015.
 */
app.controller('CustomerSearchController', 'CustomerSearchService', ['$scope', function($scope, CustomerSearchService) {

    $scope.customers = CustomerSearchService.getCustomers(aCustomer);

    $scope.search = function () {
        return customers;
    };
}
])

