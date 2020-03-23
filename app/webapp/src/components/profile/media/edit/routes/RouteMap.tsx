import React, { FunctionComponent } from "react";
import Map from "~/components/pure/widgets/map";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import CircleLayer from "~/components/pure/widgets/map/layers/CircleLayer";
import { LngLatBounds, LngLat } from "mapbox-gl";

const geojson = {
  type: "FeatureCollection",
  name: "track_points",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    {
      type: "Feature",
      properties: { coordinate_id: 0 },
      geometry: { type: "Point", coordinates: [-121.73478, 46.786746] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 1 },
      geometry: { type: "Point", coordinates: [-121.735001, 46.786914] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 2 },
      geometry: { type: "Point", coordinates: [-121.735055, 46.786964] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 3 },
      geometry: { type: "Point", coordinates: [-121.735085, 46.787014] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 4 },
      geometry: { type: "Point", coordinates: [-121.735032, 46.787044] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 5 },
      geometry: { type: "Point", coordinates: [-121.735047, 46.787281] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 6 },
      geometry: { type: "Point", coordinates: [-121.734986, 46.787433] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 7 },
      geometry: { type: "Point", coordinates: [-121.735108, 46.787651] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 8 },
      geometry: { type: "Point", coordinates: [-121.735314, 46.787841] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 9 },
      geometry: { type: "Point", coordinates: [-121.735512, 46.787902] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 10 },
      geometry: { type: "Point", coordinates: [-121.735642, 46.788013] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 11 },
      geometry: { type: "Point", coordinates: [-121.735787, 46.788082] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 12 },
      geometry: { type: "Point", coordinates: [-121.7361, 46.788295] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 13 },
      geometry: { type: "Point", coordinates: [-121.736184, 46.788387] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 14 },
      geometry: { type: "Point", coordinates: [-121.736565, 46.788536] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 15 },
      geometry: { type: "Point", coordinates: [-121.736756, 46.788646] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 16 },
      geometry: { type: "Point", coordinates: [-121.736924, 46.788749] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 17 },
      geometry: { type: "Point", coordinates: [-121.736863, 46.788867] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 18 },
      geometry: { type: "Point", coordinates: [-121.736756, 46.788955] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 19 },
      geometry: { type: "Point", coordinates: [-121.736641, 46.789024] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 20 },
      geometry: { type: "Point", coordinates: [-121.736611, 46.789058] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 21 },
      geometry: { type: "Point", coordinates: [-121.736611, 46.789104] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 22 },
      geometry: { type: "Point", coordinates: [-121.736626, 46.78915] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 23 },
      geometry: { type: "Point", coordinates: [-121.736695, 46.789253] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 24 },
      geometry: { type: "Point", coordinates: [-121.736695, 46.789291] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 25 },
      geometry: { type: "Point", coordinates: [-121.736672, 46.78934] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 26 },
      geometry: { type: "Point", coordinates: [-121.736626, 46.789417] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 27 },
      geometry: { type: "Point", coordinates: [-121.736519, 46.789531] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 28 },
      geometry: { type: "Point", coordinates: [-121.736481, 46.789585] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 29 },
      geometry: { type: "Point", coordinates: [-121.736474, 46.789634] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 30 },
      geometry: { type: "Point", coordinates: [-121.736474, 46.789764] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 31 },
      geometry: { type: "Point", coordinates: [-121.73639, 46.789829] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 32 },
      geometry: { type: "Point", coordinates: [-121.73629, 46.789852] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 33 },
      geometry: { type: "Point", coordinates: [-121.736222, 46.789897] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 34 },
      geometry: { type: "Point", coordinates: [-121.736092, 46.789932] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 35 },
      geometry: { type: "Point", coordinates: [-121.735962, 46.790035] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 36 },
      geometry: { type: "Point", coordinates: [-121.735848, 46.790119] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 37 },
      geometry: { type: "Point", coordinates: [-121.735772, 46.790206] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 38 },
      geometry: { type: "Point", coordinates: [-121.735657, 46.790271] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 39 },
      geometry: { type: "Point", coordinates: [-121.735634, 46.790412] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 40 },
      geometry: { type: "Point", coordinates: [-121.735558, 46.790424] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 41 },
      geometry: { type: "Point", coordinates: [-121.735383, 46.790569] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 42 },
      geometry: { type: "Point", coordinates: [-121.735352, 46.790771] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 43 },
      geometry: { type: "Point", coordinates: [-121.735436, 46.791027] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 44 },
      geometry: { type: "Point", coordinates: [-121.735589, 46.791526] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 45 },
      geometry: { type: "Point", coordinates: [-121.735558, 46.791782] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 46 },
      geometry: { type: "Point", coordinates: [-121.735642, 46.792049] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 47 },
      geometry: { type: "Point", coordinates: [-121.735718, 46.792312] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 48 },
      geometry: { type: "Point", coordinates: [-121.735871, 46.792392] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 49 },
      geometry: { type: "Point", coordinates: [-121.735924, 46.792507] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 50 },
      geometry: { type: "Point", coordinates: [-121.735924, 46.792617] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 51 },
      geometry: { type: "Point", coordinates: [-121.735962, 46.79269] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 52 },
      geometry: { type: "Point", coordinates: [-121.735909, 46.792793] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 53 },
      geometry: { type: "Point", coordinates: [-121.73597, 46.792858] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 54 },
      geometry: { type: "Point", coordinates: [-121.7361, 46.793804] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 55 },
      geometry: { type: "Point", coordinates: [-121.73613, 46.793899] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 56 },
      geometry: { type: "Point", coordinates: [-121.736123, 46.794021] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 57 },
      geometry: { type: "Point", coordinates: [-121.7361, 46.794105] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 58 },
      geometry: { type: "Point", coordinates: [-121.736039, 46.794166] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 59 },
      geometry: { type: "Point", coordinates: [-121.73594, 46.79438] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 60 },
      geometry: { type: "Point", coordinates: [-121.735878, 46.794528] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 61 },
      geometry: { type: "Point", coordinates: [-121.735795, 46.794704] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 62 },
      geometry: { type: "Point", coordinates: [-121.735611, 46.794963] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 63 },
      geometry: { type: "Point", coordinates: [-121.735543, 46.795158] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 64 },
      geometry: { type: "Point", coordinates: [-121.735581, 46.795341] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 65 },
      geometry: { type: "Point", coordinates: [-121.735611, 46.79544] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 66 },
      geometry: { type: "Point", coordinates: [-121.735703, 46.79552] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 67 },
      geometry: { type: "Point", coordinates: [-121.735825, 46.795619] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 68 },
      geometry: { type: "Point", coordinates: [-121.735871, 46.795719] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 69 },
      geometry: { type: "Point", coordinates: [-121.735802, 46.795864] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 70 },
      geometry: { type: "Point", coordinates: [-121.735764, 46.795944] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 71 },
      geometry: { type: "Point", coordinates: [-121.735817, 46.79615] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 72 },
      geometry: { type: "Point", coordinates: [-121.735833, 46.796295] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 73 },
      geometry: { type: "Point", coordinates: [-121.735901, 46.79647] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 74 },
      geometry: { type: "Point", coordinates: [-121.735871, 46.796699] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 75 },
      geometry: { type: "Point", coordinates: [-121.735863, 46.797012] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 76 },
      geometry: { type: "Point", coordinates: [-121.735901, 46.797367] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 77 },
      geometry: { type: "Point", coordinates: [-121.735726, 46.797657] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 78 },
      geometry: { type: "Point", coordinates: [-121.735642, 46.797744] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 79 },
      geometry: { type: "Point", coordinates: [-121.735489, 46.79792] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 80 },
      geometry: { type: "Point", coordinates: [-121.735375, 46.798065] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 81 },
      geometry: { type: "Point", coordinates: [-121.735383, 46.798141] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 82 },
      geometry: { type: "Point", coordinates: [-121.735314, 46.798202] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 83 },
      geometry: { type: "Point", coordinates: [-121.735268, 46.798309] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 84 },
      geometry: { type: "Point", coordinates: [-121.735093, 46.7984] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 85 },
      geometry: { type: "Point", coordinates: [-121.734971, 46.798408] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 86 },
      geometry: { type: "Point", coordinates: [-121.734849, 46.798362] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 87 },
      geometry: { type: "Point", coordinates: [-121.734986, 46.798683] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 88 },
      geometry: { type: "Point", coordinates: [-121.734955, 46.798809] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 89 },
      geometry: { type: "Point", coordinates: [-121.734902, 46.798931] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 90 },
      geometry: { type: "Point", coordinates: [-121.734963, 46.799026] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 91 },
      geometry: { type: "Point", coordinates: [-121.734963, 46.799129] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 92 },
      geometry: { type: "Point", coordinates: [-121.73491, 46.799327] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 93 },
      geometry: { type: "Point", coordinates: [-121.735016, 46.799465] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 94 },
      geometry: { type: "Point", coordinates: [-121.735024, 46.799736] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 95 },
      geometry: { type: "Point", coordinates: [-121.734879, 46.799903] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 96 },
      geometry: { type: "Point", coordinates: [-121.734772, 46.800029] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 97 },
      geometry: { type: "Point", coordinates: [-121.734665, 46.800045] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 98 },
      geometry: { type: "Point", coordinates: [-121.734574, 46.800117] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 99 },
      geometry: { type: "Point", coordinates: [-121.734482, 46.800281] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 100 },
      geometry: { type: "Point", coordinates: [-121.734566, 46.800415] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 101 },
      geometry: { type: "Point", coordinates: [-121.734543, 46.80051] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 102 },
      geometry: { type: "Point", coordinates: [-121.734574, 46.800693] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 103 },
      geometry: { type: "Point", coordinates: [-121.73478, 46.800868] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 104 },
      geometry: { type: "Point", coordinates: [-121.734887, 46.800987] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 105 },
      geometry: { type: "Point", coordinates: [-121.734849, 46.801177] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 106 },
      geometry: { type: "Point", coordinates: [-121.734879, 46.8013] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 107 },
      geometry: { type: "Point", coordinates: [-121.734726, 46.801475] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 108 },
      geometry: { type: "Point", coordinates: [-121.734597, 46.801601] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 109 },
      geometry: { type: "Point", coordinates: [-121.734375, 46.801998] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 110 },
      geometry: { type: "Point", coordinates: [-121.734284, 46.802299] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 111 },
      geometry: { type: "Point", coordinates: [-121.734284, 46.802471] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 112 },
      geometry: { type: "Point", coordinates: [-121.734566, 46.802841] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 113 },
      geometry: { type: "Point", coordinates: [-121.734627, 46.802993] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 114 },
      geometry: { type: "Point", coordinates: [-121.734482, 46.803409] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 115 },
      geometry: { type: "Point", coordinates: [-121.734139, 46.803661] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 116 },
      geometry: { type: "Point", coordinates: [-121.733979, 46.80376] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 117 },
      geometry: { type: "Point", coordinates: [-121.73388, 46.80376] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 118 },
      geometry: { type: "Point", coordinates: [-121.733773, 46.80376] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 119 },
      geometry: { type: "Point", coordinates: [-121.733712, 46.803836] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 120 },
      geometry: { type: "Point", coordinates: [-121.73378, 46.803901] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 121 },
      geometry: { type: "Point", coordinates: [-121.733758, 46.803989] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 122 },
      geometry: { type: "Point", coordinates: [-121.733643, 46.804164] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 123 },
      geometry: { type: "Point", coordinates: [-121.733674, 46.804229] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 124 },
      geometry: { type: "Point", coordinates: [-121.733582, 46.804328] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 125 },
      geometry: { type: "Point", coordinates: [-121.733414, 46.804443] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 126 },
      geometry: { type: "Point", coordinates: [-121.733346, 46.804534] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 127 },
      geometry: { type: "Point", coordinates: [-121.733254, 46.804626] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 128 },
      geometry: { type: "Point", coordinates: [-121.733117, 46.804889] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 129 },
      geometry: { type: "Point", coordinates: [-121.732964, 46.804599] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 130 },
      geometry: { type: "Point", coordinates: [-121.732811, 46.804454] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 131 },
      geometry: { type: "Point", coordinates: [-121.73272, 46.804222] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 132 },
      geometry: { type: "Point", coordinates: [-121.732575, 46.804054] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 133 },
      geometry: { type: "Point", coordinates: [-121.732537, 46.803897] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 134 },
      geometry: { type: "Point", coordinates: [-121.732407, 46.803752] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 135 },
      geometry: { type: "Point", coordinates: [-121.732354, 46.803573] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 136 },
      geometry: { type: "Point", coordinates: [-121.73227, 46.803466] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 137 },
      geometry: { type: "Point", coordinates: [-121.732163, 46.803653] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 138 },
      geometry: { type: "Point", coordinates: [-121.732155, 46.803825] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 139 },
      geometry: { type: "Point", coordinates: [-121.732132, 46.803939] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 140 },
      geometry: { type: "Point", coordinates: [-121.732033, 46.804203] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 141 },
      geometry: { type: "Point", coordinates: [-121.731942, 46.804313] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 142 },
      geometry: { type: "Point", coordinates: [-121.731896, 46.804492] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 143 },
      geometry: { type: "Point", coordinates: [-121.731804, 46.804573] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 144 },
      geometry: { type: "Point", coordinates: [-121.731637, 46.804813] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 145 },
      geometry: { type: "Point", coordinates: [-121.7314, 46.804527] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 146 },
      geometry: { type: "Point", coordinates: [-121.731247, 46.80447] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 147 },
      geometry: { type: "Point", coordinates: [-121.731125, 46.804546] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 148 },
      geometry: { type: "Point", coordinates: [-121.731019, 46.804676] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 149 },
      geometry: { type: "Point", coordinates: [-121.730996, 46.804809] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 150 },
      geometry: { type: "Point", coordinates: [-121.730835, 46.804908] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 151 },
      geometry: { type: "Point", coordinates: [-121.730744, 46.805] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 152 },
      geometry: { type: "Point", coordinates: [-121.730553, 46.80511] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 153 },
      geometry: { type: "Point", coordinates: [-121.73037, 46.805114] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 154 },
      geometry: { type: "Point", coordinates: [-121.730225, 46.805187] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 155 },
      geometry: { type: "Point", coordinates: [-121.730103, 46.805164] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 156 },
      geometry: { type: "Point", coordinates: [-121.729935, 46.805255] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 157 },
      geometry: { type: "Point", coordinates: [-121.729538, 46.805397] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 158 },
      geometry: { type: "Point", coordinates: [-121.729249, 46.80537] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 159 },
      geometry: { type: "Point", coordinates: [-121.729165, 46.805408] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 160 },
      geometry: { type: "Point", coordinates: [-121.728989, 46.805568] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 161 },
      geometry: { type: "Point", coordinates: [-121.72892, 46.805603] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 162 },
      geometry: { type: "Point", coordinates: [-121.728898, 46.805721] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 163 },
      geometry: { type: "Point", coordinates: [-121.728844, 46.805793] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 164 },
      geometry: { type: "Point", coordinates: [-121.728722, 46.8059] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 165 },
      geometry: { type: "Point", coordinates: [-121.728631, 46.806064] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 166 },
      geometry: { type: "Point", coordinates: [-121.72844, 46.806167] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 167 },
      geometry: { type: "Point", coordinates: [-121.72818, 46.806365] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 168 },
      geometry: { type: "Point", coordinates: [-121.728188, 46.806468] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 169 },
      geometry: { type: "Point", coordinates: [-121.728089, 46.806663] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 170 },
      geometry: { type: "Point", coordinates: [-121.72802, 46.806793] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 171 },
      geometry: { type: "Point", coordinates: [-121.728066, 46.806922] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 172 },
      geometry: { type: "Point", coordinates: [-121.727929, 46.807308] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 173 },
      geometry: { type: "Point", coordinates: [-121.727906, 46.807491] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 174 },
      geometry: { type: "Point", coordinates: [-121.727845, 46.807609] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 175 },
      geometry: { type: "Point", coordinates: [-121.727654, 46.807674] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 176 },
      geometry: { type: "Point", coordinates: [-121.727471, 46.80775] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 177 },
      geometry: { type: "Point", coordinates: [-121.727288, 46.807956] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 178 },
      geometry: { type: "Point", coordinates: [-121.727135, 46.808055] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 179 },
      geometry: { type: "Point", coordinates: [-121.726845, 46.808296] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 180 },
      geometry: { type: "Point", coordinates: [-121.726815, 46.808471] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 181 },
      geometry: { type: "Point", coordinates: [-121.726571, 46.808807] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 182 },
      geometry: { type: "Point", coordinates: [-121.726555, 46.808868] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 183 },
      geometry: { type: "Point", coordinates: [-121.726464, 46.809017] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 184 },
      geometry: { type: "Point", coordinates: [-121.72651, 46.809097] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 185 },
      geometry: { type: "Point", coordinates: [-121.726464, 46.809177] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 186 },
      geometry: { type: "Point", coordinates: [-121.726403, 46.809219] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 187 },
      geometry: { type: "Point", coordinates: [-121.726403, 46.809295] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 188 },
      geometry: { type: "Point", coordinates: [-121.726296, 46.80941] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 189 },
      geometry: { type: "Point", coordinates: [-121.725907, 46.809707] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 190 },
      geometry: { type: "Point", coordinates: [-121.725815, 46.809818] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 191 },
      geometry: { type: "Point", coordinates: [-121.725747, 46.810043] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 192 },
      geometry: { type: "Point", coordinates: [-121.725777, 46.810279] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 193 },
      geometry: { type: "Point", coordinates: [-121.725609, 46.810523] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 194 },
      geometry: { type: "Point", coordinates: [-121.725411, 46.810909] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 195 },
      geometry: { type: "Point", coordinates: [-121.725434, 46.811477] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 196 },
      geometry: { type: "Point", coordinates: [-121.724602, 46.813774] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 197 },
      geometry: { type: "Point", coordinates: [-121.725106, 46.817352] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 198 },
      geometry: { type: "Point", coordinates: [-121.726868, 46.821083] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 199 },
      geometry: { type: "Point", coordinates: [-121.729035, 46.824234] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 200 },
      geometry: { type: "Point", coordinates: [-121.729516, 46.827766] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 201 },
      geometry: { type: "Point", coordinates: [-121.729264, 46.829956] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 202 },
      geometry: { type: "Point", coordinates: [-121.729706, 46.830871] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 203 },
      geometry: { type: "Point", coordinates: [-121.731682, 46.833747] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 204 },
      geometry: { type: "Point", coordinates: [-121.732094, 46.834518] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 205 },
      geometry: { type: "Point", coordinates: [-121.732316, 46.835086] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 206 },
      geometry: { type: "Point", coordinates: [-121.73243, 46.835449] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 207 },
      geometry: { type: "Point", coordinates: [-121.732613, 46.835536] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 208 },
      geometry: { type: "Point", coordinates: [-121.732583, 46.8357] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 209 },
      geometry: { type: "Point", coordinates: [-121.732392, 46.836051] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 210 },
      geometry: { type: "Point", coordinates: [-121.732346, 46.836235] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 211 },
      geometry: { type: "Point", coordinates: [-121.732552, 46.836479] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 212 },
      geometry: { type: "Point", coordinates: [-121.73272, 46.836818] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 213 },
      geometry: { type: "Point", coordinates: [-121.733216, 46.837539] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 214 },
      geometry: { type: "Point", coordinates: [-121.733269, 46.83847] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 215 },
      geometry: { type: "Point", coordinates: [-121.732895, 46.83892] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 216 },
      geometry: { type: "Point", coordinates: [-121.732773, 46.839179] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 217 },
      geometry: { type: "Point", coordinates: [-121.732705, 46.839435] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 218 },
      geometry: { type: "Point", coordinates: [-121.732117, 46.840023] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 219 },
      geometry: { type: "Point", coordinates: [-121.731888, 46.840446] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 220 },
      geometry: { type: "Point", coordinates: [-121.731591, 46.840892] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 221 },
      geometry: { type: "Point", coordinates: [-121.73108, 46.841304] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 222 },
      geometry: { type: "Point", coordinates: [-121.730683, 46.84151] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 223 },
      geometry: { type: "Point", coordinates: [-121.730271, 46.841617] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 224 },
      geometry: { type: "Point", coordinates: [-121.729668, 46.841629] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 225 },
      geometry: { type: "Point", coordinates: [-121.729157, 46.841651] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 226 },
      geometry: { type: "Point", coordinates: [-121.729065, 46.841709] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 227 },
      geometry: { type: "Point", coordinates: [-121.72918, 46.841884] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 228 },
      geometry: { type: "Point", coordinates: [-121.72921, 46.841995] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 229 },
      geometry: { type: "Point", coordinates: [-121.729355, 46.842159] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 230 },
      geometry: { type: "Point", coordinates: [-121.72934, 46.842227] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 231 },
      geometry: { type: "Point", coordinates: [-121.729264, 46.842304] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 232 },
      geometry: { type: "Point", coordinates: [-121.729142, 46.842369] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 233 },
      geometry: { type: "Point", coordinates: [-121.729035, 46.842369] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 234 },
      geometry: { type: "Point", coordinates: [-121.728966, 46.842338] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 235 },
      geometry: { type: "Point", coordinates: [-121.728905, 46.84233] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 236 },
      geometry: { type: "Point", coordinates: [-121.728875, 46.842361] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 237 },
      geometry: { type: "Point", coordinates: [-121.728898, 46.842422] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 238 },
      geometry: { type: "Point", coordinates: [-121.72902, 46.842559] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 239 },
      geometry: { type: "Point", coordinates: [-121.729294, 46.842658] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 240 },
      geometry: { type: "Point", coordinates: [-121.729577, 46.842838] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 241 },
      geometry: { type: "Point", coordinates: [-121.729889, 46.84288] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 242 },
      geometry: { type: "Point", coordinates: [-121.730263, 46.84299] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 243 },
      geometry: { type: "Point", coordinates: [-121.730614, 46.843196] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 244 },
      geometry: { type: "Point", coordinates: [-121.73079, 46.843402] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 245 },
      geometry: { type: "Point", coordinates: [-121.730889, 46.843498] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 246 },
      geometry: { type: "Point", coordinates: [-121.731003, 46.843566] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 247 },
      geometry: { type: "Point", coordinates: [-121.731385, 46.843704] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 248 },
      geometry: { type: "Point", coordinates: [-121.732575, 46.843914] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 249 },
      geometry: { type: "Point", coordinates: [-121.73285, 46.844051] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 250 },
      geometry: { type: "Point", coordinates: [-121.733361, 46.844493] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 251 },
      geometry: { type: "Point", coordinates: [-121.733971, 46.844921] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 252 },
      geometry: { type: "Point", coordinates: [-121.734238, 46.844978] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 253 },
      geometry: { type: "Point", coordinates: [-121.735787, 46.845184] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 254 },
      geometry: { type: "Point", coordinates: [-121.737053, 46.845664] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 255 },
      geometry: { type: "Point", coordinates: [-121.737725, 46.845912] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 256 },
      geometry: { type: "Point", coordinates: [-121.73787, 46.846092] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 257 },
      geometry: { type: "Point", coordinates: [-121.737931, 46.846527] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 258 },
      geometry: { type: "Point", coordinates: [-121.737572, 46.8474] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 259 },
      geometry: { type: "Point", coordinates: [-121.737244, 46.847911] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 260 },
      geometry: { type: "Point", coordinates: [-121.737, 46.848083] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 261 },
      geometry: { type: "Point", coordinates: [-121.736832, 46.848133] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 262 },
      geometry: { type: "Point", coordinates: [-121.736626, 46.848155] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 263 },
      geometry: { type: "Point", coordinates: [-121.736519, 46.848228] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 264 },
      geometry: { type: "Point", coordinates: [-121.736496, 46.848358] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 265 },
      geometry: { type: "Point", coordinates: [-121.736504, 46.848518] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 266 },
      geometry: { type: "Point", coordinates: [-121.736435, 46.848663] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 267 },
      geometry: { type: "Point", coordinates: [-121.736352, 46.848747] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 268 },
      geometry: { type: "Point", coordinates: [-121.736268, 46.848815] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 269 },
      geometry: { type: "Point", coordinates: [-121.73626, 46.848842] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 270 },
      geometry: { type: "Point", coordinates: [-121.73629, 46.848857] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 271 },
      geometry: { type: "Point", coordinates: [-121.736458, 46.848876] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 272 },
      geometry: { type: "Point", coordinates: [-121.736878, 46.848869] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 273 },
      geometry: { type: "Point", coordinates: [-121.737015, 46.84877] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 274 },
      geometry: { type: "Point", coordinates: [-121.737092, 46.84872] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 275 },
      geometry: { type: "Point", coordinates: [-121.737259, 46.848747] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 276 },
      geometry: { type: "Point", coordinates: [-121.737351, 46.848754] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 277 },
      geometry: { type: "Point", coordinates: [-121.737557, 46.848667] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 278 },
      geometry: { type: "Point", coordinates: [-121.737694, 46.848583] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 279 },
      geometry: { type: "Point", coordinates: [-121.737931, 46.848579] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 280 },
      geometry: { type: "Point", coordinates: [-121.737992, 46.848701] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 281 },
      geometry: { type: "Point", coordinates: [-121.73816, 46.848754] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 282 },
      geometry: { type: "Point", coordinates: [-121.738305, 46.848781] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 283 },
      geometry: { type: "Point", coordinates: [-121.738488, 46.848785] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 284 },
      geometry: { type: "Point", coordinates: [-121.738678, 46.848754] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 285 },
      geometry: { type: "Point", coordinates: [-121.739083, 46.848648] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 286 },
      geometry: { type: "Point", coordinates: [-121.739274, 46.848621] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 287 },
      geometry: { type: "Point", coordinates: [-121.739296, 46.848773] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 288 },
      geometry: { type: "Point", coordinates: [-121.739396, 46.848876] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 289 },
      geometry: { type: "Point", coordinates: [-121.739563, 46.848953] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 290 },
      geometry: { type: "Point", coordinates: [-121.739777, 46.848941] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 291 },
      geometry: { type: "Point", coordinates: [-121.73996, 46.848945] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 292 },
      geometry: { type: "Point", coordinates: [-121.740143, 46.848979] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 293 },
      geometry: { type: "Point", coordinates: [-121.740387, 46.848922] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 294 },
      geometry: { type: "Point", coordinates: [-121.740677, 46.848827] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 295 },
      geometry: { type: "Point", coordinates: [-121.740777, 46.848991] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 296 },
      geometry: { type: "Point", coordinates: [-121.74125, 46.848983] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 297 },
      geometry: { type: "Point", coordinates: [-121.741433, 46.849143] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 298 },
      geometry: { type: "Point", coordinates: [-121.742142, 46.849338] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 299 },
      geometry: { type: "Point", coordinates: [-121.742829, 46.849491] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 300 },
      geometry: { type: "Point", coordinates: [-121.743401, 46.849567] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 301 },
      geometry: { type: "Point", coordinates: [-121.743683, 46.849563] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 302 },
      geometry: { type: "Point", coordinates: [-121.743859, 46.849704] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 303 },
      geometry: { type: "Point", coordinates: [-121.744004, 46.849739] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 304 },
      geometry: { type: "Point", coordinates: [-121.744164, 46.849876] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 305 },
      geometry: { type: "Point", coordinates: [-121.744401, 46.849872] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 306 },
      geometry: { type: "Point", coordinates: [-121.744607, 46.850063] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 307 },
      geometry: { type: "Point", coordinates: [-121.745339, 46.851245] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 308 },
      geometry: { type: "Point", coordinates: [-121.745644, 46.852333] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 309 },
      geometry: { type: "Point", coordinates: [-121.74672, 46.851123] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 310 },
      geometry: { type: "Point", coordinates: [-121.747521, 46.850608] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 311 },
      geometry: { type: "Point", coordinates: [-121.747857, 46.849849] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 312 },
      geometry: { type: "Point", coordinates: [-121.747696, 46.849582] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 313 },
      geometry: { type: "Point", coordinates: [-121.748322, 46.849018] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 314 },
      geometry: { type: "Point", coordinates: [-121.748528, 46.849121] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 315 },
      geometry: { type: "Point", coordinates: [-121.749955, 46.848758] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 316 },
      geometry: { type: "Point", coordinates: [-121.75026, 46.848751] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 317 },
      geometry: { type: "Point", coordinates: [-121.750435, 46.849609] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 318 },
      geometry: { type: "Point", coordinates: [-121.750603, 46.849796] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 319 },
      geometry: { type: "Point", coordinates: [-121.750962, 46.849796] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 320 },
      geometry: { type: "Point", coordinates: [-121.751389, 46.85009] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 321 },
      geometry: { type: "Point", coordinates: [-121.751809, 46.850822] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 322 },
      geometry: { type: "Point", coordinates: [-121.752366, 46.850631] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 323 },
      geometry: { type: "Point", coordinates: [-121.752572, 46.850811] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 324 },
      geometry: { type: "Point", coordinates: [-121.7528, 46.850749] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 325 },
      geometry: { type: "Point", coordinates: [-121.753121, 46.851253] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 326 },
      geometry: { type: "Point", coordinates: [-121.753296, 46.851432] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 327 },
      geometry: { type: "Point", coordinates: [-121.753518, 46.851451] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 328 },
      geometry: { type: "Point", coordinates: [-121.754105, 46.851245] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 329 },
      geometry: { type: "Point", coordinates: [-121.754807, 46.851074] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 330 },
      geometry: { type: "Point", coordinates: [-121.755311, 46.850887] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 331 },
      geometry: { type: "Point", coordinates: [-121.755478, 46.850887] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 332 },
      geometry: { type: "Point", coordinates: [-121.755791, 46.850975] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 333 },
      geometry: { type: "Point", coordinates: [-121.758835, 46.853446] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 334 },
      geometry: { type: "Point", coordinates: [-121.758973, 46.853626] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 335 },
      geometry: { type: "Point", coordinates: [-121.759041, 46.853656] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 336 },
      geometry: { type: "Point", coordinates: [-121.759125, 46.853633] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 337 },
      geometry: { type: "Point", coordinates: [-121.759202, 46.853656] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 338 },
      geometry: { type: "Point", coordinates: [-121.759331, 46.853572] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 339 },
      geometry: { type: "Point", coordinates: [-121.759385, 46.853569] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 340 },
      geometry: { type: "Point", coordinates: [-121.759537, 46.853698] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 341 },
      geometry: { type: "Point", coordinates: [-121.759598, 46.853706] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 342 },
      geometry: { type: "Point", coordinates: [-121.759774, 46.853458] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 343 },
      geometry: { type: "Point", coordinates: [-121.759987, 46.853282] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 344 },
      geometry: { type: "Point", coordinates: [-121.760094, 46.853122] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 345 },
      geometry: { type: "Point", coordinates: [-121.760277, 46.852958] }
    },
    {
      type: "Feature",
      properties: { coordinate_id: 346 },
      geometry: { type: "Point", coordinates: [-121.760514, 46.85289] }
    }
  ]
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    map: {
      height: (2 * window.innerHeight) / 3,
      width: Math.min(
        window.innerWidth - 2 * theme.spacing(2),
        theme.breakpoints.values.lg
      ),
      margin: "auto"
    }
  })
);

const RouteMap: FunctionComponent<{}> = ({}) => {
  const classes = useStyles();

  const coordinates = geojson.features.map(
    ({ geometry }) =>
      ({
        lng: geometry.coordinates[0],
        lat: geometry.coordinates[1]
      } as LngLat)
  );
  const bounds = coordinates.reduce((bounds, coord) => {
    return bounds.extend(coord);
  }, new LngLatBounds(coordinates[0], coordinates[coordinates.length - 1]));

  return (
    <div className={classes.map}>
      <Map bounds={bounds}>
        <CircleLayer
          features={geojson.features.map(({ geometry, properties }) => ({
            lat: geometry.coordinates[1],
            lng: geometry.coordinates[0],
            id: properties.coordinate_id.toString(),
            colorInHex: "#AAA"
          }))}
          radius={5}
        />
      </Map>
    </div>
  );
};

export default RouteMap;
