// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.menu = Dinner.getDinnerMenu();

  $scope.getDinnerMenu = function(dish) {
    return Dinner.getDinnerMenu(dish);
  }

  $scope.getDishPrice = function(dish) {
    return Dinner.getDishPrice(dish);
  }

  $scope.getTotalMenuPrice = function () {
    return Dinner.getTotalMenuPrice();
  }

  $scope.deleteDish = function (dish) {
    return Dinner.deleteDish(dish);
  }

//  $scope.cookies = Dinner.getCookieMenu();

//  $scope.getCookieMenu = function(dish) {
//  return Dinner.getCookieMenu(dish);
// }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price
 
});