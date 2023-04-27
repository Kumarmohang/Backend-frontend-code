import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const colors = [
  { cCode1: 156, cCode2: 62, cCode3: 0 },
  { cCode1: 0, cCode2: 99, cCode3: 90 },
  { cCode1: 237, cCode2: 170, cCode3: 37 },
  { cCode1: 0, cCode2: 277, cCode3: 204 },
  { cCode1: 166, cCode2: 188, cCode3: 9 },
  { cCode1: 217, cCode2: 105, cCode3: 65 },
  { cCode1: 183, cCode2: 191, cCode3: 153 },
  { cCode1: 277, cCode2: 199, cCode3: 95 },
  { cCode1: 235, cCode2: 209, cCode3: 96 },
  { cCode1: 131, cCode2: 132, cCode3: 235 },
  { cCode1: 180, cCode2: 20, cCode3: 5 },
  { cCode1: 5, cCode2: 115, cCode3: 66 },
  { cCode1: 188, cCode2: 210, cCode3: 10 },
  { cCode1: 85, cCode2: 10, cCode3: 204 },
  { cCode1: 100, cCode2: 45, cCode3: 80 },
  { cCode1: 200, cCode2: 15, cCode3: 165 },
  { cCode1: 18, cCode2: 191, cCode3: 200 },
  { cCode1: 200, cCode2: 100, cCode3: 195 },
  { cCode1: 235, cCode2: 100, cCode3: 96 },
  { cCode1: 131, cCode2: 232, cCode3: 135 },
];

