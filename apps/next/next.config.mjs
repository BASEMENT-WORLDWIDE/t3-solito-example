import { env } from "./src/env/server.mjs";
import { withExpo } from '@expo/next-adapter'
import withPlugins from 'next-compose-plugins'
import withTM from 'next-transpile-modules'
const transpiledModules = withTM([
  '@poette/api',
  '@poette/db',
  'solito',
  'moti',
  'nativewind',
  'app',
])
import withFonts from 'next-fonts'
import withImages from 'next-images'

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
    swcPlugins: [['./plugins/swc_plugin_reanimated.wasm']],
  },
}

module.exports = withPlugins(
  [transpiledModules, withFonts, withImages, withExpo],
  nextConfig
)
