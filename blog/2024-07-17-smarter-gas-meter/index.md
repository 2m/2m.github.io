---
slug: smarter-gas-meter
title: Smarter gas meter
description: Counting gas meter pulses with ESPHome and Home Assistant
authors: [2m]
tags: [home-automation]
---

Home Assistant has great [energy management](https://www.home-assistant.io/docs/energy/) features. [ESPHome](https://esphome.io/) provides easy and cheap way to get various measurements into Home Assistant. Combine the two and you can start tracking gas usage at homes that have old style gas meters.

<!--truncate-->

There are a couple of already documented ways to get gas meter readings into Home Assistant. At first I tried using a [window sensor][reed] to track whenever the gas meter wheel makes a full rotation. But I was never able to position the reed sensor in a way that it would reliably detect the full wheel rotation.

Then I found [an article][photo] that uses a photoresistor to track the reflective patch on one of the numbers of the gas meter number row. But I never gave this one a try.

<Img large={require('./reflective_patch.png').default} small={require('./reflective_patch.small.png').default} />
Reflective patch on the gas meter last number

After playing around with the [Physics Toolbox Sensor Suite][sensors] Android application it became obvious that magnetic field is quite strong and the same magnetic field that should flip the reed switch could be measured quite precicely with a magnetometer.

After taking a quick look at [magnetic field sensors][esphome-magnetic] that are supported by ESPHome, I found `QMC5883L` that is supported and easily accessible.

<Img large={require('./mag_sensor.png').default} small={require('./mag_sensor.small.png').default} />
Magnetic field sensor attached to the outside of the gas meter with a double sided tape

[The setup][qmc5883l] for this sensor is quick and straight-to-the-point, as it always is with ESPHome.

```yaml
sensor:
  - platform: qmc5883l
    address: 0x0D
    field_strength_x:
      name: "Gas Meter Field Strength X"
    field_strength_y:
      name: "Gas Meter Field Strength Y"
    field_strength_z:
      name: "Gas Meter Field Strength Z"
    temperature:
      name: "Gas Meter Temperature"
      filters:
        - offset: 34.0
    range: 200uT
    oversampling: 512x
    update_interval: 1s

i2c:
  sda: GPIO21
  scl: GPIO22
  scan: true
```

Looking at the data from the sensor, Z axis was the most sensitive to the magnetic field changes. A `threshold` integration in Home Assistant can be used to detect when the magnetic field changes significantly - detecting a full wheel rotation.

```yaml
binary_sensor:
  - platform: threshold
    entity_id: sensor.gas_meter_field_strength_z
    lower: -70
    name: Gas Meter Pulse
```

<Img large={require('./sensors.png').default} small={require('./sensors.small.png').default} />

This `binary_sensor` is used in Home Assistant Automation to increment a counter every time a full wheel rotation is detected.

```yaml
- alias: Dujų Skaitliuko Skaičiuoklė
  trigger:
  - platform: state
    entity_id:
    - binary_sensor.gas_meter_pulse
    from: 'off'
    to: 'on'
  action:
  - service: input_number.increment
    target:
      entity_id: input_number.duju_skaitliukas
```

Having the gas meter as an `input_number` in Home Assistant makes it easy to set the initial value and also make any corrections if needed via the UI.

```yaml
input_number:
  duju_skaitliukas:
    name: "Dujų Skaitliukas"
    min: 622202
    max: 999999
    step: 1
    mode: box

template:
  - sensor:
    - name: "Dujų Skaitliukas"
      device_class: gas
      unit_of_measurement: "m³"
      state_class: "total_increasing"
      icon: "mdi:fire"
      state: "{{ states('input_number.duju_skaitliukas') | float * 0.01}}"
```

With this setup `sensor.duju_skaitliukas` sensor can be added to the "Gas Consumption" energy dashboard configuration together with the unit cost. Now gas usage and cost can be tracked in Home Assistant Energy dashboard.

Full ESPHome [configuration for the sensor can be found here][esphome-config]. It also includes a snippet that shows the value of the `sensor.duju_skaitliukas` Home Assistant sensor on the [OLED screen of the ESP32 device][t-display].

For comments and any questions feel free to reach out on [Mastodon][mastodon].

[reed]:             https://community.home-assistant.io/t/gas-meter-from-xiaomi-aqara-door-sensor-zigbee/348032/126
[photo]:            https://simplyexplained.com/blog/tracking-gas-usage-with-esphome-home-assistant-and-tcrt5000/
[sensors]:          https://play.google.com/store/apps/details?id=com.chrystianvieyra.physicstoolboxsuite
[esphome-magnetic]: https://esphome.io/#magnetic
[qmc5883l]:         https://esphome.io/components/sensor/qmc5883l
[threshold]:        https://www.home-assistant.io/integrations/threshold/
[esphome-config]:   https://github.com/2m/hassio-config/blob/f6554696c6bcd28d67d2c2d8fa43e7663261ad36/esphome/gas-meter.yaml
[t-display]:        https://www.lilygo.cc/products/lilygo%C2%AE-ttgo-t-display-1-14-inch-lcd-esp32-control-board
[mastodon]:         https://mastodon.social/@dvim/112803731282729723
