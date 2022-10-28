#!/usr/bin/env nim

import
  strformat

var id = 0
while fileExists(fmt".tmp{id}.js"):
  id.inc()

let filename = fmt".tmp{id}.js"
let minifiedFilename = fmt".tmp{id}.min.js"

exec fmt"node_modules/.bin/browserify src/main.js -o {filename}"
exec fmt"node_modules/.bin/minify {filename} > {minifiedFilename}"

let header = readFile "src/header.js"
let minified = readFile minifiedFilename

rmFile filename
rmFile minifiedFilename

let userScript = header & "\L" & minified
writeFile("overlay.user.js", userScript)
