import { ImageResponse } from "next/og";

export const alt = "Abhijeet Gupta — Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#090b0e", color: "#f3f6f8", padding: 72, fontFamily: "sans-serif", border: "1px solid #27323d" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#8ee8ff", fontSize: 25 }}><span>AG / PORTFOLIO</span><span>MUMBAI, INDIA</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 76, letterSpacing: -4, fontWeight: 700 }}>Abhijeet Gupta</div><div style={{ fontSize: 38, color: "#9ba7b3", marginTop: 16 }}>Full Stack Engineer · SaaS · Systems</div></div>
      <div style={{ fontSize: 25, color: "#9ba7b3" }}>Next.js / React / Node.js / Java / Spring Boot</div>
    </div>, size
  );
}
