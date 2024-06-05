---
slug: linux-experience-in-macos
title: Linux experience in macOS
description: Nudging MacBook UX to be more like the UX on Arch Linux
authors: [2m]
tags: [macos]
---

I am often switching between a MacBook and a Linux desktop. From time to time I invest a bit of energy to nudge MacBook UX to be more like the UX I have on my Arch Linux installation. I mostly use command line tools so common UX is not that far of a stretch.

This article will overview various tools that I have found useful for this task.

<!--truncate-->

### Initial keyboard remap

First of all MacBook keyboard keys need a remap in a way which leaves as much as possible default keybindings working as one would expect in Linux.

<Img large={require('./cmd.png').default} small={require('./cmd.small.png').default} />

For example, to open a new tab in the browser, one would use <kbd>Cmd</kbd> + <kbd>t</kbd>. Therefore, at least for browsers (and quite a few other GUI apps) the fix is quite simple: swap <kbd>Fn</kbd> and <kbd>Cmd</kbd> keys.

I use [Karabiner-Elements](https://karabiner-elements.pqrs.org/) for key remaps.

<Img large={require('./karabiner.png').default} small={require('./karabiner.small.png').default} />

It has a simple UI for simple modifications. But one can always drop to the JSON configuration files to do complex remaps.

Having configuration in JSON files enables easy tracking for configuration changes. More on that later.

### Making terminal work with cmd key

This quick remap works great for quite a few apps, but unfortunately it does not for terminal applications. Both, my terminal of choice [alacritty](https://github.com/alacritty/alacritty), and VS Code terminal uses <kbd>Ctrl</kbd> key for usual terminal commands like <kbd>Ctrl</kbd> + <kbd>c</kbd>, <kbd>Ctrl</kbd> + <kbd>w</kbd>, etc on macOS.

To fix this, I needed to re-create bindings that work with <kbd>Cmd</kbd> as well as with <kbd>Ctrl</kbd> keys. Luckily, alacritty supports creating these kinds of bindings in its configuration file:

```yaml
  # Bind control characters to Command+... combination
  # https://en.wikipedia.org/wiki/ASCII#ASCII_control_characters
  - { key: A,      mods: Command, chars: "\x01"            }
  - { key: C,      mods: Command, chars: "\x03"            }
  - { key: D,      mods: Command, chars: "\x04"            }
  - { key: E,      mods: Command, chars: "\x05"            }
  - { key: U,      mods: Command, chars: "\x15"            }
  - { key: W,      mods: Command, chars: "\x17"            }
```

VS Code also has support for that:

```json
    {
        "key": "cmd+a",
        "when": "terminalFocus",
        "command": "workbench.action.terminal.sendSequence",
        "args": {
            "text": "\u0001"
        }
    },
    {
        "key": "cmd+c",
        "when": "terminalFocus",
        "command": "workbench.action.terminal.sendSequence",
        "args": {
            "text": "\u0003"
        }
    },
    ...
```

### Text editing bindings

I am also used to moving around editable text with <kbd>Ctrl</kbd> + <kbd>Arrow</kbd> key. Also possibly selecting part of the text while holding the <kbd>Shift</kbd> key.

I found quite an old article that explained how to enable these key bindings in macOS: http://heisencoder.net/2008/04/fixing-up-mac-key-bindings-for-windows.html

I was happy to find that after 12 years, this solution still works. This is the config file, that did the trick:

```json
{
"\UF729"   = "moveToBeginningOfLine:";                       /* Home         */
"@\UF729"  = "moveToBeginningOfDocument:";                   /* Cmd  + Home  */
"$\UF729"  = "moveToBeginningOfLineAndModifySelection:";     /* Shift + Home */
"@$\UF729" = "moveToBeginningOfDocumentAndModifySelection:"; /* Shift + Cmd  + Home */
"\UF72B"   = "moveToEndOfLine:";                             /* End          */
"@\UF72B"  = "moveToEndOfDocument:";                         /* Cmd  + End   */
"$\UF72B"  = "moveToEndOfLineAndModifySelection:";           /* Shift + End  */
"@$\UF72B" = "moveToEndOfDocumentAndModifySelection:";       /* Shift + Cmd  + End */
"\UF72C"   = "pageUp:";                                      /* PageUp       */
"\UF72D"   = "pageDown:";                                    /* PageDown     */
"$\UF728"  = "cut:";                                         /* Shift + Del  */
"$\UF727"  = "paste:";                                       /* Shift + Ins */
"@\UF727"  = "copy:";                                        /* Cmd  + Ins  */
"$\UF746"  = "paste:";                                       /* Shift + Help */
"@\UF746"  = "copy:";                                        /* Cmd  + Help (Ins) */
"@\UF702"  = "moveWordBackward:";                            /* Cmd  + LeftArrow */
"@\UF703"  = "moveWordForward:";                             /* Cmd  + RightArrow */
"@$\UF702" = "moveWordBackwardAndModifySelection:";   /* Shift + Cmd  + Leftarrow */
"@$\UF703" = "moveWordForwardAndModifySelection:";   /* Shift + Cmd  + Rightarrow */
}
```

Saved to `~/Library/KeyBindings/DefaultKeyBinding.Dict` file, it brought most of the familiar keybindings while moving around text back.

### Bringing back tilde

For some reason the <kbd>Tilde</kbd> key was not printing **~** or **`**. Instead it would print **±** or **§**.

Again, Karabiner-Elements was brought to the rescue, albeit with a strangely named configuration option:

<Img large={require('./karabiner_mods.png').default} small={require('./karabiner_mods.small.png').default} />

### Turning off sticky grave

With grave (`) symbol back in working order, there was another strange behaviour of this symbol and 🇱🇹 Lithuanian 🇱🇹 keyboard layout.

In the default Lithuanian layout there is some sticky mode being enabled by pressing grave once. If, after pressing grave, one would press a Lithuanian letter, like ą, then it would print 1 instead.

Maybe a nice feature, but it does not print the initial grave until second key is pressed. This is a bit confusing, especially since grave symbol is used quite a lot when writing about code.

To solve this, keyboard layout editor software [Ukelele](https://software.sil.org/ukelele/) came to the rescue.

<Img large={require('./ukelele.png').default} small={require('./ukelele.small.png').default} />

With this tool it became obvious that with the default Lithuanian layout grave key enters a different keyboard state. After removing this custom state, grave button went back to the expected function.

### Moving windows

I am used to a tiling window manager when on Linux. However most often I have only a couple windows open on the screen. So having shortcuts for splitting windows into halves or thirds was enough of the functionality for my needs in macOS.

For that I use [Rectangle](https://rectangleapp.com/).

<Img large={require('./rectangle.png').default} small={require('./rectangle.small.png').default} />

There are other, more powerful tools in this scene, like [ianyh/amethyst](https://github.com/ianyh/amethyst) and [koekeishiya/yabai](https://github.com/koekeishiya/yabai), but currently a couple of features from Rectangle seems to do everything I need.

### Launching applications

One of the first things to do, when Linux (or macOS) system boots up, is to open a terminal. 😉 This is a very frequent action and I usually have it bound to <kbd>Meta</kbd> + <kbd>Enter</kbd> on Linux. After all of the key swaps, it should end up on <kbd>Ctrl</kbd> + <kbd>Enter</kbd> on my macOS box.

I used [koekeishiya/skhd](https://github.com/koekeishiya/skhd) tool to bind custom key combinations to launching GUI applications. It also is configured by editing a configuration file, which is always great.

```bash
# open terminal
ctrl - return : /MacOS/alacritty -e tmux-attach-or-new
shift + ctrl - return : /MacOS/alacritty -e fish
```

The following configuration opens a new terminal window with tmux when pressing <kbd>Ctrl</kbd> + <kbd>Return</kbd>. There is also an option to open a new terminal without tmux by additionally pressing <kbd>Shift</kbd>.

One more useful binding managed by skhd is to get GPG passphrase from LastPass and put it to clipboard:

```bash
# copy gpg passphrase to clipboard
ctrl - g : /MacOS/alacritty -e lpass show --sync=no --notes gpg/master --clip
```

This works great thanks to the [lastpass/lastpass-cli](https://github.com/lastpass/lastpass-cli) utility that allows quick and easy access to LastPass vault from the terminal.

### Tracking configuration

There is little point to custom scripts scattered all over the system, if there is no way of easily tracking changes in configuration files. [twpayne/chezmoi](https://github.com/twpayne/chezmoi) does a really good job here.

I have been using chezmoi (French for home) for quite some time now. I originally used it to keep dotfiles on my Linux PC and two Linux laptops in sync.

It uses git for the actual change tracking. It integrates well with lpass for secret management and has template support if you want to have different contents in a file depending on a system.

For example, here is a template in alacritty configuration that resolves the path to the default shell according to the hostname of the system:

```yaml
shell:
  program:
{{- with (index (index .vars .chezmoi.hostname) "shell") }} {{ . -}} {{- end }}
  args:
    - -c
    - tmux-attach-or-new
```

Then the remaining part is to list all of the different paths to the shell grouped by the hostname:

```toml
[data.vars.laguna]
shell = "/usr/local/bin/fish"
...

[data.vars.fortuna]
shell = "/usr/bin/fish"
...
```

I keep all of my Linux and macOS dotfiles in a single publicly accessible repository. Do not hesitate to take a look: https://github.com/2m/dotfiles
