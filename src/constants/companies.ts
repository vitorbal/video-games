import groupBy from "lodash/groupBy";

export const platformToCompany = {
  Wii: "Nintendo",
  NES: "Nintendo",
  GB: "Nintendo",
  GBA: "Nintendo",
  DS: "Nintendo",
  X360: "Microsoft",
  XB: "Microsoft",
  PS4: "Sony",
  PS3: "Sony",
  PS2: "Sony",
  PS: "Sony",
  PSP: "Sony",
  SNES: "Nintendo",
  "3DS": "Nintendo",
  N64: "Nintendo",
  GEN: "Sega",
  GG: "Sega",
  SCD: "Sega",
  SAT: "Sega",
  PC: "PC",
};

export const companies = Object.keys(groupBy(platformToCompany));
