import calculateAQI from "../calculateAQI"

test("calculate moderate a ozone reading", () => {
  const ozone = { substance: "O3", amount: 0.055, unit: "PPM" }
  const environment = { temperature: 25, unit: "C" }
  const aqi = calculateAQI(ozone, environment)
  expect(aqi).toEqual(51)
})

// export type Pollutant = {
//   substance: Substance,
//   amount: number,
//   unit: Unit
// }

// export type Environment = {
//   temperature: number,
//   unit: TemperatureScale
// }
