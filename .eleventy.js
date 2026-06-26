// =============================================================================
// .eleventy.js — Eleventy (11ty) Configuration File
// =============================================================================
// This file controls how Eleventy builds your site.
// You generally won't need to change anything here unless you're adding
// new features or changing the folder structure.
// Documentation: https://www.11ty.dev/docs/
// =============================================================================

module.exports = function (eleventyConfig) {

  // ---------------------------------------------------------------------------
  // PASSTHROUGH FILE COPIES
  // These folders are copied as-is to the output (_site) directory.
  // Add any new asset folders here if you create them.
  // ---------------------------------------------------------------------------
  eleventyConfig.addPassthroughCopy("src/assets");

  // ---------------------------------------------------------------------------
  // BLOG COLLECTION
  // This creates a collection called "posts" from all markdown files in
  // src/blog/posts/. Posts are sorted newest-first.
  // To add a new post, just add a .md file to src/blog/posts/
  // ---------------------------------------------------------------------------
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => b.date - a.date); // newest first
  });

  // ---------------------------------------------------------------------------
  // FILTERS
  // Custom Nunjucks filters used in templates.
  // ---------------------------------------------------------------------------

  // Format a date as "January 1, 2025"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Format a date as "2025" (year only) — used in blog listings
  eleventyConfig.addFilter("year", (dateObj) => {
    return new Date(dateObj).getFullYear();
  });

  // Format a date as "YYYY-MM-DD" for HTML datetime attributes
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    const d = new Date(dateObj);
    return d.toISOString().split("T")[0];
  });

  // Limit an array to N items — used for "Recent Posts" on home page
  eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));

  // ---------------------------------------------------------------------------
  // DIRECTORY CONFIGURATION
  // Tells Eleventy where to find input files and where to put output.
  // input: where your source files live
  // output: where the built site goes (this is what gets deployed)
  // ---------------------------------------------------------------------------
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // Use Nunjucks for .html and .njk files
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
