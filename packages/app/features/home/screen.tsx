import { A, H1, P, Text, TextLink } from '@poette/app/design/typography'
import { Row } from '@poette/app/design/layout'
import { View } from '@poette/app/design/view'

import { MotiLink } from 'solito/moti'
import { trpc } from '@poette/app/provider/trpc'
import { Pressable } from 'react-native'

export function HomeScreen() {
  const createPost = trpc.post.create.useMutation()
  const onCreatePost = async () => {
    const newPost = await createPost.mutateAsync({
      title: 'Hello',
      content: 'Hello World',
    })
  }
  return (
    <View className="flex-1 items-center justify-center p-3">
      <H1>Welcome to Solito.</H1>
      <View className="max-w-xl">
        <P className="text-center">
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P className="text-center">
          Solito is made by{' '}
          <A
            href="https://twitter.com/fernandotherojo"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
          >
            Fernando Rojo
          </A>
          .
        </P>
        <P className="text-center">
          NativeWind is made by{' '}
          <A
            href="https://twitter.com/mark__lawlor"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
          >
            Mark Lawlor
          </A>
          .
        </P>
      </View>
      <View className="h-[32px]" />
      {createPost.data && (
        <Row>
          <H1>{createPost.data.title}</H1>
          <P>{createPost.data.content}</P>
        </Row>
      )}
      <Row className="space-x-8">
        <TextLink href="/user/fernando">Regular Link</TextLink>
        <Pressable onPress={onCreatePost}>
          <Text>Create Post</Text>
        </Pressable>
        <MotiLink
          href="/user/fernando"
          animate={({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 0.95 : hovered ? 1.1 : 1,
              rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
            }
          }}
          transition={{
            type: 'timing',
            duration: 150,
          }}
        >
          <Text selectable={false} className="text-base font-bold">
            Moti Link
          </Text>
        </MotiLink>
      </Row>
    </View>
  )
}
