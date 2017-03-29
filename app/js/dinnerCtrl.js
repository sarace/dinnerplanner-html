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
  console.log("hej")

  $scope.getDinnerMenu = function() {
    return Dinner.getDinnerMenu();
  }

  $scope.getDishPrice = function(dish) {
    return Dinner.getDishPrice(dish);
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price
 
});