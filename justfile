dev:
    pnpm run start

process-images:
    ./mill scripts.runMain images.main

update-episodes:
    ./mill scripts.runMain episodes.main $(op read op://Private/pocketcasts.com/username) $(op read op://Private/pocketcasts.com/password)

update-feeds:
    xh -a admin:$(op read op://Private/miniflux/password) 'https://rss.lab.2m.lt/v1/export' > static/feeds.opml

clean-scala-build:
    rm -rf scripts/.scala-build/

install:
    pnpm install

upgrade:
    pnpm upgrade --all

build:
    pnpm build

serve:
    cd build; python3 -m http.server 3000