export function RadialChart({ comparisonData, isDetailScreen, name }) {
  let dataSetForGraph = [];
  if ((comparisonData.length === 2) & isDetailScreen) {
    if (name === comparisonData?.[0]?.header) {
      dataSetForGraph = [
        {
          label: `-15% over ${comparisonData?.[0]?.header || ""} spec`,
          data: [
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue *
                      0.85) /
                      50
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue *
                      0.85
                  )} hp`
                : `0 hp`,
              name: `-15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue *
                      0.85) /
                      20
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue *
                      0.85
                  )} km/h`
                : `0 km/h`,
              name: `-15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue *
                      0.85) /
                      100
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue *
                      0.85
                  )} Nm`
                : `0 Nm`,
              name: `-15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications?.Body
                ?.Weight?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Body?.Weight?.normalisedNumValue *
                      0.85) /
                      250
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Body?.Weight?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Body?.Weight?.normalisedNumValue * 0.85
                  )} kg`
                : `0 kg`,
              name: `-15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              name: `-15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.Capacity?.normalisedNumValue *
                      0.85) /
                      500
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.Capacity?.normalisedNumValue * 0.85
                  )} cc`
                : `0 cc`,
              name: `-15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
          ],
          backgroundColor: "rgba(255,255,255, 0.7)",
          borderColor: "rgba(105,105,105, 1)",
          borderWidth: 1,
          borderDash: [10, 8],
        },
        {
          label: comparisonData?.[0]?.header || "",
          data: [
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications
                    ?.Engine?.["Maximum Power" || null]?.normalisedNumValue / 50
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                  } hp`
                : `0 hp`,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications
                    ?.Performance?.["Top Speed" || null]?.normalisedNumValue /
                  20
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                  } km/h`
                : `0 km/h`,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications
                    ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue /
                  100
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                  } Nm`
                : `0 Nm`,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications?.Body
                ?.Weight?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications?.Body
                    ?.Weight?.normalisedNumValue / 250
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Body?.Weight?.normalisedNumValue
                ? `${comparisonData?.[0]?.specifications?.[0]?.specifications?.Body?.Weight?.normalisedNumValue} kg`
                : `0 kg`,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications
                    ?.Engine?.Capacity?.normalisedNumValue / 500
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? `${comparisonData?.[0]?.specifications?.[0]?.specifications?.Engine?.Capacity?.normalisedNumValue} cc`
                : `0 cc`,
              name: comparisonData?.[0]?.header || "",
            },
          ],
          backgroundColor: "rgb(255,99,71, 0.2)",
          borderColor: "rgba(255,99,71, 1)",
          borderWidth: 1,
        },
        {
          label: `+15% over ${comparisonData?.[0]?.header || ""} spec`,
          data: [
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue *
                      1.15) /
                      50
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue *
                      1.15
                  )} hp`
                : `0 hp`,
              name: `+15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue *
                      1.15) /
                      20
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue *
                      1.15
                  )} km/h`
                : `0 km/h`,
              name: `+15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue *
                      1.15) /
                      100
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue *
                      1.15
                  )} Nm`
                : `0 Nm`,
              name: `+15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications?.Body
                ?.Weight?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Body?.Weight?.normalisedNumValue *
                      1.15) /
                      250
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Body?.Weight?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Body?.Weight?.normalisedNumValue * 1.15
                  )} kg`
                : `0 kg`,
              name: `+15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              name: `+15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.Capacity?.normalisedNumValue *
                      1.15) /
                      500
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.Capacity?.normalisedNumValue * 1.15
                  )} cc`
                : `0 cc`,
              name: `+15% over ${comparisonData?.[0]?.header || ""} spec`,
            },
          ],
          backgroundColor: "rgb(124,252,0, 0.2)",
          borderColor: "rgba(124,252,0, 1)",
          borderWidth: 1,
          borderDash: [10, 8],
        },
        {
          label: comparisonData?.[1]?.header || "",
          data: [
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications
                    ?.Engine?.["Maximum Power" || null]?.normalisedNumValue / 50
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                  } hp`
                : `0 hp`,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications
                    ?.Performance?.["Top Speed" || null]?.normalisedNumValue /
                  20
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                  } km/h`
                : `0 km/h`,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications
                    ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue /
                  100
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                  } Nm`
                : `0 Nm`,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications?.Body
                ?.Weight?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications?.Body
                    ?.Weight?.normalisedNumValue / 250
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Body?.Weight?.normalisedNumValue
                ? `${comparisonData?.[1]?.specifications?.[0]?.specifications?.Body?.Weight?.normalisedNumValue} kg`
                : `0 kg`,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications
                    ?.Engine?.Capacity?.normalisedNumValue / 500
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? `${comparisonData?.[1]?.specifications?.[0]?.specifications?.Engine?.Capacity?.normalisedNumValue} cc`
                : `0 cc`,
              name: comparisonData?.[1]?.header || "",
            },
          ],
          backgroundColor: "rgba(218,165,32, 0.8)",
          borderColor: "rgba(218,165,32, 1)",
          borderWidth: 1,
        },
      ];
    } else {
      dataSetForGraph = [
        {
          label: `-15% over ${comparisonData?.[1]?.header || ""} spec`,
          data: [
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue *
                      0.85) /
                      50
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue *
                      0.85
                  )} hp`
                : `0 hp`,
              name: `-15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue *
                      0.85) /
                      20
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue *
                      0.85
                  )} km/h`
                : `0 km/h`,
              name: `-15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue *
                      0.85) /
                      100
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue *
                      0.85
                  )} Nm`
                : `0 Nm`,
              name: `-15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications?.Body
                ?.Weight?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Body?.Weight?.normalisedNumValue *
                      0.85) /
                      250
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Body?.Weight?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Body?.Weight?.normalisedNumValue * 0.85
                  )} kg`
                : `0 kg`,
              name: `-15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              name: `-15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.Capacity?.normalisedNumValue *
                      0.85) /
                      500
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.Capacity?.normalisedNumValue * 0.85
                  )} cc`
                : `0 cc`,
              name: `-15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
          ],
          backgroundColor: "rgba(255,255,255, 0.7)",
          borderColor: "rgba(105,105,105, 1)",
          borderWidth: 1,
          borderDash: [10, 8],
        },
        {
          label: comparisonData?.[1]?.header || "",
          data: [
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications
                    ?.Engine?.["Maximum Power" || null]?.normalisedNumValue / 50
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                  } hp`
                : `0 hp`,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications
                    ?.Performance?.["Top Speed" || null]?.normalisedNumValue /
                  20
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                  } km/h`
                : `0 km/h`,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications
                    ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue /
                  100
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                  } Nm`
                : `0 Nm`,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications?.Body
                ?.Weight?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications?.Body
                    ?.Weight?.normalisedNumValue / 250
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Body?.Weight?.normalisedNumValue
                ? `${comparisonData?.[1]?.specifications?.[0]?.specifications?.Body?.Weight?.normalisedNumValue} kg`
                : `0 kg`,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              name: comparisonData?.[1]?.header || "",
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? comparisonData?.[1]?.specifications?.[0]?.specifications
                    ?.Engine?.Capacity?.normalisedNumValue / 500
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? `${comparisonData?.[1]?.specifications?.[0]?.specifications?.Engine?.Capacity?.normalisedNumValue} cc`
                : `0 cc`,
              name: comparisonData?.[1]?.header || "",
            },
          ],
          backgroundColor: "rgb(255,99,71, 0.2)",
          borderColor: "rgba(255,99,71, 1)",
          borderWidth: 1,
        },
        {
          label: `+15% over ${comparisonData?.[1]?.header || ""} spec`,
          data: [
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue *
                      1.15) /
                      50
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue *
                      1.15
                  )} hp`
                : `0 hp`,
              name: `+15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue *
                      1.15) /
                      20
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue *
                      1.15
                  )} km/h`
                : `0 km/h`,
              name: `+15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue *
                      1.15) /
                      100
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue *
                      1.15
                  )} Nm`
                : `0 Nm`,
              name: `+15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications?.Body
                ?.Weight?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Body?.Weight?.normalisedNumValue *
                      1.15) /
                      250
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Body?.Weight?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Body?.Weight?.normalisedNumValue * 1.15
                  )} kg`
                : `0 kg`,
              name: `+15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              name: `+15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
            {
              r: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? Math.round(
                    (comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.Capacity?.normalisedNumValue *
                      1.15) /
                      500
                  )
                : 0,
              value: comparisonData?.[1]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? `${Math.round(
                    comparisonData?.[1]?.specifications?.[0]?.specifications
                      ?.Engine?.Capacity?.normalisedNumValue * 1.15
                  )} cc`
                : `0 cc`,
              name: `+15% over ${comparisonData?.[1]?.header || ""} spec`,
            },
          ],
          backgroundColor: "rgb(124,252,0, 0.2)",
          borderColor: "rgba(124,252,0, 1)",
          borderWidth: 1,
          borderDash: [10, 8],
        },
        {
          label: comparisonData?.[0]?.header || "",
          data: [
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications
                    ?.Engine?.["Maximum Power" || null]?.normalisedNumValue / 50
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Power" || null]?.normalisedNumValue
                  } hp`
                : `0 hp`,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications
                    ?.Performance?.["Top Speed" || null]?.normalisedNumValue /
                  20
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Performance?.["Top Speed" || null]?.normalisedNumValue
                  } km/h`
                : `0 km/h`,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications
                    ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue /
                  100
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                ? `${
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Maximum Torque" || null]?.normalisedNumValue
                  } Nm`
                : `0 Nm`,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications?.Body
                ?.Weight?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications?.Body
                    ?.Weight?.normalisedNumValue / 250
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Body?.Weight?.normalisedNumValue
                ? `${comparisonData?.[0]?.specifications?.[0]?.specifications?.Body?.Weight?.normalisedNumValue} kg`
                : `0 kg`,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.["Number Of Cylinder" || null]?.finalSpecValueStr
                ? Number(
                    comparisonData?.[0]?.specifications?.[0]?.specifications
                      ?.Engine?.["Number Of Cylinder"]?.["finalSpecValueStr"]
                  )
                : 0,
              name: comparisonData?.[0]?.header || "",
            },
            {
              r: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? comparisonData?.[0]?.specifications?.[0]?.specifications
                    ?.Engine?.Capacity?.normalisedNumValue / 500
                : 0,
              value: comparisonData?.[0]?.specifications?.[0]?.specifications
                ?.Engine?.Capacity?.normalisedNumValue
                ? `${comparisonData?.[0]?.specifications?.[0]?.specifications?.Engine?.Capacity?.normalisedNumValue} cc`
                : `0 cc`,
              name: comparisonData?.[0]?.header || "",
            },
          ],
          backgroundColor: "rgba(218,165,32, 0.8)",
          borderColor: "rgba(218,165,32, 1)",
          borderWidth: 1,
        },
      ];
    }
  } else {
    for (
      let i = 0, len = comparisonData.length;
      i < len && i < colors.length;
      i++
    ) {
      // const cCode1 = Math.ceil(Math.random() * 80);
      // const cCode2 = Math.floor(Math.random() * 125);
      // const cCode3 = Math.ceil(Math.random() * 10);
      const dataSpecifications =
        comparisonData?.[i]?.specifications?.[0]?.specifications;
      const dataObj = {
        label: comparisonData?.[i]?.header || "",
        data: [
          {
            r: dataSpecifications?.Engine?.["Maximum Power" || null]
              ?.normalisedNumValue
              ? dataSpecifications?.Engine?.["Maximum Power" || null]
                  ?.normalisedNumValue / 50
              : 0,
            value: dataSpecifications?.Engine?.["Maximum Power" || null]
              ?.normalisedNumValue
              ? `${
                  dataSpecifications?.Engine?.["Maximum Power" || null]
                    ?.normalisedNumValue
                } hp`
              : `0 hp`,
            name: comparisonData?.[i]?.header || "",
          },
          {
            r: dataSpecifications?.Performance?.["Top Speed" || null]
              ?.normalisedNumValue
              ? dataSpecifications?.Performance?.["Top Speed" || null]
                  ?.normalisedNumValue / 20
              : 0,
            value: dataSpecifications?.Performance?.["Top Speed" || null]
              ?.normalisedNumValue
              ? `${
                  dataSpecifications?.Performance?.["Top Speed" || null]
                    ?.normalisedNumValue
                } km/h`
              : `0 km/h`,
            name: comparisonData?.[i]?.header || "",
          },
          {
            r: dataSpecifications?.Engine?.["Maximum Torque" || null]
              ?.normalisedNumValue
              ? dataSpecifications?.Engine?.["Maximum Torque" || null]
                  ?.normalisedNumValue / 100
              : 0,
            value: dataSpecifications?.Engine?.["Maximum Torque" || null]
              ?.normalisedNumValue
              ? `${
                  dataSpecifications?.Engine?.["Maximum Torque" || null]
                    ?.normalisedNumValue
                } Nm`
              : `0 Nm`,
            name: comparisonData?.[i]?.header || "",
          },
          {
            r: dataSpecifications?.Body?.Weight?.normalisedNumValue
              ? dataSpecifications?.Body?.Weight?.normalisedNumValue / 250
              : 0,
            value: dataSpecifications?.Body?.Weight?.normalisedNumValue
              ? `${dataSpecifications?.Body?.Weight?.normalisedNumValue} kg`
              : `0 kg`,
            name: comparisonData?.[i]?.header || "",
          },
          {
            r: dataSpecifications?.Engine?.["Number Of Cylinder" || null]
              ?.finalSpecValueStr
              ? Number(
                  dataSpecifications?.Engine?.["Number Of Cylinder"]?.[
                    "finalSpecValueStr"
                  ]
                )
              : 0,
            value: dataSpecifications?.Engine?.["Number Of Cylinder" || null]
              ?.finalSpecValueStr
              ? Number(
                  dataSpecifications?.Engine?.["Number Of Cylinder"]?.[
                    "finalSpecValueStr"
                  ]
                )
              : 0,
            name: comparisonData?.[i]?.header || "",
          },
          {
            r: dataSpecifications?.Engine?.Capacity?.normalisedNumValue
              ? dataSpecifications?.Engine?.Capacity?.normalisedNumValue / 500
              : 0,
            value: dataSpecifications?.Engine?.Capacity?.normalisedNumValue
              ? `${dataSpecifications?.Engine?.Capacity?.normalisedNumValue} cc`
              : `0 cc`,
            name: comparisonData?.[i]?.header || "",
          },
        ],
        backgroundColor: `rgba(${colors[i].cCode1}, ${colors[i].cCode2}, ${colors[i].cCode3}, 0.2)`,
        borderColor: `rgba(${colors[i].cCode1}, ${colors[i].cCode2}, ${colors[i].cCode3},1)`,
        borderWidth: 1,
      };
      dataSetForGraph.push(dataObj);
    }
  }

  const data = {
    labels: [
      "Maximum Power (hp)",
      "Top Speed (km/h)",
      "Maximum Torque (Nm)",
      "Weight (kg)",
      "Number Of Cylinders",
      "Capacity (cc)",
    ],
    datasets: dataSetForGraph,
  };
  const options = {
    // maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const info = [
              `${context.raw.name || "Value"}: ${context.raw.value}`,
            ];
            return info;
          },
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
}
