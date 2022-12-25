import * as coda from '@codahq/packs-sdk'

export const pack = coda.newPack()

pack.addFormula({
  resultType: coda.ValueType.String,
  name: 'formatR',
  description: "'R' number format",
  connectionRequirement: coda.ConnectionRequirement.None,
  cacheTtlSecs: 60 * 60 * 24, // 24 hours
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'value',
      description: 'The number to format',
    }),
  ],
  execute: async function ([value], context) {
    const suffix = 'R'
    if (value) {
      const val = Number(value.replace(suffix, ''))
      const prefix = val < 0 ? '-' : ''
      return [prefix, Math.abs(val).toFixed(1), suffix].join('')
    }
    return ''
  },
})

pack.addColumnFormat({
  name: 'Format number - R',
  instructions: "'R number format'",
  formulaName: 'formatR',
})
