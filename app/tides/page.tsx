import Form from "next/form"

export default async function TidesChooser() {
  return (
    <div id="mode-selector">
      <h3>How would you like to get your tides?</h3>
      <Form action="/tides/at">
        Nearby via GPS:&nbsp;
        <input name="location" value="gps" type="hidden" />
        <button type="submit">Go</button>
      </Form>
      <Form action="/tides/at">
        Near a given location:&nbsp;
        <input name="location" defaultValue="42.710,-70.788" />
        <button type="submit">Go</button>
      </Form>
      <Form action="/tides/at">
        From a specific station:&nbsp;
        <input name="station" defaultValue="8441241" />
        <button type="submit">Go</button>
      </Form>
    </div>
  )
}
