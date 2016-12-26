module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactCSSVariables',
      externals: {
        react: 'React',
        'styled-components': 'styled'
      }
    }
  },
  webpack: {
    compat: {
      enzyme: true
    }
  }
}
