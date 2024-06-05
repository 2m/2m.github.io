---
slug: toggling-between-input-sources-with-caps-lock-in-macos
title: Toggling between input sources with Caps Lock in macOS
description: How to toggle between input sources with Caps Lock in macOS
authors: [2m]
tags: [macos]
---

I have recently started switching between my Arch Linux PC and MacBook for daily development. I am striving to have as similar user experience between the two machines as possible.

<!--truncate-->

One of the differences that was nagging me for a while was switching between the keyboard input sources. On Arch, [I have it mapped to the <kbd>Caps Lock</kbd>](https://github.com/2m/dotfiles/blob/bb877efa3f4e2799f7bf338044b2b8ddd4500b33/home/dot_xprofile.tmpl#L14).

```shell
setxkbmap -layout us,lt -option grp:caps_toggle
```

However the macOS default keyboard shortcuts screen does not allow to assign the <kbd>Caps Lock</kbd> to toggle the next input source.

I have used a [Karabiner complex modification script](https://github.com/2m/dotfiles/blob/bb877efa3f4e2799f7bf338044b2b8ddd4500b33/home/dot_config/private_karabiner/private_assets/private_complex_modifications/caps_to_ctrl_space.json) to map the <kbd>Caps Lock</kbd> to <kbd>Control</kbd> + <kbd>Space</kbd>, which is the default macOS shortcut to toggle the next input source.

```json
{
  "title": "Map caps lock to ctrl+space",
  "rules": [
    {
      "description": "Map caps lock to ctrl+space",
      "manipulators": [
        {
          "type": "basic",
          "from": {
            "key_code": "caps_lock",
            "modifiers": {
              "optional": [
                "any"
              ]
            }
          },
          "to": [
            {
              "key_code": "spacebar",
              "modifiers": "left_control"
            }
          ]
        }
      ]
    }
  ]
}
```

Works like a charm!
