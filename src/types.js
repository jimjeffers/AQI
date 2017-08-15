//@flow

export type Substance = "CO" | "NO2" | "O3" | "SO2" | "PM2_5" | "PM10"

export type Unit = "PPM" | "PPB" | "ug/m3"

export type Interval = "1H" | "8H" | "24H"

export type AirQualityDescription =
  | "Good"
  | "Moderate"
  | "Unhealthy For Sensitive"
  | "Unhealthy"
  | "Very Unhealthy"
  | "Hazardous"

export type TemperatureScale = "F" | "C"

export type Temperature = {
  value: number,
  unit: TemperatureScale
}

export type AQSample = {
  substance: Substance,
  interval: Interval,
  amount: number,
  unit: Unit,
  temperature?: Temperature
}

export type Range = {
  high: number,
  low: number
}

export type Concentration = {
  range: Range,
  unit: Unit,
  interval: Interval
}

export type AQILevel = {
  concentrations: Array<Concentration>,
  aqi: Range,
  aqiDescription: AirQualityDescription
}

export type AQISearchResult = {
  aqiLevel: AQILevel,
  concentration: Concentration
}

export type AQIResult = {
  aqi: number,
  description: AirQualityDescription,
  hexColor: string
}

export type RangeValues = {
  O3: Array<AQILevel>,
  PM2_5: Array<AQILevel>,
  PM10: Array<AQILevel>,
  NO2: Array<AQILevel>,
  CO: Array<AQILevel>,
  SO2: Array<AQILevel>
}
