import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Santa } from '../components/santa'
import styles from '../styles/Home.module.css'


const codes = {
  andreas: "andreasadvent",
  isabella: "jinglebella",
  carmen: 'felizcarmidad',
  julia: 'godjulia'
}

const santas = {
  andreas: "julia",
  isabella: "carmen",
  carmen: 'andreas',
  julia: 'isabella'
}

function checkResult(name, code) {

  return codes[name] === code

}

function getFirstLetterUppercase(str) {
  if (!str) return
  return str.replace(/^\w/, (c) => c.toUpperCase())
}

export default function Home() {
  const router = useRouter()
  const { name } = router.query
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')
  const [checking, setChecking] = useState(false)
  const [badResult, setBadResult] = useState(false)

const onSubmit = e => {

  e.preventDefault()
  
  setChecking(true)

  setTimeout(() => {
    if (checkResult(name, code)) {
      snowStorm.stop();
      setResult(santas[name])
    } else {
      setChecking(false)
      setBadResult(true)
    }
    setChecking(false)
  }, 3000)

}


  useEffect(() => {
      // 1. Define a color for the snow
      snowStorm.snowColor = '#fff';
      // 2. To optimize, define the max number of flakes that can
      // be shown on screen at once
      snowStorm.flakesMaxActive = 64;
      // 3. Allow the snow to flicker in and out of the view
      snowStorm.useTwinkleEffect = true; 
      // 4. Start the snowstorm!
      snowStorm.start();
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>SSEcret Santa</title>
        <script type="text/javascript" src="/static/snowstorm.js"></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {checking ? <h2>ANALYZING IF YOU'VE BEEN NAUGHTY OR NICE...</h2> : (
      <main className={styles.main}>
      <h1>
          Welcome to the SSE BL Secret Santa, {getFirstLetterUppercase(name)}
        </h1>
        {badResult ? <p className={styles.secretText}>No, no, no, that was really NAUGHTY of you, trying to hack the secret santa!!! Now please enter the right code!</p> : <p className={styles.secretText}>Please enter your <i>secret</i> code to find out for whom you are the <i>Secret</i> Santa</p>}
        <form onSubmit={onSubmit} className={styles.form}>
          <input onChange={e => {
            setCode(e.target.value)
            setBadResult(false)
            }} value={code} />
          <button type="submit">Show me the mone... I mean, person!</button>
        </form>
        <Santa width={300} />
        </main>)}
        <div className={styles.bigOverlay} style={{opacity: result ? 1 : 0, pointerEvents: result ? 'auto' : 'none'}}>
          <h1>Wow! You are <span className={styles.result}>{getFirstLetterUppercase(result)}</span>'s Secret Santa!!!</h1>
          <p>(Which means that YOU are supposed to give something to {result === "andreas" ? "HIM" : "HER"})</p>
          <img className={styles.bigImage} src={result + ".png"} />
        </div>
    </div>
  )
}
