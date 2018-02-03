//Integrate ethereum blockchain with web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

let VotingContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [
            {
                "name": "state",
                "type": "string"
            }
        ],
        "name": "getStateResult",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "result",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "party",
                "type": "string"
            },
            {
                "name": "state",
                "type": "string"
            },
            {
                "name": "number",
                "type": "uint256"
            }
        ],
        "name": "dummyData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            },
            {
                "name": "party",
                "type": "string"
            },
            {
                "name": "state",
                "type": "string"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getTotalVotes",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "a",
                "type": "string"
            },
            {
                "name": "b",
                "type": "string"
            }
        ],
        "name": "compareStrings",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]);

let Voting = VotingContract.at('0x5d66754f2ee0cd9e3ac8b416db526f2170a6c2ae');

console.log(Voting);

/* global Highcharts */
  Highcharts.seriesType('mappie', 'pie', {
    center: null, // Can't be array by default anymore
    clip: true, // For map navigation
    states: {
      hover: {
        halo: {
          size: 5
        }
      }
    },
    dataLabels: {
      enabled: false
    }
  }, {
    getCenter: function () {
      var options = this.options,
        chart = this.chart,
        slicingRoom = 2 * (options.slicedOffset || 0);
      if (!options.center) {
        options.center = [null, null]; // Do the default here instead
      }
      // Handlelat/lon support
      if (options.center.lat !== undefined) {
        var point = chart.fromLatLonToPoint(options.center);
        options.center = [
          chart.xAxis[0].toPixels(point.x, true),
          chart.yAxis[0].toPixels(point.y, true)
        ];
      }
      // Handle dynamic size
      if (options.sizeFormatter) {
        options.size = options.sizeFormatter.call(this);
      }
      // Call parent function
      var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
      // Must correct for slicing room to get exact pixel pos
      result[0] -= slicingRoom;
      result[1] -= slicingRoom;
      return result;
    },
    translate: function (p) {
      this.options.center = this.userOptions.center;
      this.center = this.getCenter();
      return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
    }
  });

function getTotalVotes(total, votes) {
  return total + votes;
}
function populateData(stateName, bjpVotes, congressVotes, aapVotes, notVotedVotes){
  var votes = [bjpVotes, congressVotes, aapVotes, notVotedVotes];
  var winner = votes.indexOf(Math.max(...votes));
  var winnerMap = [-1,1,2,3]
  var sumVotes = votes.reduce(getTotalVotes);
  var stateVotes = [stateName, ...votes, sumVotes, winnerMap[winner], -1];
  return stateVotes;
}
var stateNames = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttaranchal","Uttar Pradesh","West Bengal"]
var data = [
  // state, bjpVotes, congressVotes, aapVotes, notVotedVotes, sumVotes, winner, offset config for pies
];


// tempVoted.map(function(data){
//     // console.log(data[0]);
//     // console.log(data[1]);
//     // console.log(data[2]);
//     // console.log(data[3]);
//
//     // Voting.dummyData("bjp",data[0],parseInt(data[0]));
//     // Voting.dummyData("cong",data[0],parseInt(data[1]));
//     // Voting.dummyData("aap",stateName,parseInt(data[2]));
// })



stateNames.map(function(stateName) {
  var bjp =parseInt(Voting.getStateResult(stateName)[0].toString());
    var cong = parseInt(Voting.getStateResult(stateName)[1].toString());
    var aap = parseInt(Voting.getStateResult(stateName)[2].toString());
  data.push(populateData(stateName,bjp,cong,aap,0 ))
  // tempVoted.push([stateName, Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100)])
});


var maxVotes = 0,
  bjpColor = 'rgba(74,131,240,0.80)',
  congressColor = 'rgba(220,71,71,0.80)',
  aapColor = 'rgba(240,190,50,0.80)',
  notVotedColor = 'rgba(90,200,90,0.80)';


// Compute max votes to find relative sizes of bubbles
Highcharts.each(data, function (row) {
  maxVotes = Math.max(maxVotes, row[5]);
});

