import {Injectable, Output, EventEmitter} from '@angular/core';
import { ApexOptions } from 'apexcharts';

@Injectable()
export class ApexChartService {
  @Output() changeTimeRange: EventEmitter<boolean> = new EventEmitter();
  @Output() changeSeriesData: EventEmitter<boolean> = new EventEmitter();
  private chart: ApexCharts | null = null;

  constructor() { }

  eventChangeTimeRange() {
    this.changeTimeRange.emit();
  }

  eventChangeSeriesData() {
    this.changeSeriesData.emit();
  }

  initChart(chart: ApexCharts) {
    this.chart = chart;
  }

  // Méthode pour mettre à jour les options
  updateOptions(options: ApexOptions) {
    if (this.chart) {
      this.chart.updateOptions(options);
    } else {
      console.error('Le graphique n\'est pas initialisé.');
    }
  }
}
