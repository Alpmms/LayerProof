export default {
  file: "team.html",
  title: "Team",
  description: "LayerProof is developed by co-founders Metehan Alp Memis and Şevval Ulus Memiş as a research-driven construction quality-assurance and decision-support platform.",
  body: (cfg) => `
<section class="page-head"><div class="wrap">
  <h1>Team</h1>
  <p>LayerProof is being developed as a research-driven construction quality-assurance and decision-support platform by two co-founders.</p>
</div></section>

<section class="sec"><div class="wrap">
  <div class="team">
    <article class="person">
      <h2 class="h3" style="font-size:1.9rem">Metehan Alp Memis</h2>
      <p class="role">Co-Founder</p>
      <dl>
        <dt>Position</dt><dd>PhD Student, Civil &amp; Environmental Engineering</dd>
        <dt>Affiliation</dt><dd>University of Illinois Urbana-Champaign</dd>
        <dt>Focus</dt><dd>Transportation infrastructure, pavement engineering, intelligent compaction, field validation, research direction and product development.</dd>
      </dl>
    </article>
    <article class="person">
      <h2 class="h3" style="font-size:1.9rem">Şevval Ulus Memiş</h2>
      <p class="role">Co-Founder</p>
      <dl>
        <dt>Degree</dt><dd>M.S. Data Science, with a background in Computer Engineering and Data Science</dd>
        <dt>Affiliation</dt><dd>Maryville University</dd>
        <dt>Focus</dt><dd>Data science, machine learning, analytics, visualization, data workflows and product and data development.</dd>
      </dl>
    </article>
  </div>
</div></section>

<section class="sec sec-alt"><div class="wrap sec-grid">
  <div class="sec-head"><h2>About the project</h2></div>
  <div class="sec-body">
    <p>LayerProof combines intelligent compaction data, physical field-test evidence and project context to identify where evidence is insufficient and where additional physical verification may be most valuable.</p>
    ${cfg.showICorps ? `<p>Participant, UW–Madison NSF I-Corps Regional Cohort, Fall 2026.</p>` : ""}
    <p class="plain-note">The universities named here are the founders' affiliations. They do not own, sponsor or endorse LayerProof. Participation in an I-Corps cohort is a training and customer-discovery programme; it is not funding for, or an endorsement of, the technology.</p>
    <p><a href="contact.html">Get in touch about a pilot or collaboration</a></p>
  </div>
</div></section>
`,
};
