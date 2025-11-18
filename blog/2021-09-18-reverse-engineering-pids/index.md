---
slug: reverse-engineering-pids
title: Reverse engineering PIDs
description: Reverse engineering OBD PIDs for GR Yaris
authors: [2m]
tags: [automotive, obd]
---

:::info

This was originally posted on 2021-09-18 on [gr-yaris.co.uk] forum thread.

:::

[gr-yaris.co.uk]: https://www.gr-yaris.co.uk/threads/reverse-engineering-pids.4680/

Car telemetry is a bit of a black magic. New cars are full of sensors that report readings on internal CAN buses. This data is accessible via a basic OBD adapter. However one needs to know the exact sensor PID value to query the sensor. The received data is usually in a raw form and needs to be converted to something usable by applying a specific formula. PID values and formulas are not shared by car manufacturers. Here is my attempt to make some sence of the GR Yaris OBD data.

<!--truncate-->

Thanks to [this thread] we now know that selecting Toyota Camry 2020 in [OBDLink] Android app gives access to GR Yaris additional sensors.

[this thread]: https://gr-yaris.co.uk/forum/threads/oil-pressure-and-other-info-over-obd.4379/
[OBDLink]: https://play.google.com/store/apps/details?id=OCTech.Mobile.Applications.OBDLink

It is relatively easy to snoop Bluetooth traffic on Android devices from [bugreports] or [even live]. So I selected a couple of sensors in OBDLink on continuous monitoring and looked into the BT traffic using [Wireshark]. Here is a little snippet from the quite verbose conversation:

<Img large={require('./capture.png').default} small={require('./capture.small.png').default}>
  Capture of Bluetooth traffic between OBDLink and the car
</Img>

[bugreports]: https://stackoverflow.com/questions/49287985/bluetooth-hci-snoop-log-not-generated-pixel-2/49287986#49287986
[even live]: https://stackoverflow.com/questions/65556535/android-bluetooth-snooping-with-wireshark-missing-bluetooth-interface-in-androi/
[Wireshark]: https://www.wireshark.org/

These are ELM327 microcontroler, that runs inside OBDLink, [AT protocol commands]. Interesting ones here are:

* `ATSH 0007D0` - sets OBD header for all subsequent OBD commands
* `2162` - queries OBD Mode 21 PID 62 and gets `7D8 05 61 62 03 00 00 0` as a response

[AT protocol commands]: https://www.sparkfun.com/datasheets/Widgets/ELM327_AT_Commands.pdf

First three hex digits in the response `7D8` is the [ID of the ECU] that has sent the response. Next three bytes `05 61 62` I am not sure what they are. And next three bytes `03 00 00` is the actual data that could be interesting.

[ID of the ECU]: https://glmsoftware.com/documentation/obdnowterminaluserguide.pdf

Here is the short list of OBD Headers, Modes and PIDs that I was able to figure out from the first initial look and from subsequent help of other gr-yaris.co.uk forum members below:

<small><small><small>

| Sensor                            | Category          | Mode | PID  | Header | Formula                        | Diag Command   |
| :-------------------------------- | :---------------- | :--- | :--- | :----- | :----------------------------- | :------------- |
| Parking brake                     | Navigation System | 21   | 62   | 7D0    | BIT(A:1)                       |                |
| Accelerator Position              | Engine            | 221  | 059  | 700    | (A-41) / 1.42                  |                |
| Engine Oil Pressure               | Engine            | 221  | 074  | 700    | (((A*256)+B) * 10) / 128       |                |
| M/T Oil Temperature               | Engine            | 221  | 638  | 700    | A + B/256 - 40                 |                |
| +B Voltage                        | Combination Meter | 221  | 021  | 7C0    | A/10                           |                |
| Fuel Input                        | Combination Meter | 221  | 022  | 7C0    | ??? [^1]                       |                |
| Sub Fuel                          | Combination Meter | 221  | 023  | 7C0    | ???                            |                |
| Fuel Pressure (High)              | Engine            | 221  | F6D  | 700    | ???                            |                |
| Fuel Pressure (Low)               | Engine            | 221  | F6D  | 700    | ???                            |                |
| Intake Manifold Absolute Pressure | Engine            | 221  | F87  | 700    | ???                            |                |
| Low Fuel Pressure Sensor          | Engine            | 221  | 0CD  | 700    | ???                            |                |
| ExDID_1BE1                        | Engine            | 221  | BE1  | 700    | ???                            |                |
| ExDID_15F7                        | Engine            | 221  | 5F7  | 700    | ???                            |                |
| ExDID_1F07                        | Engine            | 221  | F07  | 700    | ???                            |                |
| Tire ID 1 Pressure                | TPM               | 221  | 005  | 750    | B * 0.01373                    | atcea2A atta2A |
| Tire ID 2 Pressure                | TPM               | 221  | 005  | 750    | D * 0.01373                    | atcea2A atta2A |
| Tire ID 3 Pressure                | TPM               | 221  | 005  | 750    | F * 0.01373                    | atcea2A atta2A |
| Tire ID 4 Pressure                | TPM               | 221  | 005  | 750    | H * 0.01373                    | atcea2A atta2A |
| Tire ID 1 Temperature             | TPM               | 221  | 004  | 750    | A - 40                         | atcea2A atta2A |
| Tire ID 2 Temperature             | TPM               | 221  | 004  | 750    | B - 40                         | atcea2A atta2A |
| Tire ID 3 Temperature             | TPM               | 221  | 004  | 750    | C - 40                         | atcea2A atta2A |
| Tire ID 4 Temperature             | TPM               | 221  | 004  | 750    | D - 40                         | atcea2A atta2A |
| Tire ID 1 Position                | TPM               | 222  | 021  | 750    | LOOKUP(A::1=FL:2=FR:3=RL:4=RR) | atcea2A atta2A |
| Tire ID 2 Position                | TPM               | 222  | 021  | 750    | LOOKUP(B::1=FL:2=FR:3=RL:4=RR) | atcea2A atta2A |
| Tire ID 3 Position                | TPM               | 222  | 021  | 750    | LOOKUP(C::1=FL:2=FR:3=RL:4=RR) | atcea2A atta2A |
| Tire ID 4 Position                | TPM               | 222  | 021  | 750    | LOOKUP(D::1=FL:2=FR:3=RL:4=RR) | atcea2A atta2A |
| Steering Angle                    |                   | 221  | 004  | 7B3    | ((SIGNED(A)*256)+B)*1.5        |                |
| Master Cylinder Temperature       | Brake             | 221  | 006  | 7B0    | A-80                           |                |
| Clutchpack Temperature            | Four Wheel Drive  | 221  | 026  | 7B1    | (A*256+B)/128                  |                |

</small></small></small>

[^1]: formulas are the tricky part

This is not much yet, but at least I hope this is enough information for anyone to join into this reverse engineering party.

CSV file that can be imported into Torque app for the custom PIDs can be found [in this repository][].

[in this repository]: https://github.com/2m/gry/blob/main/exportedPIDs.csv
