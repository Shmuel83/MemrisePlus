//GET http://www.memrise.com/ajax/metrics/learning_streak_graph/
var chartData;
var chart;
var langStorage="en";
function ChartLoad() {

	if(localStorage.getItem('json')==null) {
	//document.write("<p>Vous n'avez pas de données</p>");
	}
	else {
			chartData = JSON.parse(localStorage['json']).attendance_data;
            chart = AmCharts.makeChart("chartdiv", {
                type: "serial",
				"pathToImages": "http://cdn.amcharts.com/lib/3/images/",
                dataProvider: chartData,
                categoryField: "day",
                categoryAxis: {
                    parseDates: true,
                    gridAlpha: 0.15,
                    minorGridEnabled: true,
                    axisColor: "#DADADA"
                },
                valueAxes: [{
                    axisAlpha: 0.2,
                    id: "v1"
                }],
                graphs: [{
                    title: "num_events",
                    id: "g1",
                    valueAxis: "v1",
                    valueField: "num_events",
                    bullet: "round",
                    bulletBorderColor: "#FFFFFF",
                    bulletBorderAlpha: 1,
                    lineThickness: 2,
                    lineColor: "#0352b5",
                    balloonText: "[[category]]<br><b><span style='font-size:14px;'>value: [[value]]</span></b>"
                }],
				titles: [{
					text: chrome.i18n.getMessage('amChartsTitle')
				}],
                chartCursor: {
                    fullWidth:true,
                    cursorAlpha:0.1
                },
                chartScrollbar: {
                    scrollbarHeight: 40,
                    color: "#FFFFFF",
                    autoGridCount: true,
                    graph: "g1"
                },
				

                mouseWheelZoomEnabled:true
            });

            chart.addListener("dataUpdated", zoomChart);


            // this method is called when chart is first inited as we listen for "dataUpdated" event
            function zoomChart() {
                // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
                chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
            }

            // changes cursor mode from pan to select
            function setPanSelect() {
                var chartCursor = chart.chartCursor;

                if (document.getElementById("rb1").checked) {
                    chartCursor.pan = false;
                    chartCursor.zoomable = true;

                } else {
                    chartCursor.pan = true;
                }
                chart.validateNow();
            }
			zoomChart();
	}
}
function UpdateLineChart() {
	if(localStorage['json']) {
		chart.dataProvider = JSON.parse(localStorage['json']).attendance_data;
		chart.language = langStorage;
		chart.validateData();
	}
}
chrome.storage.sync.get({
	Choice_lang: "en"
  }, function(items) {
	// On l'utilise :
		langStorage = items.Choice_lang;
    if ('en' == langStorage)
        chart.language = null;
    else
        chart.language = langStorage;
    chart.validateData();
 }
);
