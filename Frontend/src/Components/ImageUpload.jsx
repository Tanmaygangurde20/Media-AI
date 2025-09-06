import { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://127.0.0.1:8000';

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image first");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(image.type)) {
      setError("Please upload a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (image.size > maxSize) {
      setError("Image size should be less than 5MB");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCaption("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(`${API_BASE_URL}/upload-image/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }

      if (!data.caption) {
        throw new Error("No caption was generated. Please try again.");
      }

      setCaption(data.caption); // ✅ using `caption` returned by backend
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to generate caption. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            Image to Caption
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Upload an image and let AI generate a descriptive caption for it
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-700/70 transition-colors">
                  {preview ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain p-2" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, or WebP (MAX. 5MB)</p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/webp"
                  />
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!image || isLoading}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all ${
                  !image || isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 transform hover:scale-105"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Caption"
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
                  {error}
                </div>
              )}
            </div>

            {/* Caption Section */}
            <div className="bg-gray-800/50 rounded-2xl p-6 min-h-[200px] flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400">Analyzing image. This may take a moment...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {caption ? (
                    <div className="w-full">
                      <h3 className="text-white text-xl font-semibold mb-2">Generated Caption:</h3>
                      <p className="text-gray-300 text-lg bg-gray-900/50 p-4 rounded-lg">{caption}</p>
                      <button
                        onClick={() => navigator.clipboard.writeText(caption)}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
                      >
                        Copy to Clipboard
                      </button>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      <p>Your image and caption will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
