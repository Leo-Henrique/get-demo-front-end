import { api } from "@/api";
import {
  DemoWithFrameDetails,
  FrameEntity,
  FrameWithoutHtml,
} from "@/api/entities";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Save } from "lucide-react";
import { Dispatch, RefObject, SetStateAction } from "react";
import { toast } from "sonner";

interface FrameContentActionsProps {
  currentFrame: FrameEntity;
  setCurrentFrame: Dispatch<SetStateAction<FrameEntity>>;
  frames: DemoWithFrameDetails["frames"];
  iframeRef: RefObject<HTMLIFrameElement>;
  contentHasUpdated: boolean;
}

export default function FrameContentActions({
  currentFrame,
  setCurrentFrame,
  frames,
  iframeRef,
  contentHasUpdated,
}: FrameContentActionsProps) {
  const onSelectFrame = async ({ id }: FrameWithoutHtml) => {
    const { frame } = await api.frame.findUniqueById(id);

    setCurrentFrame(frame);
  };
  const onUpdateFrame = async () => {
    const iframeDocument = iframeRef?.current?.contentDocument;
    const doctypeDeclaration = `<!DOCTYPE ${iframeDocument?.doctype?.name}>`;
    const updatedContent = `${doctypeDeclaration} ${iframeDocument?.documentElement.outerHTML}`;

    const { isSuccess, message } = await api.frame.updateUniqueHtml(
      currentFrame,
      updatedContent,
    );

    if (!isSuccess) return toast.error(message);

    toast.success(message);
  };

  return (
    <div className="flex gap-5 items-center justify-end mb-5">
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-700">Frame atual:</span>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={currentFrame.order + 1}
              defaultValue={currentFrame.order.toString()}
            />
          </SelectTrigger>

          <SelectContent>
            {frames.map(frame => (
              <SelectItem
                key={frame.id}
                value={frame.order.toString()}
                onMouseDown={() => onSelectFrame(frame)}
              >
                {frame.order + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="px-2">
                <Info width={20} height={20} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p className="text-zinc-950 text-sm">
                Dê um duplo clique em algum conteúdo do frame para altera-lo.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          disabled={!contentHasUpdated}
          className="transition-all"
          onClick={onUpdateFrame}
        >
          <Save width={18} height={18} className="mr-2" />
          Salvar alterações
        </Button>
      </div>
    </div>
  );
}
