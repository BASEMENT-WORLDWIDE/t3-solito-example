import { env } from "./env/server.mjs";
import expoAdapater from '@expo/next-adapter/build/index.js'
import withPlugins from 'next-compose-plugins'
import { createRequire } from "module";
import withTM from 'next-transpile-modules'
const transpiledModules = withTM([
  '@poette/api',
  '@poette/app',
  '@poette/db',
  'solito',
  'moti',
  'nativewind',
])
import withFonts from 'next-fonts'
import withImages from 'next-images'

const { withExpo } = expoAdapater
const require = createRequire(import.meta.url)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  webpack5: true,
  experimental: {
    forceSwcTransforms: true,
    swcPlugins: [[require.resolve('./plugins/swc_plugin_reanimated.wasm')]],
  },
}

export default withPlugins(
  [transpiledModules, withFonts, withImages, withExpo],
  nextConfig,
)
