# Edge Vision Inspection Station

Production-style computer vision inspection dashboard for manufacturing teams that need camera QA, OpenCV defect detection, edge-node health, and clean handover documentation.

This project demonstrates how I build practical machine-vision tools around embedded or industrial camera workflows: camera status, pass/fail review, measurement limits, defect overlays, shift yield, and API output that can be connected to a factory dashboard, MES, or device gateway.

## What It Shows

- OpenCV inspection pipeline shape for contour/edge based defect candidates
- Next.js operations dashboard for live QA review
- Typed API endpoint for inspection frames and station health
- Synthetic visual frame overlays for pass/warning/fail examples
- Docker deployment for handoff to Linux edge nodes or cloud preview

## Strong Fit For

- OpenCV prototype for industrial inspection
- RK3588 / Jetson / embedded Linux camera dashboard
- Qt/C++ or web-based QA station companion tool
- Defect review UI for manufacturing operators
- Camera pipeline proof of concept before hardware arrives

## Run The Dashboard

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run The OpenCV Reference Pipeline

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python scripts/opencv_inspection.py ./your-camera-frame.png
```

The sample command expects an image path. In client projects this script is wired to RTSP, USB camera capture, file drops, or a message queue.

## API

```bash
curl http://localhost:3000/api/inspections
```

Response includes station health, recent frames, defect candidates, measurements, and yield data.

## Deployment

```bash
docker compose up --build
```

The app is designed to run on a local Linux edge box, RK3588-class gateway, or cloud VM. Camera ingestion can be connected through RTSP/OpenCV, a Python worker, or a device gateway that posts inspection events to the API layer.

## Why This Exists

Many vision projects fail because the model or OpenCV script is disconnected from real operator workflows. This repo shows the full product shape: inspection logic, visual review, status monitoring, deployment, and handover documentation.
