dev:
    pnpm run start

process-images:
    ./mill scripts.runMain images.main

update-episodes:
    ./mill scripts.runMain episodes.main $(op read op://Private/pocketcasts.com/username) $(op read op://Private/pocketcasts.com/password)

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
