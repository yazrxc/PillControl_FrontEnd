import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Farmacia } from '../../../models/farmacia';
import { FarmaciaService } from '../../../services/farmacia.service';
import { GeolocationService } from '../../../services/geolocation.service';  // Importamos el servicio
import { MatCardModule } from '@angular/material/card';  // Importa el MatCardModule
import * as L from 'leaflet';  // Importamos Leaflet.js
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  // Importar el servicio DomSanitizer
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarfarmacia',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule
  ],
  templateUrl: './listarfarmacia.component.html',
  styleUrls: ['./listarfarmacia.component.css']
})
export class ListarfarmaciaComponent implements OnInit, AfterViewInit {
  
  // Definimos la dataSource que contendrá las farmacias
  dataSource: MatTableDataSource<Farmacia> = new MatTableDataSource();  // Contenedor de farmacias
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Referencia al paginator
  
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];

  constructor(private fS: FarmaciaService) {}

  ngOnInit(): void {
    // Cargar las farmacias desde el servicio
    this.fS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      // Inicializamos el paginador aquí para asegurar que los datos estén listos
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit(): void {
    // Asegurémonos de que este código solo se ejecute en el navegador
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        // Inicializamos el mapa para cada farmacia
        this.dataSource.data.forEach(farmacia => {
          const lat = parseFloat(farmacia.latitudFarmacia.toString());
          const lng = parseFloat(farmacia.longitudFarmacia.toString());
          this.initMap(lat, lng, farmacia.nombreFarmacia, farmacia.idFarmacia, L);
        });
      });
    }
  }

  // Método para inicializar el mapa
  initMap(lat: number, lng: number, nombreFarmacia: string, farmaciaId: number, L: any): void {
    // Usamos un identificador único para cada mapa
    const mapContainerId = `map-container-${farmaciaId}`;
    const mapContainer = document.getElementById(mapContainerId);

    if (mapContainer) {
      const map = L.map(mapContainer).setView([lat, lng], 17);

      // Añadimos el tile layer de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const redIcon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      // Mostramos el nombre de la farmacia y las coordenadas en el popup
      L.marker([lat, lng], { icon: redIcon })
        .addTo(map)
        .bindPopup(`<b>${nombreFarmacia}</b><br>Lat: ${lat}, Lng: ${lng}`)
        .openPopup();
    }
  }

  // Método para eliminar una farmacia
  eliminar(id: number): void {
    this.fS.deleteA(id).subscribe(() => {
      this.fS.list().subscribe(data => {
        this.fS.setList(data);
      });
    });
  }
}