// Build the chart
var chart = Highcharts.mapChart('container', {
  title: {
    text: 'State Wise Result'
  },

  chart: {
    animation: false // Disable animation, especially for zooming
  },

  colorAxis: {
    dataClasses: [{
      from: -1,
      to: 0,
      color: bjpColor,
      name: 'BJP'
    }, {
      from: 0,
      to: 1,
      color: congressColor,
      name: 'Congress'
    }, {
      from: 2,
      to: 3,
      name: 'AAP',
      color: aapColor
    }, {
      from: 3,
      to: 4,
      name: 'Not Voted',
      color: notVotedColor
    }]
  },

  mapNavigation: {
    enabled: true
  },
  // Limit zoom range
  yAxis: {
    minRange: 2300
  },

  tooltip: {
    useHTML: true
  },

  // Default options for the pies
  plotOptions: {
    mappie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      tooltip: {
        headerFormat: ''
      }
    }
  },

  series: [{
    mapData: Highcharts.maps['countries/in/in-all'],
    data: data,
    name: 'States',
    borderColor: '#FFF',
    showInLegend: false,
    joinBy: ['name', 'id'],
    keys: ['id', 'bjpVotes', 'congressVotes', 'aapVotes', 'notVotedVotes',
      'sumVotes', 'value', 'pieOffset'],
    tooltip: {
      headerFormat: '',
      pointFormatter: function () {
        var hoverVotes = this.hoverVotes; // Used by pie only
        return '<b>' + this.id + ' votes</b><br/>' +
          Highcharts.map([
            ['BJP', this.bjpVotes, bjpColor],
            ['Congress', this.congressVotes, congressColor],
            ['AAP', this.aapVotes, aapColor],
            ['Not Voted', this.notVotedVotes, notVotedColor]
          ].sort(function (a, b) {
            return b[1] - a[1]; // Sort tooltip by most votes
          }), function (line) {
            return '<span style="color:' + line[2] +
              // Colorized bullet
              '">\u25CF</span> ' +
              // Party and votes
              (line[0] === hoverVotes ? '<b>' : '') +
              line[0] + ': ' +
              Highcharts.numberFormat(line[1], 0) +
              (line[0] === hoverVotes ? '</b>' : '') +
              '<br/>';
          }).join('') +
          '<hr/>Total: ' + Highcharts.numberFormat(this.sumVotes, 0);
      }
    }
  }, {
    name: 'Separators',
    type: 'mapline',
    data: Highcharts.geojson(Highcharts.maps['countries/in/in-all'], 'mapline'),
    color: '#707070',
    showInLegend: false,
    enableMouseTracking: false
  }, {
    name: 'Connectors',
    type: 'mapline',
    color: 'rgba(130, 130, 130, 0.5)',
    zIndex: 5,
    showInLegend: false,
    enableMouseTracking: false
  }]
});

// When clicking legend items, also toggle connectors and pies
Highcharts.each(chart.legend.allItems, function (item) {
  var old = item.setVisible;
  item.setVisible = function () {
    var legendItem = this;
    old.call(legendItem);
    Highcharts.each(chart.series[0].points, function (point) {
      if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
        // Find this state's pie and set visibility
        Highcharts.find(chart.series, function (item) {
          return item.name === point.id;
        }).setVisible(legendItem.visible, false);
        // Do the same for the connector point if it exists
        var connector = Highcharts.find(chart.series[2].points, function (item) {
          return item.name === point.id;
        });
        if (connector) {
          connector.setVisible(legendItem.visible, false);
        }
      }
    });
    chart.redraw();
  };
});

// Add the pies after chart load, optionally with offset and connectors
Highcharts.each(chart.series[0].points, function (state) {
  if (!state.id) {
    return; // Skip points with no data, if any
  }

  var pieOffset = state.pieOffset || {},
    centerLat = parseFloat(state.properties.latitude),
    centerLon = parseFloat(state.properties.longitude);

  // Add the pie for this state
  chart.addSeries({
    type: 'mappie',
    name: state.id,
    zIndex: 6, // Keep pies above connector lines
    sizeFormatter: function () {
      var yAxis = this.chart.yAxis[0],
        zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
        (yAxis.max - yAxis.min);
      return Math.max(
        this.chart.chartWidth / 45 * zoomFactor, // Min size
        this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
      );
    },
    tooltip: {
      // Use the state tooltip for the pies as well
      pointFormatter: function () {
        return state.series.tooltipOptions.pointFormatter.call({
          id: state.id,
          hoverVotes: this.name,
          bjpVotes: state.bjpVotes,
          congressVotes: state.congressVotes,
          aapVotes: state.aapVotes,
          notVotedVotes: state.notVotedVotes,
          sumVotes: state.sumVotes
        });
      }
    },
    data: [{
      name: 'BJP',
      y: state.bjpVotes,
      color: bjpColor
    }, {
      name: 'Congress',
      y: state.congressVotes,
      color: congressColor
    }, {
      name: 'AAP',
      y: state.aapVotes,
      color: aapColor
    }, {
      name: 'Not Voted',
      y: state.notVotedVotes,
      color: notVotedColor
    }],
    center: {
      lat: centerLat + (pieOffset.lat || 0),
      lon: centerLon + (pieOffset.lon || 0)
    }
  }, false);

  // Draw connector to state center if the pie has been offset
  if (pieOffset.drawConnector !== false) {
    var centerPoint = chart.fromLatLonToPoint({
      lat: centerLat,
      lon: centerLon
    }),
      offsetPoint = chart.fromLatLonToPoint({
        lat: centerLat + (pieOffset.lat || 0),
        lon: centerLon + (pieOffset.lon || 0)
      });
    chart.series[2].addPoint({
      name: state.id,
      path: 'M' + offsetPoint.x + ' ' + offsetPoint.y +
      'L' + centerPoint.x + ' ' + centerPoint.y
    }, false);
  }
});
// Only redraw once all pies and connectors have been added
chart.redraw();
