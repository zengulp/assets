'use strict'

const { task, src, dest, parallel } = require('gulp')
const path = require('@nodewell/path')
const imagemin = require('gulp-imagemin')
const png = require('imagemin-pngquant')

task('build:copy-files', async () => {
  src([
    path('@/README*'),
    path('@/LICENSE*')
  ])
    .pipe(dest(path('@/dist')))
})

task('build:logo', async () => {
  const floatPrecision = 0

  src(path('@/src/brand/logo/**/*.svg'))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { cleanupNumericValues: { floatPrecision } },
          { convertPathData: { floatPrecision } },
          { transformsWithOnePath: { floatPrecision } },
          { convertTransform: { floatPrecision } },
          { cleanupListOfValues: { floatPrecision } }
        ]
      })
    ]))
    .pipe(dest(path('@/dist/brand/logo')))
})

task('build:media:github:png', async () => {
  src(path('@/src/brand/media/github/**/*.png'))
    .pipe(imagemin([
      png({
        speed: 1,
        strip: true,
        quality: [0.75, 0.95]
      })
    ]))
    .pipe(dest(path('@/dist/brand/media/github')))
})

task('build:media:github:svg', async () => {
  src(path('@/src/brand/media/github/**/*.svg'))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { cleanupNumericValues: { floatPrecision: 0 } },
          { convertPathData: { floatPrecision: 1 } },
          { transformsWithOnePath: { floatPrecision: 0 } },
          { convertTransform: { floatPrecision: 0 } },
          { cleanupListOfValues: { floatPrecision: 0 } }
        ]
      })
    ]))
    .pipe(dest(path('@/dist/brand/media/github')))
})

task('build',
  parallel(
    'build:copy-files',
    'build:logo',
    'build:media:github:png',
    'build:media:github:svg'
  )
)
