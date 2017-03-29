// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var numberOfGuest = 2;


  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details


  this.numberOfGuests = 1;
  this.dinnerOptions = [];
  this.resultOfSearch = "Starter";
  this.dishToDisplay = "";
  this.searchFoundValue = '';

  //Lab 3
  this._listeners = [];

  this.attach = function (listener) {
    this._listeners.push(listener);
  };


  this.notify = function (args) {
    for (var i = 0; i < this._listeners.length; i++) {
      //this._listeners[i](this, args);
      this._listeners[i].update(args);
    }

  };

  //in View 4 we want to display the ingredients of the dish that was selected in View3
  this.getDishToDisplay = function () {
    return this.dishToDisplay;
  }

  //in View 3 this tells the view whether we want to see starters, mains or desserts
  this.getSelectedType = function () {
    return this.resultOfSearch;
  };

  this.confirmDinner = function () {
    this.notify("switchToView5")
  };

  this.printDinner = function () {
    this.notify("switchToView6")
  };


  //depending on what we choose is View 3 this updates the variable that stores the starter/ main dish / dessert value
  this.changeSelectedType = function (searchResult) {
    this.resultOfSearch = searchResult;
    this.notify("selectedTypeChanged");

  };

  this.setDisplayDishDetail = function (buttonClicked) {
    currentDishes = this.getAllDishes(this.resultOfSearch);
    this.dishToDisplay = currentDishes[buttonClicked - 1];
    this.notify("switchToView4");
  };

  this.getDisplayDishDetail = function () {
    return (this.dishToDisplay);
  };

  this.searchFoundFunction = function (searchValue) {
    this.searchFoundValue = searchValue;
    this.notify("searchFound");
  };

  this.searchDisplay = function () {
    this.notify("searchDisplay");
  };

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function (type) {
    var ourMenu = this.getFullMenu();
    var selected = [];
    for (var i = 0; i < ourMenu.length; i++) {
      if (ourMenu[i].type === type) {
        selected.push(ourMenu[i])
      }
    }
    return selected;
  };

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function () {
    var ourMenu = this.getDinnerMenu();
    var ourIngredients = [];
    for (var i = 0; i < ourMenu.length; i++) {
      ourIngredients.push(ourMenu[i].ingredients)
    }
    return ourIngredients;
  };

  //Returns the total get of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function () {
    this.totalPrice = 0;
    var guests = this.numberOfGuests;
    var ourIngredients = this.getAllIngredients();
    for (var i = 0; i < ourIngredients.length; i++) {
      for (var j = 0; j < ourIngredients[i].length; j++) {
        this.totalPrice = this.totalPrice + (ourIngredients[i][j].price) * guests;
      }
    }

    return this.totalPrice;
  };

  var ingredients = [];

  this.getDishPrice = function (dish) {
    var totalDishPrice = 0;
    var ingredients = dish.extendedIngredients;
    for (var i = 0; i < ingredients.length; i++) {
      totalDishPrice += ingredients[i].amount;
    }

    return (totalDishPrice);
  
  };
  
  /*  //guests = this.numberOfGuests;
    //console.log(guests);
    console.log(dishID)
    var ourMenu = this.getEveryDish();
    for (var i = 0; i < ourMenu.length; i++) {
      console.log(dishID);
      if (dishID === ourMenu[i].id) {
        console.log("inside if");
        for (var j = 0; j < ourMenu[i].ingredients.length; j++) {
          console.log("adding ingredient");
          this.totalCost = this.totalCost + (ourMenu[i].ingredients[j].price);
          console.log(this.totalCost);

        }
      }
    }
    console.log(this.totalCost);
    return this.totalCost;

  };*/

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.

  dinnerMenu = [];

  this.addDishToMenu = function (dish) {
    console.log(dish);
    dinnerMenu.push(dish);
    console.log(dinnerMenu);
  };

  this.getDinnerMenu = function () {
    return dinnerMenu;
  };


  this.removeDishFromMenu = function (id) {
    var ourMenu = this.getDinnerMenu();
    for (var i = 0; i < ourMenu.length; i++) {
      if (String(ourMenu[i].id) === id) {
        this.dinnerMenu.splice(i, 1);
      }
    }
  };
    

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned
 /* this.getAllDishes = function (type, filter, cb) {
    
    return dishes.filter(function (dish) {
      var found = true;
      if (filter) {
        found = false;
        dish.ingredients.forEach(function (ingredient) {
          if (ingredient.name.indexOf(filter) != -1) {
            found = true;
          }
        });
        if (dish.name.indexOf(filter) != -1) {
          found = true;
        }
      }
      return dish.type == type && found;
    });
  };
*/
/*

  this.callBackAllDishesNew = function(dishes){
    console.log("inside callBackAllDishesNew");
    console.log(dishes);
    return dishes;
  };

 //new getAllDishes function
 /*
  this.getAllDishesNew = function(type, filter, callBack) {
      console.log("inside getalldishesnew")

      $.ajax({
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?type=dessert',
        headers: {
          'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
        },
        success: function (data) {
          console.log("successful ajax call");
          callBack(data.results);
          return callBack(data.results);
        },
        error: function (data) {
          console.log(data)
        }
      })
    return "hello";
  };
  */

/*
  //ajax call
  this.getSpoonacular = function () {
    $.ajax({
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?type=dessert',
      headers: {
        'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
      },
      success: function (data) {
        console.log(data.results);
        return data.results;
      },
      error: function (data) {
        console.log(data)
      }
    })
  };
*/

  //function that returns a dish of specific ID
  /*
  this.getDish = function (id) {
    for(key in dishes){
      if(dishes[key].id == id) {
        return dishes[key];
      }
    }
  };*/

  this.getEveryDish = function(){
    return dishes;
  };

    //function that returns a dish of specific name
  this.getDishByName = function (dishName) {
    for(key in dishes){
      if(dishes[key].name == dishName) {
        return dishes[key];
      }
    }
  };

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