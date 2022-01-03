let option: any = {
    color: ["#C1532B", "#C08A28", "#C2B728", "#5DB24D", "#269158", "#30AD8A", "#31A2A4", "#1C7CAB", "#1F88BA", "#1156A2"],
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow"
        }
    },
    legend: {
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: "#fff"
        }
    },
    grid: {
        left: "2%",
        right: "16%",
        top: "10%",
        bottom: "2%",
        containLabel: true
    },
    xAxis: {
        type: "value",
        name: "患病率(%)",
        nameTextStyle: {
            padding: [0, 0, 0, -10]
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "#00A1FF"
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
        },
        data: []
    },
    yAxis: {
        type: "category",
        axisLine: {
            show: true,
            lineStyle: {
                color: "#00A1FF"
            }
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: "rgba(34, 80, 131, 0.3)"
            }
        },
        axisTick: {
            show: false
        },
        data: []
    },
    series: []
};

export default option;
