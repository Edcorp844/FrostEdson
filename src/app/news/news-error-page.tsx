'use client'

import { RiErrorWarningLine } from "react-icons/ri";
import { TbCopy, TbMessageReport, TbRefresh } from "react-icons/tb";

interface NewsErrorPageProps {
    handleRetry: () => void;
    handleCopyError: () => void;
    newsErrorMessage: string | null;
}

const NewsErrorPage: React.FC<NewsErrorPageProps> = ({ handleRetry, handleCopyError, newsErrorMessage }) => {


    return (<section id="news" className="h-screen flex items-center justify-center p-16">
        <div className="bg-backgroundPrimary h-auto md:h-[50vh] w-[80vh] flex items-center justify-center rounded-3xl outline outline-separator shadow-2xl p-4 flex-col">
            <div className="flex flex-col gap-4 text-systemRed">
                <div className="flex">
                    <code className="flex items-center gap-1 bg-[#b91d1d36] p-1 rounded-xl shadow-lg">
                        <RiErrorWarningLine /> Error:
                    </code>
                </div>
                {newsErrorMessage}
            </div>
            <div className="mt-6 flex flex-row gap-4">
                <button
                    title="Report Error"
                    className="bg-backgroundLayer1 outline outline-separator shadow-2x hover:shadow-3xl p-2 rounded-full"
                >
                    <TbMessageReport />
                </button>
                <button
                    title="Copy"
                    className="bg-backgroundLayer1 outline outline-separator shadow-2x hover:shadow-3xl p-2 rounded-full"
                    onClick={handleCopyError}
                >
                    <TbCopy />
                </button>
                <button
                    title="Retry"
                    className="bg-backgroundLayer1 outline outline-separator shadow-2x hover:shadow-3xl p-2 rounded-full"
                    onClick={handleRetry}
                >
                    <TbRefresh />
                </button>
            </div>
        </div>
    </section>
    );
}

export default NewsErrorPage;