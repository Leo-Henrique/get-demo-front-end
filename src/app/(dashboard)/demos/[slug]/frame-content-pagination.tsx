import { api } from "@/api";
import {
  DemoWithFrameDetails,
  FrameEntity,
  FrameWithoutHtml,
} from "@/api/entities";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

interface FrameContentPaginationProps {
  currentFrame: FrameEntity;
  setCurrentFrame: Dispatch<SetStateAction<FrameEntity>>;
  frames: DemoWithFrameDetails["frames"];
}

export default function FrameContentPagination({
  currentFrame,
  setCurrentFrame,
  frames,
}: FrameContentPaginationProps) {
  const onSelectFrame = async ({ id }: FrameWithoutHtml) => {
    const { frame } = await api.frame.findUniqueById(id);

    setCurrentFrame(frame);
  };
  const paginationVisibleFrames = frames.filter(frame => {
    const validOrders = [
      currentFrame.order - 1,
      currentFrame.order,
      currentFrame.order + 1,
    ];

    if (currentFrame.order < 1) validOrders.push(currentFrame.order + 2);

    if (currentFrame.order >= frames.length - 1)
      validOrders.push(currentFrame.order - 2);

    return validOrders.includes(frame.order);
  });
  const getFrameByOrder = (order: number) => {
    const frame = frames.find(frame => frame.order === order);

    return frame ?? currentFrame;
  };

  return (
    <Pagination className="flex items-center gap-3 absolute bottom-5 w-auto bg-zinc-950 bg-opacity-90 text-white rounded-md">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isActive={currentFrame.order > 0}
            onClick={() =>
              onSelectFrame(getFrameByOrder(currentFrame.order - 1))
            }
          />
        </PaginationItem>

        {paginationVisibleFrames.map(frame => (
          <PaginationItem key={frame.id}>
            <PaginationLink
              isActive={currentFrame.order !== frame.order}
              onClick={() => onSelectFrame(getFrameByOrder(frame.order))}
            >
              {frame.order + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            isActive={currentFrame.order < frames.length - 1}
            onClick={() =>
              onSelectFrame(getFrameByOrder(currentFrame.order + 1))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
