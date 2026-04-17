import { useState } from "react";
import { SchemeForm } from "./components/SchemeForm";
import { SchemeCard } from "./components/SchemeCard";
import { UserProfile, Scheme } from "./types";
import { findSchemes } from "./services/geminiService";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid, Landmark, Sparkles } from "lucide-react";

export default function App() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (profile: UserProfile) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const results = await findSchemes(profile);
      setSchemes(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-slate-900 text-white py-16 md:py-24 mb-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Landmark className="w-8 h-8 text-blue-400" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">GovScheme Navigator</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto leading-[1.1]"
          >
            Find the Support You <span className="text-blue-400">Deserve</span>.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            AI-powered discovery of government schemes tailored to your unique profile and needs.
          </motion.p>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-24 relative z-20">
        <SchemeForm onSubmit={handleSearch} isLoading={isLoading} />

        <div className="mt-20">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 space-y-4"
              >
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
                </div>
                <p className="text-slate-500 font-medium animate-pulse">Analyzing thousands of schemes...</p>
              </motion.div>
            ) : hasSearched ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-slate-400" />
                    <h2 className="text-xl font-bold text-slate-800">
                      {schemes.length} Recommended Schemes
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    AI Verified
                  </div>
                </div>

                {schemes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {schemes.map((scheme, index) => (
                      <SchemeCard key={scheme.id} scheme={scheme} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                    <p className="text-slate-400 font-medium">No specific schemes found for this profile. Try adjusting your details.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50 grayscale pointer-events-none"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-slate-200 rounded-3xl animate-pulse" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="mt-32 border-t border-slate-200 py-12 text-center text-slate-400 text-sm">
        <p>© 2026 GovScheme Navigator. Powered by Gemini AI.</p>
        <p className="mt-2">Information provided is for reference. Please verify with official portals.</p>
      </footer>
    </div>
  );
}

