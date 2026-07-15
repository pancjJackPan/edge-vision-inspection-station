export type InspectionStatus = "pass" | "warning" | "fail";

export type InspectionFrame = {
  id: string;
  station: string;
  camera: string;
  product: string;
  timestamp: string;
  status: InspectionStatus;
  confidence: number;
  defects: Defect[];
  measurements: Measurement[];
  imageUrl: string;
};

export type Defect = {
  type: "scratch" | "missing-part" | "alignment" | "contamination" | "edge-chip";
  severity: "low" | "medium" | "high";
  bbox: [number, number, number, number];
};

export type Measurement = {
  label: string;
  value: number;
  unit: "mm" | "px" | "%";
  min: number;
  max: number;
};

export type StationHealth = {
  cameraOnline: boolean;
  edgeNodeOnline: boolean;
  fps: number;
  queueDepth: number;
  passRate: number;
  failRate: number;
  meanLatencyMs: number;
};
