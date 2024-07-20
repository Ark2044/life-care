import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div className="flex items-center justify-evenly gap-32">
        <div className="al">
          <div className="bg-violet-950 max-w-xs p-4 mt-2 rounded-e-full text-white text-4xl">
            HEALTHCARE
          </div>
          <div className="bg-violet-950 max-w-s p-4 mt-2 rounded-e-full text-white text-4xl">
            SOLUTIONS THAT
          </div>
          <div className="bg-violet-950 max-w-md p-4 mt-2 rounded-e-full text-white text-4xl">
            SIMPLIFY THE
          </div>
          <div className="bg-violet-950 max-w-lg p-4 mt-2 rounded-e-full text-white text-4xl">
            PRACTICE
          </div>
          <div className="bg-violet-950 max-w-xl p-4 mt-2 rounded-e-full text-white text-4xl">
            OF CARE
          </div>
        </div>
        <div>
          <Image
            src={"/lady-doctor-1.png"}
            alt="lady-doctor-1"
            width={450}
            height={450}
          />
        </div>
      </div>
    </>
  );
}
