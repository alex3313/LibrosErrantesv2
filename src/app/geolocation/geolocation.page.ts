import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit, AfterViewInit {
  userLocation!: { lat: number, lng: number };
  map!: L.Map;

  constructor() { }

  ngOnInit() {
    this.getUserLocation();
  }

  ngAfterViewInit() {
  }

  async getUserLocation() {
    const coordinates = await Geolocation['getCurrentPosition']();
    this.userLocation = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
    console.log('User Location:', this.userLocation);

    this.initializeMap();
  }

  initializeMap() {
    this.map = L.map('map').setView([this.userLocation.lat, this.userLocation.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([this.userLocation.lat, this.userLocation.lng]).addTo(this.map)
      .bindPopup('You are here!')
      .openPopup();
  }
}