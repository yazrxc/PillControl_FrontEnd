
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-reporte-notificaciones',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    NgChartsModule,
  ],
  templateUrl: './reporte-notificaciones.component.html',
  styleUrls: ['./reporte-notificaciones.component.css']
})
export class ReporteNotificacionesComponent implements OnInit {

  public pieChartLabels: string[] = ['Cumplidas', 'No Cumplidas'];
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [0, 0], // valores iniciales
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.notificacionService.getResumenEstados().subscribe({
      next: (res) => {
        this.pieChartData = {
          labels: this.pieChartLabels,
          datasets: [
            {
              data: [res.cumplidas, res.noCumplidas],
              backgroundColor: ['#4caf50', '#f44336'],
            }
          ]
        };
      },
      error: () => {
        this.pieChartData = {
          labels: this.pieChartLabels,
          datasets: [
            {
              data: [0, 0],
              backgroundColor: ['#e0e0e0', '#e0e0e0'],
            }
          ]
        };
      }
    });
  }

  exportToPDF() {
  const chartElement = document.getElementById('chart-container');

  if (!chartElement) return;

  html2canvas(chartElement).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, imgHeight);
    pdf.save('reporte-notificaciones.pdf');
  });
}
}

