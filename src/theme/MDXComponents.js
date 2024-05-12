import MDXComponents from '@theme-original/MDXComponents';
import Img from '@site/src/components/Img';
import { Icon } from '@iconify/react';

export default {
    // Re-use the default mapping
    ...MDXComponents,
    Img,
    IIcon: Icon, // Make the iconify Icon component available in MDX as <IIcon />.
};
