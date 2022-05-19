import { withErrorBoundary } from "react-error-boundary";
import Error from "../Pages/Error"

function App() {

  return (
    <div className="App">
      <h1>Probando</h1>
    </div>
  );
}

export default withErrorBoundary(App, {
  FallbackComponent: Error
});
