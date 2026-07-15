"""
Reference OpenCV pipeline for edge inspection demos.

This script shows the handoff shape I use for camera inspection projects:
load a frame, normalize lighting, extract contours, measure areas, and emit
machine-readable inspection results for a dashboard or MES integration.
"""

from __future__ import annotations

import argparse
import json
from dataclasses import asdict, dataclass
from pathlib import Path

import cv2
import numpy as np


@dataclass
class DefectCandidate:
    label: str
    area_px: float
    bbox: tuple[int, int, int, int]
    severity: str


def inspect_frame(path: Path) -> dict:
    image = cv2.imread(str(path))
    if image is None:
        raise FileNotFoundError(f"Could not read image: {path}")

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    normalized = cv2.equalizeHist(blurred)
    edges = cv2.Canny(normalized, 60, 150)
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    candidates: list[DefectCandidate] = []
    for contour in contours:
        area = cv2.contourArea(contour)
        if area < 80:
            continue
        x, y, w, h = cv2.boundingRect(contour)
        aspect = w / max(h, 1)
        if area > 900 or aspect > 5:
            severity = "high" if area > 1800 else "medium"
            candidates.append(DefectCandidate("surface-anomaly", area, (x, y, w, h), severity))

    status = "pass"
    if any(item.severity == "high" for item in candidates):
        status = "fail"
    elif candidates:
        status = "warning"

    return {
        "frame": path.name,
        "status": status,
        "defect_count": len(candidates),
        "defects": [asdict(item) for item in candidates],
        "measurements": {
            "edge_pixels": int(np.count_nonzero(edges)),
            "mean_intensity": round(float(np.mean(gray)), 2),
        },
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("image", type=Path)
    args = parser.parse_args()
    print(json.dumps(inspect_frame(args.image), indent=2))


if __name__ == "__main__":
    main()
