import Spinner from "react-bootstrap/Spinner";
type ConnectionStatusType = {
  //repeated in Socket context
  connected: boolean;
  message: string;
};
type SpinnerSocketConnectionProps = {
  connectionStatus: ConnectionStatusType;
};
export default function SpinnerSocketConnection({
  connectionStatus,
}: SpinnerSocketConnectionProps) {
  console.log("SpinnerSocketConnection");
  return (
    <div className=" position-absolute top-50 start-50">
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <br />
      <p className="text-muted fs-2">{connectionStatus.message}</p>
    </div>
  );
}
