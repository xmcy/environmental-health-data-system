let option: any = {
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
                formatter: "{value}",
                color: "#fff",
                padding: [0, 0, -24, 0]
            },
            axisTick: {
                show: false
            }
        }
    ],
    series: [
        // {
        //     name: "",
        //     color: "#FB9A55",
        //     type: "pictorialBar",
        //     barWidth: 20,
        //     symbol: `image://${require("@/assets/images/red.png")}`,
        //     data: []
        // },
        // {
        //     name: "",
        //     color: "#FFBE46",
        //     type: "pictorialBar",
        //     barWidth: 20,
        //     symbol: `image://${require("@/assets/images/yellow.png")}`,
        //     data: []
        // },
        // {
        //     name: "",
        //     color: "#0291FF",
        //     type: "pictorialBar",
        //     barWidth: 20,
        //     barGap: "30%",
        //     symbol: `image://${require("@/assets/images/blue.png")}`,
        //     data: []
        // }
    ]
};
export default option;
