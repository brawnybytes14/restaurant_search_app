import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  searchInput = "";
  cuisine = ""
  sortType = ""

  suggestions = []
  tempRestautants = []
  tempCuisines = []
  
  hasTableBooking = false
  hasOnlineDelivery = false
  constructor(public restaurantProvider: RestaurantService) {
  }

  ngOnInit(){
    this.search();
    this.restaurantProvider.getCuisines().then((resp:any)=>{
      this.restaurantProvider.totalCuisines = resp.total;
      this.restaurantProvider.cuisines = resp.data;
    });

    this.restaurantProvider.getRestaurants().then((resp:any)=>{
      this.restaurantProvider.totalRestaurants = resp.total;
      this.restaurantProvider.restaurants = resp.data;
    });
  }

  getSuggestions() {
    if(!this.searchInput){
      this.suggestions = [];
    }
    if (this.searchInput && this.searchInput.trim() != '') {
      this.tempCuisines = this.restaurantProvider.restaurants.filter((item) => {
        return (item.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1);
      })
      this.tempRestautants = this.restaurantProvider.cuisines.filter((item) => {
        return (item.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1);
      })
      this.suggestions = this.tempCuisines.concat(this.tempRestautants)
    }
    this.suggestions = this.suggestions.slice(0, 5)
  }

  reset(){
    this.cuisine = "";
    this.hasOnlineDelivery = false;
    this.hasTableBooking = false;
    this.sortType = ""
    this.suggestions = []
  }

  search(){
    var req = { 
      searchValue: this.searchInput,
      hasOnlineDelivery: this.hasOnlineDelivery,
      hasTableBooking: this.hasTableBooking,
      cuisine: this.cuisine,
      sortType: this.sortType
    }
    this.restaurantProvider.search(req);
  }

  onSearch(){
    this.reset();
    this.search();
  }

  OnReset(){
    this.searchInput = "";
    this.reset();
    this.search();
  }

  onCuisine(cuisine){
    this.cuisine = cuisine;
    this.search()
  }

  sortBy(sortType){
    this.sortType = sortType;
    this.search();
  }
}
