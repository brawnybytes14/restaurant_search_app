import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  searchResults = [];
  totalItems = 0;

  cuisines = [];
  totalCuisines = 0;

  restaurants = [];
  totalRestaurants = 0
  constructor(public http:HttpClient) {    
  }

  search(req) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.hostIpAddress}/search`, req).subscribe((resp: any) => {
        if (resp.status == true) {
          this.searchResults = resp.data;
          this.totalItems = resp.total;
          resolve(resp);
        }
        else {
          reject();
        }
      });
    });
  }

  getUnique(data) {  
    var result = data.filter((value, index) => data.indexOf(value) === index);
    return result;
  }

  getCuisines() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.hostIpAddress}/getCuisines`).subscribe((resp: any) => {
        if (resp.status == true) {
          resp.data = this.getUnique(resp.data)
          resolve(resp);
        }
        else {
          reject();
        }
      });
    });
  }

  getRestaurants() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.hostIpAddress}/getRestaurants`).subscribe((resp: any) => {
        if (resp.status == true) {
          resolve(resp);
        }
        else {
          reject();
        }
      });
    });
  }
}
