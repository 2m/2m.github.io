---
slug: gprs-internet-on-your-pc-using-a-mobile-phone-modem
title: GPRS internet on your PC using a mobile phone modem
description: How to set up GPRS internet on your PC using a mobile phone modem
authors: [2m]
tags: [gsm]
---

Hey,

I have thought for some time that it would be quite cool to have the internet anywhere you go using the GPRS network. All of us carry some mobile phone device. Not all of us know that almost every mobile phone can be connected to the PC and be used as a modem for GSM or even GPRS data transfer. Even better, mobile phone can be connected to the PC using Bluetooth - no unnecessary cables! When I saw that my carrier (Tele2) allows me to use 1 GB for 1 LT (~0.3 EUR) every month I decided to figure out how to put everything together.

<!--truncate-->

The first thing I did was download mobile internet settings from my carriers web page and set the new connection as a default one in my mobile phone. Then I have found quite a good tutorial in the carriers home page. It basically deals with how to set up the dial-up connection on Windows XP using GPRS through a mobile phone. This is in Lithuanian but has many pictures so it is quite easy to understand the general idea.

However there was a catch. I did follow every step from that document but with both my mobile phones I got the **Error 31** when trying to connect. As I have discovered later this was due to not set GPRS APN setting in my mobile modem. To set it you will have to connect to your mobile phone modem using some terminal program. I have used puTTY.

First of all you have to know the COM port that your phone modem has been assigned to. You can do this by clicking twice on newly created dial-up connection and then Properties.

<Img large={require('./modem_port.png').default} small={require('./modem_port.small.png').default} />
I have three modems here. I have tried all of my mobile phones and modem driver for every mobile has been installed. If you also have a couple of entries, you will have to figure out which is which.

The port that I want to use happens to be COM27. So fire up puTTY, select Serial as connection type, type in COM27 as serial line and click Open. Black screen will show up. To test the connection type in `AT` and press enter. If `OK` shows up you are good to go. Note that some mobile phones require a confirmation when someone is trying to access their modem through Bluetooth or USB.

The mighty command (I found it [on this blogpost][]) that you have to enter is: `AT+CGDCONT=1,"IP","<YOUR GPRS APN>"`. I do not really know why does this do the trick, but it does. (: If you did everything right `OK` will show up. You can check if this information is saved by typing in `AT+CGDCONT?`. I have noticed that this information stays saved even between mobile reboots. So it seems that you only have to do this once.

[on this blogpost]: https://web.archive.org/web/20110616113815/http://www.shapeshifter.se/2008/04/30/list-of-at-commands/

<Img large={require('./modem_putty.png').default} small={require('./modem_putty.small.png').default} />

Now close the puTTY window and give a few seconds for a mobile modem to close the connection. Then try to initiate dial-up connection from your PC and emerge into to the meadows of not so fast internet.

<Img large={require('./modem_done.png').default} small={require('./modem_done.small.png').default} />

Now whenever I have my laptop in the wild with me and I need connectivity for one reason or another I just activate Bluetooth on my phone and that's it. I have tested this with two not so new and shiny mobile phones - Motorola E398 and E2. Both have worked but the connectivity was not very stable. There was about 40% of dropped packets when I was pinging to [google.lt](http://google.lt/). Nevertheless it is better than nothing. (:

This was my little adventure on an early Sunday morning. See you.

P.S. I posted this from my notebook using GPRS internet. (:
