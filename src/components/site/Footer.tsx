// prettier-ignore
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 p-4 py-10 flex gap-10 flex-col items-center bg-sidebar text-sidebar-foreground">
      <div className="flex flex-col items-center justify-center">
        <div className="text-3xl uppercase mb-2">
          Thank you to our <span className="uppercase text-destructive">generous</span> sponsors!
        </div>
        <div className="mb-4">
          Please consider{" "}
          <Link to="/sponsors" className="text-destructive">
            sponsoring us
          </Link>
          !
        </div>

        {/* TODO: Pull sponsors for the most recent Game Year and display here */}
        <div className="grid grid-cols-3 grid-flow-row gap-6 text-3xl font-bold">
          <div>
            <a href="https://www.microsoft.com" target="_blank">
              Microsoft
            </a>
          </div>
          <div>
            <a href="https://www.wegmans.com" target="_blank">
              Wegmans
            </a>
          </div>
          <div>
            <a href="https://dxselect.com/" target="_blank">
              DxSelect
            </a>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-(--color-secondary) w-full mx-4" />
      <div className="flex flex-row gap-20 justify-between">
        <div>
          <h2 className="text-2xl uppercase text-white font-semibold">
            Team 578 - Fairport Robotics
          </h2>
        </div>
        <div>
          <h2 className="text-2xl uppercase text-white font-semibold">Get in touch</h2>
          <div>Address here</div>
          <div className="hover:text-destructive">
            <Link to="/contact">Contact us</Link>
          </div>
          <div className="flex flex-row gap-2 mt-8 overflow-hidden">
            <SocialLinkButton link="https://x.com/fairportrobotic" image="/twitter.svg" />
            <SocialLinkButton
              link="https://www.instagram.com/fairportrobotics/"
              image="/instagram.svg"
            />
            <SocialLinkButton
              link="https://www.facebook.com/fairportrobotics/"
              image="/facebook.svg"
            />
            <SocialLinkButton link="https://www.youtube.com/@team578" image="/youtube.svg" />
            <SocialLinkButton link="https://github.com/FairportRobotics/" image="/github.svg" />
          </div>
        </div>
      </div>
      <div className="border-t-2 border-(--color-secondary) w-full mx-4" />
      <div className="text-sm">© {year} FRC Team 578 Fairport Robotics. All rights reserved.</div>
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
        "p-2 rounded-md bg-sidebar-primary hover:bg-destructive transition-colors duration-250",
        className,
      )}
      {...props}
    >
      {/* TODO: Rounded isn't working */}
      <a href={link} className="" target="_blank">
        <img src={image} className="w-8 h-8" />
      </a>
    </div>
  );
}
