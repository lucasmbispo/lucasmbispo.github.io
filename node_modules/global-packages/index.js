// Native
const path = require('path')

// Packages
const fs = require('fs-promise')
const {symlinkSync} = require('path-type')
const directory = require('global-modules')

module.exports = async () => {
  let modules

  try {
    modules = await fs.readdir(directory)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []
    }

    throw err
  }

  for (const item of modules) {
    const index = modules.indexOf(item)
    const fullPath = path.join(directory, item)

    modules[index] = {
      name: item,
      linked: symlinkSync(fullPath),
      path: fullPath
    }
  }

  return modules
}
