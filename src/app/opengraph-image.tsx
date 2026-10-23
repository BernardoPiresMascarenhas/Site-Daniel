import { ImageResponse } from "next/og";
import { identity, seo } from "@/config/site";

export const alt = seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento: apenas dados confirmados e sem o retrato (pendente de aprovação). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#17191b",
          color: "#fbfaf7",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 90,
            top: 120,
            width: 340,
            height: 560,
            borderTopLeftRadius: 170,
            borderTopRightRadius: 170,
            border: "1.5px solid #c7a35e",
            borderBottom: "none",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 125,
            top: 155,
            width: 270,
            height: 520,
            borderTopLeftRadius: 135,
            borderTopRightRadius: 135,
            border: "1px solid rgba(251,250,247,0.18)",
            borderBottom: "none",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 1, background: "#c7a35e", display: "flex" }} />
            <div style={{ fontSize: 20, letterSpacing: 8, color: "#d7bb80" }}>ADVOCACIA</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, letterSpacing: 6, lineHeight: 1.05 }}>{identity.wordmark}</div>
            <div style={{ fontSize: 30, color: "rgba(251,250,247,0.7)", marginTop: 20 }}>{identity.descriptor}</div>
          </div>
          <div style={{ fontSize: 24, color: "#a3a5a6" }}>Família · Trabalho · Previdenciário</div>
        </div>
      </div>
    ),
    size,
  );
}
