export const WIDTH_IN_PER_MODULE = 12.598
export const HEIGHT_IN_PER_MODULE = 6.299
export const FRAME_OFFSET = 3.14

export const pixelPitchOptions = [
  { label: "P2.6mm (Ultra HD)", value: "p2.6", pricePerSqFt: 240 },
  { label: "P3mm (HD)", value: "p3", pricePerSqFt: 190 },
  { label: "P3.9mm (Full HD)", value: "p3.9", pricePerSqFt: 200 },
  { label: "P5mm (Standard)", value: "p5", pricePerSqFt: 150 },
  { label: "P6mm (Economy)", value: "p6", pricePerSqFt: 140 },
  { label: "P8mm (Value)", value: "p8", pricePerSqFt: 130 },
  { label: "P10mm (Billboard)", value: "p10", pricePerSqFt: 99 },
]

export const environmentOptions = [
  { label: "Indoor", value: "indoor", multiplier: 1.0, priceAdderPerSqFt: 0 },
  { label: "Outdoor", value: "outdoor", multiplier: 1.0, priceAdderPerSqFt: 0 },
  { label: "Waterproof", value: "waterproof", multiplier: 1.0, priceAdderPerSqFt: 20 },
]

export const cabinetOptions = [
  { label: "Standard Iron", value: "iron", multiplier: 1.3 },
  { label: "Aluminum (Lightweight)", value: "aluminum", multiplier: 1.0 },
  { label: "Die-cast Aluminum (Premium)", value: "diecast", multiplier: 1.45 },
]

export function calculateLEDDisplay(
  width: number,
  height: number,
  pixelPitch: string,
  environment: string,
  cabinet: string,
  withFrame: boolean = true
) {
  // Conditional module dimensions
  const isP25 = pixelPitch === "p2.6"

  const modWidth = isP25 ? 9.84 : WIDTH_IN_PER_MODULE
  const modHeight = isP25 ? 9.84 : HEIGHT_IN_PER_MODULE

  const offset = withFrame ? FRAME_OFFSET : 0
  const widthInCalc = (width * modWidth) + offset
  const heightInCalc = (height * modHeight) + offset
  const areaSqIn = widthInCalc * heightInCalc
  const areaSqFt = areaSqIn / 144

  const pp = pixelPitchOptions.find((p) => p.value === pixelPitch) || pixelPitchOptions[0]
  const env = environmentOptions.find((e) => e.value === environment) || environmentOptions[0]
  const cab = cabinetOptions.find((c) => c.value === cabinet) || cabinetOptions[0]

  const basePrice = areaSqFt * pp.pricePerSqFt
  const total = (basePrice + (areaSqFt * (env.priceAdderPerSqFt || 0))) * env.multiplier * cab.multiplier

  const widthInVal = width * modWidth
  const heightInVal = height * modHeight

  return {
    areaSqFt: +areaSqFt.toFixed(2),
    basePrice,
    pricePerSqFt: +pp.pricePerSqFt.toFixed(0),
    total: Math.round(total),
    widthIn: +widthInVal.toFixed(2),
    heightIn: +heightInVal.toFixed(2),
    modWidth,
    modHeight,
  }
}
