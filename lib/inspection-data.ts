import type { InspectionFrame, StationHealth } from "./types";

const now = Date.now();

export const stationHealth: StationHealth = {
  cameraOnline: true,
  edgeNodeOnline: true,
  fps: 28.6,
  queueDepth: 4,
  passRate: 97.2,
  failRate: 2.8,
  meanLatencyMs: 82
};

export const inspectionFrames: InspectionFrame[] = [
  {
    id: "A-10491",
    station: "Line A",
    camera: "IMX415 top camera",
    product: "Aluminum control plate",
    timestamp: new Date(now - 18_000).toISOString(),
    status: "pass",
    confidence: 0.994,
    defects: [],
    measurements: [
      { label: "Hole center offset", value: 0.12, unit: "mm", min: -0.3, max: 0.3 },
      { label: "Edge burr ratio", value: 1.8, unit: "%", min: 0, max: 5 }
    ],
    imageUrl: "/api/inspection-image?id=A-10491"
  },
  {
    id: "A-10490",
    station: "Line A",
    camera: "IMX415 top camera",
    product: "Aluminum control plate",
    timestamp: new Date(now - 42_000).toISOString(),
    status: "warning",
    confidence: 0.927,
    defects: [
      { type: "alignment", severity: "medium", bbox: [54, 44, 18, 16] }
    ],
    measurements: [
      { label: "Hole center offset", value: 0.28, unit: "mm", min: -0.3, max: 0.3 },
      { label: "Edge burr ratio", value: 4.6, unit: "%", min: 0, max: 5 }
    ],
    imageUrl: "/api/inspection-image?id=A-10490"
  },
  {
    id: "A-10489",
    station: "Line A",
    camera: "IMX415 top camera",
    product: "Aluminum control plate",
    timestamp: new Date(now - 79_000).toISOString(),
    status: "fail",
    confidence: 0.971,
    defects: [
      { type: "scratch", severity: "high", bbox: [32, 62, 38, 8] },
      { type: "edge-chip", severity: "medium", bbox: [78, 18, 10, 14] }
    ],
    measurements: [
      { label: "Hole center offset", value: 0.41, unit: "mm", min: -0.3, max: 0.3 },
      { label: "Edge burr ratio", value: 6.2, unit: "%", min: 0, max: 5 }
    ],
    imageUrl: "/api/inspection-image?id=A-10489"
  }
];

export const hourlyYield = [
  { hour: "08:00", pass: 312, fail: 7 },
  { hour: "09:00", pass: 328, fail: 9 },
  { hour: "10:00", pass: 341, fail: 8 },
  { hour: "11:00", pass: 336, fail: 13 },
  { hour: "12:00", pass: 306, fail: 11 },
  { hour: "13:00", pass: 352, fail: 10 }
];
