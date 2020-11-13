const documentation = [
    {
      href: "introduction-to-media-bits",
      title: "Introduction to Media-Bits",
      body: "Media-Bits is a ...",
      videoURL: "https://you.tube/crgcrg"
    },
    {
      href: "getting-started-with-your-first-project",
      title: "Getting started with your first project",
      body: "...",
      videoURL: "https://you.tube/gfh"
    }
  ]

const getOnlyDocumentation = () => {
    return documentation.map(doc => ({
        title: doc.title,
        body: doc.body,
        href: doc.href
    })
    );
}

const getOnlyVideos = () => {
    return documentation.map(doc => ({
      title: doc.title,
      href: doc.href,
      videoURL: doc.videoURL
    }));
}

const _getOnlyDocumentation = getOnlyDocumentation;
export { _getOnlyDocumentation as getOnlyDocumentation };
const _getOnlyVideos = getOnlyVideos;
export { _getOnlyVideos as getOnlyVideos };