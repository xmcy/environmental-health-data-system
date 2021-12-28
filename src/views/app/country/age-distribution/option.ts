let option: any = {
    color: ["#E24246", "#EE8B34", "#F8D748", "#B3E549", "#66DBB0", "#00C8C8", "#66DBB0", "#3E8CEF", "#632ECE", "#EA449A"],
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow"
        }
    },
    legend: {
        textStyle: {
            color: "#fff"
        }
    },
    grid: {
        left: "2%",
        right: "16%",
        top: "9%",
        bottom: "2%",
        containLabel: true
    },
    xAxis: {
        type: "value",
        name: "患病率(%)",
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
