//{"id":"chatcmpl-8waOqar80cyCbnpD4fRBMDCOQRhGK","object":"chat.completion.chunk","created":1708973636,"model":"gpt-3.5-turbo-0125","system_fingerprint":"fp_86156a94a0","choices":[{"index":0,"delta":{"content":" you"},"logprobs":null,"finish_reason":null}]}

function App() {
  const [text, setText] = React.useState('')

  const handleFetchClick = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'who are you ?'
    }
    const response = await fetch('http://localhost:3000/chat/send', options)

    const render = response.body.getReader()

    // let receivedText = ''
    while (true) {
      const { done, value } = await render.read() // value is a Uint8Array
      const decoder = new TextDecoder()
      if (done) break

      const chunks = decoder.decode(value).split('\n')
      chunks.forEach(chunk => {
        if (chunk) {
          const obj = JSON.parse(chunk)
          // receivedText += obj.choices[0].delta.content ?? '' + ' '
          setText(prevState => prevState + (obj.choices[0].delta.content ?? '') + ' ')
        }
      })
    }
  }

  return (
    <>
      <button
        onClick={handleFetchClick}
        style={{backgroundColor: 'blue', color: 'white', cursor: 'pointer'}}
      >
        fetch
      </button>

      <p style={{fontSize: '32px'}}>
        {text}
      </p>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)
