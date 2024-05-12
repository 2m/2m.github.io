dev:
    yarn run start

process:
    scala-cli ProcessImages.scala

build:
    yarn build

serve:
    cd build; python3 -m http.server 3000
