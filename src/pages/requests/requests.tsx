import { useEffect } from "react"

export default function Requests({requests}) {
  useEffect(() => {
    console.log(requests);
  },[requests])

  return (
    <div>requests</div>
  )
}
