let option: any = {
    textStyle: {
        color: "#3FB0FF"
    },
    color: ["#00DFFF", "#6BD98D", "#0291FF", "#FAE300", "#F9854B", "#00D13C", "#E164FF"],
    legend: {
        show: true,
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        top: "87%",
        textStyle: {
            color: "#fff"
        },
        data: []
    },
    // tooltip: {
    //     show: true
    // },
    tooltip: {
        trigger: "axis",
        backgroundColor: "#303750",
        borderColor: "#FAE300",
        textStyle: {
            color: "#fff"
        },
        axisPointer: {
            type: "shadow",
            crossStyle: {
                color: "#999"
            },
            label: {
                color: "#fff"
            }
        }
    },
    grid: {
        left: "3%",
        right: "5%",
        top: "12%",
        bottom: "16%",
        containLabel: true
    },
    xAxis: [
        {
            boundaryGap: false,
            type: "category",
            data: [],
            axisLine: {
                show: false,
                lineStyle: {
                    color: "rgba(34, 80, 131, 0.8)"
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: "rgba(34, 80, 131, 0.3)"
                }
            },
            axisTick: {
                alignWithLabel: false
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            name: "患病率(%)",
            axisLine: {
                show: false,
                lineStyle: {
                    color: "rgba(34, 80, 131, 0.8)"
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "rgba(34, 80, 131, 0.3)"
                }
            },
            axisTick: {
                show: false
            }
        }
    ],
    series: []
};

export default option;
