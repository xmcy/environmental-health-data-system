let option: any = {
    legend: {
        orient: "vertical",
        top: "center",
        right: "5%",
        show: true,
        icon: "circle",
        itemHeight: 12,
        itemWidth: 12,
        textStyle: {
            color: "rgba(180, 209, 212, 1)"
        }
    },
    tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)"
    },
    series: [
        {
            name: "常见慢病占比",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["38%", "44%"],
            roseType: "area",
            label: {
                show: true,
                position: "outside",
                fontSize: 14
            },
            labelLine: {
                length: 10,
                length2: 20
            },
            data: []
        }
    ]
};

export default option;
