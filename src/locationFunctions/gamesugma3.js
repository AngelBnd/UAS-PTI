import { useState } from "react";

export function game31(setStats) {
  setStats((prev) => ({
    ...prev,
    hungerBar: prev.hungerBar + 7,
  }));
  console.log("Tombol game31");
}

export function game32(setStats) {
  setStats((prev) => ({
    ...prev,
    hungerBar: prev.hungerBar - 3,
  }));
  console.log("Tombol game32");
}
