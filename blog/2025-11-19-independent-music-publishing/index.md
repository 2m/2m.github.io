---
slug: independent-music-publishing
title: Independent music publishing
description: Exploring the world of independent music publishing
authors: [2m]
tags: [music, publishing]
---

In recent years, the landscape of music publishing has undergone significant changes. Independent artists can take control of their work and reach audiences directly. However navigating the world of music publishing can be complex. This is an attempt to shed some light on emerging trends and platforms.

<!--truncate-->

This blog post has been inspired by a recent [Ne Vienas][] (in Lithuanian) podcast episode where two artists, [Domantas Starkauskas][] and [Tomas Narkevičius - Free Finga][] were discussing unfair monetization policies of largest music publishing platforms.

[Ne Vienas]: https://www.lrt.lt/mediateka/audio/ne-vienas?episode=2730490
[Domantas Starkauskas]: https://www.instagram.com/domantas.pye/
[Tomas Narkevičius - Free Finga]: https://www.instagram.com/free.finga/

Centralized platforms are so successful, because they make publishing and listening to music very convenient. To my knowledge no such single alternative platform exists currently. **Bandcamp** is one of the alternatives that is getting mentioned frequently. However some [recent events][] are raising red flags when considering Bandcamp artist friendly.

[recent events]: https://n00q.net/blog/fedicamp-propsal/#bandcamp-s-history-and-context

:::info

A similar conclusion has been drawn by [Martin Force in his blog][martin-blog] as well.

[martin-blog]: https://the-counterforce.org/i-will-do-my-worst-1/

:::

There are many emerging tools available that solve various publishing hurdles in different ways. First, let's review these tools and then let's see what is available for conveniently listening to music that is being published independently.

## Publishing

### Faircamp

[Faircamp][] is a static site generator for audio creators. You point the software to a directory containing audio files and it generates beautiful website that has audio contents in it. Such website then needs to be hosted somewhere on the internet. Many free (e.x. GitHub Pages) or almost free (e.x. &lt;1 EUR for a month for a very small server) hosting providers exist for it.

[Faircamp]: https://simonrepp.com/faircamp/

Being a static website, it does not support payments, but it supports putting audio files under a paywall that requires a code to pass. Other features available are:

* RSS feed - automatically notifies followers about new music
* web player, for playing music in the browser
* theme customization from a web browser

Every website generated with faircamp is independant. Therefore users need to have some kind of external discovery mechanism to find artists that publish using Faircamp. One such website is [Faircamp Webring][]. However most of the faircamp websites are discovered using the good-old-way of sharing links around.

[Faircamp Webring]: https://faircamp.webr.ing/

### Mirlo

[Mirlo] is an online music store where artists can upload and sell their music. It is currently a centralized system, but with [plans to decentralize] - giving an ability for technically minded users (or independent publishing houses) to run their own Mirlo instances.

Mirlo allows setting up payments for music with very open disclaimers about what portion of the payment is going towards the artist, the platform itself and the payment processor.

Mirlo also allows users to easily discover new artists that are hosted on the platform. And it looks like quite a few artists are there. This, together wil the plans for decentralization, is making Mirlo quite an interesting music publishing platform to follow.

[Mirlo]: https://mirlo.space/
[plans to decentralize]: https://mirlo.space/team/posts/funding-federating-mirlo/

### Bandwagon

[Bandwagon][] is a new kid on the block built from the ground up having decentralization in mind. Every artist in the platform is automatically a [Fediverse][] account that can be followed from any other Fediverse social network.

[Bandwagon]: https://bandwagon.fm/
[Fediverse]: https://en.wikipedia.org/wiki/Fediverse

Bandwagon supports:

* publishing tour dates and event ticket sales
* accepting payments for the music

:::info

Being on the Fediverse, as an artist, has one more upside. There are [monetization platforms][alternative-monetization] that pull user listening stats from Mastodon, Funkwhale, Peertube, and offer all the ways a listener can retribute to the artists they listen to.

[alternative-monetization]: https://app.retribute.me/about

:::

The amount of artists on the platform is quite small, so discoverability is currently limited.

## Listening

With the music publishing aspect covered, I would like to focus now on listening to music which is being published this way. In most of these cases what the buyer gets is an archive with music files. Lets cover what interesting solutions exist currently for listening to music acquired this way.

### Symfonium

[Symfonium][] is an Android app that let's you conveniently listen to music that is on your phone. What is more, it has integrations with many cloud storage providers (Google Drive, DropBox, etc.). This way, owned music can be stored on the personal cloud, and accessed from anywhere while on the go.

[Symfonium]: https://symfonium.app/

It also has support for more exotic music streaming protocols. Subsonic, one of such protocols is particularly interesting, because Funkwhale uses it.

:::info

I personally use Funkwhale to listen to my music collection from Google Drive and also from a couple of Funkwhale servers.

:::

### Funkwhale

[Funkwhale][] is a decentralized platform for managing music libraries. It allows you to share the music you've got with other peers. Even across different Funkwhale instances.

[Funkwhale]: https://www.funkwhale.audio/

This means that you will either need to host an instance of Funkwhale yourself, or find a server where you can get an account. With the account in hand, you can upload all your owned music and listen to it either via web player or using previously mentioned **Symfonium** app.

:::info

There are some Funkwhale instances that serve a different purpose. For example, [music.ver.lt][] is hosting all of the music from [mp3.hardcore.lt][] archives.

[music.ver.lt]: https://music.ver.lt/
[mp3.hardcore.lt]: https://mp3.hardcore.lt/

:::

There are also [services][funkwhale-discovery] that can be used to discover Funkwhale (among other Fediverse services) instances. However usually, due to a bit sensitive nature of music files, Funkwhale users find friends or family that is hosting Funkwhale instances for them.

[funkwhale-discovery]: https://funkwhale.fediverse.observer/map

### Mopidy and Iris

If listening on the desktop is more of your jam, then [Mopidy][] and [Iris][] would be more suitable. You can configure these applications to play music files from local storage and also from Spotify (to ease the transition).

[Mopidy]: https://mopidy.com/
[Iris]: https://github.com/jaedb/Iris

:::info

For more advanced setup, checkout [`foodogsquared` setup][offline-setup].

[offline-setup]: https://www.foodogsquared.one/posts/2023-05-30-my-offline-music-streaming-setup/

:::

This setup is higly configurable. It is possible to add subsonic support and then stream music from your PC to your mobile phone when you are on the go. However with this flexibility, complexity also rises.

## Finishing thoughts

Publishing music independently is possible and, what is more important, it is possible to collect money directly from your listeners. Discoverability is still tricky. But with the near-future promise of decentralized streaming from Fediverse enabled platforms, great things await.

I call for brave hearts of music producers to jump on this ship early and drop the shackles of centralized platforms for good. Show the good example and followers will follow.
