import { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Calendar } from 'lucide-react';

export const Statics = () => {




    useLayoutEffect(() => {
        const root = am5.Root.new("chartdiv");

        if (root._logo) {
            root._logo.set("forceHidden", true);
            root._logo.dispose();
        }
        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            paddingLeft: 0,
            paddingRight: 20
        }));


        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "month",
            renderer: am5xy.AxisRendererX.new(root, {
                minGridDistance: 30,
                minorGridEnabled: true
            })
        }));


        xAxis.get("renderer").grid.template.setAll({
            location: 0,
            strokeOpacity: 0.1,
            stroke: am5.color(0xffffff),
            strokeDasharray: [3, 3]
        });



        xAxis.get("renderer").grid.template.setAll({ location: 0, strokeOpacity: 0.1, strokeDasharray: [3] });
        xAxis.get("renderer").labels.template.setAll({ fill: am5.color(0x94a3b8), fontSize: 12 });

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 })
        }));
        yAxis.get("renderer").labels.template.setAll({ fill: am5.color(0x94a3b8), fontSize: 12 });

        yAxis.get("renderer").grid.template.setAll({
            strokeOpacity: 0.1,
            stroke: am5.color(0xffffff),
            strokeDasharray: [3, 3]
        });


        // Data
        const data = [
            { month: "Jan", v2020: 0, v2021: 0, v2022: 0 },
            { month: "Feb", v2020: 0, v2021: 0, v2022: 0 },
            { month: "Mar", v2020: 0, v2021: 0, v2022: 0 },
            { month: "Apr", v2020: 0, v2021: 0, v2022: 0 },
            { month: "May", v2020: 20, v2021: 30, v2022: 50 },
            { month: "June", v2020: 0, v2021: 0, v2022: 0 },
            { month: "July", v2020: 0, v2021: 0, v2022: 0 },
            { month: "Aug", v2020: 0, v2021: 0, v2022: 0 },
            { month: "Sep", v2020: 0, v2021: 0, v2022: 0 },
            { month: "Oct", v2020: 0, v2021: 0, v2022: 0 },
            { month: "Nov", v2020: 0, v2021: 0, v2022: 0 },
            { month: "Dec", v2020: 0, v2021: 0, v2022: 0 },
        ];

        xAxis.data.setAll(data);

        // Series Creation Function
        function createSeries(name: string, field: string, color: number) {
            const series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: field,
                categoryXField: "month",
                stroke: am5.color(color),
                tooltip: am5.Tooltip.new(root, { labelText: "{name}: {valueY}" })
            }));

            // create lines
            series.strokes.template.setAll({
                strokeWidth: 2,

                shadowBlur: 34,
                shadowColor: am5.color(color),
                shadowOpacity: 0.7,
                shadowOffsetX: 0,
                shadowOffsetY: 0,


            });


            // create ball point
            series.bullets.push(() => {

                const container = am5.Container.new(root, {
                    centerX: am5.p50,
                    centerY: am5.p100
                });

                container.children.push(am5.Circle.new(root, {
                    radius: 4,
                    fill: am5.color(color),
                    stroke: root.interfaceColors.get("background"),
                    strokeWidth: 2,
                    shadowColor: am5.color(color),
                    shadowBlur: 11,
                    shadowOpacity: 0.8
                }));


                container.children.push(am5.Label.new(root, {
                    text: "{valueY}", // এটি অটোমেটিক ভ্যালু নিয়ে নেবে
                    fill: am5.color(0xffffff), // টেক্সট কালার সাদা
                    fontWeight: "bold",
                    fontSize: 12,
                    centerY: am5.p100, // বৃত্তের ঠিক উপরে রাখার জন্য
                    centerX: am5.p50,
                    populateText: true,
                    paddingBottom: 5 // বৃত্ত থেকে সামান্য উপরে গ্যাপ
                }));

                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: container
                });
            });

            series.data.setAll(data);
        }

        createSeries("2020", "v2020", 0x8b5cf6);
        createSeries("2021", "v2021", 0xf87171);
        createSeries("2022", "v2022", 0x22d3ee);


        return () => root.dispose();
    }, []);

    return (
        <div className="bg-[##2563EB] border border-[#2563EB] rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
                <div className="flex items-center gap-6">
                    <div className="flex gap-4 text-xs font-medium">
                        <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-violet-500  shadow-2xl"></span> 2020</span>
                        <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-red-400 shadow-2xl"></span> 2021</span>
                        <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-cyan-400 shadow-2xl"></span> 2022</span>
                    </div>
                    <button className="text-slate-400 hover:text-white border border-white/10 p-2 rounded-lg transition-all">
                        <Calendar size={18} />
                    </button>
                </div>
            </div>
            <div className='h-75 ' id="chartdiv" ></div>
        </div>
    );
};