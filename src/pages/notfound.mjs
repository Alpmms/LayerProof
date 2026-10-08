export default {
  file: "404.html",
  title: "Page not found",
  description: "This page does not exist on the LayerProof website.",
  body: () => `
<section class="page-head"><div class="wrap">
  <h1>Page not found</h1>
  <p>There is no page at this address. The links below go to the pages that exist.</p>
  <p class="cta-row" style="margin-top:22px"><a class="btn btn-primary" data-home href="index.html">Go to the home page</a><a class="btn btn-line" data-home="product.html" href="product.html">See the product</a></p>
</div></section>
`,
};
