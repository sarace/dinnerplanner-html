// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource,$cookieStore) {
  


  var dinnerMenu = [];
  var savedCookies = [];
  var allCookieID = $cookieStore.get("savedCookies");
  if (allCookieID == undefined) {
    allCookieID = [];
  }

  
  console.log(allCookieID);

  var numberOfGuest = $cookieStore.get("numberOfGuest");

  if (numberOfGuest == undefined) {
    numberOfGuest = 2;
  };

  this.setNumberOfGuests = function(num) {
  numberOfGuest = num;
  this.updateCookieGuests();
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }

  this.updateCookieGuests = function() {
    $cookieStore.put("numberOfGuest", numberOfGuest);
    cookieGuests = $cookieStore.get("numberOfGuest");
  };

  this.updateCookieMenu = function () {
    var savedCookies = this.getCookieMenu();
    $cookieStore.put("savedCookies", savedCookies);
  };

  this.getDishPrice = function (dish) {
    var ingredients = dish.extendedIngredients;
    var totalDishPrice = 0;
    for (var i = 0; i < ingredients.length; i++) {
      totalDishPrice += ingredients[i].amount;
    }

    return totalDishPrice;
  
  };

  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  this.addDishToMenu = function (dish) {
    dinnerMenu.push(dish);
    console.log(dish.id);
    allCookieID.push(dish.id);
    this.updateCookieMenu();
  };

  this.getCookieMenu = function () {
    return allCookieID;
  }

  this.getDinnerMenu = function () {
    return dinnerMenu;
  };

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function () {
    var theMenu = this.getDinnerMenu();
    var ourIngredients = [];
    for (var i = 0; i < theMenu.length; i++) {
      ourIngredients.push(theMenu[i].extendedIngredients)
    }
    return ourIngredients;
  };

  //Returns the total get of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function () {
    var totalPrice = 0;
    var guests = this.getNumberOfGuests();
    var theIngredients = this.getAllIngredients();
    for (var i = 0; i < theIngredients.length; i++) {
      for (var j = 0; j < theIngredients[i].length; j++) {
        totalPrice = totalPrice + (theIngredients[i][j].amount) * guests;
      }
    }

    return totalPrice;
  };

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.

  /*this.removeDishFromMenu = function (id) {
    var ourMenu = this.getDinnerMenu();
    for (var i = 0; i < ourMenu.length; i++) {
      if (String(ourMenu[i].id) === id) {
        this.dinnerMenu.splice(i, 1);
      }
    }
  };*/

//get data
this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
  get: {
    headers: {
      'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    }
  }
});

this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
  get: {
    headers: {
       'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    }
  }
});

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});