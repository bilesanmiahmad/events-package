export default () => ({ files: [`**/**.${process.env.SMOKE_TEST === 'true' ? 'test' : 'spec'}.js`], require: ['esm'] })
