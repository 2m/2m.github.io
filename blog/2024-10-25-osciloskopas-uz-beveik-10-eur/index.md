---
slug: osciloskopas-uz-beveik-10-eur
title: Osciloskopas už beveik 10 eurų
description: scoppy + RPi Pico = osciloskopas
authors: [2m]
tags: [hw]
---

Neseniai teko debuginti [esphome] generuojamą PWM signalą, kuris valdo servo motorą.
Iki galo suprasti kas vyksta padėjo osciloskopas veikiantis ant [8.5EUR RPi Pico] mikrovaldiklio.

[esphome]: https://esphome.io/
[8.5EUR RPi Pico]: https://www.lemona.lt/en/microcontroller-raspberry-pi-pico-rp2040-arm-cortex-m0.html

<!--truncate-->

Tokio osciloskopo paleidimas yra labai paprastas:

1. Įdiegiam [scoppy] į RPi Pico.
2. Įsirašom [Scoppy - Oscilloscope] Android programėlę.
3. Prijungiam RPi Pico prie telefono per USB kabelį.
4. Matuojam.

<Img large={require('./scoppy.png').default} small={require('./scoppy.small.png').default}>
  50Hz dažnio PWM signalas su 10.5% įjungimo laiko
</Img>

[scoppy]: https://oscilloscope.fhdm.xyz/wiki/Installation-&-Getting-Started#3-download-and-install-the-firmware
[Scoppy - Oscilloscope]: https://play.google.com/store/apps/details?id=xyz.fhdm.scoppy
