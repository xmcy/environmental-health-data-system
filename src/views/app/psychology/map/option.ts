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
            "name": "信息热点",
            "type": "effectScatter",
            "coordinateSystem": "geo",
            "zlevel": 2,
            "rippleEffect": {
                "brushType": "stroke"
            },
            "symbolSize": function (val: Array<number>) { return val[2] / 10; },
            "label": {
                show: false,
                "formatter": "{b}",
                "position": "right"
                // "color": "rgb(255, 230, 73)"
            },
            "itemStyle": {
                "color": "rgba(221, 185, 38, 0.9)"
            },
            "emphasis": {
                "lable": {
                    show: true
                }
            },
            // "tooltip": {
            //     "formatter": function (params: any) {
            //         return params.name + " : " + params.value[2];
            //     }
            // },
            "data": []
        }
    ]
};

export default option;
