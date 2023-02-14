import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


function Chart() {
    const options = {
        chart: {
          type: 'bar',
          height : '350rem'
        },
        title: {
          text: 'My Chart'
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
          title: {
            text: 'Fruit eaten'
          }
        },
        series: [{
          name: 'Jane',
          data: [1, 0, 4]
        }, {
          name: 'John',
          data: [5, 7, 3]
        }]
    };
    return (
        <div style={{margin : "5rem"}}>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
      );
}

export default Chart;
  