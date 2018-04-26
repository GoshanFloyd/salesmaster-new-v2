import {Component} from '@angular/core';


@Component({
  moduleId: module.id,
  templateUrl: './analytic.main.component.html',
  host: { class: 'grid-row' }
})

export class AnalyticMainComponent {

  public chart = false;

  public CurrentDeals = [
    {
    'title': 'Проект ренен аппаратов',
    'stage': 'Подписание договора',
    'date': '28 марта 2018 года',
    'sum': '3 000 000 тнг'
    },
    {
      'title': 'Проект ренен аппаратов',
      'stage': 'Подписание договора',
      'date': '28 марта 2018 года',
      'sum': '3 000 000 тнг'
    },
    {
      'title': 'Проект ренен аппаратов',
      'stage': 'КП',
      'date': '28 марта 2018 года',
      'sum': '3 000 000 тнг'
    },
    {
      'title': 'Проект по УЗИ',
      'stage': 'Подписание договора',
      'date': '1 апреля 2018 года',
      'sum': '2 100 000 тнг'
    },
    {
      'title': 'Проект тех.обслуживания',
      'stage': 'Просмотр технических заданий',
      'date': '28 января 2018 года',
      'sum': '980 000 тнг'
    },
    {
      'title': 'Проект для КГП на ПХ №1',
      'stage': 'Встреча с ЛПР',
      'date': '28 февраля 2018 года',
      'sum': '500 000 тнг'
    },
    {
      'title': 'Проект по ренген аппаратов',
      'stage': 'Продажа',
      'date': '28 марта 2018 года',
      'sum': '1 000 000 тнг'
    },

  ]

  public data = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
    datasets: [
      {
        label: 'План продаж',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'Фактический план продаж',
        backgroundColor: '#9CCC65',
        borderColor: '#7CB342',
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  }

  constructor () {}

  public showChart() {
    this.chart = !this.chart
  }
}
