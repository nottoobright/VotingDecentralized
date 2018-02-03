/* global Highcharts */
/* global Voting */
/* global getTotalVotes */
// Create the chart

var bjpVotes = parseInt(Voting.result()[0]), congressVotes = parseInt(Voting.result()[1]), aapVotes = parseInt(Voting.result()[2]), notVotedVotes = 0;
var totalVotes = [bjpVotes, congressVotes, aapVotes, notVotedVotes].reduce(getTotalVotes);
function percentVotes(votes) {
  return (votes/totalVotes) * 100;
}
Highcharts.chart('totalVotesBarChart', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Party Wise Result'
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    title: {
      text: 'Total Percentage of Votes'
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: '{point.votes} Votes'
      }
    }
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
  },

  series: [{
    name: 'Parties',
    colorByPoint: true,
    data: [{
      name: 'BJP',
      y: percentVotes(bjpVotes),
      color: 'rgba(74,131,240,0.80)',
      votes: bjpVotes,

    }, {
      name: 'Congress',
      y: percentVotes(congressVotes),
      color: 'rgba(220,71,71,0.80)',
      votes: congressVotes,
    }, {
      name: 'AAP',
      y: percentVotes(aapVotes),
      color: 'rgba(240,190,50,0.80)',
      votes: aapVotes,
    }, {
      name: 'Not Voted',
      y: percentVotes(notVotedVotes),
      color: 'rgba(90,200,90,0.80)',
      votes: notVotedVotes,
    }]
  }],
});
