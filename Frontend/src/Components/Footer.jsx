import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">AI Media</h3>
            <p className="text-gray-400 text-sm">
              Transform your ideas into reality with our AI-powered image generation and captioning tools.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/image-to-text" className="text-gray-400 hover:text-white transition-colors">Image to Text</a></li>
              <li><a href="/text-to-image" className="text-gray-400 hover:text-white transition-colors">Text to Image</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                 className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} AI Media. All rights reserved.
          </p>
          <p className="text-center text-gray-600 text-xs mt-2">
            Powered by React, Tailwind CSS, and cutting-edge AI models.
          </p>
        </div>
      </div>
    </footer>
  );
}