---
slug: multi-threading-and-vr
title: Multi-threading and VR
description: Turning off HyperThreading in BIOS bumped up FPS in VR from ~60 during race starts to solid 90.
authors: [2m]
tags: [vr, hw]
---

:::info

This was originally posted on 2019-03-31 on [iRacing subreddit][reddit-post]

:::

[reddit-post]: https://www.reddit.com/r/iRacing/comments/b7rcm3/my_quest_for_high_fps_while_in_vr/

:::info
TLDR: turning off HyperThreading in BIOS bumped up FPS in VR from ~60 during starts to solid 90.
:::

I have just recently started iRacing and this week I was racing quite a bit in the Lime Rock Park with MX-5. Unfortunately I used to get around 60 FPS during starts and that is a very tense part of the race. Every frame counts during those moments. Since I have a pretty decent system, I though I should be able to get more FPS in VR. My relevant PC specs are:

Intel i7-4790K, 32GB Ram, Radeon VII and Samsung Odyssey+

First I turned down most of the graphics settings in iRacing. But even if turning off cubemaps and shadows would bump the FPS quite a bit, it was still far from solid 90. Then I noticed that some parts of the track are fine, but others are still choppy. Turning off Event Objects, Crowds and Grandstands helped with that a bit, but still no cigar.

Then after quite a bit of searching I noticed old forum threads regarding the multi-thread usage of iRacing almost three years ago, where setting CPU affinity of iRacing to a single core would help quite a bit. But that was acknowledged as a bug and was fixed in iRacing since. I tried setting affinity anyways, but I would get "Access Denied" (even when running with Admin rights) from Task Manager.

So finally today I took the plunge and rebooted to BIOS (or more correctly to UEFI F/W) and turned off HyperThreading and voila, 90 FPS throughout all the race I just did.

Here are the render stats from the excellent [fpsVR][] of the last session before turning off HT and then with the HT turned off:

[fpsVR]: https://store.steampowered.com/app/908520/fpsVR/

import Frametime from "../../src/pages/multi-threading-and-vr/frametime.md"
import Utilization from "../../src/pages/multi-threading-and-vr/util.md"

<figure>
  <Frametime />
  <figcaption>
    Frametimes [Larger Size](/multi-threading-and-vr/frametime)
  </figcaption>
</figure>

<figure>
  <Utilization />
  <figcaption>
    Utilization [Larger Size](/multi-threading-and-vr/util)
  </figcaption>
</figure>

|                                               | HT on     | HT off    |
|-----------------------------------------------|-----------|-----------|
| Delivered fps                                 | 84.47     | 88.76     |
| GPU Frametimes median                         | 7.7 ms    | 7.8 ms    |
| GPU Frametimes 99th percentile                | 10.7 ms   | 9.5 ms    |
| GPU frametime &lt;11.1ms(vsync)               | 99.3%     | 99.7%     |
| CPU frametime median                          | 6.4 ms    | 6.2 ms    |
| CPU frametime 99th percentile                 | 10.1 ms   | 8.3 ms    |
| CPU frametime 99.9th percentile               | 12 ms     | 10.2 ms   |
| CPU frametime &lt;11.1ms(vsync)               | 99.7%     | 99.9%     |
| Max. SteamVR SS                               | 152%      | 154%      |
| Render resolution per eye by SteamVR settings | 1758x2195 | 1770x2209 |
| Render resolution per eye recommended         | 1426x1780 | 1426x1780 |

 The median frametimes did not drop that much, but the 99.9th percentile (1 out of 1000) of CPU frametimes crucially did not reach 11ms - the amount of time available to render a frame, if GPU is pushing 90FPS.

Hope this is useful and helps to someone else as well.
