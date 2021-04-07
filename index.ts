import { exec } from 'child_process'
import { tmpdir } from 'os'
import { join } from 'path'
import { promisify } from 'util'
import { mkdtemp, copyFile, rm } from 'fs'

const mkdTempPromise = promisify(mkdtemp)
const execPromise = promisify(exec)
const copyFilePromise = promisify(copyFile)
const rmPromise = promisify(rm)

const convert = async (file: string) => {
  const cwd = await mkdTempPromise(join(tmpdir(), 'pdf-'))
  const tmpFile = join(cwd, 'source.pdf')

  await copyFilePromise(file, tmpFile)
  await execPromise(`pdftk ${tmpFile} burst`, { cwd })
  await rmPromise(tmpFile)

  await execPromise(`for f in *.pdf; do pdftocairo -svg $f; done`, { cwd })

  const zipFile = join(cwd, 'svgs.zip')

  await execPromise(`zip ${zipFile} *.svg`, { cwd })

  return zipFile
}

convert(join(__dirname, './examples/single-page.pdf')).then((zip) =>
  console.log('zip', zip)
)
