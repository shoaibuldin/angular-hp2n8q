import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  customerId = '166';
  profile = '3176999868870600';

  selectedCampaignType = 'All';
  startDate = '2023-01-01';
  endDate = '2023-01-31';
  campaignTypes = ['All', 'Nimbleads Campaigns', 'Other Campaigns'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onChange();
  }

  onChange() {
    this.http
      .get(
        `https://api.nimbleads.net/detailed_campaign_comparison_data_api?customer_id=${this.customerId}&profile_ids=${this.profile}&start_date=${this.startDate}&end_date=${this.endDate}&fields=all&group_by=date&is_raw=true&report_name=campaign-performance&campaign_type=${this.selectedCampaignType}`
      )
      .subscribe((data: any[]) => {
        this.createLineChart(data);
        this.createStackedBarChart(data);
        this.createPieChart(data);
        this.createBarChart(data);
      });
  }

  lineChart: Chart;
  stackedBarChart: Chart;
  pieChart: Chart;
  barChart: Chart;

  createLineChart(data: any[]) {
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: data.map((d) => d.date),
        datasets: [
          {
            label: 'Cost',
            data: data.map((d) => d.cost),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Sales',
            data: data.map((d) => d.sales),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Conversions',
            data: data.map((d) => d.conversions),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createStackedBarChart(data: any[]) {
    this.stackedBarChart = new Chart('stackedBarChart', {
      type: 'bar',
      data: {
        labels: [...new Set(data.map((d) => d.campaign_name))],
        datasets: [
          {
            label: 'Cost',
            data: [...new Set(data.map((d) => d.campaign_name))].map(
              (campaign_name) => {
                return data
                  .filter((d) => d.campaign_name === campaign_name)
                  .map((d) => d.cost)
                  .reduce((a, b) => a + b, 0);
              }
            ),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Sales',
            data: [...new Set(data.map((d) => d.campaign_name))].map(
              (campaign_name) => {
                return data
                  .filter((d) => d.campaign_name === campaign_name)
                  .map((d) => d.sales)
                  .reduce((a, b) => a + b, 0);
              }
            ),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Conversions',
            data: [...new Set(data.map((d) => d.campaign_name))].map(
              (campaign_name) => {
                return data
                  .filter((d) => d.campaign_name === campaign_name)
                  .map((d) => d.conversions)
                  .reduce((a, b) => a + b, 0);
              }
            ),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'top',
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
  }

  createPieChart(data: any[]) {
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: [...new Set(data.map((d) => d.campaign_type))],
        datasets: [
          {
            data: [...new Set(data.map((d) => d.campaign_type))].map(
              (campaign_type) => {
                return data.filter((d) => d.campaign_type === campaign_type)
                  .length;
              }
            ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createBarChart(data: any[]) {}
}
