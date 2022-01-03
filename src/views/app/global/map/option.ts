let option = {
    tooltip: {
        trigger: "item"
    },
    geo: {
        map: "china",
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            areaColor: "rgba(9, 12, 52, 0)",
            borderColor: "rgba(56, 221, 255, 1)"
        },
        emphasis: {
            itemStyle: {
                areaColor: "rgba(35, 70, 81, 1)"
            }
        }
    },
    series: [
        {
            name: "信息热点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
                brushType: "stroke"
            },
            symbol: "pin",
            // symbolSize: function(val: Array<number>) {
            //     return val[2] / 10;
            // },
            symbolSize: [50,50],
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: "#fff",
                        fontSize: 12
                    },
                    formatter(value: any) {
                        return value.data.value[2];
                    }
                }
            },
            itemStyle: {
                color: "rgba(221, 185, 38, 1)"
            },
            emphasis: {
                lable: {
                    show: true
                }
            },
            // "tooltip": {
            //     "formatter": function (params: any) {
            //         return params.name + " : " + params.value[2];
            //     }
            // },
            data: []
        }
    ]
};

export default option;
