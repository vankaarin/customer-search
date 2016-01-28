'use strict';

/**
 * Created by vpsmith on 9/29/2015.
 */
var app = angular.module('customerSearchApp', ['ui.grid', 'ui.grid.selection','ngCookies'])
   .service('CustomerSearchService', ['$http', '$log', function ($http,$log){

        var urlBase = '/serviceCustomer/v1';

        var customerSearchResults = [{
            madCode: 'OR1',
            accountType: 'P',
            number: '1',
            name: 'Maxo',
            address1:'123 S 5th',
            city:'Portland',
            stateCode: 'OR',
            countryCode: 'US',
            zip6:'97212',
            score:'90',
            shipmentCount:'1000'
        }, {
            madCode: 'OR2',
            accountType: 'F',
            number: '1',
            name: 'Jeff',
            address1:'123 S 4th',
            city:'Portland',
            stateCode: 'OR',
            countryCode: 'US',
            zip6:'97213',
            score:'90',
            shipmentCount:'10'
        }, {
            madCode: 'OR3',
            accountType: 'C',
            number: '1',
            name: 'Bill',
            address1:'123 S 6th',
            city:'Portland',
            stateCode: 'OR',
            countryCode: 'US',
            zip6:'97214',
            score:'90',
            shipmentCount:'100'
        }];

        this.getCustomers = function() {
            $log.debug("calling to get the search customers list");
            return customerSearchResults;
        }
    }])
    .service('StateCountryService', ['$http', '$log', '$cookies', function ($http, $log, $cookies) {

        var urlBase = '/service/v1';

        var stateCountries = [{
            stateCode: 'OR',
            countryCode: 'US',
            id: 'US-OR',
            description: 'Oregon'
        }, {
            stateCode: 'ID',
            countryCode: 'US',
            id: 'US-ID',
            description: 'Idaho'
        }, {
            stateCode: 'CA',
            countryCode: 'US',
            id: 'US-CA',
            description: 'California'
        }];

        this.get = function (){
            //if ($cookies.get('stateList')) {
            //    $log.debug("calling to get the search customers list");
            //    return $cookies.get('stateList');
            //} else {
            //    $log.debug("Pushing states to cookie");
            //    $cookies.put('stateList', stateCountries);
                return stateCountries;

        };

    }])
    .controller('StateCountryController', ['$scope', 'StateCountryService', function($scope, StateCountryService) {

        $scope.selectedStateCountry = null;
        $scope.stateCountries = StateCountryService.get();

        $scope.format = function(aStateCountry) {
            return aStateCountry.description + ', ' + aStateCountry.countryCode;
        };
    }])
    .controller('CustomerSearchController',  ['$scope', '$log', 'CustomerSearchService', '$interval', 'uiGridConstants', function($scope,$log,CustomerSearchService,$interval,uiGridConstants) {

        $scope.customerSearchRequest = {
            accountId: '',
            accountTypes: [],
            name1: '',
            name2: '',
            address:'',
            city:'',
            stateCountry: '',
            zip:''
        };

        $scope.selectAccountType = function(anAccountType) {
            $log.debug("AccountType select :" + anAccountType);

            return $scope.customerSearchRequest.accountTypes && $scope.customerSearchRequest.accountTypes.indexOf(anAccountType) > -1;
        };

        $scope.changeAccountType = function(anAccountType) {
            $log.debug("AccountType change:" + anAccountType);

            if ($scope.customerSearchRequest.accountTypes.indexOf(anAccountType) < 0){
                $scope.customerSearchRequest.accountTypes.push(anAccountType);
            } else {
                $scope.customerSearchRequest.accountTypes.pop(anAccountType);
            }
        };

        $scope.clear = function () {
            $scope.customerSearchRequest = {
                accountId: '',
                accountTypes: [],
                name1: '',
                name2: '',
                address:'',
                city:'',
                stateCountry:'',
                zip:''
            };
            $scope.gridOptions.data = [];
        };

        $scope.search = function () {

            $scope.validateEntry = function(){

            };

            $scope.gridOptions.data = CustomerSearchService.getCustomers();
        };

        $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: false };

        $scope.gridOptions.multiSelect = false;
        $scope.gridOptions.modifierKeysToMultiSelect = false;
        $scope.gridOptions.noUnselect = true;
        $scope.gridOptions.onRegisterApi = function( gridApi ) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected ' + row.isSelected;
                $scope.callMe(row.entity);
            });
        };

        $scope.callMe = function(row)
        {
            $log.debug(row);
        };

        $scope.gridOptions.data = [];

    }]);
