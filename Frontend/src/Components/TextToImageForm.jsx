import { useState } from "react";

export default function TextToImageForm() {
  const [prompt, setPrompt] = useState("A futuristic city with flying cars");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE_URL = "http://127.0.0.1:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || trimmedPrompt.length < 5) {
      setError("Please enter a detailed prompt (at least 5 characters)");
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl("");

    try {
      // Make POST request to your Django endpoint
      const response = await fetch(`${API_BASE_URL}/generate-image/`, {
        method: "POST",
        body: new URLSearchParams({ prompt: trimmedPrompt }), // send as form-data style
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      if (!data.image_path) {
        throw new Error("No image path returned from backend");
      }

      // Construct URL to display generated image
      setImageUrl(`http://127.0.0.1:8000/media/${data.image_path}?t=${Date.now()}`);
    } catch (err) {
      console.error("Error generating image:", err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Text to Image Generator
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Describe the image you want to create with AI
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white"
              placeholder="A futuristic city with flying cars"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Image"}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {imageUrl && (
            <div className="mt-6 text-center">
              <img
                src={imageUrl}
                alt="Generated"
                className="mx-auto max-h-96 rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
