import "./App.css";
import { ImageLazy } from "./components/ImageLazy";
import { LoremIpsum } from "./components/LoremIpsum";
import { images } from "./data/images";

function App() {
  return (
    <div className="App">
      <h1>
        Image lazy loading using{" "}
        <pre className="d-inline">IntersectionObserver</pre> API.
      </h1>

      {/* LoremIpsum text to keep images below viewport */}
      <LoremIpsum />

      <div className="container">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <ImageLazy
              thumbnail={image.thumbnail}
              highResImage={image.highResImage}
              altText={image.altText}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
