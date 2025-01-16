import { LinkPreviewerSSRComponent } from './LinkPreviewer';

import { HighlightBlock, MarginNote, SideNote } from '.';

export const customCompSyntaxConfig = {
  hb({ node, children }) {
    return <HighlightBlock {...node.properties}>{children}</HighlightBlock>;
  },
  sn({ node, children }) {
    return <SideNote {...node.properties}>{children}</SideNote>;
  },
  mn({ node, children }) {
    return <MarginNote {...node.properties}>{children}</MarginNote>;
  },
  async slink({ node }) {
    return <LinkPreviewerSSRComponent {...node.properties} />;
  },
};
