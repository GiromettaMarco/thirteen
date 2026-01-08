import path from 'node:path'

const alias = {
  '@inertiajs/react': path.resolve(
    import.meta.dirname,
    './mocks/inertia/react.tsx'
  )
}

export default alias
