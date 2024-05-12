---
slug: vr-performance-from-amd-3900x-to-5950x
title: VR performance from AMD 3900x to 5950x
description: Exploring CPU bottlenecks in VR with iRacing
authors: [2m]
tags: [vr, hw]
---

import MediumFrametime from "../../src/pages/vr-performance-from-amd-3900x-to-5950x/medium_frametime.md"
import MediumUtil from "../../src/pages/vr-performance-from-amd-3900x-to-5950x/medium_util.md"
import HighFrametime from "../../src/pages/vr-performance-from-amd-3900x-to-5950x/high_frametime.md"
import HighUtil from "../../src/pages/vr-performance-from-amd-3900x-to-5950x/high_util.md"

:::info

This was originally posted on 2020-11-24 on [iRacing subreddit][reddit-post]

:::

[reddit-post]: https://www.reddit.com/r/iRacing/comments/k0byki/vr_frametime_and_utilization_comparison_between/

I was fortunate enough to upgrade my CPU to AMD Ryzen 9 5950x, and I figured to do a frametime and utilization comparison in iRacing using fpsVR.

<!--truncate-->

The test was one lap in Barcelona circuit behind 10 AI cars all driving Audi RS3 LMS.

First run was using medium graphics configuration.

<Img large={require('./medium_settings.png').default} small={require('./medium_settings.small.png').default} />

This is the conservative configuration which allows me to keep 90FPS in almost all of the tracks when racing.
I used to get some parts of Barcelona circuit that would drop to &lt;90FPS with the old CPU.
However the 5950x does not do that any more. As you can see from the graphs, with 5950x both GPU and CPU frametime 99.9 percentile is way below the limit.

<MediumFrametime />
<p style={{display: "flex", justifyContent: "space-between"}}><span>Frametimes</span>[Larger Size](/vr-performance-from-amd-3900x-to-5950x/medium_frametime)</p>

<MediumUtil />
<p style={{display: "flex", justifyContent: "space-between"}}><span>Utilization</span>[Larger Size](/vr-performance-from-amd-3900x-to-5950x/medium_util)</p>

Second run was done using high quality graphics.

<Img large={require('./high_settings.png').default} small={require('./high_settings.small.png').default} />

<HighFrametime />
<p style={{display: "flex", justifyContent: "space-between"}}><span>Frametimes</span>[Larger Size](/vr-performance-from-amd-3900x-to-5950x/high_frametime)</p>

<HighUtil />
<p style={{display: "flex", justifyContent: "space-between"}}><span>Utilization</span>[Larger Size](/vr-performance-from-amd-3900x-to-5950x/high_util)</p>

Obviously here the GPU is the bottleneck. But even here, CPU upgrade still helps to deliver quite a few more frames with low frametimes.
