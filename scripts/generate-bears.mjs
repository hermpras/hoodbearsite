import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'assets', 'bears');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 24x24 pixel grid representation of bears
const bears = [
  {
    id: 1,
    name: "Classic Honey",
    bg: "#FEF3C7",
    fur: "#D97706",
    furDark: "#B45309",
    muzzle: "#FDE68A",
    hoodie: "#DC2626",
    hoodieDark: "#991B1B",
    eyes: "#1E293B",
    accessory: "none"
  },
  {
    id: 2,
    name: "Cyber Bear",
    bg: "#0F172A",
    fur: "#0284C7",
    furDark: "#0369A1",
    muzzle: "#BAE6FD",
    hoodie: "#334155",
    hoodieDark: "#1E293B",
    eyes: "#38BDF8",
    accessory: "visor"
  },
  {
    id: 3,
    name: "Crown King",
    bg: "#FAF5FF",
    fur: "#F59E0B",
    furDark: "#D97706",
    muzzle: "#FEF3C7",
    hoodie: "#7E22CE",
    hoodieDark: "#581C87",
    eyes: "#18181B",
    accessory: "crown"
  },
  {
    id: 4,
    name: "Panda Streetwear",
    bg: "#ECFDF5",
    fur: "#E2E8F0",
    furDark: "#CBD5E1",
    muzzle: "#F8FAFC",
    hoodie: "#EA580C",
    hoodieDark: "#C2410C",
    eyes: "#0F172A",
    accessory: "panda_ear"
  },
  {
    id: 5,
    name: "Cool Shades",
    bg: "#FFFBEB",
    fur: "#854D0E",
    furDark: "#713F12",
    muzzle: "#FEF08A",
    hoodie: "#15803D",
    hoodieDark: "#166534",
    eyes: "#000000",
    accessory: "sunglasses"
  },
  {
    id: 6,
    name: "Astro Bear",
    bg: "#1E1B4B",
    fur: "#6366F1",
    furDark: "#4F46E5",
    muzzle: "#C7D2FE",
    hoodie: "#F8FAFC",
    hoodieDark: "#E2E8F0",
    eyes: "#818CF8",
    accessory: "helmet"
  },
  {
    id: 7,
    name: "Grizzly Beanie",
    bg: "#F0FDF4",
    fur: "#78350F",
    furDark: "#451A03",
    muzzle: "#FDE68A",
    hoodie: "#047857",
    hoodieDark: "#065F46",
    eyes: "#1C1917",
    accessory: "beanie"
  },
  {
    id: 8,
    name: "Shadow Ninja",
    bg: "#18181B",
    fur: "#3F3F46",
    furDark: "#27272A",
    muzzle: "#71717A",
    hoodie: "#09090B",
    hoodieDark: "#000000",
    eyes: "#EF4444",
    accessory: "headband"
  },
  {
    id: 9,
    name: "Pastel Cute",
    bg: "#FDF2F8",
    fur: "#F472B6",
    furDark: "#E11D48",
    muzzle: "#FCE7F3",
    hoodie: "#FDE047",
    hoodieDark: "#EAB308",
    eyes: "#BE185D",
    accessory: "hearts"
  },
  {
    id: 10,
    name: "Retro Beats",
    bg: "#FFF7ED",
    fur: "#9A3412",
    furDark: "#7C2D12",
    muzzle: "#FFEDD5",
    hoodie: "#1E40AF",
    hoodieDark: "#1E3A8A",
    eyes: "#0F172A",
    accessory: "headphones"
  },
  {
    id: 11,
    name: "Star Wizard",
    bg: "#0F172A",
    fur: "#A855F7",
    furDark: "#7E22CE",
    muzzle: "#F3E8FF",
    hoodie: "#2563EB",
    hoodieDark: "#1D4ED8",
    eyes: "#FDE047",
    accessory: "wizard_hat"
  },
  {
    id: 12,
    name: "Inferno Bear",
    bg: "#450A0A",
    fur: "#EF4444",
    furDark: "#B91C1C",
    muzzle: "#FCA5A5",
    hoodie: "#F59E0B",
    hoodieDark: "#D97706",
    eyes: "#FEF08A",
    accessory: "flames"
  }
];

