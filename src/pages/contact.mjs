import { contactBlock, demoCta, ctaRow, guardrail } from "../site.mjs";

export default {
  file: "contact.html",
  title: "Contact",
  description: "Contact the LayerProof team about research collaboration, field-data collaboration, pilot opportunities, or feedback from agencies, contractors and testing organizations.",
  body: (cfg) => `
<section class="page-head"><div class="wrap">
  <h1>Contact and collaboration</h1>
  <p>Interested in evaluating LayerProof on a real intelligent-compaction project?</p>
</div></section>

<section class="sec"><div class="wrap sec-grid">
  <div class="sec-head"><h2>Who we would like to hear from</h2></div>
  <div class="sec-body">
    <ul class="facts">
      <li><strong>Field-data collaboration</strong>Roller exports together with physical tests from the same site, layer and pass.</li>
      <li><strong>Pilot opportunities</strong>An upcoming project that uses intelligent compaction and could run the workflow alongside its own process.</li>
      <li><strong>Transportation agencies</strong>How verification testing is specified today, and where the evidence feels thin.</li>
      <li><strong>Contractors</strong>How roller data is used on site, and what would make it more useful.</li>
      <li><strong>Testing and quality-assurance organizations</strong>How test locations are chosen and recorded in practice.</li>
      <li><strong>Research groups</strong>Work on compaction, pavement foundations or construction quality assurance.</li>
    </ul>
    <div class="sub">${contactBlock(cfg)}</div>
    <div style="margin-top:16px">${ctaRow(`<a class="btn btn-line" href="pilot.html">What a pilot involves</a>`, `<a class="btn btn-line" href="research.html">View the evidence</a>`, demoCta(cfg))}</div>
  </div>
</div></section>

<section class="sec sec-alt"><div class="wrap sec-grid">
  <div class="sec-head"><h2>What to expect</h2></div>
  <div class="sec-body">
    <p>LayerProof is a research prototype. It is not commercially available and is not production-certified. A first conversation is about whether your data and workflow are a fit for an evaluation, and what such an evaluation could and could not show.</p>
    ${guardrail()}
  </div>
</div></section>
`,
};
