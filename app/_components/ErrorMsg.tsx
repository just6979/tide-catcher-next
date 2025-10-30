export default function ErrorMsg({ msg = "Unknown Error" }): React.JSX.Element {
  return (
    <p>
      <span className="error">Error: </span>
      {msg}
    </p>
  )
}
