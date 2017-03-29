// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case


  $scope.dish = Dinner.Dish.get({id:$routeParams.dishId});
  
  $scope.addDishToMenu = function(dish) {
  	Dinner.addDishToMenu(dish);
  }

  $scope.getNumberOfGuests = function() {
  	return Dinner.getNumberOfGuests();
  }

  $scope.getDishPrice = function(dish) {
  	return Dinner.getDishPrice(dish);
  }


/*
 $scope.dish = "";
  	Dinner.Dish.get({id:$routeParams.dishId}, function(data) {
	  	$scope.dish = data;
	  	console.log(data);
	  	$scope.status = "Showing dish";
	  	}, function(data) {
	  		$scope.status = "There was an error";
	});*/

});