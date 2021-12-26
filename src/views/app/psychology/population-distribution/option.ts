let option: any = {
    tooltip: {
        trigger: "item"
    },
    legend: {
        show: false
    },
    series: [
        {
            name: "背景线",
            type: "pie",
            radius: ["73%", "74%"],
            center: ["50%", "42%"],
            label: {
                show: false
            },
            itemStyle: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            hoverAnimation: false,
            data: [
                {
                    value: 100,
                    name: "",
                    itemStyle: {
                        color: "RGBA(63, 77, 91, 1)",
                        borderWidth: 0
                    },
                    tooltip: {
                        show: false
                    },
                    label: {
                        show: false
                    }
                }
            ]
        },
        {
            name: "背景线2",
            type: "pie",
            radius: ["60%", "68%"],
            center: ["50%", "42%"],
            label: {
                show: false
            },
            itemStyle: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            data: [
                {
                    value: 100,
                    name: "",
                    itemStyle: {
                        color: "RGBA(30, 46, 64, 1)",
                        borderWidth: 0
                    },
                    tooltip: {
                        show: false
                    },
                    label: {
                        show: false
                    }
                }
            ]
        },
        {
            name: "收入",
            type: "pie",
            radius: ["42%", "60%"],
            center: ["50%", "42%"],
            z: 10,
            data: [],
            labelLine: {
                show: true,
                length2: 40,
                showAbove: true
            }
        },
        {
            name: "",
            type: "pie",
            radius: ["0%", "32%"],
            center: ["50%", "42%"],
            z: 10,
            data: [],
            labelLine: {
                show: true,
                // length2: 40,
                showAbove: true
            }
        }
    ]
};
export default option;
