dev:
    pnpm run start

process-images:
    scala scripts/ProcessImages.sc

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
