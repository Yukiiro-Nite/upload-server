const multiparty = require('multiparty')
const http = require('http')
const fs = require('fs')
const server = http.createServer()
const PORT = 8000 || process.env.PORT

server.on('request', (req, res) => {
  if(req.method === "GET") {
    res.write(fs.readFileSync('index.html'))
  } else if(req.method === "POST") {
    const form = new multiparty.Form({
      uploadDir: './uploads'
    })
    form.parse(req, (err, fields, files) => {
      if(err) console.log(err);
      console.log(fields)
      console.log(files)
    })

    res.write(fs.readFileSync('index.html'))
  } else {
    res.write("Invalid method!")
  }

  res.end();
})

server.listen(PORT, () => {
  console.log(`Upload server listening on port ${PORT}`)
})