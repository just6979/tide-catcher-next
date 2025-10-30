export default function AlertMsg({ msg = "Unknown Error" }): React.JSX.Element {
  return (
    <p>
      <span className="info">Info:</span>
      {msg}
    </p>
  )
}
