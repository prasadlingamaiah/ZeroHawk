import React, { useState } from 'react';
import { VulnerabilityFinding } from './types.ts';
import { ScannerForm } from './components/Step.tsx'; // repurposed to ScannerForm
import { ScanResults } from './components/LocationDisplay.tsx'; // repurposed to ScanResults
import { runVulnerabilityScan } from './services/geminiService.ts';
import { ShieldCheckIcon } from './components/icons/StaticIcons.tsx';

const App: React.FC = () => {
    const [findings, setFindings] = useState<VulnerabilityFinding[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [scanPerformed, setScanPerformed] = useState(false);

    const handleScan = async (url: string, requiresAuth: boolean) => {
        setIsLoading(true);
        setError(null);
        setFindings(null);
        setScanPerformed(true);

        try {
            const results = await runVulnerabilityScan(url, requiresAuth);
            setFindings(results);
        } catch (e: any) {
            setError(e.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen p-4 sm:p-6 lg:p-8 text-white font-sans selection:bg-cyan-400/20">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 text-center">
                    <div className="inline-flex items-center gap-4">
                        <ShieldCheckIcon className="w-12 h-12 text-cyan-400"/>
                        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Gemini Vulnerability Scanner
                        </h1>
                    </div>
                    <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
                        An AI-powered assistant to perform non-intrusive scans for potential web application vulnerabilities.
                    </p>
                </header>

                <main className="space-y-8">
                    <ScannerForm onScan={handleScan} isLoading={isLoading} />
                    <div className="mt-10">
                       <ScanResults 
                            findings={findings}
                            isLoading={isLoading}
                            error={error}
                            scanPerformed={scanPerformed}
                        />
                    </div>
                </main>
                
                <footer className="text-center mt-12 text-slate-600 text-xs space-y-2">
                    <p>
                        Disclaimer: This tool provides an AI-generated analysis and does not perform real attacks. 
                        Results are for informational purposes and should be verified by a qualified security professional.
                    </p>
                    <p>Powered by Gemini & React</p>
                </footer>
            </div>
        </div>
    );
};

export default App;