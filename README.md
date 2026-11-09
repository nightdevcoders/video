# What if all birds disappeared?

A 60-second, 16:9 3D explainer created in JavaScript with Remotion, React Three Fiber and Three.js. The finished video is [`out/world-without-birds.mp4`](out/world-without-birds.mp4): it includes English narration and burned-in English subtitles. The six voice clips are in `public/audio/` and the scene timing, text, 3D models, animation and lighting are editable in `src/video.jsx`.

## Re-render

```sh
npm ci
npm run render
```

Requires Node.js and a compatible Chrome/Chromium installation (Remotion can download its own browser). Use `npm run studio` to edit in Remotion Studio, or `npm run still -- --frame=620` for a still. The composition is 960 × 540 at 24 fps; edit `src/index.jsx` to change output dimensions or duration. The render command uses software WebGL (`swangle`); on a machine with working GPU acceleration, `--gl=angle` may be faster.

In minimal Linux environments, Chromium also needs system libraries such as NSS/NSPR. If needed, `@sparticuz/chromium` is included as a dev dependency and can provide a headless executable; specify it with `--browser-executable=/path/to/chromium` and ensure its required libraries are on `LD_LIBRARY_PATH`.

## Skill and sources

The project-level skill is installed at `.agents/skills/remotion-3d-skill` from [yusqohid/remotion-3d-skill](https://github.com/yusqohid/remotion-3d-skill), commit `63f6f093febe324db98e0c977416b17590363660` (MIT license in the skill folder). The composition follows its deterministic frame-driven 3D and camera guidance; its diorama sunlight rig informed the lighting.

This is a hypothetical explainer, not a prediction of exact outcomes. Birds have diverse ecological roles: [insect control](https://www.birdlife.org/news/2018/07/09/why-we-need-birds-far-more-than-they-need-us/), [seed dispersal and pollination](https://www.audubon.org/news/why-birds-matter) and [scavenging](https://www.birdlife.org/news/2018/05/14/why-vultures-matter-and-what-we-lose-if-they-disappear/). Effects would vary across species and ecosystems.
