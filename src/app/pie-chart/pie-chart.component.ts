import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'node_modules/chart.js'
import { FormControl,FormBuilder, Validators, FormGroup  } from '@angular/forms'
Chart.register(...registerables)

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  
  public chart: any;
  chartdata: any[] = [];

  showPie: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  inputForm: FormGroup = this.fb.group({
    inputOne: new FormControl(null,   Validators.required),
    inputTwo: new FormControl(null, Validators.required)
  });

  onSubmit() {
    let newInputVal: any = 100 - Number(this.inputForm.controls?.['inputOne'].value);
    this.inputForm.controls?.['inputTwo'].setValue(newInputVal);
    this.chartdata.push(this.inputForm.controls?.['inputOne'].value, this.inputForm.controls?.['inputTwo'].value);
    this.createChart();
    this.showPie = true;
  }

  onClickClear() {
    this.inputForm.reset();
    this.showPie = false;
    this.chartdata = [];
  }

  createChart() {
    this.chart = new Chart('myPieChart', {
      type: 'pie',
      data: {
        labels: ['input 1', 'input 2'],
        datasets: [
          {
            label: 'PIE CHART(GRAPH)',
            data: this.chartdata,
            backgroundColor: ['red', 'black']
          }
        ]
      },
      options: {
        aspectRatio: 3.0
      }
    });
  }

}
