# Mediainfo Angular example

**Step #1**

Copy the node_modules/mediainfo.js/dist/MediaInfoModule.wasm to your project's src directory,

**Step #2**

Modify the angular.json file to add that file to the assets section, in the options of build target

"architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:browser",
      "options": {
        
        ...
        "assets": [
          "src/assets",
          "src/favicon.ico",
          "src/MediaInfoModule.wasm"
        ],
        "styles": [
**Step #3**

Restart ng serve

##Credits

To @David that showed how to do this in [this Stackoverflow question](https://stackoverflow.com/questions/63001079/mediainfo-js-integration-in-angular-8)
