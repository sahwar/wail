import fs from 'fs-extra'
import Promise from 'bluebird'

export function readFile (path, options = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(data)
      }
    })
  })
}

export function ensureDirectory (dirPath) {
  return new Promise((resolve, reject) => {
    fs.ensureDir(dirPath, err => {
      if (err) {
        return reject(err)
      } else {
        return resolve()
      }
    })
  })
}

export function ensureDirAndWrite (dirPath, filePath, data, options = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.ensureDir(dirPath, errEnsure => {
      if (errEnsure) {
        return reject({
          where: 'ensuring',
          err: errEnsure
        })
      } else {
        fs.writeFile(filePath, data, options, errWrite => {
          if (errWrite) {
            return reject({
              where: 'writing',
              err: errWrite
            })
          } else {
            return resolve()
          }
        })
      }
    })
  })
}

export const checkPathExists = (path) => new Promise((resolve, reject) => {
  fs.access(path, fs.constants.R_OK, err => {
    resolve(!err)
  })
})

export const removeFile = filePath => new Promise((resolve, reject) => {
  fs.remove(filePath, err => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})

export const getFsStats = toStatPath => new Promise((resolve, reject) => {
  fs.stat(toStatPath, (err, stats) => {
    if (err) {
      reject(err)
    } else {
      resolve(stats)
    }
  })
})