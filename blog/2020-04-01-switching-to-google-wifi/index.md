---
slug: switching-to-google-wifi
title: Switching to Google WiFi
description: Measuring network bandwidth before and after switching to Google WiFi
authors: [2m]
tags: [hw]
---

I had recently acquired three Google WiFi pucks to upgrade the networking setup in my current apartment. I have had a [pretty good experience](https://www.facebook.com/photo.php?fbid=10157196029529451&set=a.10152218429019451&type=3&theater) with Google WiFi when I set it up at my parents home almost a year ago.

<!--truncate-->

However this time I wanted to measure the network bandwidth before and after the upgrade.

The previous setup had <Technicolor full/> router connected directly to the uplink. Then there was a <TpLink /> configured as a WiFi repeater in the hallway.

The upgraded setup has two <GoogleWiFi /> pucks in the same positions as the previous routers with one additional puck in the bedroom.

<Img large={require('./diagram.png').default} small={require('./diagram.small.png').default} />
[Previous (yellow and blue) and current (red) router placement in the apartment](https://whimsical.com/router-placement-TuMdFmbfohq3SddGyBJtqs)

And here are the bandwidth measurements. I used my phone (OnePlus 3T) to run the tests. I used Android apps for both [fast.com](http://fast.com) and [speedtest.net](http://speedtest.net) testing service. The wired connection to the router is 1Gbps so this really tested the connection speed between the phone and the routers.

export const Technicolor = ({children, full}) => (
  <span style={{backgroundColor: '#f7e7da'}}>Technicolor {full ? 'TG389ac' : null}</span>
);

export const TpLink = ({children, full}) => (
  <span style={{backgroundColor: '#d8e6f5'}}>TP-Link {full ? 'N750' : null}</span>
);

export const GoogleWiFi = ({children}) => (
  <span style={{backgroundColor: '#f1dbde'}}>Google WiFi</span>
);

export const Up = ({children}) => (
  <IIcon style={{color: 'green'}} icon="mdi:arrow-up-bold" />
);

export const Down = ({children}) => (
  <IIcon style={{color: 'red'}} icon="mdi:arrow-down-bold" />
);

export const Same = ({children}) => (
  <IIcon icon="material-symbols:equal" />
);

| Spot    | Test                  | Router          | Downlink              | Uplink               |
|---------|-----------------------|-----------------|-----------------------|----------------------|
| Kitchen | https://fast.com      | <Technicolor /> | 33 Mbps               | 33 Mbps              |
| Kitchen | https://fast.com      | <GoogleWiFi />  | 34 Mbps 103% <Up />   | 39 Mbps 118% <Up />  |
| Kitchen | https://speedtest.net | <Technicolor /> | 37 Mbps               | 47 Mbps              |
| Kitchen | https://speedtest.net | <GoogleWiFi />  | 37 Mbps 100% <Same /> | 46 Mbps 98% <Down /> |
| Library | https://fast.com      | <TpLink />      | 20 Mbps               | 8 Mbps               |
| Library | https://fast.com      | <GoogleWiFi />  | 34 Mbps 170% <Up />   | 32 Mbps 400% <Up />  |
| Library | https://speedtest.net | <TpLink />      | 23 Mbps               | 8 Mbps               |
| Library | https://speedtest.net | <GoogleWiFi />  | 37 Mbps 160% <Up />   | 41 Mbps 513% <Up />  |
| Bedroom | https://fast.com      | <TpLink />      | 17 Mbps               | 8 Mbps               |
| Bedroom | https://fast.com      | <GoogleWiFi />  | 15 Mbps 88% <Down />  | 21 Mbps 263% <Up />  |
| Bedroom | https://speedtest.net | <TpLink />      | 16 Mbps               | 12 Mbps              |
| Bedroom | https://speedtest.net | <GoogleWiFi />  | 17 Mbps 106% <Up />   | 30 Mbps 250% <Up />  |

Some interesting findings:
* there is only a little improvement in the uplink when connected directly to the router that is wired upstream
* there is a considerable improvement when connected to the router one wireless hop away from the wired router
* there is a reasonable improvement when connected to the router two wireless hops away in the new setup compared to being connected to a router one wireless hop away in the old setup
