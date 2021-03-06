importScripts('../js/jszip.min.js', '../js/jszip-utils.js')
onmessage = function (g) {
  var c = g.data
  JSZipUtils.getBinaryContent(c.m + '/' + c.s + '.gz', {
    callback: function (g, h) {
      var a = new JSZip(h),
        d = a.file(c.s + '.json')
      g && postMessage({ error: !0, data: c })
      var d = JSON.parse(d.asText()),
        b = a.file(c.s + '-position.bin')
      if (b) {
        var b = b._data.getContent(),
          b = new Float32Array(b.buffer),
          e = a.file(c.s + '-normal.bin')._data.getContent(),
          e = new Float32Array(e.buffer),
          f = a.file(c.s + '-color.bin')._data.getContent(),
          f = new Float32Array(f.buffer),
          a = a.file(c.s + '-uv.bin')._data.getContent(),
          a = new Float32Array(a.buffer)
        postMessage({ list: d.list, position: b, normal: e, color: f, uv: a }, [
          b.buffer,
          e.buffer,
          f.buffer,
          a.buffer,
        ])
      } else
        (a = new Float32Array(d.position)),
          (b = new Float32Array(d.normal)),
          (e = new Float32Array(d.color)),
          (f = new Float32Array(d.uv)),
          postMessage(
            { list: d.list, position: a, normal: b, color: e, uv: f },
            [a.buffer, b.buffer, e.buffer, f.buffer]
          )
    },
  })
}
