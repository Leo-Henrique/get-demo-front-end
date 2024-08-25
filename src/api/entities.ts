export type DemoEntity = {
  id: string;
  slug: string;
  name: string;
  createdAt: Date;
};

export type FrameEntity = {
  id: string;
  demoId: string;
  html: string;
  order: number;
};

export type FrameWithoutHtml = Omit<FrameEntity, "html">;

export type DemoWithDetails = DemoEntity & {
  totalFrames: number;
};

export type DemoWithFrameDetails = DemoEntity & {
  frames: [FrameEntity, ...FrameWithoutHtml[]];
};
