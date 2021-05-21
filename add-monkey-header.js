'use strict'

var fs = require('fs')
var path = require('path')
var config = require('./package')

var formatHtml = function(input, output, config) {
    input = input || 'input.html'
    output = output || 'output.html'

    var template = `

// ==UserScript==
// @name         Hook Ajax
// @namespace    https://gitee.com/HGJing/everthing-hook/
// @version      0.1.1
// @description  it can hook all ajax
// @author       Cangshi
// @include      *
// @run-at       document-start
// @grant        none
// ==/UserScript==
`

    var rr = fs.createReadStream(input),
        writer = fs.createWriteStream(output)

    rr.setEncoding('utf8')
    writer.write(Buffer.from(template))
    rr.on('data', function(data) {
        writer.write(data)
    })

    rr.on('end', function() {
        console.log('TM Script End Read')
    })

    writer.on('finish', function() {
        console.log('TM Script End Write')
    })
}

formatHtml(path.join(__dirname, config.mainMini), path.join(__dirname, config.mainMiniTm), config)
formatHtml(path.join(__dirname, config.main), path.join(__dirname, config.mainTm), config)