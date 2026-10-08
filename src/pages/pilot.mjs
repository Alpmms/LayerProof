import { shot, guardrail, contactBlock, demoCta, ctaRow } from "../site.mjs";

export default {
  file: "pilot.html",
  title: "Pilot",
  description: "How a LayerProof pilot would run on an intelligent-compaction project, what the project needs to provide, and what has and has not been shown so far.",
  body: (cfg) => `
<section class="page-head"><div class="wrap">
  <h1>Running a pilot</h1>
  <p>The software workflow for a pilot is implemented. A prospective field pilot has not been run yet, and that is what we are looking for partners to do.</p>
</div></section>

<section class="sec" id="workflow"><div class="wrap sec-grid">
  <div class="sec-head"><h2>The loop</h2><p>From the first import to the updated evidence after a new test.</p></div>
  <div class="sec-body">
    <ol class="pipe">
      <li><strong>Import</strong><span>Roller exports and existing test records</span></li>
      <li><strong>Validate</strong><span>Location, time, units, structure</span></li>
      <li><strong>Evidence</strong><span>What is paired with a physical test, and what is not</span></li>
      <li><strong>Support</strong><span>A state per location and pass, with gaps in view</span></li>
      <li><strong>Verify</strong><span>Candidates with reasons; the engineer's decision is recorded</span></li>
      <li><strong>Field test</strong><span>Taken in the field by the project team</span></li>
      <li><strong>Update</strong><span>Compare the evidence before and after</span></li>
    </ol>
    ${guardrail("Decision support, not an engineering acceptance determination. Final test location selection remains with the engineer.")}
  </div>
</div></section>

<section class="sec sec-alt" id="readiness"><div class="wrap sec-grid">
  <div class="sec-head"><h2>Readiness checklist</h2><p>What LayerProof needs from a project before the loop can start.</p></div>
  <div class="sec-body">
    <ul class="facts">
      <li><strong>Project metadata</strong>Working coordinate system and time zone.</li>
      <li><strong>Roller data with its source</strong>An intelligent-compaction export, fingerprinted and versioned.</li>
      <li><strong>A legitimate spatial reference</strong>A confirmed coordinate system, or location tags defined by the source.</li>
      <li><strong>Roller and machine details</strong>At least the roller in use.</li>
      <li><strong>Layer, material and pass context</strong>So tests are compared with the right roller passes.</li>
      <li><strong>Existing physical tests</strong>Whatever has been taken so far, with locations.</li>
      <li><strong>A validation result</strong>With no blocking finding.</li>
      <li><strong>An engineer</strong>To review the candidates and decide.</li>
    </ul>
    ${shot("pilot-readiness", "The readiness checklist in the application. The status describes what a pilot needs, not the construction.")}
  </div>
</div></section>

<section class="sec" id="decisions"><div class="wrap sec-grid">
  <div class="sec-head"><h2>The engineer decides</h2><p>LayerProof records the decision. It does not make it.</p></div>
  <div class="sec-body">
    <p>For each candidate an engineer can select it, defer it, reject it, or choose a different location and say why. The decision is appended to the history next to the candidate. The ranking that LayerProof produced is kept as it was, so the record shows both what was suggested and what was done.</p>
    <p>When the new physical test comes back, it is imported like any other file. The evidence-support assessment is rerun, and the two assessments are compared side by side. No model is retrained.</p>
    ${shot("pilot-decisions", "The review log. The decision shown was entered by an automated software test, not by a practising engineer.")}
  </div>
</div></section>

<section class="sec sec-alt" id="status"><div class="wrap sec-grid">
  <div class="sec-head"><h2>Where things stand</h2><p>Stated plainly, so a partner knows what they would be evaluating.</p></div>
  <div class="sec-body">
    <ul>
      <li>The workflow runs end to end in the application on real field-trial data.</li>
      <li>The ranking has been checked retrospectively against simple baselines. The recorded outcome is no clear retrospective advantage. <a href="research.html#retrospective">Details</a>.</li>
      <li>The priority has also been evaluated retrospectively on a public NCHRP/MnROAD spatial field dataset. No clear advantage over the comparison baselines was observed. <a href="research.html#external-spatial">Details</a>.</li>
      <li>No prospective field pilot has been run. No agency or contractor has used LayerProof on a live project.</li>
      <li>LayerProof is a research prototype and is not production-certified.</li>
    </ul>
    <p>A pilot is how the open question gets answered: on a live project, do the candidates LayerProof raises help an engineer place tests where they add evidence?</p>
  </div>
</div></section>

<section class="cta-band"><div class="wrap">
  <h2>Interested in evaluating LayerProof on a real intelligent-compaction project?</h2>
  <p>We welcome conversations about field-data collaboration and pilot opportunities with transportation agencies, contractors, testing and quality-assurance organizations, and research groups.</p>
  ${contactBlock(cfg)}
  ${ctaRow(`<a class="btn btn-line" href="contact.html">Contact and collaboration</a>`, demoCta(cfg))}
</div></section>
`,
};
