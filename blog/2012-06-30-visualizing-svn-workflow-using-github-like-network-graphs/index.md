---
slug: visualizing-svn-workflow-using-github-like-network-graphs
title: Visualizing SVN workflow using github-like network graphs
description: Visualizing the way our team works with the SVN repository
authors: [2m]
tags: [visualization]
---

Recently I found a need to visualize the way our team works with the SVN repository. I really like [GitHub network graphs](https://github.blog/2008-04-10-say-hello-to-the-network-graph-visualizer/), so I started looking for a way to draw custom ones.

<!--truncate-->

Luckily i found a [raphaeljs](http://raphaeljs.com/) (JavaScript library for vector graphics) [demo](http://raphaeljs.com/github/demo.html) which did exactly what I wanted. I had to tweak it a bit, like making labels show all the time, and making custom commits.

<Img large={require('./svn.png').default} small={require('./svn.small.png').default}>
  SVN workflow visualized as a GitHub-like network graph
</Img>

You can find the changes I made [here](https://github.com/2m/svn-workflow). You can also find the source code of the original raphaeljs GitHub demo [here](https://github.com/DmitryBaranovskiy/raphaeljs.com).
