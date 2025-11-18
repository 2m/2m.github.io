---
slug: appliance-control-using-a-mobile-phone-and-sms-messages
title: Appliance control using a mobile phone and SMS messages
description: How to control appliances using a mobile phone and SMS messages
authors: [2m]
tags: [home-automation]
---

Hey, how are you doing? (: Since there was a week between the end of the GSoC and the start of my studies, I decided to do some hobby hacking.

I have some remote (50 km away) appliances (electric heater) that I would like to control from wherever I am. The SMS service is a very compelling solution for this kind of problem. The main challenge is to figure out how to make a mobile phone to a relay that can switch on and off things.

<!--truncate-->

I found a [nice tutorial](https://web.archive.org/web/20120112193642/http://www.saunalahti.fi/~tovaska/gsm/Nokia/3310/vibra1/index2.html) which tells how to control a 12V car relay with a vibrator signal from the phone (no firmware modification is involved there). This gave me a good jump start. I picked up my old Nokia 3310 for this job. One nice thing about this phone is that it has a thermometer that is mounted in the battery (only original batteries have these). The thermometer will tell what is the current temperature around the phone. The phone will use this information to decide whether to turn on or off the heater in order to keep the same temperature in the room. SMS messages will be used to notify me if something goes wrong or to change the preferred temperature. This can be used during winters when you want to preheat the place before arriving there. Another advantage of this phone is that there is a marvelous open source tool called [NokiX](https://sourceforge.net/projects/nokix/), that allows to modify phone's original firmware.

First of all I modified the phone's F/W which turns vibra on and off according to the environment and preferred temperature. You develop these patches using C or Rexx. There is quite a lot phone functionality exposed already. My application does the following things:

- turns the vibra on or off according to the temperature readings
- you can give a ping to the phone (call the phone for one signal and
then hang up), and then the phone will send you the current temperature
- the phone will send you a message when temperature drops down below a certain limit

After that came the hardware part.

<Img large={require('./vibro_connector.jpg').default} small={require('./vibro_connector.small.jpg').default} />

Don't mind the labels in the picture above. I wanted to place all the components in a quite an optimal way, so I created a PCB design first. It is quite compact but I still could not get rid of one wire going on the non-component side of the PCB.

<Img large={require('./frontside.jpg').default} small={require('./frontside.small.jpg').default} />

<Img large={require('./backside.jpg').default} small={require('./backside.small.jpg').default} />

You can notice a misturned transistor in the pictures above. Thankfully my dad noticed it before I plugged this thing on. After I completed soldering this board a time came for the modification of my good old Nokia 3310. What I needed to do was just take that mobile phone apart, take that vibra motor away and solder two wires in its place.

<Img large={require('./mobile.jpg').default} small={require('./mobile.small.jpg').default} />

Then I needed to make a little hole in the plastic frame so these two wires can get out. I did all of this following pictures from the link mentioned in the beginning of this post. After I put everything back together I measured the voltage of the vibra motor. According to the site it should be around 3.75, and so it was.

<p className='embed-container horizontal'><iframe src='https://www.youtube.com/embed/5rryXb4UjAo' frameBorder='0' allowFullScreen></iframe></p>

So far so good. But there was one problem when I connected the phone, power supply and relay to the board. Relay was always on disregarding the vibra power of the phone. I measured the voltage on the relay and it gave me 6V when vibra was completely turned off. Well I am not that good in radioelectronics so I asked my dad for some help while debugging the situation.

After couple of voltage measurements we decided to put a 68ohm resistor between the base and the emitter of the transistor. This helped. When the vibra power was off the transistor was completely off and relay voltage measured 0V. When the vibra was on full power transistor was completely on and relay voltage measured near 12V. This modification was needed because we used a different kind of relay than the one mentioned in the article.

This left us with a working bunch of wires and components on the board. Tomorrow I will try to put everything into a nice box. See you then.
