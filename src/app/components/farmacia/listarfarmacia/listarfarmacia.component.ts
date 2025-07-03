import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Farmacia } from '../../../models/farmacia';
import { FarmaciaService } from '../../../services/farmacia.service';
import { GeolocationService } from '../../../services/geolocation.service';  // Importamos el servicio
import { MatCardModule } from '@angular/material/card';  // Importa el MatCardModule
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  // Importar el servicio DomSanitizer

@Component({
  selector: 'app-listarfarmacia',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './listarfarmacia.component.html',
  styleUrls: ['./listarfarmacia.component.css']
})
export class ListarfarmaciaComponent implements OnInit {
  dataSource: MatTableDataSource<Farmacia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];

  constructor(
    private fS: FarmaciaService,
    private geoService: GeolocationService,
    private sanitizer: DomSanitizer  // Inyectamos el servicio DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.data.forEach(farmacia => {
        const lat = parseFloat(farmacia.latitudFarmacia.toString());
        const lng = parseFloat(farmacia.longitudFarmacia.toString());

        // Generamos la URL del mapa
        farmacia.mapUrl = this.generateMapUrl(lat, lng);
        
        // Llamamos al método para obtener la dirección
        this.getLocation(lat, lng, farmacia);
      });
    });
  }

  // Método para generar la URL del mapa
  generateMapUrl(lat: number, lng: number): string {
    const latOffset = 0.01;
    const lngOffset = 0.01;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - lngOffset}%2C${lat - latOffset}%2C${lng + lngOffset}%2C${lat + latOffset}&layer=mapnik`;
  }

  // Llamamos al servicio para obtener la ubicación a partir de coordenadas
  getLocation(lat: number, lng: number, farmacia: Farmacia): void {
    this.geoService.getLocationFromCoordinates(lat, lng).subscribe(response => {
      if (response.results && response.results.length > 0) {
        // Asignamos la dirección obtenida de la API al objeto farmacia
        farmacia.direccionFarmacia = response.results[0].formatted_address;
      }
    });
  }

  // Método para sanitizar la URL del mapa
  safeMapUrl(mapUrl: string | undefined): SafeResourceUrl {
    // Si mapUrl es undefined, usamos una URL por defecto
    const url = mapUrl || 'https://www.openstreetmap.org/export/embed.html?bbox=-118.32%2C34.12%2C-118.29%2C34.14&layer=mapnik';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);  // Sanitizamos la URL
  }

  eliminar(id: number): void {
    this.fS.deleteA(id).subscribe(() => {
      this.fS.list().subscribe(data => {
        this.fS.setList(data);
      });
    });
  }
}
