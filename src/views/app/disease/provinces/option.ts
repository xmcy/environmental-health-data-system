import echarts from "echarts";

let option: any = {
    tooltip: {
        show: false
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
        top: 10,
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
            data: ["街面秩序", "公共设施", "园林绿化设施", "环境卫生", "宣传广告"],
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
            data: [
                // {
                //     name: "0",
                //     text: "街面秩序",
                //     value: 87.33999999999999,
                //     _g: {
                //         count: 3049,
                //         unit: "个",
                //         rate: 0.8734
                //     }
                // },
                // {
                //     name: "1",
                //     text: "公共设施",
                //     value: 75,
                //     _g: {
                //         count: 1974,
                //         unit: "个",
                //         rate: 0.75
                //     }
                // },
                // {
                //     name: "2",
                //     text: "园林绿化设施",
                //     value: 40,
                //     _g: {
                //         count: 937,
                //         unit: "个",
                //         rate: 0.4
                //     }
                // },
                // {
                //     name: "3",
                //     text: "环境卫生",
                //     value: 34.17,
                //     _g: {
                //         count: 533,
                //         unit: "个",
                //         rate: 0.3417
                //     }
                // },
                // {
                //     name: "4",
                //     text: "宣传广告",
                //     value: 32.2453,
                //     _g: {
                //         count: 470,
                //         unit: "个",
                //         rate: 0.322453
                //     }
                // }
            ],
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
        // {
        //     name: "label",
        //     type: "bar",
        //     barWidth: 14,
        //     barGap: "-100%",
        //     // data: [
        //     //     {
        //     //         name: "0",
        //     //         text: "街面秩序",
        //     //         value: 87.33999999999999,
        //     //         _g: {
        //     //             count: 3049,
        //     //             unit: "个",
        //     //             rate: 0.8734
        //     //         }
        //     //     },
        //     //     {
        //     //         name: "1",
        //     //         text: "公共设施",
        //     //         value: 75,
        //     //         _g: {
        //     //             count: 1974,
        //     //             unit: "个",
        //     //             rate: 0.75
        //     //         }
        //     //     },
        //     //     {
        //     //         name: "2",
        //     //         text: "园林绿化设施",
        //     //         value: 40,
        //     //         _g: {
        //     //             count: 937,
        //     //             unit: "个",
        //     //             rate: 0.4
        //     //         }
        //     //     },
        //     //     {
        //     //         name: "3",
        //     //         text: "环境卫生",
        //     //         value: 34.17,
        //     //         _g: {
        //     //             count: 533,
        //     //             unit: "个",
        //     //             rate: 0.3417
        //     //         }
        //     //     },
        //     //     {
        //     //         name: "4",
        //     //         text: "宣传广告",
        //     //         value: 32.2453,
        //     //         _g: {
        //     //             count: 470,
        //     //             unit: "个",
        //     //             rate: 0.322453
        //     //         }
        //     //     }
        //     // ],
        //     z: 10,
        //     itemStyle: {
        //         borderRadius: [0, 50, 50, 0],
        //         color: {
        //             colorStops: [
        //                 {
        //                     offset: 0,
        //                     color: "#D35E00"
        //                 },
        //                 {
        //                     offset: 1,
        //                     color: "#FFC600"
        //                 }
        //             ],
        //             x: 0,
        //             y: 0,
        //             x2: 1,
        //             y2: 0,
        //             type: "linear",
        //             global: false
        //         }
        //     },
        //     label: {
        //         show: true,
        //         fontSize: "14",
        //         fontFamily: "auto",
        //         fontWeight: "normal",
        //         color: "#fff",
        //         position: [0, -20],
        //         formatter: "{b}\n{d}%",

        //         // formatter: "{style|" + `${a}${d}` + "}" + "{style|" + `${d}%` + "}",
        //         rich: {
        //             style: {
        //                 width: 80,
        //                 padding: [0, 0, 0, 20],
        //                 color: "#fff",
        //                 fontWeight: "normal",
        //                 fontFamily: "auto",
        //                 fontSize: "14"
        //             }
        //         }
        //     }
        // }
    ]
};

export default option;
