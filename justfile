dev:
    pnpm run start

process:
    scala ProcessImages.scala

clean-scala-build:
    rm -rf .scala-build/

install:
    pnpm install

upgrade:
    pnpm upgrade --all

build:
    pnpm build

serve:
    cd build; python3 -m http.server 3000
