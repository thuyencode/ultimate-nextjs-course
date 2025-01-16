import dynamic from 'next/dynamic'

const Editor = dynamic(async () => await import('./editor'), { ssr: false })

export default Editor
