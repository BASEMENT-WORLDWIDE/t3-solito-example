import { NativeNavigation } from '@poette/app/navigation/native'
import { Provider } from '@poette/app/provider'

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}
