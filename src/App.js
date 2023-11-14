import "./App.css";

import Astrology from "./Astrology";

function App() {
  // const [currentHash, setCurrentHash] = useState(window.location.hash);

  // useEffect(() => {
  //   const onHashChange = () => {
  //     setCurrentHash(window.location.hash);
  //   };

  //   // Listen to the hashchange event which is triggered by navigating to a new hash
  //   window.addEventListener("hashchange", onHashChange);

  //   // Remove event listener on cleanup
  //   return () => window.removeEventListener("hashchange", onHashChange);
  // }, []);
  // const renderComponent = () => {
  //   switch (currentHash) {
  //     case "#/astrology":
  //       return <Astrology />;
  //     default:
  //       return <NumerologyForm />;
  //   }
  // };

  return (
    <div className="App">
      <div className="App-header">
        <Astrology />
      </div>
    </div>
  );
}

export default App;
