"use client";

import { DemoWithFrameDetails, FrameEntity } from "@/api/entities";
import { useEffect, useRef, useState } from "react";
import FrameContentActions from "./frame-content-actions";
import FrameContentPagination from "./frame-content-pagination";

interface FrameContentProps {
  defaultFrame: FrameEntity;
  frames: DemoWithFrameDetails["frames"];
}

export default function FrameContent({
  defaultFrame,
  frames,
}: FrameContentProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentFrame, setCurrentFrame] = useState(defaultFrame);
  const [contentHasUpdated, setContentHasUpdated] = useState(false);

  useEffect(() => {
    const iframeDocument = iframeRef?.current?.contentDocument;
    const iframeWindow = iframeRef?.current?.contentWindow as
      | (Window & typeof globalThis)
      | null
      | undefined;

    function disableEditModeInHtmlElement(
      this: HTMLElement,
      { target }: FocusEvent,
    ) {
      if (target instanceof iframeWindow!.HTMLElement) {
        target.removeAttribute("contenteditable");
      }

      this.removeEventListener("blur", disableEditModeInHtmlElement);
    }

    function enableEditModeInHtmlElement({ target }: MouseEvent) {
      console.log("edit mode");
      const hasTextContentInElement =
        target instanceof iframeWindow!.HTMLElement;

      if (hasTextContentInElement) {
        target.setAttribute("contenteditable", "true");
        target.focus();
        target.addEventListener("blur", disableEditModeInHtmlElement);

        setContentHasUpdated(true);
      }
    }

    iframeDocument?.open();
    iframeDocument?.write(currentFrame.html);
    iframeDocument?.addEventListener("dblclick", enableEditModeInHtmlElement);

    return () => {
      iframeDocument?.removeEventListener(
        "dblclick",
        enableEditModeInHtmlElement,
      );
      iframeDocument?.close();
    };
  }, [currentFrame.html]);

  return (
    <div>
      <FrameContentActions
        currentFrame={currentFrame}
        setCurrentFrame={setCurrentFrame}
        frames={frames}
        iframeRef={iframeRef}
        contentHasUpdated={contentHasUpdated}
      />

      <div className="flex justify-center relative w-full h-[550px] 2xl:h-[730px] rounded-md border shadow-md">
        <iframe ref={iframeRef} className="w-full h-full" />

        <FrameContentPagination
          currentFrame={currentFrame}
          setCurrentFrame={setCurrentFrame}
          frames={frames}
        />
      </div>
    </div>
  );
}
