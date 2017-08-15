AQI Calc
===

Easily convert pollutant measurements into AQI values per the [EPA's blue scale](https://forum.airnowtech.org/t/the-aqi-equation/169). For additional references on how
AQI is calculated see the thoughtful documentation on Wikipedia for [Computing the AQI](https://en.wikipedia.org/wiki/Air_quality_index#Computing_the_AQI). Also, for a complete
reference on all of the official break points view the official [EPA AQI Breakpoints page](https://aqs.epa.gov/aqsweb/documents/codetables/aqi_breakpoints.html).

Usage
-----

```js
import { calculateAQI } from "aqi-calc"
import type { AQSample } from "aqi-calc"

const sample: AQSample = {
  metric: "O3",
  unit: "PPM",
  value: 0.055,
  temperature:{
    value: 25,
    unit: "C"
  },
  interval: "8H"
}

console.log(calculateAQI(sample)) 
// => {aqi: 51, description: "Moderate", hexColor: "#ff0"}
```

Defining an Air Quality Sample:
-------------------------------

To convert a reading simply provide the input amount, the substance, 
and the unit the input amount represents. See the flow types below for
supported values:

```js
type Substance =
  | "SO2"
  | "CO"
  | "NO2"
  | "O3"
  | "PM2_5"
  | "PM10"

type Unit = "PPM" | "PPB" | "ug/m3"

type AQSample = {
  substance: Substance,
  interval: Interval,
  amount: number,
  unit: Unit,
  temperature?: Temperature
}
```

Defining the Temperature:
-------------------------

The ambient temperature where the reading occured affects the air density and thus
the AQI calculations. If you do not know the temperature a default environment
assuming 25C will be used during any conversions.

```js
type TemperatureScale = "F" | "C"

type Temperature = {
  value: number,
  unit: TemperatureScale
}
```

Result Output:
--------

The ouput of the calculateAQI method is returned as an `AQIResult` type which
defines the resulting AQI along with the corresponding description and hex color
for the matching break point:

```js
export type AirQualityDescription =
  | "Good"
  | "Moderate"
  | "Unhealthy For Sensitive"
  | "Unhealthy"
  | "Very Unhealthy"
  | "Hazardous"

type AQIResult = {
  aqi: number,
  description: AirQualityDescription,
  hexColor: string
}
```