export default function HakunaMethodBlock({ bridge, context = "course" }) {
  if (!bridge) return null;

  const required = bridge.requirement_level === "required";
  const leadLabel = required ? "REQUIRED PRE-WORK" : "FOUNDER METHOD";
  const preworkLabel = context === "consultation" ? "BEFORE THE ROOM" : "BEFORE THE BUILD";
  const ctaLabel = bridge.purchase_url ? "Get Hakuna Matata →" : null;

  return (
    <section className="hakuna-method">
      <div className="hakuna-method-copy">
        <small>{leadLabel}</small>
        <h2>PEACE UNDER PRESSURE.<br/><em>PROOF OVER NOISE.</em></h2>
        <p>{bridge.sales_copy || "Hakuna Matata is the founder-discipline method behind how Dr. Dorsey makes decisions under pressure, protects focus, and keeps execution moving."}</p>
        <div className="hakuna-method-tags">
          <span>FOUNDER DISCIPLINE</span>
          <span>PRESSURE → EVIDENCE</span>
          <span>BOUNDARY → NEXT MOVE</span>
        </div>
      </div>
      <div className="hakuna-method-panel">
        <small>{preworkLabel}</small>
        <p>{bridge.prework_prompt || "Name the pressure. Separate reaction from evidence. Set the boundary. Decide the next move."}</p>
        {bridge.completion_prompt ? <><small>EXIT PROMPT</small><p>{bridge.completion_prompt}</p></> : null}
        {ctaLabel ? <a className="ghost-action" href={bridge.purchase_url} target="_blank" rel="noreferrer">{ctaLabel}</a> : null}
      </div>
    </section>
  );
}
