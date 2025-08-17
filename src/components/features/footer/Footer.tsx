import { Github } from "lucide-react";
import { DateTime } from "luxon";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4">
            <a
              href="https://github.com/yourusername/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-gray-900 dark:text-white font-medium text-base border border-gray-200 dark:border-gray-600"
            >
              <Github className="w-5 h-5" />
              View Source Code
            </a>
          </div>

          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-4"></div>

          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            © {DateTime.now().year} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
