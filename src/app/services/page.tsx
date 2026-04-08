import ServiceCard from "./service-card";


export default function ServicesPage() {
    return (
        <div className="relative border-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 max-lg:h-66 max-lg:border-t lg:border-l dark:[--pattern-fg:var(--color-white)]/10">
            <div className="p-4 h-full w-full bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
                <div className="p-4 mb-4">
                    <h1 className="text-6xl font-bold text-center text-apple-intelligence-gradient">Services</h1>
                    <div className="max-w-4xl text-center mx-auto mt-4 text-xl">This is a place where you get a test of most services free online. I have crafted this to become an expertience for you. But honestly, it depends on what you want. Granny might never even know this palce exists on the internet.</div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {/* Use min-w-max or flex-shrink-0 so the cards don't squish */}
                    <a href="/gameCenter" className="flex-shrink-0">
                        <ServiceCard />
                    </a>
                    <a href="/gameCenter" className="flex-shrink-0">
                        <ServiceCard />
                    </a>
                    {/* Add more cards to see the scroll effect */}
                    <a href="/gameCenter" className="flex-shrink-0">
                        <ServiceCard />
                    </a>
                </div>
            </div>
        </div>

    )
}