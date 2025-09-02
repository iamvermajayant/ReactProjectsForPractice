import { useState } from "react";

// --- Utility functions ---
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map(c => c + c).join("");
  }
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Lighten or darken a color by percentage
function adjustColor([r, g, b], percent) {
  return rgbToHex(
    Math.min(255, Math.max(0, Math.floor(r + (255 - r) * percent))),
    Math.min(255, Math.max(0, Math.floor(g + (255 - g) * percent))),
    Math.min(255, Math.max(0, Math.floor(b + (255 - b) * percent)))
  );
}

// Darken by multiplying
function darkenColor([r, g, b], percent) {
  return rgbToHex(
    Math.min(255, Math.max(0, Math.floor(r * (1 - percent)))),
    Math.min(255, Math.max(0, Math.floor(g * (1 - percent)))),
    Math.min(255, Math.max(0, Math.floor(b * (1 - percent))))
  );
}

function generateShades(hex) {
  const rgb = hexToRgb(hex);
  const palette = [];

  // lighter tints (90% to 10%)
  for (let i = 9; i >= 1; i--) {
    const percent = i / 10;
    palette.push({
      label: `${i * 10}%`,
      hex: adjustColor(rgb, percent),
    });
  }

  // base color
  palette.push({ label: "0%", hex });

  // darker shades (10% to 100%)
  for (let i = 1; i <= 10; i++) {
    const percent = i / 10;
    palette.push({
      label: `${i * 10}%`,
      hex: darkenColor(rgb, percent),
    });
  }

  return palette;
}

// --- Main Component ---
export default function SimilarPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#f15025");
  const [palette, setPalette] = useState(generateShades("#f15025"));

  const handleSubmit = (e) => {
    e.preventDefault();
    setPalette(generateShades(baseColor));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Color Generator</h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6">
        <input
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="w-12 h-12 cursor-pointer border rounded"
        />
        <input
          type="text"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="p-2 border rounded font-mono w-32"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
        >
          Submit
        </button>
      </form>

      {/* Palette Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-8 gap-0">
        {palette.map((c, i) => (
          <div
            key={i}
            className="h-64 flex flex-col justify-center items-center cursor-pointer"
            style={{ backgroundColor: c.hex }}
            onClick={() => navigator.clipboard.writeText(c.hex)}
          >
            <span
              className="text-xs font-mono px-2 py-1 rounded"
              style={{
                backgroundColor: "rgba(255,255,255,0.7)",
                color: "#000",
              }}
            >
              {c.label}
            </span>
            <span
              className="text-xs font-mono px-2 py-1 rounded mt-1"
              style={{
                backgroundColor: "rgba(255,255,255,0.7)",
                color: "#000",
              }}
            >
              {c.hex}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
