import { AlertTriangle, Camera, CheckCircle2, Cpu, Gauge, Network, PackageCheck, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { hourlyYield, inspectionFrames, stationHealth } from "@/lib/inspection-data";

const statusStyle = {
  pass: "statusPass",
  warning: "statusWarning",
  fail: "statusFail"
} as const;

export default function Home() {
  const latest = inspectionFrames[0];
  const failed = inspectionFrames.filter((frame) => frame.status === "fail").length;
  const reviewed = inspectionFrames.filter((frame) => frame.status === "warning").length;

  return (
    <main className="shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Edge QA station</p>
          <h1>OpenCV inspection dashboard for camera-based production lines</h1>
        </div>
        <div className="topStatus">
          <span className="pulse" />
          Live station feed
        </div>
      </section>

      <section className="metricsGrid">
        <Metric icon={<Camera />} label="Camera" value={stationHealth.cameraOnline ? "Online" : "Offline"} />
        <Metric icon={<Cpu />} label="Edge node" value={stationHealth.edgeNodeOnline ? "Healthy" : "Down"} />
        <Metric icon={<Gauge />} label="Latency" value={`${stationHealth.meanLatencyMs} ms`} />
        <Metric icon={<PackageCheck />} label="Pass rate" value={`${stationHealth.passRate}%`} />
      </section>

      <section className="workspace">
        <div className="visionPanel">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">Latest frame</p>
              <h2>{latest.product}</h2>
            </div>
            <span className={clsx("statusPill", statusStyle[latest.status])}>{latest.status}</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="inspectionImage" src={latest.imageUrl} alt="Latest inspection frame with overlay" />
          <div className="measurementGrid">
            {latest.measurements.map((item) => (
              <div key={item.label} className="measurement">
                <span>{item.label}</span>
                <strong>
                  {item.value}
                  {item.unit}
                </strong>
                <small>
                  spec {item.min} to {item.max}
                  {item.unit}
                </small>
              </div>
            ))}
          </div>
        </div>

        <aside className="sidePanel">
          <div className="panelHeader compact">
            <div>
              <p className="eyebrow">Today</p>
              <h2>Quality queue</h2>
            </div>
            <Network />
          </div>
          <div className="queueStats">
            <span>
              <strong>{failed}</strong> failed
            </span>
            <span>
              <strong>{reviewed}</strong> review
            </span>
            <span>
              <strong>{stationHealth.queueDepth}</strong> queued
            </span>
          </div>
          <div className="frameList">
            {inspectionFrames.map((frame) => (
              <article key={frame.id} className="frameItem">
                <div className="frameIcon">
                  {frame.status === "pass" ? <CheckCircle2 /> : frame.status === "warning" ? <AlertTriangle /> : <XCircle />}
                </div>
                <div>
                  <strong>{frame.id}</strong>
                  <span>{frame.defects.length ? frame.defects.map((defect) => defect.type).join(", ") : "No defects detected"}</span>
                </div>
                <em>{Math.round(frame.confidence * 100)}%</em>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="yieldPanel">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Shift yield</p>
            <h2>Pass/fail trend</h2>
          </div>
          <span>{stationHealth.fps} FPS</span>
        </div>
        <div className="barChart">
          {hourlyYield.map((item) => {
            const total = item.pass + item.fail;
            return (
              <div className="barGroup" key={item.hour}>
                <div className="barTrack">
                  <span className="barPass" style={{ height: `${(item.pass / total) * 100}%` }} />
                  <span className="barFail" style={{ height: `${(item.fail / total) * 100}%` }} />
                </div>
                <small>{item.hour}</small>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <article className="metric">
      <div className="metricIcon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
