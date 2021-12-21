let option: any = {
    textStyle: {
        color: "#3FB0FF"
    },
    color: ["#FFBE46", "#0291FF", "#EE6667", "#FAE300", "#F9854B", "#00D13C", "#E164FF"],
    legend: {
        show: true,
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        top: "2%",
        textStyle: {
            color: "#fff"
        },
        data: []
    },
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
        right: "14%",
        top: "22%",
        bottom: "6%",
        containLabel: true
    },
    xAxis: [
        {
            name: "年龄(岁)",
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