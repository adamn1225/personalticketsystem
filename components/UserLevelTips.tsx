
import { useBoomerMode } from "./BoomerModeProvider"

const UserLevelTips = () => {
    const { boomerMode, advancedMode, toggleAdvancedMode } = useBoomerMode();

    return (
        <>
            {boomerMode ? (
                <aside className=" h-full overflow-y-auto w-full md:w-3/5 bg-gray-50 border border-gray-200 rounded p-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-white mb-2">📸 How to Take a Screenshot</h3>
                    <p className="text-sm text-white mb-2">
                        Submitting a screenshot with your ticket helps us resolve your issue faster.
                    </p>

                    <div className="mb-4">
                        <h4 className="font-semibold text-sm text-white">🪟 Windows:</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside ml-2">
                            <li>Press <kbd className="bg-gray-200 px-1 rounded">Win</kbd> + <kbd className="bg-gray-200 px-1 rounded">Shift</kbd> + <kbd className="bg-gray-200 px-1 rounded">S</kbd></li>
                            <li>Select an area to capture</li>
                            <li>Paste into Paint or attach the saved image here</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-semibold text-sm text-white">🍏 Mac:</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside ml-2">
                            <li>Press <kbd className="bg-gray-200 px-1 rounded">Shift</kbd> + <kbd className="bg-gray-200 px-1 rounded">Command</kbd> + <kbd className="bg-gray-200 px-1 rounded">4</kbd></li>
                            <li>Select an area</li>
                            <li>Find the screenshot on your desktop and attach it</li>
                        </ul>
                    </div>

                    <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold text-sm text-white">💡 Extra Tips</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside ml-2 space-y-1">
                            <li>Be specific — what were you trying to do?</li>
                            <li>Include any error messages (copy or screenshot them)</li>
                            <li>Don’t panic — just describe what happened</li>
                            <li>“It broke” is fine, but “I clicked the blue button and it froze” is gold</li>
                        </ul>
                    </div>

                    <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold text-sm text-white">🧓 Common Issues (and Fixes)</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside ml-2 space-y-1">
                            <li><b>🖱️ Mouse not working?</b> Try unplugging and plugging it back in.</li>
                            <li><b>🌐 No internet?</b> Try restarting your Wi-Fi or modem.</li>
                            <li><b>📄 Can’t find a file?</b> Try searching the file name in the bottom left (Windows) or top right (Mac).</li>
                            <li><b>🔊 No sound?</b> Check your volume and headphones aren't unplugged.</li>
                            <li><b>💻 Computer acting weird?</b> Restarting fixes 95% of issues.</li>
                            <li><b>⏳ Slow computer?</b> Close unused tabs or programs (seriously, you don’t need 47 open).</li>
                            <li><b>💬 Got a weird pop-up?</b> Screenshot it and send it with your ticket — don’t click anything.</li>
                        </ul>
                    </div>
                </aside>
            ) : advancedMode ? (
                <aside className="h-1/2 max-h-[900px] overflow-y-auto w-full md:w-3/5 bg-zinc-950 border border-gray-200 rounded p-4 shadow-sm">

                    <h3 className="text-lg font-semibold text-white mb-2">🧠 Pro Tips for Submitting a Good Ticket</h3>
                    <ul className="text-sm text-white list-disc list-inside space-y-2">
                        <li><b>Include Stack Traces:</b> Copy relevant parts, not 500 lines.</li>
                        <li><b>Reproduce Steps:</b> “Login &gt; Click X &gt; Boom 💥” is gold.</li>
                        <li><b>Console Logs:</b> <code>console.error</code>, network tab, payloads — we love 'em.</li>
                        <li><b>Environment Info:</b> Browser, OS, version — saves back and forth.</li>
                        <li><b>Expected vs. Actual:</b> What you expected vs. what actually happened.</li>
                        <li><b>Don’t sanitize too much:</b> Raw errors tell the story. We won’t judge.</li>
                    </ul>

                    <div className="mt-6 border-t pt-4">
                        <h4 className="text-sm font-semibold text-white">🛠️ Bonus Tips</h4>
                        <ul className="text-sm text-white list-disc list-inside space-y-1">
                            <li>If possible, include a link or test environment.</li>
                            <li>Screenshot tools: <code>cmd+shift+4</code> (Mac), <code>Win+Shift+S</code> (Win)</li>
                            <li>For APIs: include request/response bodies.</li>
                            <li>Attach HAR files for network debugging.</li>
                            <li>Include test credentials if applicable.</li>
                            <li>Clarify user roles or permission levels.</li>
                            <li>Mention recent changes, merges, or deploys.</li>
                            <li>Label attachments: "log.txt", "screenshot-login.png", etc.</li>
                        </ul>
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <h4 className="text-sm font-semibold text-white">🔬 Even Deeper Dives</h4>
                        <ul className="text-sm text-white list-disc list-inside space-y-1">
                            <li>Include Redux state snapshots or relevant store slices.</li>
                            <li>Using feature flags? Mention what's on/off.</li>
                            <li>Leave a <code>curl</code> or Postman export for API replication.</li>
                            <li>Use Loom or screen recording when things get weird.</li>
                        </ul>
                    </div>
                </aside>

            ) :
                <aside className="h-1/2 max-h-[900px] overflow-y-auto w-full md:w-3/5 bg-zinc-950 border border-gray-200 rounded p-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-white mb-2">🧾 How to Write a Useful Ticket</h3>
                    <ul className="text-sm text-white list-disc list-inside space-y-2">
                        <li><strong>Be Clear:</strong> Start with what you were trying to do.</li>
                        <li><strong>What went wrong?</strong> Explain what didn’t work or what surprised you.</li>
                        <li><strong>Include screenshots or copy error messages.</strong> Bonus points if you show before/after.</li>
                        <li><strong>Steps to reproduce (if you can):</strong> "I clicked X, then selected Y, then it broke."</li>
                        <li><strong>How urgent is it?</strong> “Can’t use feature” ≠ “UI looks weird.”</li>
                        <li><strong>Did it happen once or multiple times?</strong> Let us know!</li>
                        <li><strong>Don’t worry about sounding technical.</strong> Just describe it like you'd explain to a coworker.</li>
                    </ul>

                    <div className="mt-6 border-t pt-4">
                        <h4 className="text-sm font-semibold text-white">📦 Helpful Info to Include (If You Know It)</h4>
                        <ul className="text-sm text-white list-disc list-inside space-y-1">
                            <li>Your browser name (Chrome, Safari, etc.)</li>
                            <li>Are others on your team seeing the same issue?</li>
                            <li>The page URL where the issue happened</li>
                            <li>Did refreshing the page help?</li>
                        </ul>
                    </div>
                </aside>

            }
        </>
    );
}

export default UserLevelTips;