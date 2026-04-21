import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="p-4 py-10 flex gap-10 flex-col items-center justify-center bg-(--color-accent)">
      <div className="flex flex-col items-center justify-center">
        <div className="text-3xl uppercase text-white">
          We{" "}
          <span className="uppercase text-(--color-destructive) hover:text-4xl">
            love
          </span>{" "}
          our sponsors!
        </div>
        <div>
          Please consider{" "}
          <Link to="/sponsors" className="text-(--color-destructive)">
            sponsoring us
          </Link>
          !
        </div>

        {/* TODO: Pull sponsors for the most recent Game Year and display here */}
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
          <div className="hover:text-(--color-destructive)">
            <Link to="/contact">Contact us</Link>
          </div>
          <div className="flex flex-row gap-2 mt-8">
            <SocialLinkButton
              link="https://x.com/fairportrobotic"
              image="/twitter.svg"
            />
            <SocialLinkButton
              link="https://www.instagram.com/fairportrobotics/"
              image="/instagram.svg"
            />
            <SocialLinkButton
              link="https://www.facebook.com/fairportrobotics/"
              image="/facebook.svg"
            />
            <SocialLinkButton
              link="https://www.youtube.com/@team578"
              image="/youtube.svg"
            />
            <SocialLinkButton
              link="https://github.com/FairportRobotics/"
              image="/github.svg"
            />
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

function SocialLinkButton({
  link,
  image,
  className,
  ...props
}: {
  link: string;
  image: string;
  className?: string;
  props?: React.ComponentProps<"div">;
}) {
  return (
    <div
      className={cn(
        "p-2 rounded-xl bg-(--color-background) hover:bg-(--color-destructive)",
        className,
      )}
      {...props}
    >
      <a href={link} className="">
        <img src={image} className="w-8 h-8" />
      </a>
    </div>
  );
}
