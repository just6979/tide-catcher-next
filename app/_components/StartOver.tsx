import Link from "next/link"

export default function StartOver({ href = "/" }): React.JSX.Element {
  return (
    <p>
      <Link href={href} prefetch={true}>
        Start Over
      </Link>
    </p>
  )
}
