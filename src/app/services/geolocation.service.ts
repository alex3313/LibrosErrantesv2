import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async getCurrentPosition(): Promise<{ lat: number, lng: number }> {
    const coordinates = await Geolocation['getCurrentPosition']();
    return {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }
} 