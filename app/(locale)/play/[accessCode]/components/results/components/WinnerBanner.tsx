import {Result} from "@/domain/result/Result";
import Image from "next/image";
import {useEffect} from "react";
import triggerSideCannonConfetti from "@/components/magicui/confetti/triggerConfetti";

const WinnerBanner = ({results}: {
    results: Result[]
}) => {
    useEffect(() => {
        triggerSideCannonConfetti()
    },[])

    return (
        <div className="grid grid-cols-[1fr,2fr,1fr] gap-2 p-4">
            {results.length>= 2 && <div className="flex flex-col w-full items-center justify-end gap-1">
                <Image width={48} height={48} src={'/medal-2.svg'} alt={'medal'} className={'size-12'}/>

                <p className=" leading-none text-gray-800">
                    {results[1].user.name}
                </p>
                <span className={" font-semibold tracking-tight text-gray-800"}>
                    <>{results[1].points.toString()} points</>
                </span>
            </div>}

            {results.length>= 1 && <div className="flex flex-col w-full items-center gap-1">
                <Image width={60} height={60} src={'/medal-1.svg'} alt={'medal'} className={'size-16'}/>
                <p className=" leading-none text-gray-800">{results[0].user.name}</p>
                <span className={" font-semibold tracking-tight text-gray-800"}>
                    <>{results[0].points.toString()} points</>
                </span>
            </div>}

            {results.length>= 3 &&<div className="flex flex-col w-full items-center justify-end gap-1">
                <Image width={48} height={48} src={'/medal-3.svg'} alt={'medal'} className={'size-12'}/>

                <p className=" leading-none text-gray-800">
                    {results[2].user.name}
                </p>
                <span className={" font-semibold tracking-tight text-gray-800"}>
                    <>{results[2].points.toString()} points</>
                </span>
            </div>}

        </div>
    )

}
export default WinnerBanner