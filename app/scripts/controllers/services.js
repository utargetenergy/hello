'use strict';

angular.module('helloApp')
  .controller('ServicesCtrl', function ($scope, $http, Page) {
  Page.setTitle("Services");
  $scope.filter = {"filter_id": 0, "filter_name": "all"}; 
  $scope.selected = 0; 
  $http.get('https://utargetenergy.github.io/services.md').then(function(response) {
    $scope.p1 = response.data;
  });

  $scope.filterList = [
        {"id": 0, "name": "all",      "text": "Everything"},
        {"id": 1, "name": "gobt",    "text": "GOBT"},
        {"id": 2, "name": "pulser",  "text": "Pulser"},
        {"id": 3, "name": "engineering", "text": "Engineering"},
        {"id": 4, "name": "decoder", "text": "Decoder"},
 ];  
 $scope.itemList = [
        {"id": "0", "title": "GOBT",    "p": "Accurate Inc. Measurement",   "img": "slide9765_image082.jpg", "filter": "gobt"},
        {"id": "1","title": "GOBT",    "p": "Accurate Azimuth Measurement",   "img": "slide9765_image085.jpg","filter": "gobt"},
        {"id": "2","title": "Pulser",  "p": "Special Rotor Design",   "img": "slide9765_image086.jpg","filter": "pulser"},
        {"id": "3","title": "Engineering",  "p": "Axial and Lateral Vibration, Stick/Slip and RPM",  "img": "slide9765_image087.jpg", "filter": "engineering"},
        {"id": "4","title": "Engineering",  "p": "Anual Pressure and Bore Pressure",   "img": "slide9765_image088.jpg","filter": "engineering"},
        {"id": "5","title": "Decoding",  "p": "Advanced Noise Algorithm", "img": "DSC_0335.jpg",  "filter": "decoder" },
 ] ; 
 $scope.setFilter= function(item) {
        $scope.filter.filter_id = item.id;
        $scope.filter.filter_name = item.name;
        console.log("current filter: " + $scope.filter.filter_name);
  }
 $scope.checkFilter = function (item) {
    return item.name == $scope.filter.filter_name;
 }   

 $scope.isFilter = function (item) {
    console.log("item filt: " + item.filter + "current filter: " + $scope.filter.filter_name);
    return item.filter== $scope.filter.filter_name;
 }   
 $scope.getClass = function(item) {
    console.log("itemClass: " + item.filter);
    return item.filter;
 }


 $scope.setSelected = function(index) {
		$scope.selected = index;
		console.log($scope.selected);
  }
/*  $scope.isActive = function(name) {
        var i = $scope.selected;
        console.log("isActive: selected " + i + " name:" + name);
        return $scope.itemList[i].filter == name;
  }   */
  $scope.setStyle = function(item) {
        var b =  $scope.isFilter(item);
        if(b == true || $scope.filter.filter_name == "all") {
            console.log("inline item ", item.p);
            return {display: 'inline-block'};
        }
        return {display: 'none'};
  }
$scope.doParseToJson = function(style){
   return JSON.parse(style);
}
});
