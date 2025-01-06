dev:
    yarn run start

process:
    scala ProcessImages.scala

install:
    yarn install

upgrade:
    yarn upgrade --all

build:
    yarn build

serve:
    cd build; python3 -m http.server 3000
