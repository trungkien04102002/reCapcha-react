import { useState, useRef } from "react"
import Reaptcha from "reaptcha"
import "./App.css"

function App() {
  const recaptcha = useRef()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [captchaToken, setCaptchaToken] = useState(null)

  async function submitForm(event) {
    event.preventDefault()
    if (!captchaToken) {
      alert("Please verify the reCAPTCHA!")
    } else {
      const res = await fetch("http://localhost:8000/verify", {
        method: "POST",
        body: JSON.stringify({ captchaToken }),
        headers: {
          "content-type": "application/json"
        }
      })
      const data = await res.json()
      if (data.success) {
        // make form submission
        alert("Form submission successful!")
      } else {
        alert("reCAPTCHA validation failed!")
      }
    }
  }

  async function verify() {
    recaptcha.current.getResponse().then((res) => {
      setCaptchaToken(res)
    })
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={submitForm}>
        <input
          name="Email"
          type={"email"}
          value={email}
          required
          placeholder="joe@example.com"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          name="Name"
          type={"name"}
          value={name}
          required
          placeholder="Joe"
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit">Sign up</button>
        <Reaptcha
          ref={recaptcha}
          sitekey="6LfMSgUpAAAAAGdz-_Yq62BVN16ptPh73G3t1E5d"
          onVerify={verify}
        ></Reaptcha>
      </form>
    </div>
  )
}

export default App
