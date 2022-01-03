let bgOption: any = {
    tooltip: {
        trigger: "item"
    },
    legend: {
        show: false
    },
    grid: {
        top: "8%",
        bottom: "14%",
        right: "6%"
    },
    xAxis: {
        data: [],
        axisLine: {
            lineStyle: {
                color: "rgba(34, 80, 131, 0.8)"
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            interval: 0,
            textStyle: {
                color: "#fff",
                fontSize: 12
            },
            formatter: function(value: string) {
                let str: string = value.length > 4 ? value.slice(0, 3) + "..." : value;
                return str;
            }
        }
    },
    yAxis: [
        {
            nameGap: 0,
            nameTextStyle: {
                color: "#fff",
                padding: [0, 0, 0, -34]
            },
            splitLine: { show: false },
            axisLine: {
                lineStyle: {
                    color: "rgba(34, 80, 131, 0.8)"
                }
            },
            axisLabel: {
                show: false,
                formatter: "{value}",
                color: "#fff",
                padding: [0, 0, -24, 0]
            },
            axisTick: {
                show: false
            }
        }
    ],
    series: []
};
export default bgOption;
