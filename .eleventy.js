export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_layouts");
	eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
};