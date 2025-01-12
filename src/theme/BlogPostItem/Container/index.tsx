import React from 'react';
import Container from '@theme-original/BlogPostItem/Container';
import type ContainerType from '@theme/BlogPostItem/Container';
import type { WrapperProps } from '@docusaurus/types';
import clsx from 'clsx';

type Props = WrapperProps<typeof ContainerType>;

export default function ContainerWrapper(props: Props): JSX.Element {
  return (
    <>
      <Container {...props} className={clsx("h-entry", props.className)} />
    </>
  );
}
