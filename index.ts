import { exec } from 'child_process'
import { tmpdir } from 'os'
import { join } from 'path'
import { promisify } from 'util'
import { mkdtemp, mkdtempSync } from 'fs'
import express from 'express'
import multer from 'multer'

const mkdTempPromise = promisify(mkdtemp)
const execPromise = promisify(exec)

const convert = async (file: string) => {
  const cwd = await mkdTempPromise(join(tmpdir(), 'pdf-'))
  const zipFile = join(cwd, 'svgs.zip')

  await execPromise(`pdftk ${file} burst`, { cwd })
  await execPromise(`for f in *.pdf; do pdftocairo -svg $f; done`, { cwd })
  await execPromise(`zip ${zipFile} *.svg`, { cwd })

  return zipFile
}

const app = express()
const upload = multer({ dest: mkdtempSync(join(tmpdir(), 'uploads-')) })
const port = 3000

app.use(express.static('./public'))

app.post('/convert', upload.single('pdf'), async (req, res) => {
  const zip = await convert(req.file.path)
  res.sendFile(zip)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
