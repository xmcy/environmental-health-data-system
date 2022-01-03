let option: any = {
    tooltip: {
        show: true
    },
    dataZoom: [
        {
            yAxisIndex: 0,
            type: "inside",
            startValue: 1,
            endValue: 5
        }
    ],
    grid: {
        containLabel: true,
        left: 10,
        right: 0,
        top: "8%",
        bottom: -20
    },
    xAxis: [
        {
            show: false,
            type: "value",
            position: "bottom"
        }
    ],
    yAxis: [
        {
            type: "category",
            data: [],
            inverse: true,
            axisTick: {
                show: false,
                alignWithLabel: true
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: false
            }
        }
    ],
    series: [
        {
            name: "bg",
            type: "bar",
            barWidth: 14,
            barGap: "-100%",
            data: [100, 100, 100, 100, 100],
            itemStyle: {
                borderRadius: [0, 50, 50, 0],
                color: "#363636"
            }
        },
        {
            type: "bar",
            barWidth: 14,
            barGap: "-100%",
            data: [],
            z: 12,
            itemStyle: {
                borderRadius: [0, 50, 50, 0],
                color: {
                    colorStops: [
                        {
                            offset: 0,
                            color: "rgba(76, 131, 255, 1)"
                        },
                        {
                            offset: 1,
                            color: "rgba(42, 250, 223, 1)"
                        }
                    ],
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    type: "linear",
                    global: false
                }
            },
            label: {
                show: true,
                fontSize: "14",
                fontFamily: "auto",
                fontWeight: "normal",
                color: "#fff",
                position: [0, -20],
                formatter: ["{top|{b}}", "{text|{c}%}"].join(""),
                rich: {
                    top: {
                        width: 420,
                        padding: [0, 10, 0, 0],
                        color: "rgba(63, 176, 255, 1)",
                        fontWeight: "normal",
                        fontFamily: "auto",
                        fontSize: "14"
                    },
                    text: {
                        float: "right",
                        color: "rgba(255, 188, 19, 1)",
                        fontWeight: 600,
                        fontFamily: "auto",
                        fontSize: "14"
                    }
                }
            }
        }
    ]
};

export default option;
