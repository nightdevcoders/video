# What if all birds disappeared?

A 60-second, 16:9 photo-based explainer. The final edit combines six AI-generated nature documentary-style images with slow keyframed pans and zooms, cross-dissolves, soft English narration and burned-in English subtitles. The images are generated illustrations, not documentary photographs or real footage.

- Final video: [`out/world-without-birds.mp4`](out/world-without-birds.mp4)
- Optional subtitle file: [`out/world-without-birds.srt`](out/world-without-birds.srt)
- Image keyframes: `public/keyframes/`
- Voice clips: `public/audio/`
- Caption text and approximate timing: `src/captions.js`
- Editing timeline: `src/photo-video.jsx`

## Re-render or edit

```sh
npm ci
npm run render
node scripts/export-srt.mjs
```

Requires Node.js and a compatible Chrome/Chromium installation (Remotion can download its own browser). `npm run studio` opens the timeline in Remotion Studio; `npm run still -- --frame=620` renders a still. The composition is 1280 × 720 at 24 fps, configured in `src/index.jsx`. The render command uses software WebGL (`swangle`); on a machine with GPU acceleration, `--gl=angle` may be faster.

In minimal Linux environments, Chromium also needs system libraries such as NSS/NSPR. If needed, `@sparticuz/chromium` is included as a dev dependency and can provide a headless executable; specify it with `--browser-executable=/path/to/chromium` and ensure its required libraries are on `LD_LIBRARY_PATH`.

## Previous 3D skill

The previously installed project-level skill remains at `.agents/skills/remotion-3d-skill`, from [yusqohid/remotion-3d-skill](https://github.com/yusqohid/remotion-3d-skill), commit `63f6f093febe324db98e0c977416b17590363660` (MIT license in the skill folder). The current video uses generated images instead of its 3D models.

This is a hypothetical explainer, not a prediction of exact outcomes. Birds have diverse ecological roles: [insect control](https://www.birdlife.org/news/2018/07/09/why-we-need-birds-far-more-than-they-need-us/), [seed dispersal and pollination](https://www.audubon.org/news/why-birds-matter) and [scavenging](https://www.birdlife.org/news/2018/05/14/why-vultures-matter-and-what-we-lose-if-they-disappear/). Effects would vary across species and ecosystems.
