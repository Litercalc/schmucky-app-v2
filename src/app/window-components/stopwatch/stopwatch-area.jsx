import NormalButton from "../../reusable-components/normal-button"

import { create } from "zustand"

let intervalId = null

function formatTime(elapsedMs) {
    const totalMs = Math.floor(elapsedMs)
    const minutes = Math.floor(totalMs / 60000)
    const seconds = Math.floor((totalMs % 60000) / 1000)
    const milliseconds = Math.floor((totalMs % 1000) / 10) // centiseconds (00–99)

    return {
        minuteCount: String(minutes).padStart(2, '0'),
        secondCount: String(seconds).padStart(2, '0'),
        miliSecondCount: String(milliseconds).padStart(2, '0')
    }
}

export const useStopwatchStore = create((set, get) => ({
    minuteCount: "00",
    secondCount: "00",
    miliSecondCount: "00",

    playing: false,
    startTime: null,
    elapsedBeforePause: 0,

    togglePlay: () => {
        const { playing, elapsedBeforePause } = get()

        if (!playing) {
            const startTime = Date.now() - elapsedBeforePause

            intervalId = setInterval(() => {
                const elapsed = Date.now() - get().startTime
                set({ ...formatTime(elapsed) })
            }, 10)

            set({ playing: true, startTime })
        } else {
            clearInterval(intervalId)
            intervalId = null
            const elapsed = Date.now() - get().startTime
            set({ playing: false, elapsedBeforePause: elapsed })
        }
    },

    reset: () => {
        clearInterval(intervalId)
        intervalId = null
        set({
            minuteCount: "00",
            secondCount: "00",
            miliSecondCount: "00",
            playing: false,
            startTime: null,
            elapsedBeforePause: 0
        })
    }
}))

export default function StopwatchArea() {
    const playing = useStopwatchStore(state => state.playing)
    const togglePlay = useStopwatchStore(state => state.togglePlay)
    const reset = useStopwatchStore(state => state.reset)
    const minuteCount = useStopwatchStore(state => state.minuteCount)
    const secondCount = useStopwatchStore(state => state.secondCount)
    const miliSecondCount = useStopwatchStore(state => state.miliSecondCount)

    return (
        <div className="text-white mt-3">
            <div className="flex flex-col gap-2 items-center justify-center">
                <div className="w-45 h-12 bg-[#23383d] border-white border font-jersey text-center text-5xl">
                    {minuteCount}:{secondCount}:{miliSecondCount}
                </div>
                <div className="flex items-center justify-center gap-3">
                    <NormalButton label={!playing ? "▶" : "❚❚"} func={togglePlay}/>
                    <NormalButton label="⟲" func={reset}/>
                </div>
            </div>
        </div>
    )
}