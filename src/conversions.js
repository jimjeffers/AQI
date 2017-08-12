//@flow
import { massForSubstance } from "./molecularWeight"
import type { Unit, Pollutant, Environment } from "./types"

export const ugm3ToPPB = (
  ugm3: number,
  molecularMass: number,
  degreesCelcius: number
): number => ugm3 * (273.15 + degreesCelcius) / 12.187 * molecularMass

export const ppbToUGM3 = (
  ppb: number,
  molecularMass: number,
  degreesCelcius: number
): number => ppb * 12.187 * molecularMass / (273.15 + degreesCelcius)

export const ppbToPPM = (ppb: number): number => ppb * 1000

export const ppmToPPB = (ppb: number): number => ppb / 1000

export const celciusToFarhenheit = (degreesCelcius: number): number =>
  degreesCelcius * 1.8 + 32

export const farhenheitToCelcius = (degreesFarhenheit: number): number =>
  degreesFarhenheit / 1.8 - 32

export const getTemperature = ({ temperature, unit }: Environment): number =>
  unit === "C" ? temperature : farhenheitToCelcius(temperature)

export const convertReadingToUnit = (
  reading: Pollutant,
  environment: Environment,
  to: Unit
): number => {
  const { unit, amount } = reading
  if (unit === to) {
    return amount
  }
  const temperature = getTemperature(environment)
  const molecularMass = massForSubstance(reading.substance)
  const conversion = `${unit}|${to}`
  switch (conversion) {
    case "PPM|PPB":
      return ppmToPPB(amount)
    case "PPM|ug/m3":
      return ppbToUGM3(ppmToPPB(amount), molecularMass, temperature)
    case "PPB|PPM":
      return ppbToPPM(amount)
    case "PPB|ug/m3":
      return ppbToUGM3(amount, molecularMass, temperature)
    case "ug/m3|PPM":
      return ppbToPPM(ugm3ToPPB(amount, molecularMass, temperature))
    case "ug/m3|PPB":
      return ugm3ToPPB(amount, molecularMass, temperature)
    default:
      throw new Error(`Could not convert '${conversion}'`)
  }
}