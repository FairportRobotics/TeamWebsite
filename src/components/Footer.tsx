import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="p-4 py-10 flex gap-10 flex-col items-center justify-center bg-stone-700/50">
      <div className="flex flex-col items-center justify-center">
        <div className="text-3xl uppercase text-white">
          We <span className="uppercase text-red-600 hover:text-4xl">love</span>{" "}
          our sponsors!
        </div>
        <div>
          Please consider{" "}
          <Link to="/sponsors" className="text-red-600">
            sponsoring us
          </Link>
          !
        </div>
        <div className="grid grid-cols-3 grid-flow-row gap-6">
          <div>
            <a href="https://www.microsoft.com">Microsoft</a>
          </div>
          <div>
            <a href="https://www.wegmans.com">Wegmans</a>
          </div>
          <div>
            <a href="https://dxselect.com/">DxSelect</a>
          </div>
        </div>
      </div>
      <div>
        <hr className="border-t border-amber-200 my-8" />
      </div>
      <div className="flex flex-row gap-20 justify-between">
        <div>
          <h2 className="text-2xl uppercase text-white font-semibold">
            Team 578 - Fairport Robotics
          </h2>
        </div>
        <div>
          <h2 className="text-2xl uppercase text-white font-semibold">
            Get in touch
          </h2>
          <div>Address here</div>
          <div className="hover:text-red-600">
            <Link to="/contact">Contact us</Link>
          </div>
          <div className="flex flex-row gap-2 mt-8">
            <div className="w-8 h-8 bg-stone-900 hover:bg-red-600 p-2 rounded-sm">
              <a href="https://x.com/fairportrobotic">
                <img src="/twitter.svg" />
              </a>
            </div>
            <div className="w-8 h-8 bg-stone-900 hover:bg-red-600 p-2 rounded-sm">
              <a href="https://www.instagram.com/fairportrobotics/">
                <img src="/instagram.svg" />
              </a>
            </div>
            <div className="w-8 h-8 bg-stone-900 hover:bg-red-600 p-2 rounded-sm">
              <a href="https://www.facebook.com/fairportrobotics/">
                <img src="/facebook.svg" />
              </a>
            </div>
            <div className="w-8 h-8 bg-stone-900 hover:bg-red-600 p-2 rounded-sm">
              <a href="https://www.youtube.com/@team578">
                <img src="/youtube.svg" />
              </a>
            </div>
            <div className="w-8 h-8 bg-stone-900 hover:bg-red-600 p-2 rounded-sm">
              <a href="https://github.com/FairportRobotics/">
                <img src="/github.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr className="my-6 border-gray-300 border-t-3" />
      </div>
      <div className="text-sm">
        © {year} FRC Team 578 Fairport Robotics. All rights reserved.
      </div>
    </footer>
  );
}