function generatePixelBearSVG(bear) {
  const grid = Array(24).fill(null).map(() => Array(24).fill(null));

  for(let r=0; r<24; r++) {
    for(let c=0; c<24; c++) {
      grid[r][c] = bear.bg;
    }
  }

  for(let r=5; r<=14; r++) {
    for(let c=6; c<=17; c++) {
      grid[r][c] = bear.fur;
    }
  }
  for(let r=3; r<=5; r++) {
    for(let c=4; c<=7; c++) {
      grid[r][c] = bear.fur;
    }
  }
  grid[4][5] = bear.furDark;
  grid[4][6] = bear.furDark;

  for(let r=3; r<=5; r++) {
    for(let c=16; c<=19; c++) {
      grid[r][c] = bear.fur;
    }
  }
  grid[4][17] = bear.furDark;
  grid[4][18] = bear.furDark;

  for(let c=6; c<=17; c++) {
    grid[14][c] = bear.furDark;
  }

  for(let r=9; r<=12; r++) {
    for(let c=9; c<=14; c++) {
      grid[r][c] = bear.muzzle;
    }
  }
  grid[9][11] = "#0F172A";
  grid[9][12] = "#0F172A";
  grid[10][11] = "#0F172A";
  grid[10][12] = "#0F172A";

  grid[11][11] = "#0F172A";
  grid[11][12] = "#0F172A";
  grid[12][10] = "#0F172A";
  grid[12][13] = "#0F172A";

  grid[7][8] = bear.eyes;
  grid[7][9] = bear.eyes;
  grid[8][8] = bear.eyes;
  grid[8][9] = bear.eyes;

  grid[7][14] = bear.eyes;
  grid[7][15] = bear.eyes;
  grid[8][14] = bear.eyes;
  grid[8][15] = bear.eyes;

  grid[7][8] = "#FFFFFF";
  grid[7][14] = "#FFFFFF";

  for(let r=14; r<=23; r++) {
    for(let c=4; c<=19; c++) {
      grid[r][c] = bear.hoodie;
    }
  }

  for(let r=14; r<=16; r++) {
    grid[r][11] = bear.hoodieDark;
    grid[r][12] = bear.hoodieDark;
  }
  grid[16][10] = "#FFFFFF";
  grid[16][13] = "#FFFFFF";
  grid[17][10] = "#FFFFFF";
  grid[17][13] = "#FFFFFF";

  for(let c=4; c<=19; c++) {
    grid[23][c] = bear.hoodieDark;
  }
  for(let r=14; r<=22; r++) {
    grid[r][4] = bear.hoodieDark;
    grid[r][19] = bear.hoodieDark;
  }

  if (bear.accessory === "sunglasses" || bear.accessory === "visor") {
    const glassColor = bear.accessory === "visor" ? "#06B6D4" : "#0F172A";
    const shineColor = bear.accessory === "visor" ? "#E0F2FE" : "#64748B";
    for(let c=7; c<=16; c++) {
      grid[7][c] = glassColor;
      grid[8][c] = glassColor;
    }
    grid[7][8] = shineColor;
    grid[7][13] = shineColor;
  } else if (bear.accessory === "crown") {
    for(let c=8; c<=15; c++) grid[4][c] = "#F59E0B";
    for(let c=8; c<=15; c++) grid[3][c] = "#FBBF24";
    grid[2][8] = "#FBBF24"; grid[2][11] = "#FBBF24"; grid[2][12] = "#FBBF24"; grid[2][15] = "#FBBF24";
    grid[1][8] = "#EF4444"; grid[1][11] = "#3B82F6"; grid[1][12] = "#3B82F6"; grid[1][15] = "#EF4444";
  } else if (bear.accessory === "beanie") {
    for(let r=2; r<=4; r++) {
      for(let c=6; c<=17; c++) {
        grid[r][c] = "#047857";
      }
    }
    for(let c=5; c<=18; c++) grid[5][c] = "#065F46";
  } else if (bear.accessory === "headphones") {
    for(let c=6; c<=17; c++) grid[2][c] = "#EAB308";
    for(let r=5; r<=9; r++) {
      grid[r][4] = "#EAB308"; grid[r][5] = "#CA8A04";
      grid[r][18] = "#CA8A04"; grid[r][19] = "#EAB308";
    }
  } else if (bear.accessory === "wizard_hat") {
    grid[0][11] = "#FDE047"; grid[0][12] = "#FDE047";
    for(let c=10; c<=13; c++) grid[1][c] = "#1D4ED8";
    for(let c=9; c<=14; c++) grid[2][c] = "#1D4ED8";
    for(let c=8; c<=15; c++) grid[3][c] = "#1D4ED8";
    for(let c=5; c<=18; c++) grid[4][c] = "#1E40AF";
  } else if (bear.accessory === "headband") {
    for(let c=6; c<=17; c++) grid[5][c] = "#DC2626";
    grid[5][18] = "#B91C1C"; grid[6][18] = "#B91C1C";
  } else if (bear.accessory === "helmet") {
    for(let c=6; c<=17; c++) {
      grid[4][c] = "rgba(255,255,255,0.7)";
    }
    for(let r=5; r<=13; r++) {
      grid[r][5] = "rgba(255,255,255,0.7)";
      grid[r][18] = "rgba(255,255,255,0.7)";
    }
  }

  let rects = "";
  for(let r=0; r<24; r++) {
    for(let c=0; c<24; c++) {
      if (grid[r][c]) {
        rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="${grid[r][c]}" />`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="280" height="280" style="image-rendering: pixelated; shape-rendering: crispEdges;">
  ${rects}
</svg>`;
}

bears.forEach((bear) => {
  const svgContent = generatePixelBearSVG(bear);
  const filePath = path.join(outDir, `bear_${bear.id}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
});

console.log("Successfully generated 12 pixel bear SVG assets in public/assets/bears/");
