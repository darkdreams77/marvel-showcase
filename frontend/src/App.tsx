import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { LayoutFixed, LayoutLoose } from "./components/Layout";
import { Characters } from "./pages/Characters";
import { Comics } from "./pages/Comics";
import { Favorites } from "./pages/Favorites";
import { Character } from "./pages/Character";
import { Comic } from "./pages/Comic";

function App() {
  // const [status, setStatus] = useState("...");

  // useEffect(() => {
  //   fetch("/api/health")
  //     .then((r) => r.json())
  //     .then((res: ApiResponse<string>) => setStatus(res.data ?? "no data"));
  // }, []);

  return (
    <Routes>
      <Route element={<LayoutFixed />}>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/personnage/:id" element={<Character />} />
        <Route path="/comic/:id" element={<Comic />} />
      </Route>
      <Route element={<LayoutLoose />}>
        <Route path="/personnages" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favoris" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
